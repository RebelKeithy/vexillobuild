---
trigger: always_on
---

# Gemini Project Rules: VexilloBuild

## Project Overview
VexilloBuild is a React-based application for interactively building and rendering flags using a layered SVG approach. It uses Tailwind CSS for UI styling.

## Key Files & Directories
- `src/flags.js`: **The Source of Truth** for flag definitions. Contains the `LEVELS` array where each flag is defined with its base, overlays, and symbols.
- `DOCUMENTATION.md`: **Crucial Reference**. detailed specification of all available overlay types, symbol types, and their parameters. **Always consult this** when modifying or adding flags.
- `src/components/flag-renderer/`: Contains the logic for rendering the flags. `SymbolLayer.js` and `OverlayLayer.js` are key components.
- `src/core/`: Core utilities and constants (colors, resolving params).

## Core Concepts
1.  **Flag Structure**:
    -   `base`: The background pattern (solid, horizontal-stripes, etc.).
    -   `overlays`: Geometric shapes rendered on top of the base (cantons, triangles, crosses). Defined in `target.overlays`.
    -   `symbols`: Decorative elements (stars, circles, external SVGs) rendered on top of overlays. Defined in `target.symbols`.
2.  **Coordinate System**:
    -   Most parameters are **ratios** (0-1) relative to flag width/height.
    -   `xOffset` / `yOffset`: Typically centered at 0. Range -0.5 to 0.5.
    -   Angles are usually in degrees.
3.  **Color System**:
    -   Uses named colors (e.g., 'blue', 'red') which map to specific hex values in `src/core/constants.js` (or similar).
    -   Flags can override specific named colors via `colorOverrides` in their definition.

## Coding Conventions
-   **Framework**: React (Functional Components + Hooks).
-   **Styling**: Tailwind CSS (e.g., `className="bg-slate-800 p-4"`).
-   **Icons**: `lucide-react` for UI icons.
-   **State Management**: Local state or simple prop drilling (judging by `Header.js`).
-   **Rendering**: SVG-based. Mathematical precision is important for flag geometry.

## Task Workflows

### 1. Adding or Modifying a Flag
-   **Locate**: Find the flag in `src/flags.js` (or add a new entry to `LEVELS`).
-   **Consult**: Check `DOCUMENTATION.md` for the correct `type` and parameters for overlays/symbols.
-   **Implement**:
    -   Define `base`.
    -   Add `overlays` for large geometric parts.
    -   Add `symbols` for details.
    -   **Tip**: Use `colorOverrides` if a country uses a simplified standard color (like 'red') but officially requires a specific shade.

### 2. Creating New Shapes
-   If a flag requires a shape not in `DOCUMENTATION.md`, consider if it can be composed of existing shapes.
-   If a new renderer is needed, it must be added to `src/components/flag-renderer/` and documented in `DOCUMENTATION.md`.

### 3. Debugging Visuals
-   If a flag looks wrong, verify the `z-index` equivalent (order in the array). `overlays` render first, then `symbols`. Array order matters (later items draw on top).
-   Check `aspectRatio` in the flag definition.

## AI Persona Guidelines
-   **Be Precise**: Flag geometry is exact. Use fractions (e.g., `1/3`) where appropriate for precision.
-   **Respect Standards**: Follow the `DOCUMENTATION.md` specs strictly.
-   **Style**: Match existing React+Tailwind patterns when editing UI components.
