import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { styles } from './styles';
import { LuxSwitchEnergyCardConfig, PowerSample, ModeItem, ActionConfig } from './types';
import { localize } from './localize/localize';
import './components/sparkline';
import './components/power-flow';
import { normalizeConfig } from './config-utils';
import './editor';


// Register the card in the generic UI
// @ts-ignore
window.customCards = window.customCards || [];
// @ts-ignore
window.customCards.push({
    type: "lux-switch-energy-card",
    name: "Lux Switch Energy Card",
    description: "A premium glassmorphic switch card with energy monitoring",
});

@customElement('lux-switch-energy-card')
export class LuxSwitchEnergyCard extends LitElement {
    @property({ attribute: false }) public hass!: any;
    @state() private _config!: LuxSwitchEnergyCardConfig;
    @state() private _showModal = false;
    @state() private _sessionEnergy = 0;
    @state() private _sessionStartTime: number | null = null;
    @state() private _activeTimer: number | null = null;
    @state() private _timerEndTime: number | null = null;
    @state() private _showToast = false;
    @state() private _toastMessage = '';
    @state() private _powerSamples: PowerSample[] = [];
    @state() private _sampleInterval: number | null = null;
    @state() private _autoOffDisabled = false;
    @state() private _lastOnTime: number | null = null;
    @state() private _lastOffTime: number | null = null;

    static get styles() {
        return styles;
    }

    static getConfigElement() {
        return document.createElement('lux-switch-energy-card-editor');
    }

    static getStubConfig() {
        return {
            entity: '',
            power_entity: '',
            currency_symbol: '£',
            decimals: {
                power: 0,
                energy: 2,
                cost: 2
            },
            anomaly_watts: 1200,
            stale_seconds: 120,
            timers: {
                enabled: true,
                presets: [15, 30, 60],
                default_minutes: 30
            },
            sparkline: {
                enabled: true,
                samples: 60,
                interval_sec: 10,
                smoothing: true,
                line_width: 2
            },
            modes: {
                enabled: false,
                items: []
            },
            theme: {
                glass: true,
                blur: 14,
                opacity: 0.08,
                panel_color: undefined,
                accent_gold: '#d6b25e',
                accent_purple: '#6b21a8',
                text_primary: undefined,
                text_muted: undefined,
                shadow_strength: 0.35,
                glow_strength: 0.65,
                border_radius: 24
            },
            high_contrast: false
        };
    }

    // ... logic ...

    setConfig(config: LuxSwitchEnergyCardConfig) {
        // Run governance layer (validation + normalization)
        const normalized = normalizeConfig(config);

        // Merge with full defaults (shallow merge done in normalize, deep merge for objects here if needed
        // but normalizeConfig handles sub-objects. We can rely on it mostly, but getStubConfig provides
        // fields that normalizeConfig might pass through as undefined if not explicit.)
        // Actually, let's keep the spread of getStubConfig BEFORE the normalized config to ensure all defaults exist.

        this._config = {
            ...LuxSwitchEnergyCard.getStubConfig(),
            ...normalized, // Normalized values take precedence
            // Ensure nested objects merge correctly if normalized returned partials (it returns full valid sub-objects)
            decimals: { ...LuxSwitchEnergyCard.getStubConfig().decimals, ...config.decimals },
            modes: { ...LuxSwitchEnergyCard.getStubConfig().modes, ...config.modes },
        };

        this.updateThemeVariables();

        if (this._config.sparkline?.enabled && this._config.power_entity) {
            this.startPowerSampling();
        }
    }

    private updateThemeVariables() {
        const theme = this._config.theme;

        const setProp = (name: string, value: string | undefined | number) => {
            if (value !== undefined && value !== null) {
                this.style.setProperty(name, String(value));
            } else {
                this.style.removeProperty(name);
            }
        };

        setProp('--glass-blur', `${theme?.blur || 14}px`);
        setProp('--glass-opacity', theme?.opacity || 0.08);

        if (theme?.panel_color) {
            this.style.setProperty('--lux-panel-color', theme.panel_color);
        } else {
            this.style.setProperty('--lux-panel-color', 'var(--ha-card-background, rgba(255, 255, 255, 0.06))');
        }

        setProp('--lux-accent-gold', theme?.accent_gold || '#d6b25e');
        this.style.setProperty('--accent-gold-rgb', this.hexToRgb(theme?.accent_gold || '#d6b25e'));
        setProp('--lux-accent-purple', theme?.accent_purple || '#6b21a8');

        if (theme?.text_primary) {
            this.style.setProperty('--lux-text-primary', theme.text_primary);
        } else {
            this.style.setProperty('--lux-text-primary', 'var(--primary-text-color, rgba(255, 255, 255, 0.92))');
        }

        if (theme?.text_muted) {
            this.style.setProperty('--lux-text-muted', theme.text_muted);
        } else {
            this.style.setProperty('--lux-text-muted', 'var(--secondary-text-color, rgba(255, 255, 255, 0.62))');
        }

        setProp('--lux-shadow-strength', theme?.shadow_strength);
        setProp('--lux-glow-strength', theme?.glow_strength);
        setProp('--lux-border-radius', `${theme?.border_radius || 24}px`);
    }

    private hexToRgb(hex: string): string {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ?
            `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` :
            '214, 178, 94';
    }

    private startPowerSampling() {
        if (this._sampleInterval) {
            clearInterval(this._sampleInterval);
        }

        const interval = this._config.sparkline?.interval_sec || 10;
        this._sampleInterval = window.setInterval(() => {
            const power = this.getPower();
            if (power !== null) {
                this._powerSamples.push({
                    timestamp: Date.now(),
                    value: power
                });

                const maxSamples = this._config.sparkline?.samples || 60;
                if (this._powerSamples.length > maxSamples) {
                    this._powerSamples.shift();
                }
            }
        }, interval * 1000);
    }

    private getSwitchEntity() {
        return this.hass.states[this._config.entity];
    }

    private getPowerEntity() {
        return this._config.power_entity ? this.hass.states[this._config.power_entity] : null;
    }

    private getEnergyTodayEntity() {
        return this._config.energy_today_entity ? this.hass.states[this._config.energy_today_entity] : null;
    }

    private getCostTodayEntity() {
        return this._config.cost_today_entity ? this.hass.states[this._config.cost_today_entity] : null;
    }

    private isOn(): boolean {
        const entity = this.getSwitchEntity();
        return entity?.state === 'on';
    }

    private isUnavailable(): boolean {
        const entity = this.getSwitchEntity();
        return !entity || entity.state === 'unavailable' || entity.state === 'unknown';
    }

    private getPower(): number | null {
        const entity = this.getPowerEntity();
        if (!entity || entity.state === 'unavailable' || entity.state === 'unknown') {
            return null;
        }
        const power = parseFloat(entity.state);
        return isNaN(power) ? null : power;
    }

    private formatNumber(value: number | null, decimals: number = 2): string {
        if (value === null || isNaN(value)) {
            return '--';
        }
        return value.toFixed(decimals);
    }

    private formatCurrency(value: number | null, symbol: string = '£'): string {
        if (value === null || isNaN(value)) {
            return '--';
        }
        return `${symbol}${value.toFixed(2)}`;
    }

    private getTimeDisplay(): { primary: string; secondary: string } {
        const entity = this.getSwitchEntity();
        if (!entity) {
            return { primary: localize('common.unavailable'), secondary: '' };
        }

        const now = new Date();
        const lastChanged = new Date(entity.last_changed);

        if (this.isOn()) {
            if (!this._sessionStartTime) {
                this._sessionStartTime = lastChanged.getTime();
            }
            const duration = now.getTime() - this._sessionStartTime;
            const minutes = Math.floor(duration / 60000);
            const seconds = Math.floor((duration % 60000) / 1000);

            return {
                primary: localize('card.on_since', '{time}', lastChanged.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })),
                secondary: localize('card.running_for', '{minutes}', String(minutes)).replace('{seconds}', String(seconds))
            };
        } else {
            if (this._lastOffTime) {
                const duration = now.getTime() - this._lastOffTime;
                const minutes = Math.floor(duration / 60000);
                return {
                    primary: localize('card.last_used', '{time}', lastChanged.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })),
                    secondary: minutes > 0 ? localize('card.minutes_ago', '{minutes}', String(minutes)) : localize('card.just_now')
                };
            }
            return {
                primary: localize('card.last_used', '{time}', lastChanged.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })),
                secondary: ''
            };
        }
    }

    private _handleTap() {
        if (this._config.tap_action) {
            this._handleAction(this._config.tap_action);
        } else {
            this.toggleSwitch();
        }
    }

    private _handleHold() {
        if (this._config.hold_action) {
            this._handleAction(this._config.hold_action);
        } else {
            this._showModal = true;
            this.fireHaptic('medium');
        }
    }

    private _handleAction(actionConfig: ActionConfig) {
        if (!this.hass) return;

        this.fireHaptic('light');

        switch (actionConfig.action) {
            case 'toggle':
                this.toggleSwitch();
                break;
            case 'more-info':
                const event = new CustomEvent('hass-more-info', {
                    bubbles: true,
                    composed: true,
                    detail: { entityId: this._config.entity }
                });
                this.dispatchEvent(event);
                break;
            case 'navigate':
                if (actionConfig.navigation_path) {
                    window.history.pushState(null, '', actionConfig.navigation_path);
                    const navEvent = new CustomEvent('location-changed', {
                        bubbles: true,
                        composed: true
                    });
                    window.dispatchEvent(navEvent);
                }
                break;
            case 'url':
                if (actionConfig.url_path) {
                    window.open(actionConfig.url_path);
                }
                break;
            case 'call-service':
                if (actionConfig.service) {
                    const [domain, service] = actionConfig.service.split('.');
                    this.hass.callService(domain, service, actionConfig.service_data || {});
                }
                break;
        }
    }

    private fireHaptic(strength: 'selection' | 'light' | 'medium' | 'heavy' | 'success' | 'warning' | 'failure') {
        const event = new CustomEvent('haptic', {
            bubbles: true,
            composed: true,
            detail: strength
        });
        this.dispatchEvent(event);
    }

    private toggleSwitch() {
        if (this.isUnavailable()) return;

        this.fireHaptic('light');
        const entity = this.getSwitchEntity();
        const wasOn = this.isOn();

        this.hass.callService(
            'switch',
            wasOn ? 'turn_off' : 'turn_on',
            { entity_id: this._config.entity }
        );

        if (wasOn) {
            this.showToast();
            this._lastOffTime = Date.now();
        } else {
            this._sessionStartTime = Date.now();
            this._sessionEnergy = 0;
            this._lastOnTime = Date.now();
        }
    }

    private showToast() {
        const energy = this._sessionEnergy;
        const costEntity = this.getCostTodayEntity();
        let message = `${localize('card.session')}: ${this.formatNumber(energy, this._config.decimals?.energy || 2)} Wh`;

        if (costEntity && costEntity.state !== 'unavailable' && costEntity.state !== 'unknown') {
            const cost = parseFloat(costEntity.state);
            if (!isNaN(cost)) {
                message += ` • ${this.formatCurrency(cost, this._config.currency_symbol)}`;
            }
        }

        this._toastMessage = message;
        this._showToast = true;

        setTimeout(() => {
            this._showToast = false;
        }, 3000);
    }

    private startTimer(minutes: number) {
        this._timerEndTime = Date.now() + (minutes * 60000);
        this._autoOffDisabled = false;
        this.fireHaptic('success');

        if (this._activeTimer) {
            clearTimeout(this._activeTimer);
        }

        this._activeTimer = window.setTimeout(() => {
            if (!this._autoOffDisabled && this.isOn()) {
                this.toggleSwitch();
            }
            this._activeTimer = null;
            this._timerEndTime = null;
        }, minutes * 60000);
    }

    private cancelTimer() {
        if (this._activeTimer) {
            clearTimeout(this._activeTimer);
            this._activeTimer = null;
        }
        this._timerEndTime = null;
        this.fireHaptic('medium');
    }

    private getTimerDisplay(): string {
        if (!this._timerEndTime) return '';

        const remaining = this._timerEndTime - Date.now();
        if (remaining <= 0) return '';

        const minutes = Math.floor(remaining / 60000);
        const seconds = Math.floor((remaining % 60000) / 1000);

        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    private renderModal() {
        if (!this._showModal) return html``;

        const power = this.getPower();
        const energyToday = this.getEnergyTodayEntity();
        const costToday = this.getCostTodayEntity();
        const timeInfo = this.getTimeDisplay();

        return html`
      <div class="modal" @click=${(e: Event) => {
                if (e.target === e.currentTarget) this._showModal = false;
            }}>
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title">${this._config.name || 'Light Details'}</h3>
            <button class="close-button" @click=${() => this._showModal = false}>×</button>
          </div>
          
          <div class="expanded-stats">
            <div class="stat-item">
              <div class="stat-value">${this.formatNumber(power, this._config.decimals?.power || 0)} W</div>
              <div class="stat-label">${localize('modal.current_power')}</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">${this.formatNumber(this._sessionEnergy, this._config.decimals?.energy || 2)} Wh</div>
              <div class="stat-label">${localize('modal.session_energy')}</div>
            </div>
            ${energyToday && energyToday.state !== 'unavailable' ? html`
              <div class="stat-item">
                <div class="stat-value">${this.formatNumber(parseFloat(energyToday.state), this._config.decimals?.energy || 2)} kWh</div>
                <div class="stat-label">${localize('card.today')}</div>
              </div>
            ` : ''}
            ${costToday && costToday.state !== 'unavailable' ? html`
              <div class="stat-item">
                <div class="stat-value">${this.formatCurrency(parseFloat(costToday.state), this._config.currency_symbol)}</div>
                <div class="stat-label">${localize('card.cost_today')}</div>
              </div>
            ` : ''}
          </div>

          <div class="sparkline-container" style="height: 80px;">
            <lux-sparkline 
                .samples=${this._powerSamples} 
                .config=${this._config.sparkline}
                .accentColor=${`var(--lux-accent-gold)`}
            ></lux-sparkline>
          </div>

          <div style="margin: 16px 0; padding: 16px; background: rgba(255,255,255,0.05); border-radius: 12px;">
            <div style="font-size: 14px; color: var(--lux-text-muted); margin-bottom: 8px;">Time Info</div>
            <div style="font-size: 16px; color: var(--lux-text-primary);">${timeInfo.primary}</div>
            <div style="font-size: 14px; color: var(--lux-text-muted);">${timeInfo.secondary}</div>
          </div>

          ${this._timerEndTime ? html`
            <div class="timer-display">
              <div class="timer-text">${localize('card.auto_off_in')}: ${this.getTimerDisplay()}</div>
              <button class="control-button" @click=${this.cancelTimer} style="margin-top: 8px;">
                ${localize('modal.cancel_timer')}
              </button>
            </div>
          ` : ''}

          ${this._config.modes?.enabled && this._config.modes.items?.length ? html`
            <div style="margin-top: 24px;">
              <div style="font-size: 14px; color: var(--lux-text-muted); margin-bottom: 12px;">${localize('modal.modes')}</div>
              <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                ${this._config.modes.items.map(mode => html`
                  <button class="control-button" @click=${() => this.runMode(mode)}>
                    ${mode.icon ? html`<span style="margin-right: 4px;">${mode.icon}</span>` : ''}
                    ${mode.label}
                  </button>
                `)}
              </div>
            </div>
          ` : ''}
        </div>
      </div>
    `;
    }

    private runMode(mode: ModeItem) {
        this.fireHaptic('medium');

        if (mode.actions) {
            mode.actions.forEach(action => {
                this.hass.callService(action.domain, action.service, action.data);
            });
        }

        if (mode.disable_auto_off) {
            this._autoOffDisabled = true;
        }

        if (mode.start_timer_minutes) {
            this.startTimer(mode.start_timer_minutes);
        }

        this._showModal = false;
    }

    private renderToast() {
        if (!this._showToast) return html``;

        return html`
      <div class="toast">
        ${this._toastMessage}
      </div>
    `;
    }

    private _timer: number | undefined;
    private _holdTimer: number | undefined;

    private _handleStart(e: Event) {
        this._timer = Date.now();
        this._holdTimer = window.setTimeout(() => {
            this._handleHold();
            this._timer = undefined;
        }, 500);
    }

    private _handleEnd(e: Event) {
        if (this._holdTimer) {
            clearTimeout(this._holdTimer);
            this._holdTimer = undefined;
        }

        if (this._timer) {
            const duration = Date.now() - this._timer;
            if (duration < 500) {
                this._handleTap();
            }
        }
    }


    @state() private _historyFetched = false;

    protected firstUpdated(changedProps: any) {
        super.firstUpdated(changedProps);
        if (this._config.sparkline?.enabled && this._config.power_entity && !this._historyFetched) {
            this.fetchHistory();
        }
    }

    private async fetchHistory() {
        if (!this.hass || !this._config.power_entity) return;

        // Fetch last 1 hour of history
        const endTime = new Date();
        const startTime = new Date(endTime.getTime() - 60 * 60 * 1000); // 1 hour ago

        try {
            // Native HA API call
            // We use the 'history/period' endpoint
            // Format: /api/history/period/<timestamp>?filter_entity_id=<entity_id>&end_time=<end_timestamp>
            const history = await this.hass.callApi(
                'GET',
                `history/period/${startTime.toISOString()}?filter_entity_id=${this._config.power_entity}&end_time=${endTime.toISOString()}&minimal_response`
            );

            if (history && history[0] && history[0].length > 0) {
                const historicalSamples: PowerSample[] = history[0]
                    .map((entry: any) => ({
                        timestamp: new Date(entry.last_changed).getTime(),
                        value: parseFloat(entry.state)
                    }))
                    .filter((s: PowerSample) => !isNaN(s.value));

                // Merge with existing samples (if any were collected while loading)
                // Create a map for deduplication
                const samplesMap = new Map();
                [...historicalSamples, ...this._powerSamples].forEach(s => samplesMap.set(s.timestamp, s));

                this._powerSamples = Array.from(samplesMap.values())
                    .sort((a, b) => a.timestamp - b.timestamp)
                    // Limit to roughly what the sparkline expects (e.g. last 60-100 points)
                    // or just let the sparkline handle it. We'll clip to the configured window.
                    .filter(s => s.timestamp > startTime.getTime());

                this._historyFetched = true;
            }
        } catch (e) {
            console.warn('Lux Card: Failed to fetch history', e);
        }
    }

    private renderBudget() {
        if (!this._config.budget?.enabled || !this._config.budget.limit) return html``;

        let current = 0;
        let unit = '';

        // Default to cost entity if strict "budget" implies money, otherwise energy
        // But let's allow the user to specify a separate entity for budget tracking if they want
        // or fallback to cost -> energy
        const budgetEntityId = this._config.budget.entity || this._config.cost_today_entity || this._config.energy_today_entity;

        if (budgetEntityId && this.hass.states[budgetEntityId]) {
            const state = this.hass.states[budgetEntityId];
            current = parseFloat(state.state);
            unit = state.attributes.unit_of_measurement || '';
        }

        if (isNaN(current)) return html``;

        const limit = this._config.budget.limit;
        const percent = Math.min((current / limit) * 100, 100);
        const isExceeded = current > limit;

        return html`
        <div style="margin-top: 16px; margin-bottom: 8px;">
            <div style="display: flex; justify-content: space-between; font-size: 12px; color: var(--lux-text-muted); margin-bottom: 4px;">
                <span>Daily Budget</span>
                <span>${current.toFixed(2)} / ${limit.toFixed(2)} ${unit}</span>
            </div>
            <div style="width: 100%; height: 6px; background: rgba(255,255,255,0.1); border-radius: 3px; overflow: hidden;">
                <div style="
                    width: ${percent}%; 
                    height: 100%; 
                    background: ${isExceeded ? '#ef4444' : 'var(--lux-accent-gold)'};
                    transition: width 0.5s ease;
                "></div>
            </div>
        </div>
      `;
    }

    protected render() {
        if (!this._config || !this.hass) {
            return html``;
        }

        const entity = this.getSwitchEntity();
        const power = this.getPower();
        const energyToday = this.getEnergyTodayEntity();
        const costToday = this.getCostTodayEntity();
        const timeInfo = this.getTimeDisplay();
        const isUnavailable = this.isUnavailable();
        const isStale = this.isDataStale();

        if (this.isOn() && this._sessionStartTime && power !== null) {
            const now = Date.now();
            const elapsedHours = (now - this._sessionStartTime) / (1000 * 60 * 60);
            this._sessionEnergy = power * elapsedHours;
        }

        return html`
      <div 
        class="card ${this.isOn() ? 'on' : 'off'}"
        @mousedown=${this._handleStart}
        @touchstart=${this._handleStart}
        @mouseup=${this._handleEnd}
        @touchend=${this._handleEnd}
        @keydown=${(e: KeyboardEvent) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this._handleTap();
                }
            }}
        tabindex="0"
      >
        <div class="header">
          <div class="title-section">
            <div class="icon-container">
              <svg class="light-icon" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7zm2 11h-4v-1h4v1zm0-2h-4V8c0-1.1.9-2 2-2s2 .9 2 2v3z"/>
              </svg>
            </div>
            <h2 class="name">${this._config.name || entity?.attributes?.friendly_name || 'Kitchen Light'}</h2>
          </div>
          <div class="status-chip ${isUnavailable ? 'unavailable' : isStale ? 'stale' : this.isOn() ? 'on' : ''}">
            ${isUnavailable ? localize('common.unavailable') : isStale ? localize('common.stale') : this.isOn() ? localize('common.on') : localize('common.off')}
          </div>
        </div>

        <lux-power-flow 
          .active=${this.isOn()} 
          .power=${power || 0}
        ></lux-power-flow>

        <div class="sparkline-container">
            <lux-sparkline 
                .samples=${this._powerSamples} 
                .config=${this._config.sparkline}
                .accentColor=${`var(--lux-accent-gold)`}
            ></lux-sparkline>
        </div>

        <div class="energy-section">
          <div class="energy-item">
            <div class="energy-value">
              ${this.formatNumber(power !== null ? power : 0, this._config.decimals?.power || 0)} W
            </div>
            <div class="energy-label">${localize('card.live_power')}</div>
          </div>
          <div class="energy-item">
            <div class="energy-value">
              ${this.formatNumber(this._sessionEnergy, this._config.decimals?.energy || 2)} Wh
            </div>
            <div class="energy-label">${localize('card.session')}</div>
          </div>
          ${energyToday && energyToday.state !== 'unavailable' ? html`
            <div class="energy-item">
              <div class="energy-value">
                ${this.formatNumber(parseFloat(energyToday.state), this._config.decimals?.energy || 2)} kWh</div>
              <div class="energy-label">${localize('card.today')}</div>
            </div>
          ` : ''}
          ${costToday && costToday.state !== 'unavailable' ? html`
            <div class="energy-item">
              <div class="energy-value">
                ${this.formatCurrency(parseFloat(costToday.state), this._config.currency_symbol)}
              </div>
              <div class="energy-label">${localize('card.cost_today')}</div>
            </div>
          ` : ''}
        </div>

        ${this.renderBudget()}

        <div class="time-section">
          <div class="time-info">
            <strong>${timeInfo.primary}</strong>
            ${timeInfo.secondary ? html`<br>${timeInfo.secondary}` : ''}
          </div>
        </div>

        ${this._timerEndTime ? html`
          <div class="timer-display">
            <div class="timer-text">${localize('card.auto_off_in')}: ${this.getTimerDisplay()}</div>
          </div>
        ` : ''}

        ${this._config.timers?.enabled && this.isOn() ? html`
          <div class="controls-section">
            ${this._config.timers.presets?.map(preset => html`
              <button class="control-button" @click=${(e: Event) => {
                    e.stopPropagation();
                    this.startTimer(preset);
                }}>
                ${preset}m
              </button>
            `)}
            ${this._timerEndTime ? html`
              <button class="control-button" @click=${(e: Event) => {
                        e.stopPropagation();
                        this.cancelTimer();
                    }}>
                ${localize('card.cancel')}
              </button>
            ` : ''}
            ${this._autoOffDisabled ? html`
              <button class="control-button active" @click=${(e: Event) => {
                        e.stopPropagation();
                        this._autoOffDisabled = false;
                    }}>
                ${localize('card.auto_off_disabled')}
              </button>
            ` : html`
              <button class="control-button" @click=${(e: Event) => {
                        e.stopPropagation();
                        this._autoOffDisabled = true;
                    }}>
                ${localize('card.disable_auto_off')}
              </button>
            `}
          </div>
        ` : ''}

        ${power !== null && this._config.anomaly_watts && power > this._config.anomaly_watts ? html`
          <div class="status-chip anomaly" style="margin-top: 12px;">
            ${localize('card.high_power')}
          </div>
        ` : ''}
      </div>

      ${this.renderModal()}
      ${this.renderToast()}
    `;
    }

    private isDataStale(): boolean {
        const entity = this.getPowerEntity() || this.getSwitchEntity();
        if (!entity) return false;

        const lastUpdated = new Date(entity.last_updated);
        const now = new Date();
        const staleSeconds = this._config.stale_seconds || 120;

        return (now.getTime() - lastUpdated.getTime()) > (staleSeconds * 1000);
    }

    getCardSize() {
        return 3;
    }
}

// Register the card
(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
    type: 'lux-switch-energy-card',
    name: 'Luxury Switch Energy Card',
    description: 'A premium glassmorphic switch card with energy monitoring'
});

declare global {
    interface HTMLElementTagNameMap {
        'lux-switch-energy-card': LuxSwitchEnergyCard;
    }
}
