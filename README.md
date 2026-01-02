# Lux Switch Energy Card

A premium glassmorphic switch card for Home Assistant with integrated energy monitoring, sparklines, and automation timers.

## Features

- **Glassmorphic Design**: Premium UI with frosted glass effects and smooth animations. Now supports **Light/Dark** modes automatically.
- **Energy Monitoring**: Real-time power usage, session tracking, and daily totals
- **Sparklines**: Live visualization of power consumption
- **Smart Timers**: Built-in auto-off timers with presets
- **Modes**: Customizable quick actions (e.g., "Night Mode", "Cooking")
- **Customizable**: extensive theming and configuration options
- **Actions & Haptics**: Supports standard `tap_action`, `hold_action`, and provides haptic feedback.

## Design Intent
This card follows a **"Luxury Calm-Tech"** philosophy. It is designed to be:
- **Glassmorphic**: Uses backdrop-filter and translucency to blend into any wallpaper.
- **Energy-First**: Puts consumption data (Watts) at the forefront, not buried in menus.
- **Honest**: Animations reflect real physics (speed = power); no fake data or indeterminate loaders.
- **Opinionated**: The layout is fixed to preserve the visual hierarchy.

## v1 Contract & Non-Goals
To ensure stability and scope, the following features are **intentionally NOT supported** in v1.x:

- ❌ **Color/Brightness Control**: This is a *switch* card, not a light card.
- ❌ **Multi-Entity Aggregation**: One card = one physical device. Grouping belongs in HA templates, not the UI.
- ❌ **Long-Term Analytics**: We show "Today" and a 1-hour sparkline. For monthly/yearly data, use the Energy Dashboard.
- ❌ **Per-Device Calibration**: If your plug reads 10% high, fix it in Tasmota/ESPHome, not here.
- ❌ **Advanced Automations**: We provide simple timers. Complex logic (sun-based, triggers) belongs in HA Automations.

## Installation

### 1. HACS (Recommended)

1.  Open **HACS** in Home Assistant.
2.  Go to **Frontend** > **3 dots (top right)** > **Custom repositories**.
3.  Add the repository URL: `https://github.com/rajatraina747/lux-switch-energy-card`
4.  Select category: **Lovelace**.
5.  Click **Add**, then find "Lux Switch Energy Card" in the list and install it.
6.  When prompted to restart or reload, click **Reload**.

### 2. Manual Installation

1.  Download `lux-switch-energy-card.js` from the [Releases](https://github.com/rajatraina747/lux-switch-energy-card/releases) page (or the `dist/` folder).
2.  Upload the file to your Home Assistant `config/www/community/lux-switch-energy-card/` folder.
3.  Go to **Settings** > **Dashboards** > **3 dots (top right)** > **Resources**.
4.  Add a new resource:
    - **URL**: `/local/community/lux-switch-energy-card/lux-switch-energy-card.js`
    - **Type**: JavaScript Module

_(Note: If installed via HACS, the resource URL will be automatically set to `/hacsfiles/lux-switch-energy-card/lux-switch-energy-card.js`)_

## Configuration

### Minimal Example

```yaml
type: custom:lux-switch-energy-card
entity: switch.kitchen_light_plug
power_entity: sensor.kitchen_light_power
```

### Full Configuration

```yaml
type: custom:lux-switch-energy-card
entity: switch.kitchen_light_plug
name: Kitchen Light
power_entity: sensor.kitchen_light_power
energy_today_entity: sensor.kitchen_light_energy_today
cost_today_entity: sensor.kitchen_light_cost_today
currency_symbol: £
decimals:
  power: 0
  energy: 2
  cost: 2
anomaly_watts: 1200
stale_seconds: 120
timers:
  enabled: true
  presets: [15, 30, 60]
  default_minutes: 30
sparkline:
  enabled: true
  samples: 60
  interval_sec: 10
  smoothing: true
  line_width: 2
modes:
  enabled: true
  items:
    - label: Cooking
      icon: chef-hat
      disable_auto_off: true
    - label: Night
      icon: moon-waning-crescent
      start_timer_minutes: 30
```
