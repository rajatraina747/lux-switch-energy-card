export interface DecimalsConfig {
    power?: number;
    energy?: number;
    cost?: number;
}

export interface TimersConfig {
    enabled?: boolean;
    presets?: number[];
    default_minutes?: number;
}

export interface SparklineConfig {
    enabled?: boolean;
    samples?: number;
    interval_sec?: number;
    smoothing?: boolean;
    line_width?: number;
}

export interface ModeItem {
    label: string;
    icon?: string;
    actions?: Array<{
        domain: string;
        service: string;
        data: any;
    }>;
    disable_auto_off?: boolean;
    start_timer_minutes?: number;
}

export interface ModesConfig {
    enabled?: boolean;
    items?: ModeItem[];
}

export interface ThemeConfig {
    glass?: boolean;
    blur?: number;
    opacity?: number;
    background_gradient?: string;
    panel_color?: string;
    accent_gold?: string;
    accent_purple?: string;
    text_primary?: string;
    text_muted?: string;
    shadow_strength?: number;
    glow_strength?: number;
    border_radius?: number;
}

export interface ActionConfig {
    action: 'toggle' | 'more-info' | 'call-service' | 'navigate' | 'url' | 'none';
    navigation_path?: string;
    url_path?: string;
    service?: string;
    service_data?: any;
    target?: any;
}

export interface BudgetConfig {
    enabled?: boolean;
    entity?: string;
    limit?: number;
}

export interface LuxSwitchEnergyCardConfig {
    entity: string;
    name?: string;
    icon?: string;
    power_entity?: string;
    energy_today_entity?: string;
    cost_today_entity?: string;
    currency_symbol?: string;
    decimals?: DecimalsConfig;
    anomaly_watts?: number;
    stale_seconds?: number;
    timers?: TimersConfig;
    sparkline?: SparklineConfig;
    modes?: ModesConfig;
    budget?: BudgetConfig;
    theme?: ThemeConfig;
    high_contrast?: boolean;
    tariff_per_kwh?: number;
    tap_action?: ActionConfig;
    hold_action?: ActionConfig;
    double_tap_action?: ActionConfig;
}

export interface PowerSample {
    timestamp: number;
    value: number;
}
