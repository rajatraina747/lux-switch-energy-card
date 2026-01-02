import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
    --glass-blur: 14px;
    --glass-opacity: 0.08;
    /* Default theme variables if not overridden */
    --ha-card-background: rgba(255, 255, 255, 0.06); 
    --primary-text-color: rgba(255, 255, 255, 0.92);
    --secondary-text-color: rgba(255, 255, 255, 0.62);
    
    --lux-panel-color: var(--ha-card-background);
    --lux-accent-gold: #d6b25e;
    --lux-accent-purple: #6b21a8;
    --lux-text-primary: var(--primary-text-color);
    --lux-text-muted: var(--secondary-text-color);
    --lux-shadow-strength: 0.35;
    --lux-glow-strength: 0.65;
    --lux-border-radius: 24px;
  }

  .card {
    position: relative;
    background: var(--lux-panel-color);
    border-radius: var(--lux-border-radius);
    padding: 24px;
    cursor: pointer;
    transition: all 0.3s ease;
    backdrop-filter: blur(var(--glass-blur));
    -webkit-backdrop-filter: blur(var(--glass-blur));
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 
      0 8px 32px rgba(0, 0, 0, calc(var(--lux-shadow-strength) * 0.5)),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
  }

  .card:hover {
    transform: translateY(-2px);
    box-shadow: 
      0 12px 40px rgba(0, 0, 0, calc(var(--lux-shadow-strength) * 0.6)),
      0 0 30px rgba(var(--accent-gold-rgb), calc(var(--lux-glow-strength) * 0.3)),
      inset 0 1px 0 rgba(255, 255, 255, 0.15);
  }

  .card.on {
    box-shadow: 
      0 8px 32px rgba(0, 0, 0, calc(var(--lux-shadow-strength) * 0.5)),
      0 0 40px rgba(var(--accent-gold-rgb), calc(var(--lux-glow-strength) * 0.4)),
      inset 0 1px 0 rgba(255, 255, 255, 0.15);
  }

  .card.off {
    opacity: 0.8; /* Quiet down (was 0.85) */
    transform: scale(0.98);
    box-shadow: none; /* Remove shadow to recede */
    filter: grayscale(0.4); /* Slightly desaturate */
  }

  .card.off:hover {
    opacity: 0.9;
    transform: scale(0.99);
    filter: grayscale(0.2);
    box-shadow: 0 4px 12px rgba(0,0,0,0.1); /* Subtle lift on hover */
  }

  /* ... (existing styles) */

  .modal-content {
    background: var(--lux-panel-color);
    border-radius: var(--lux-border-radius);
    padding: 32px;
    max-width: 500px;
    width: 90%;
    max-height: 80vh;
    overflow-y: auto;
    backdrop-filter: blur(20px); /* Increased blur (was glass-blur) for "sheet" feel */
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.08); /* Softer border */
    transform: scale(0.95); /* Start slightly smaller */
    animation: modalIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; /* Smoother easing */
    box-shadow: 0 40px 80px rgba(0,0,0,0.6); /* Deeper, softer shadow */
  }

  /* ... */

  @media (prefers-reduced-motion: reduce) {
    *, ::before, ::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
    
    .card:hover {
      transform: none;
    }
    
    /* Disable breathing and flow animations specifically */
    .card.on .light-icon {
        animation: none;
    }
    lux-power-flow {
        --flow-speed: 0s;
    }
  }
`;
