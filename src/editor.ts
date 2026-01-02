import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { LuxSwitchEnergyCardConfig } from './types';

@customElement('lux-switch-energy-card-editor')
export class LuxSwitchEnergyCardEditor extends LitElement {
    @property({ attribute: false }) public hass?: any;
    @state() private _config?: LuxSwitchEnergyCardConfig;

    public setConfig(config: LuxSwitchEnergyCardConfig): void {
        this._config = config;
    }

    private _valueChanged(ev: CustomEvent): void {
        if (!this._config || !this.hass) {
            return;
        }
        const target = ev.target as any;
        if (!target) return;

        const configProp = target.configValue;
        const value = target.checked !== undefined ? target.checked : target.value;

        if (configProp) {
            if (configProp.includes('.')) {
                const parts = configProp.split('.');
                const newConfig = { ...this._config };
                let current: any = newConfig;
                for (let i = 0; i < parts.length - 1; i++) {
                    current[parts[i]] = { ...current[parts[i]] };
                    current = current[parts[i]];
                }
                current[parts[parts.length - 1]] = value;
                this._config = newConfig;
            } else {
                this._config = {
                    ...this._config,
                    [configProp as keyof LuxSwitchEnergyCardConfig]: value,
                } as LuxSwitchEnergyCardConfig;
            }
        }

        const event = new CustomEvent('config-changed', {
            detail: { config: this._config },
            bubbles: true,
            composed: true,
        });
        this.dispatchEvent(event);
    }

    protected render() {
        if (!this.hass || !this._config) {
            return html``;
        }

        return html`
            <div class="card-config">
                <div class="section">
                    <div class="label">Core Entities</div>
                    <ha-entity-picker
                        .hass=${this.hass}
                        .value=${this._config.entity}
                        .configValue=${'entity'}
                        @value-changed=${this._valueChanged}
                        label="Switch Entity (Required)"
                        allow-custom-entity
                    ></ha-entity-picker>
                    <ha-entity-picker
                        .hass=${this.hass}
                        .value=${this._config.power_entity}
                        .configValue=${'power_entity'}
                        @value-changed=${this._valueChanged}
                        label="Power Entity (Watts)"
                        allow-custom-entity
                    ></ha-entity-picker>
                </div>

                <div class="section">
                    <div class="label">Visuals (Glassmorphism)</div>
                    <div class="row">
                        <ha-textfield
                            label="Card Name"
                            .value=${this._config.name || ''}
                            .configValue=${'name'}
                            @input=${this._valueChanged}
                        ></ha-textfield>
                    </div>
                    <div class="row">
                        <span>Blur (${this._config.theme?.blur || 14}px)</span>
                        <ha-slider
                            .value=${this._config.theme?.blur || 14}
                            .configValue=${'theme.blur'}
                            min="0"
                            max="30"
                            step="1"
                            pin
                            @change=${this._valueChanged}
                        ></ha-slider>
                    </div>
                    <div class="row">
                        <span>Opacity (${this._config.theme?.opacity || 0.08})</span>
                        <ha-slider
                            .value=${this._config.theme?.opacity || 0.08}
                            .configValue=${'theme.opacity'}
                            min="0.02"
                            max="0.20"
                            step="0.01"
                            pin
                            @change=${this._valueChanged}
                        ></ha-slider>
                    </div>
                </div>

                <div class="section">
                    <div class="label">Energy Monitoring</div>
                    <ha-entity-picker
                        .hass=${this.hass}
                        .value=${this._config.energy_today_entity}
                        .configValue=${'energy_today_entity'}
                        @value-changed=${this._valueChanged}
                        label="Energy Today Entity (kWh)"
                        allow-custom-entity
                    ></ha-entity-picker>
                </div>

                <div class="section">
                    <div class="label">Timers & Limits</div>
                    <div class="row">
                        <span>Enable Auto-Off Timers</span>
                        <ha-switch
                            .checked=${this._config.timers?.enabled !== false}
                            .configValue=${'timers.enabled'}
                            @change=${this._valueChanged}
                        ></ha-switch>
                    </div>
                    <ha-textfield
                        label="Anomaly Watts Trigger"
                        type="number"
                        .value=${this._config.anomaly_watts || 1200}
                        .configValue=${'anomaly_watts'}
                        @input=${this._valueChanged}
                    ></ha-textfield>
                </div>

                <div class="section">
                    <div class="label">Sparkline Chart</div>
                    <div class="row">
                        <span>Enable Sparkline</span>
                        <ha-switch
                            .checked=${this._config.sparkline?.enabled !== false}
                            .configValue=${'sparkline.enabled'}
                            @change=${this._valueChanged}
                        ></ha-switch>
                    </div>
                    <div class="row">
                        <span>Line Width (${this._config.sparkline?.line_width || 2})</span>
                        <ha-slider
                            .value=${this._config.sparkline?.line_width || 2}
                            .configValue=${'sparkline.line_width'}
                            min="1"
                            max="5"
                            step="0.5"
                            pin
                            @change=${this._valueChanged}
                        ></ha-slider>
                    </div>
                </div>
            </div>
        `;
    }

    static styles = css`
        .card-config {
            padding: 16px;
        }
        .section {
            margin-bottom: 24px;
            display: flex;
            flex-direction: column;
            gap: 12px;
        }
        .label {
            font-weight: bold;
            font-size: 1.1em;
            margin-bottom: 4px;
            color: var(--secondary-text-color);
        }
        .row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 16px;
        }
        ha-slider {
            flex: 1;
        }
        ha-textfield, ha-entity-picker {
            width: 100%;
        }
    `;
}
