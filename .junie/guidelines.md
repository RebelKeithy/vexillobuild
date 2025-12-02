# LLM Guide for Project Contribution

This guide is designed to help LLMs (and human developers) understand the project structure and how to contribute effectively, specifically focusing on adding new flags and flag components.

## 1. Project Structure Overview

The project is a React application that renders flags based on structured data.

-   **`src/flags.js`**: The single source of truth for flag data. It exports a `LEVELS` array where each object represents a flag level.
-   **`src/App.js`**: Contains the main application logic, including the `FlagPreview` component which is responsible for rendering the flags.
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
These are defined in the `renderBase` function in `src/App.js`:
-   `solid`: Single color.
-   `vertical-tricolor`: Three vertical stripes.
-   `horizontal-stripes`: N horizontal stripes (requires `count`, supports `ratios`).
-   `bisection-horizontal`: Two horizontal halves.
-   `bisection-vertical`: Two vertical halves.
-   `serrated-vertical`: Vertical division with a serrated edge.

### Common Symbol Types
These are defined in the `renderSymbol` function in `src/App.js`:
-   `star`: Geometric star.
-   `circle`: Geometric circle.
-   `crescent-star`: Crescent moon with a star.
-   `rising-sun`: Sun with rays.
-   `external`: External SVG/Image (requires `src`).
-   `seal`: Similar to external but specifically for coats of arms (renders as image).

## 3. How to Add New Flag Components

New components are required when a flag has a unique geometric pattern or symbol that isn't covered by existing types. This involves modifying `src/App.js`.

### Conceptual Overview
The `FlagPreview` component inside `src/App.js` uses helper functions to render each layer:
1.  `renderBase(highlightMode)`: Renders the background/stripes.
2.  `renderOverlay(overlay, index, highlightMode)`: Renders geometric overlays (triangles, cantons).
3.  `renderSymbol(symbol, index, highlightMode)`: Renders central symbols or images.

### Technical Steps

#### 1. Adding a New Base Pattern
1.  Locate `renderBase` function in `src/App.js`.
2.  Add a new `case 'new-type-name':` to the switch statement.
3.  Implement the SVG logic (usually returning a `<g>` containing `<rect>`s or `<polygon>`s).
4.  Ensure you handle `isSelected` and `isHovered` states if the user needs to interact with specific parts (see existing cases for examples).

#### 2. Adding a New Geometric Shape (for Overlays/Symbols)
1.  If the shape is complex (e.g., a specific cross or polygon), add a generator function to the `SHAPE_GENERATORS` object in `src/App.js`.
    *   Input: `{ w, h, args }` or `{ cx, cy, r, args }`.
    *   Output: SVG path data string or points string.
2.  **For Overlays**: Update `renderOverlay`. Add an `if` block for your new type that calls the generator.
3.  **For Symbols**: Update `renderSymbol`. Add an `if` block for your new type.

#### 3. Adding a New Symbol
1.  Locate `renderSymbol` in `src/App.js`.
2.  Add a condition `if (mergedSymbol.type === 'your-new-symbol')`.
3.  Implement rendering using SVG primitives (`<circle>`, `<path>`, etc.) or call a generator from `SHAPE_GENERATORS`.

## 4. Maintenance

-   **Guide Updates**: If `src/App.js` is refactored (e.g., splitting `FlagPreview` into its own file), this guide **must** be updated to reflect the new file path.
-   **Data Integrity**: When adding flags, ensure `id`s in `src/flags.js` remain unique.
-   **Colors**: Use the `COLORS` constant in `src/App.js` as a reference for available color keys. If a new standard color is needed, add it to that constant.
