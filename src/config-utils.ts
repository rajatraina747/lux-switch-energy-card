import { LuxSwitchEnergyCardConfig } from './types';

const warnedMessages = new Set<string>();

export function warnOnce(id: string, message: string) {
    if (warnedMessages.has(id)) return;
    warnedMessages.add(id);
    console.warn(`[Lux Switch Card] ${message}`);
}

function clamp(value: number, min: number, max: number, name: string): number {
    if (value < min || value > max) {
        warnOnce(`clamp_${name}`, `${name} (${value}) out of range [${min}, ${max}]. Clamping.`);
        return Math.max(min, Math.min(value, max));
    }
    return value;
}

export function normalizeConfig(config: LuxSwitchEnergyCardConfig): LuxSwitchEnergyCardConfig {
    if (!config.entity) {
        throw new Error('Configuration Error: "entity" is required.');
    }

    const theme = config.theme || {};
    const sparkline = config.sparkline || {};
    const timers = config.timers || {};

    // Validate Theme
    const validTheme = {
        ...theme,
        blur: theme.blur !== undefined ? clamp(theme.blur, 0, 30, 'theme.blur') : 14,
        opacity: theme.opacity !== undefined ? clamp(theme.opacity, 0.02, 0.20, 'theme.opacity') : 0.08,
        border_radius: theme.border_radius !== undefined ? clamp(theme.border_radius, 12, 32, 'theme.border_radius') : 24,
        glow_strength: theme.glow_strength !== undefined ? clamp(theme.glow_strength, 0, 1, 'theme.glow_strength') : 0.65,
        shadow_strength: theme.shadow_strength !== undefined ? clamp(theme.shadow_strength, 0, 1, 'theme.shadow_strength') : 0.35,
    };

    // Validate Sparkline
    const validSparkline = {
        ...sparkline,
        samples: sparkline.samples !== undefined ? clamp(sparkline.samples, 10, 240, 'sparkline.samples') : 60,
        interval_sec: sparkline.interval_sec !== undefined ? clamp(sparkline.interval_sec, 2, 60, 'sparkline.interval_sec') : 10,
    };

    // Validate Timers
    let validPresets = timers.presets || [15, 30, 60];
    if (validPresets.length > 10) {
        warnOnce('timer_presets_max', 'Too many timer presets. Limiting to first 10.');
        validPresets = validPresets.slice(0, 10);
    }
    validPresets = validPresets.map(p => clamp(p, 1, 240, 'timer_preset'));

    const validTimers = {
        ...timers,
        presets: validPresets,
        default_minutes: timers.default_minutes || 30 // No hard clamp requested but good to have fallback
    };

    // Top-level clamps
    const staleSeconds = config.stale_seconds !== undefined ? clamp(config.stale_seconds, 10, 900, 'stale_seconds') : 120;
    const anomalyWatts = config.anomaly_watts !== undefined ? clamp(config.anomaly_watts, 10, 10000, 'anomaly_watts') : 1200;

    return {
        ...config,
        theme: validTheme,
        sparkline: validSparkline,
        timers: validTimers,
        stale_seconds: staleSeconds,
        anomaly_watts: anomalyWatts,
    };
}
