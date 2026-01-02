# Changelog

## v1.3.0 (2026-01-02)

### 🚀 New Features
- **Voltage & Current Support**: Native monitoring for Voltage (V) and Current (A) sensors, integrated into the details modal.
- **Enhanced Sparkline**: Added a slick linear gradient fill to the power graph for better depth and legibility.

### 💎 UX & Design
- **Scroll Protection**: Decoupled the switch toggle from the card body. The switch now only toggles when the bulb icon is explicitly pressed, preventing accidental toggles during scrolling.
- **Clean UI**: Removed the "STALE DATA" chip to keep the interface focused on real-time metrics.
- **Reactive Glow**: Finalized the dynamic lamp glow scaling based on real-time wattage.

### ⚙️ GUI Editor Overhaul
- **Professional Categories**: Redesigned the editor into logical sections: Core Entities, Monitoring Sensors, Visuals & Glassmorphism, and Sparkline Chart.
- **Enhanced UX**: Added feature icons, improved grid layouts for sensors, and real-time value tags for visual settings.

## v1.2.0-beta.1 (2026-01-02)

### 🚀 New Features
- **GUI Card Editor**: Introduced a full visual configuration editor. No more manual YAML editing required!
  - **Entity Pickers**: Easily select your switch, power, and energy entities.
  - **Visual Sliders**: Adjust glass blur, opacity, and line widths in real-time.
  - **Toggles**: Enable/Disable timers and sparklines via the UI.



### 💎 UX & Design
- **Visual Restoration**: Fixed a critical regression where card styles were truncated, causing massive icons and loss of layout.
- **Glassmorphism**: Fully restored backdrop-filter and translucency effects.
- **Icon Sizing**: Fixed lightbulb icon scaling and pulsing animations.

## v1.1.2 (2026-01-02)

### 🐛 Bug Fixes
- **HACS Installation**: Fixed issue where HACS served an empty/HTML file by correcting `hacs.json` filename path and ensuring valid build artifacts in release.

## v1.1.1 (2026-01-02)

### 💎 UX & Design
- **Visual Hierarchy**: Refined "OFF" state to be 15% quieter (reduced opacity, shadow, and saturation) for better calm-tech balance.
- **Modal Refinement**: Modals now feature a "sheet-like" entrance with increased backdrop blur and softer shadows.
- **Accessibility**: Added full support for `prefers-reduced-motion`. Animations (breathing, power flow) are automatically disabled when requested by the OS.

### 🛡️ Governance & Stability
- **Configuration Normalization**: New strict validation layer runs on every config update.
  - **Auto-Clamping**: Numeric values (blur, opacity, visual settings) are automatically clamped to safe, tested ranges.
  - **Warnings**: "Warn-once" logic reduces console noise for configuration issues.
  - **Guardrails**: Timer presets are limited to 10 entries; excessive values are gracefully truncated.

### 📦 Maintenance
- **HACS**: Added `hacs.json` for full HACS default repository compliance.
- **Documentation**: Added "v1 Contract" and "Design Intent" to README to clearly scope the project's goals.
