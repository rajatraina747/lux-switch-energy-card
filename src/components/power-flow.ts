import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('lux-power-flow')
export class LuxPowerFlow extends LitElement {
  @property({ type: Boolean }) active = false;
  @property({ type: Number }) power = 0;

  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: 60px;
      margin: 10px 0;
    }

    .flow-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 10px;
      height: 100%;
    }

    svg {
      width: 100%;
      height: 100%;
      overflow: visible;
    }

    .source, .destination {
      fill: var(--lux-text-muted, #727272);
      transition: fill 0.5s ease, filter 0.5s ease;
      transform-box: fill-box;
      transform-origin: center;
    }

    .active .source {
      fill: var(--lux-accent-gold, #d6b25e);
      filter: drop-shadow(0 0 5px var(--lux-accent-gold));
      animation: pulse 2s infinite ease-in-out;
    }

    .active .destination {
      fill: var(--lux-accent-gold, #d6b25e);
      filter: drop-shadow(0 0 8px var(--lux-accent-gold));
    }

    .path-base {
      stroke: rgba(255, 255, 255, 0.1);
      stroke-width: 2;
      fill: none;
    }

    .flow-path {
      stroke: var(--lux-accent-gold, #d6b25e);
      stroke-width: 3;
      fill: none;
      stroke-dasharray: 4, 12;
      stroke-linecap: round;
      opacity: 0;
      transition: opacity 0.5s ease;
    }

    .active .flow-path {
      opacity: 1;
      animation: flow var(--flow-speed, 2s) linear infinite;
    }

    @keyframes pulse {
      0%, 100% { opacity: 0.8; transform: scale(1); }
      50% { opacity: 1; transform: scale(1.1); }
    }

    @keyframes flow {
      from { stroke-dashoffset: 16; }
      to { stroke-dashoffset: 0; }
    }

    .vibrate {
      animation: vibrate 0.15s linear infinite !important;
    }

    @keyframes vibrate {
      0% { transform: translate(10px, 18px) rotate(0deg); }
      25% { transform: translate(9px, 17px) rotate(-1deg); }
      50% { transform: translate(10px, 19px) rotate(0deg); }
      75% { transform: translate(11px, 17px) rotate(1deg); }
      100% { transform: translate(10px, 18px) rotate(0deg); }
    }
  `;

  render() {
    // Calculate speed based on power. Higher power = faster flow (lower duration)
    // Range: 0W -> 5s, 3000W -> 0.2s
    const speed = Math.max(0.1, 4 - (Math.min(this.power, 2000) / 2000) * 3.8);

    // Dynamic color based on power
    let flowColor = 'var(--lux-accent-gold, #d6b25e)';
    if (this.power < 50) {
      flowColor = 'var(--lux-accent-gold, #d6b25e)'; // Use theme default
    } else if (this.power >= 1000) {
      flowColor = '#ef4444'; // Alert Red
    } else {
      flowColor = '#d6b25e'; // Energetic Gold
    }

    return html`
      <div class="flow-container ${this.active ? 'active' : ''}" 
           style="--flow-speed: ${speed.toFixed(2)}s; --lux-accent-gold: ${flowColor};">
        <svg viewBox="0 0 200 60" preserveAspectRatio="xMidYMid meet">
          <!-- Bolt (Source) -->
          <g transform="translate(10, 18)" class="${this.active && this.power > 1000 ? 'vibrate' : ''}">
            <path class="source" d="M7,2v11h3v9l7-12h-4l4-8H7z"/>
          </g>

          <!-- Path -->
          <path class="path-base" d="M35 30 L165 30" />
          <path class="flow-path" d="M35 30 L165 30" />

          <!-- Table Lamp (Destination) -->
          <g transform="translate(170, 18)">
             <path class="destination" d="M8,2 L16,2 L18,14 L6,14 L8,2 Z M5,15 L19,15 L19,17 L5,17 L5,15 Z M11,17 L11,20 L8,20 L8,22 L16,22 L16,20 L13,20 L13,17 L11,17 Z"/>
          </g>
        </svg>
      </div>
    `;
  }
}
