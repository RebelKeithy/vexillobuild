# LLM Guide for Project Contribution

This guide is designed to help LLMs (and human developers) understand the project structure and how to contribute effectively, specifically focusing on adding new flags and flag components.

## 1. Project Structure Overview

The project is a React application that renders flags based on structured data. The codebase has been refactored into a modular structure for better maintainability.

### Core Files
-   **`src/flags.js`**: The single source of truth for flag data. It exports a `LEVELS` array where each object represents a flag level.
-   **`src/App.js`**: Main application component that orchestrates the UI, manages state, and handles user interactions.

### Components
-   **`src/components/flag-renderer/FlagRenderer.js`**: Contains the `FlagPreview` component which is responsible for rendering the flags.
-   **`src/components/flag-renderer/BaseLayer.js`**: Renders the base layer (background patterns, stripes, etc.).
-   **`src/components/flag-renderer/OverlayLayer.js`**: Renders geometric overlay shapes (triangles, cantons, etc.).
-   **`src/components/flag-renderer/SymbolLayer.js`**: Renders symbols (stars, crescents, seals, etc.).
-   **`src/components/Header.js`**: Application header with level selector.
-   **`src/components/LevelInfo.js`**: Displays level information (name, difficulty, hints).
-   **`src/components/Palette.js`**: Color palette component for selecting colors.
-   **`src/components/DraggableColor.js`**: Individual draggable color swatches.
-   **`src/components/ControlPanel.js`**: Main control panel with tabs for base, overlays, and symbols.
-   **`src/components/controls/BaseControls.js`**: Controls for configuring the base layer pattern.
-   **`src/components/controls/OverlayControls.js`**: Controls for adding and configuring overlay shapes.
-   **`src/components/controls/SymbolControls.js`**: Controls for adding and configuring symbols.
-   **`src/components/previews/BaseOptionPreview.js`**: Preview thumbnails for base pattern options.
-   **`src/components/previews/OverlayOptionPreview.js`**: Preview thumbnails for overlay shape options.

### Hooks
-   **`src/hooks/useGameState.js`**: Custom hook managing game state, validation logic, and state update functions.

### Core Utilities
-   **`src/core/constants.js`**: Defines color palettes and other constants.
-   **`src/core/shape-generators.js`**: Shape generation functions for complex SVG paths (stars, crescents, palls, etc.).
-   **`src/core/utils.js`**: Utility functions for flag rendering.

### Configuration
-   **`src/index.css` / `tailwind.config.js`**: Styling configuration.

## 2. How to Add Flags

To add a new flag, you need to append a new object to the `LEVELS` array in `src/flags.js`.

### Data Schema

Each flag object must adhere to the following structure:

```javascript
{
    id: Number,             // Unique identifier (increment the last one)
    name: String,           // Country name
    difficulty: String,     // "Novice", "Intermediate", "Expert"
    description: String,    // Short description or nickname of the flag
    hint: String,           // Hint describing the visual layout
    aspectRatio: Number,    // Width / Height (e.g., 2/3, 1/2)
    target: {
        base: {
            type: String,   // See "Supported Base Types" below
            colors: Array,  // Array of color keys (e.g., ['red', 'white']) or hex codes
            count: Number,  // (Optional) Number of stripes/divisions
            ratios: Array   // (Optional) Relative width/height of stripes (e.g., [1, 2, 1])
        },
        overlays: [         // Array of overlay objects
            {
                type: String,   // e.g., 'triangle', 'canton', 'pall'
                color: String,
                corner: String, // (Optional) e.g., 'top-left'
                // ...other geometry props specific to the type
            }
        ],
        symbols: [          // Array of symbol objects
            {
                type: String,       // e.g., 'star', 'circle', 'external', 'seal'
                color: String,      // Color key or null for external images
                src: String,        // URL for 'external' or 'seal' types
                aspectRatio: Number,// (Optional) For external images
                scale: Number,      // Scaling factor (default 1)
                xOffset: Number,    // Horizontal offset from center (0.0 to 1.0)
                yOffset: Number,    // Vertical offset from center (0.0 to 1.0)
                rotation: Number    // Rotation in degrees
            }
        ]
    }
}
```

### Supported Base Types
These are defined in `src/components/flag-renderer/BaseLayer.js`:
-   `solid`: Single color.
-   `vertical-tricolor`: Three vertical stripes.
-   `horizontal-stripes`: N horizontal stripes (requires `count`, supports `ratios`).
-   `bisection-horizontal`: Two horizontal halves.
-   `bisection-vertical`: Two vertical halves.
-   `bisection-diagonal-left`: Diagonal division (top-left to bottom-right).
-   `bisection-diagonal-right`: Diagonal division (top-right to bottom-left).
-   `serrated-vertical`: Vertical division with a serrated edge.

### Common Overlay Types
These are defined in `src/components/flag-renderer/OverlayLayer.js`:
-   `canton`: Rectangular area in the top-left corner.
-   `triangle`: Left-aligned triangle.
-   `triangle-corner`: Triangle in a corner (requires `corner` property).
-   `pall`: Y-shaped division (requires geometry configuration).

### Common Symbol Types
These are defined in `src/components/flag-renderer/SymbolLayer.js`:
-   `star`: Geometric star (uses `SHAPE_GENERATORS.star`).
-   `circle`: Geometric circle.
-   `crescent-star`: Crescent moon with a star (uses `SHAPE_GENERATORS.crescentStar`).
-   `rising-sun`: Sun with rays (uses `SHAPE_GENERATORS.risingSun`).
-   `diamond`: Diamond shape (uses `SHAPE_GENERATORS.diamond`).
-   `external`: External SVG/Image (requires `src`).
-   `seal`: Similar to external but specifically for coats of arms (renders as image).

## 3. How to Add New Flag Components

New components are required when a flag has a unique geometric pattern or symbol that isn't covered by existing types.

### Conceptual Overview
The flag rendering system is organized into three layers:
1.  **BaseLayer** (`src/components/flag-renderer/BaseLayer.js`): Renders the background/stripes.
2.  **OverlayLayer** (`src/components/flag-renderer/OverlayLayer.js`): Renders geometric overlays (triangles, cantons, palls).
3.  **SymbolLayer** (`src/components/flag-renderer/SymbolLayer.js`): Renders central symbols or images.

These are composed together in `FlagPreview` component (`src/components/flag-renderer/FlagRenderer.js`).

### Technical Steps

#### 1. Adding a New Base Pattern
1.  Open `src/components/flag-renderer/BaseLayer.js`.
2.  Locate the `renderBasePattern` function.
3.  Add a new `case 'new-type-name':` to the switch statement.
4.  Implement the SVG logic (usually returning a `<g>` containing `<rect>`s or `<polygon>`s).
5.  Ensure you handle `isSelected` and `isHovered` states if the user needs to interact with specific parts.
6.  Add the new type to the `BASE_TYPES` array in `src/components/controls/BaseControls.js` so users can select it.
7.  If needed, create a preview in `src/components/previews/BaseOptionPreview.js`.

#### 2. Adding a New Geometric Shape (for Overlays/Symbols)
1.  If the shape is complex (e.g., a specific cross or polygon), add a generator function to the `SHAPE_GENERATORS` object in `src/core/shape-generators.js`.
    *   Input: `{ w, h, args }` or `{ cx, cy, r, args }`.
    *   Output: SVG path data string or points string.
2.  **For Overlays**:
    *   Update `src/components/flag-renderer/OverlayLayer.js`.
    *   Add logic for your new type in the `renderOverlay` function.
    *   Add the new type to the options in `src/components/controls/OverlayControls.js`.
    *   Create a preview in `src/components/previews/OverlayOptionPreview.js`.
3.  **For Symbols**:
    *   Update `src/components/flag-renderer/SymbolLayer.js`.
    *   Add logic for your new type in the `renderSymbol` function.
    *   Add the new type to the options in `src/components/controls/SymbolControls.js`.

#### 3. Adding a New Symbol
1.  Open `src/components/flag-renderer/SymbolLayer.js`.
2.  Locate the `renderSymbol` function.
3.  Add a condition `if (mergedSymbol.type === 'your-new-symbol')`.
4.  Implement rendering using:
    *   SVG primitives (`<circle>`, `<path>`, etc.), or
    *   Call a generator from `SHAPE_GENERATORS` (imported from `src/core/shape-generators.js`).
5.  Make sure to add the new symbol type to the options in `src/components/controls/SymbolControls.js`.

## 4. Key Workflow Patterns

### State Management
-   The `useGameState` hook (`src/hooks/useGameState.js`) manages all game state and validation.
-   Use `updateColor()`, `updateProp()`, `addItem()`, and `removeItem()` to modify state.
-   Validation logic is in the `validate()` function.

### Adding New Controls
-   Base pattern controls: `src/components/controls/BaseControls.js`
-   Overlay controls: `src/components/controls/OverlayControls.js`
-   Symbol controls: `src/components/controls/SymbolControls.js`

### Color System
-   Colors are defined in `src/core/constants.js` in the `COLORS` object.
-   To add a new color, add it to the `COLORS` constant.
-   Update the `Palette` component (`src/components/Palette.js`) if needed.

## 5. Maintenance

-   **Data Integrity**: When adding flags, ensure `id`s in `src/flags.js` remain unique.
-   **Color Reference**: Use the `COLORS` constant in `src/core/constants.js`. If a new standard color is needed, add it there.
-   **Shape Generators**: Complex SVG shapes should be added to `src/core/shape-generators.js` for reusability.
-   **Testing**: After adding new flags or components, run the test suite with `npm test` to ensure rendering remains consistent.
