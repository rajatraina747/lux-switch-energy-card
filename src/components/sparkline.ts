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

        const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
        const areaPath = `${linePath} L ${width} ${height} L 0 ${height} Z`;

        const gradientId = `grad-${Math.random().toString(36).substr(2, 9)}`;

        return html`
            <svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="none">
                <defs>
                    <linearGradient id="${gradientId}" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style="stop-color:${this.accentColor};stop-opacity:0.2" />
                        <stop offset="100%" style="stop-color:${this.accentColor};stop-opacity:0" />
                    </linearGradient>
                </defs>
                <path
                    d="${areaPath}"
                    fill="url(#${gradientId})"
                />
                <path
                    d="${linePath}"
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
