import { LitElement, html, css, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PowerSample, SparklineConfig } from '../types';

@customElement('lux-sparkline')
export class LuxSparkline extends LitElement {
    @property({ type: Array }) samples: PowerSample[] = [];
    @property({ type: Object }) config?: SparklineConfig;
    @property({ type: String }) accentColor: string = '#d6b25e';
    @property({ type: Boolean }) faded: boolean = false;

    static get styles() {
        return css`
            :host {
                display: block;
                width: 100%;
                height: 100%;
            }
            svg {
                width: 100%;
                height: 100%;
                display: block;
                transition: opacity 0.3s ease;
            }
            svg.faded {
                opacity: 0.3;
            }
        `;
    }

    // Moving average to smooth out sharp oscillations
    private movingAverage(samples: PowerSample[], windowSize: number = 3): PowerSample[] {
        if (samples.length < windowSize) return samples;

        return samples.map((sample, index) => {
            const start = Math.max(0, index - Math.floor(windowSize / 2));
            const end = Math.min(samples.length, index + Math.ceil(windowSize / 2));
            const window = samples.slice(start, end);
            const avg = window.reduce((sum, s) => sum + s.value, 0) / window.length;
            return { ...sample, value: avg };
        });
    }

    // Catmull-Rom spline to SVG cubic bezier
    private catmullRomToBezier(points: { x: number, y: number }[], tension: number = 1.5): string {
        if (points.length < 2) return '';

        let path = `M ${points[0].x} ${points[0].y}`;

        for (let i = 0; i < points.length - 1; i++) {
            const p0 = points[i - 1] || points[0];
            const p1 = points[i];
            const p2 = points[i + 1];
            const p3 = points[i + 2] || p2;

            const cp1x = p1.x + (p2.x - p0.x) / 6 * tension;
            const cp1y = p1.y + (p2.y - p0.y) / 6 * tension;
            const cp2x = p2.x - (p3.x - p1.x) / 6 * tension;
            const cp2y = p2.y - (p3.y - p1.y) / 6 * tension;

            path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
        }

        return path;
    }

    render() {
        const width = 200;
        const height = 40;

        if (this.samples.length < 2) {
            return html``;
        }

        // Apply moving average smoothing to reduce sharp oscillations
        const smoothedSamples = this.config?.smoothing !== false
            ? this.movingAverage(this.samples, 3)
            : this.samples;

        const maxValue = Math.max(...smoothedSamples.map(s => s.value), 0);
        const minValue = Math.min(...smoothedSamples.map(s => s.value), 0);
        const range = (maxValue - minValue) || 1;

        const points = smoothedSamples.map((sample, index) => {
            const x = (index / (smoothedSamples.length - 1)) * width;
            const y = height - ((sample.value - minValue) / range) * height;
            return { x, y };
        });

        // Use smooth Catmull-Rom spline with high tension
        const smoothPath = this.config?.smoothing !== false
            ? this.catmullRomToBezier(points, 1.5)
            : points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

        const areaPath = `${smoothPath} L ${width} ${height} L 0 ${height} Z`;
        const gradientId = `grad-${Math.random().toString(36).substr(2, 9)}`;

        return html`
            <svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" class="${this.faded ? 'faded' : ''}">
                <defs>
                    <linearGradient id="${gradientId}" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style="stop-color:${this.accentColor};stop-opacity:0.25" />
                        <stop offset="100%" style="stop-color:${this.accentColor};stop-opacity:0" />
                    </linearGradient>
                </defs>
                <path
                    d="${areaPath}"
                    fill="url(#${gradientId})"
                />
                <path
                    d="${smoothPath}"
                    fill="none"
                    stroke="${this.accentColor}"
                    stroke-width="${this.config?.line_width || 2}"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    opacity="0.9"
                />
            </svg>
        `;
    }
}
