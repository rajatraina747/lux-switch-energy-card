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
        const range = maxValue - minValue || 1;

        const points = this.samples.map((sample, index) => {
            const x = (index / (this.samples.length - 1)) * width;
            const y = height - ((sample.value - minValue) / range) * height;
            return `${x},${y}`;
        }).join(' ');

        return html`
            <svg viewBox="0 0 ${width} ${height}">
                <polyline
                    fill="none"
                    stroke="${this.accentColor}"
                    stroke-width="${this.config?.line_width || 2}"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    points="${points}"
                    opacity="0.8"
                />
            </svg>
        `;
    }
}
