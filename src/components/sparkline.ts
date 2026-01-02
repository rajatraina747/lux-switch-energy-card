import { LitElement, html, css, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PowerSample, SparklineConfig } from '../types';

@customElement('lux-sparkline')
export class LuxSparkline extends LitElement {
    @property({ type: Array }) samples: PowerSample[] = [];
    @property({ type: Object }) config?: SparklineConfig;
    @property({ type: String }) accentColor: string = '#d6b25e';

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
            }
        `;
    }

    // Catmull-Rom spline to SVG cubic bezier
    private catmullRomToBezier(points: { x: number, y: number }[], tension: number = 0.5): string {
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

        const maxValue = Math.max(...this.samples.map(s => s.value), 0);
        const minValue = Math.min(...this.samples.map(s => s.value), 0);
        const range = (maxValue - minValue) || 1;

        const points = this.samples.map((sample, index) => {
            const x = (index / (this.samples.length - 1)) * width;
            const y = height - ((sample.value - minValue) / range) * height;
            return { x, y };
        });

        // Use smooth Catmull-Rom spline instead of straight lines
        const smoothPath = this.config?.smoothing !== false
            ? this.catmullRomToBezier(points)
            : points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

        const areaPath = `${smoothPath} L ${width} ${height} L 0 ${height} Z`;
        const gradientId = `grad-${Math.random().toString(36).substr(2, 9)}`;

        return html`
            <svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="none">
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
