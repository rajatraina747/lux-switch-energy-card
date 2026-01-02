# Changelog

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
