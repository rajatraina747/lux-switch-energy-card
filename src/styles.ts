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
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    backdrop-filter: blur(var(--glass-blur));
    -webkit-backdrop-filter: blur(var(--glass-blur));
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 
      0 8px 32px rgba(0, 0, 0, calc(var(--lux-shadow-strength) * 0.5)),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .card:focus {
    outline: none;
    border-color: var(--lux-accent-gold);
    box-shadow: 0 0 0 2px rgba(214, 178, 94, 0.3);
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
    opacity: 0.8;
    transform: scale(0.98);
    box-shadow: none;
    filter: grayscale(0.4);
  }

  .card.off:hover {
    opacity: 0.9;
    transform: scale(0.99);
    filter: grayscale(0.2);
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 24px;
  }

  .title-section {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .icon-container {
    width: 48px;
    height: 48px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
  }

  .card.on .icon-container {
    background: rgba(var(--accent-gold-rgb), 0.15);
  }

  .light-icon {
    width: 28px;
    height: 28px;
    fill: var(--lux-text-muted);
    transition: all 0.3s ease;
  }

  .card.on .light-icon {
    fill: var(--lux-accent-gold);
    filter: drop-shadow(0 0 8px rgba(214, 178, 94, 0.8));
    animation: breathe 3s infinite ease-in-out;
  }

  @keyframes breathe {
    0%, 100% { transform: scale(1); filter: drop-shadow(0 0 8px rgba(214, 178, 94, 0.8)); }
    50% { transform: scale(1.1); filter: drop-shadow(0 0 15px rgba(214, 178, 94, 1)); }
  }

  .name {
    margin: 0;
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--lux-text-primary);
  }

  .status-chip {
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    background: rgba(255, 255, 255, 0.05);
    color: var(--lux-text-muted);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .status-chip.on {
    background: rgba(var(--accent-gold-rgb), 0.15);
    color: var(--lux-accent-gold);
    border-color: rgba(var(--accent-gold-rgb), 0.3);
  }

  .status-chip.unavailable {
    background: rgba(239, 68, 68, 0.1);
    color: #ef4444;
    border-color: rgba(239, 68, 68, 0.2);
  }

  .status-chip.stale {
    background: rgba(245, 158, 11, 0.1);
    color: #f59e0b;
  }

  .status-chip.anomaly {
    background: rgba(255, 255, 255, 0.1);
    color: var(--lux-accent-gold);
    border: 1px dashed var(--lux-accent-gold);
    animation: pulseGlow 2s infinite;
  }

  @keyframes pulseGlow {
    0% { box-shadow: 0 0 0 0 rgba(214, 178, 94, 0.4); }
    70% { box-shadow: 0 0 0 10px rgba(214, 178, 94, 0); }
    100% { box-shadow: 0 0 0 0 rgba(214, 178, 94, 0); }
  }

  .sparkline-container {
    height: 60px;
    margin: 16px 0;
    opacity: 0.6;
    transition: opacity 0.3s ease;
  }

  .card:hover .sparkline-container {
    opacity: 1;
  }

  .energy-section {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    margin-top: 8px;
  }

  .energy-item {
    display: flex;
    flex-direction: column;
  }

  .energy-value {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--lux-text-primary);
  }

  .energy-label {
    font-size: 0.75rem;
    color: var(--lux-text-muted);
    text-transform: uppercase;
    letter-spacing: 0.025em;
  }

  .time-section {
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
  }

  .time-info {
    font-size: 0.85rem;
    color: var(--lux-text-muted);
    line-height: 1.4;
  }

  .time-info strong {
    color: var(--lux-text-primary);
    font-weight: 600;
  }

  .timer-display {
    margin-top: 12px;
    padding: 8px 12px;
    background: rgba(var(--accent-gold-rgb), 0.1);
    border-radius: 8px;
    border: 1px solid rgba(var(--accent-gold-rgb), 0.2);
  }

  .timer-text {
    font-size: 0.85rem;
    color: var(--lux-accent-gold);
    font-weight: 600;
  }

  .controls-section {
    display: flex;
    gap: 8px;
    margin-top: 16px;
    flex-wrap: wrap;
  }

  .control-button {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: var(--lux-text-primary);
    padding: 8px 12px;
    border-radius: 8px;
    font-size: 0.85rem;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .control-button:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.2);
  }

  .control-button.active {
    background: rgba(214, 178, 94, 0.15);
    border-color: var(--lux-accent-gold);
    color: var(--lux-accent-gold);
  }

  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
  }

  .modal-content {
    background: #1a1a1a;
    background-image: linear-gradient(145deg, #1a1a1a 0%, #0d0d0d 100%);
    border-radius: var(--lux-border-radius);
    padding: 32px;
    max-width: 500px;
    width: 90%;
    max-height: 85vh;
    overflow-y: auto;
    border: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: 0 40px 80px rgba(0, 0, 0, 0.6);
    animation: modalIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  @keyframes modalIn {
    from { transform: scale(0.9) translateY(20px); opacity: 0; }
    to { transform: scale(1) translateY(0); opacity: 1; }
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
  }

  .modal-title {
    margin: 0;
    font-size: 1.5rem;
    color: var(--lux-text-primary);
  }

  .close-button {
    background: none;
    border: none;
    color: var(--lux-text-muted);
    font-size: 2rem;
    cursor: pointer;
    line-height: 1;
  }

  .expanded-stats {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    margin-bottom: 32px;
  }

  .stat-item {
    padding: 16px;
    background: rgba(255, 255, 255, 0.03);
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.05);
  }

  .stat-value {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--lux-accent-gold);
  }

  .stat-label {
    font-size: 0.8rem;
    color: var(--lux-text-muted);
    text-transform: uppercase;
  }

  .toast {
    position: fixed;
    bottom: 32px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0, 0, 0, 0.9);
    color: white;
    padding: 12px 24px;
    border-radius: 30px;
    font-size: 0.9rem;
    z-index: 2000;
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
    pointer-events: none;
  }

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
    
    .card.on .light-icon {
        animation: none;
    }
    lux-power-flow {
        --flow-speed: 0s;
    }
  }
`;
