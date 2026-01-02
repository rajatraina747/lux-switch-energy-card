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
                    <div class="header-row">
                        <ha-icon icon="mdi:form-select"></ha-icon>
                        <div class="label">Core Entities</div>
                    </div>
                    <ha-entity-picker
                        .hass=${this.hass}
                        .value=${this._config.entity}
                        .configValue=${'entity'}
                        @value-changed=${this._valueChanged}
                        label="Primary Switch (Required)"
                        allow-custom-entity
                    ></ha-entity-picker>
                </div>

                <div class="section">
                    <div class="header-row">
                        <ha-icon icon="mdi:chart-timeline-variant"></ha-icon>
                        <div class="label">Monitoring Sensors</div>
                    </div>
                    <ha-entity-picker
                        .hass=${this.hass}
                        .value=${this._config.power_entity}
                        .configValue=${'power_entity'}
                        @value-changed=${this._valueChanged}
                        label="Power Sensor (W)"
                        allow-custom-entity
                    ></ha-entity-picker>
                    <ha-entity-picker
                        .hass=${this.hass}
                        .value=${this._config.energy_today_entity}
                        .configValue=${'energy_today_entity'}
                        @value-changed=${this._valueChanged}
                        label="Energy Today (kWh)"
                        allow-custom-entity
                    ></ha-entity-picker>
                    <div class="grid-2">
                        <ha-entity-picker
                            .hass=${this.hass}
                            .value=${this._config.voltage_entity}
                            .configValue=${'voltage_entity'}
                            @value-changed=${this._valueChanged}
                            label="Voltage Sensor (V)"
                            allow-custom-entity
                        ></ha-entity-picker>
                        <ha-entity-picker
                            .hass=${this.hass}
                            .value=${this._config.current_entity}
                            .configValue=${'current_entity'}
                            @value-changed=${this._valueChanged}
                            label="Current Sensor (A)"
                            allow-custom-entity
                        ></ha-entity-picker>
                    </div>
                </div>

                <div class="section">
                    <div class="header-row">
                        <ha-icon icon="mdi:palette"></ha-icon>
                        <div class="label">Visuals & Glassmorphism</div>
                    </div>
                    <ha-textfield
                        label="Display Name"
                        .value=${this._config.name || ''}
                        .configValue=${'name'}
                        @input=${this._valueChanged}
                    ></ha-textfield>
                    <div class="slider-row">
                        <div class="slider-label">Glass Blur</div>
                        <ha-slider
                            .value=${this._config.theme?.blur || 14}
                            .configValue=${'theme.blur'}
                            min="0" max="40" step="1" pin
                            @change=${this._valueChanged}
                        ></ha-slider>
                        <span class="value-tag">${this._config.theme?.blur || 14}px</span>
                    </div>
                    <div class="slider-row">
                        <div class="slider-label">Glass Opacity</div>
                        <ha-slider
                            .value=${this._config.theme?.opacity || 0.08}
                            .configValue=${'theme.opacity'}
                            min="0" max="0.3" step="0.01" pin
                            @change=${this._valueChanged}
                        ></ha-slider>
                        <span class="value-tag">${this._config.theme?.opacity || 0.08}</span>
                    </div>
                </div>

                <div class="section">
                    <div class="header-row">
                        <ha-icon icon="mdi:flash"></ha-icon>
                        <div class="label">Sparkline Chart</div>
                    </div>
                    <div class="toggle-row">
                        <span>Enable Statistics Graph</span>
                        <ha-switch
                            .checked=${this._config.sparkline?.enabled !== false}
                            .configValue=${'sparkline.enabled'}
                            @change=${this._valueChanged}
                        ></ha-switch>
                    </div>
                    <ha-textfield
                        label="Anomaly Warning (Watts)"
                        type="number"
                        .value=${this._config.anomaly_watts || 1200}
                        .configValue=${'anomaly_watts'}
                        @input=${this._valueChanged}
                    ></ha-textfield>
                </div>
            </div>
        `;
    }

    static styles = css`
        .card-config {
            padding: 16px;
            display: flex;
            flex-direction: column;
            gap: 20px;
        }
        .section {
            display: flex;
            flex-direction: column;
            gap: 12px;
            padding: 12px;
            background: rgba(var(--rgb-primary-text-color), 0.03);
            border-radius: 8px;
            border: 1px solid rgba(var(--rgb-primary-text-color), 0.05);
        }
        .header-row {
            display: flex;
            align-items: center;
            gap: 8px;
            color: var(--secondary-text-color);
            margin-bottom: 4px;
        }
        .label {
            font-weight: 500;
            font-size: 0.9em;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .grid-2 {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
        }
        .slider-row {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        .slider-label {
            flex: 0 0 100px;
            font-size: 0.9em;
            color: var(--secondary-text-color);
        }
        .value-tag {
            flex: 0 0 45px;
            text-align: right;
            font-size: 0.85em;
            font-family: monospace;
            background: rgba(var(--rgb-primary-text-color), 0.05);
            padding: 2px 4px;
            border-radius: 4px;
        }
        .toggle-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 0.9em;
        }
        ha-slider {
            flex: 1;
            --paper-slider-container-color: rgba(var(--rgb-primary-text-color), 0.1);
        }
        ha-textfield, ha-entity-picker {
            width: 100%;
        }
    `;
}
