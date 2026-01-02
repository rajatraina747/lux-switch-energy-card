# Changelog

## v1.4.2 (2026-01-02)

### 🐞 Bug Fixes & Regressions
- **Fixed Editor Visibility**: Reverted to custom sections to ensure "Core Entities" and "Monitoring Sensors" are always visible in all Home Assistant environments.
- **Fixed Sparkline Clipping**: Reduced spline tension (from 1.5 to 1.0) and added 10% vertical padding to prevent the graph from being cut off at the top/bottom boundaries.
- **Resolved Interaction Conflict**: Fix event interference that caused unintended card toggles when using the Home Assistant dashboard editor.

## v1.4.1 (2026-01-02)

### 🚀 New Features
- **Today's Energy (Sensor Support)**: Added `total_energy_entity` to support direct readings from energy sensors (e.g., smart plugs) in the modal.

### 💎 UX & Design
- **Silky Smooth Sparklines**: Enhanced smoothing using a 3-point moving average combined with high-tension Catmull-Rom splines to eliminate "sawtooth" jitter from noisy data.
- **OFF State Fade**: The sparkline now gracefully fades when the device is OFF, making the state clear at a glance.
- **Improved Editor Visibility**: Refactored the GUI editor to use expansion panels that are expanded by default, ensuring all configuration options are immediately visible.

## v1.4.0 (2026-01-02)

### 🚀 New Features
- **MDI Icon Picker**: Choose any MDI icon (e.g., `mdi:power-plug`) for your card directly in the GUI editor.
- **Accent Color Picker**: Customize the gold accent color to match your dashboard theme.

### 💎 UX & Design
- **Smooth Sparklines**: Replaced jagged polylines with silky Catmull-Rom spline curves for a professional, organic graph appearance.
- **Enhanced Stats**: Larger value numbers with subtle unit styling for improved readability.
- **Improved Card Description**: The card picker now displays a more informative description.

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
