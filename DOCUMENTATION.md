# VexilloBuild Documentation

An interactive flag-building application with SVG-based rendering. This document covers all available Overlays and Symbols, their parameters, and how each parameter affects the rendered flag.

---

## Table of Contents

1. [Overlays](#overlays)
2. [Symbols](#symbols)
3. [Color System](#color-system)
4. [Coordinate System](#coordinate-system)

---

## Overlays

Overlays are geometric shapes rendered over the base flag pattern. They are defined in the `target.overlays` array of each flag configuration.

### Overview

| Type | Description | Example Flags |
|------|-------------|---------------|
| `canton` | Rectangular box in corner | Chile, USA |
| `triangle` | Triangular shape at hoist | Czech Republic, Cuba |
| `triangle-corner` | Right triangle in flag corner | Eritrea |
| `pall` | Y-shaped overlay | South Africa |
| `pile` | Triangle from hoist to fly | Guyana |
| `saltire` | X-shaped cross | Burundi, Jamaica |
| `cross` | Centered + shaped cross | England, Georgia |
| `nordic-cross` | Offset Scandinavian cross | Denmark, Finland, Iceland |
| `side` | Vertical band on edge | - |
| `diamond` | Diamond/rhombus shape | Brazil |
| `border` | Rectangular frame | Grenada |
| `polygon` | Custom polygon shape | Bosnia |

---

### `canton`

A rectangular box positioned in a corner of the flag, typically top-left.

**Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `position` | string | `'top-left'` | Corner position of the canton |
| `color` | string | required | Fill color |
| `widthRatio` | number | `1/3` | Width as fraction of flag width (0-1) |
| `heightRatio` | number | `1/2` | Height as fraction of flag height (0-1) |

**How it renders:**
- `widthRatio: 0.5` creates a canton covering the left half of the flag width
- `heightRatio: 0.5` creates a canton covering the top half of the flag height
- Combined, these create a rectangular region in the specified corner

**Example:**
```javascript
// Chile - Blue canton in top-left, covering 1/3 width and 1/2 height
{ type: 'canton', position: 'top-left', color: 'blue', widthRatio: 1/3, heightRatio: 1/2 }
```

---

### `triangle`

A triangular shape, typically positioned at the hoist (left edge) of the flag.

**Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `position` | string | `'hoist'` | Position (`'hoist'` for left edge) |
| `color` | string | required | Fill color |
| `vertexXRatio` | number | varies | Apex horizontal extension as ratio of flag height (unitless). E.g., `0.5` means apex extends 0.5 × flag height from base |
| `height` | number | `1` | Triangle height as fraction of flag height (0-1). `1` = full flag height |
| `widthRatio` | number | - | Base width as fraction of flag width (0-1) |
| `heightRatio` | number | - | Height as fraction of flag height (0-1) |
| `equilateral` | boolean | `false` | If true, renders as equilateral triangle, ignoring other geometry params |
| `borderColor` | string | - | Border color. Border width is approximately 4% of flag height |

**How it renders:**
- The triangle base sits along the hoist (left edge)
- `vertexXRatio` controls how far right the apex extends (measured in flag-heights)
- Higher `vertexXRatio` = more acute/pointy triangle
- `equilateral: true` overrides other geometry for perfect equilateral shape

**Examples:**
```javascript
// Czech Republic - Simple blue triangle
{ type: 'triangle', position: 'hoist', color: 'blue' }

// Cuba - Triangle extending 13/15 into the flag
{ type: 'triangle', position: 'hoist', color: 'red', vertexXRatio: 13/15, widthRatio: 1/3, heightRatio: 1/2 }

// Bahamas - Black equilateral triangle
{ type: 'triangle', position: 'hoist', color: 'black', equilateral: true }
```

---

### `triangle-corner`

A right triangle positioned in a corner of the flag.

**Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `corner` | string | required | Corner position: `'bottom-left'` or `'bottom-right'` |
| `color` | string | required | Fill color |
| `widthRatio` | number | `0.5` | Base width as fraction of flag width (0-1). `0.5` = half the flag width |

**How it renders:**
- Creates a right triangle with the 90° angle in the specified corner
- Triangle base = `widthRatio` × flag width (along the bottom edge)
- Triangle height = full flag height

**Example:**
```javascript
// Eritrea - Blue triangle in bottom-left
{ type: 'triangle-corner', corner: 'bottom-left', color: 'blue', widthRatio: 0.5 }
```

---

### `pall`

A Y-shaped overlay where three triangular sections meet at a central point.

**Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `color` | string | required | Fill color |
| `widthRatio` | number | `1/6` | Width of each arm as fraction of flag height (0-1) |
| `borderColor` | string | - | Border color. Border width is approximately 4% of flag height |
| `centerSplitX` | number | - | X-coordinate where center arm splits, as fraction of flag width (0-1) |
| `edgeSplitX` | number | - | X-coordinate for edge split point, as fraction of flag width (0-1) |
| `centerYStart` | number | - | Y-coordinate start for center arm, as fraction of flag height (0-1) |
| `edgeYStart` | number | - | Y-coordinate start for edge, as fraction of flag height (0-1) |
| `y_offset` | number | - | Vertical offset in pixels (absolute value, not a fraction) |
| `edgeLine` | object | - | Complex geometry configuration object with properties like `yStart` |

**How it renders:**
- Three bands radiate from a central point: one to upper-left, one to lower-left, one to the right
- `widthRatio` controls the thickness of each arm
- Complex flags like South Africa use multiple palls with different `y_offset` values to create layered Y-shapes

**Example:**
```javascript
// South Africa - Complex pall with border
{ type: 'pall', color: 'white', borderColor: 'white', widthRatio: 20/60,
  edgeLine: { yStart: 1 }, y_offset: 100 }
{ type: 'pall', color: 'green', widthRatio: 15/60 }
```

---

### `pile`

A triangle extending from the hoist side toward the fly.

**Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `color` | string | required | Fill color |
| `height` | number | `1` | Height as fraction of flag height (0-1). `1` = full flag height |
| `vertexXRatio` | number | `0.5` | How far apex extends as fraction of flag width (0-1). `1` = reaches right edge |
| `borderColor` | string | - | Border color. Border width is approximately 4% of flag height |

**How it renders:**
- Similar to triangle but specifically designed for pile configurations
- The base spans the full hoist edge (left side)
- `vertexXRatio: 1` means apex reaches the right edge; `0.5` means apex at center

**Example:**
```javascript
// Guyana - Golden pile with borders
{ type: 'pile', color: 'gold', vertexXRatio: 1, borderColor: 'white' }
{ type: 'pile', color: 'green', vertexXRatio: 0.75, borderColor: 'black' }
```

---

### `saltire`

An X-shaped (diagonal) cross overlay.

**Parameters:**

| Parameter | Type | Default | Description                                                   |
|-----------|------|---------|---------------------------------------------------------------|
| `color` | string | required | Fill color                                                    |
| `widthRatio` | number | `0.1` | Width of each diagonal arm as fraction of flag height (0-1)   |
| `borderColor` | string | - | Border color. Border width is approximately 4% of flag height |

**How it renders:**
- Two diagonal bands cross from corner to corner
- `widthRatio` controls the thickness of the bands
- Larger `widthRatio` = thicker X

**Example:**
```javascript
// Burundi - White saltire
{ type: 'saltire', color: 'white', widthRatio: 20/150 }

// Jamaica - Gold saltire
{ type: 'saltire', color: 'gold', widthRatio: 0.15 }
```

---

### `cross`

A centered plus-sign (+) shaped cross.

**Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `color` | string | required | Fill color |
| `crossWidth` | number | `0.2` | Width of both arms as fraction of flag height (0-1). Arms extend full flag width/height |

**How it renders:**
- Horizontal and vertical bands intersect at the flag center
- `crossWidth` controls the thickness of both arms
- Horizontal arm: full flag width, height = `crossWidth` × flag height
- Vertical arm: full flag height, width = `crossWidth` × flag height

**Example:**
```javascript
// England - Red cross on white
{ type: 'cross', color: 'red', crossWidth: 0.2 }
```

---

### `nordic-cross`

An offset Scandinavian-style cross, shifted toward the hoist.

**Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `color` | string | required | Fill color |
| `verticalOffset` | number | `0.35` | Horizontal position of vertical arm's center as fraction of flag width (0-1). Lower = more left |
| `crossWidth` | number | `0.15` | Width of both arms as fraction of flag height (0-1) |

**How it renders:**
- Like a centered cross but the vertical arm is shifted toward the hoist (left)
- `verticalOffset: 0.35` places vertical arm center at 35% from left edge
- `crossWidth` controls arm thickness (both arms use same width)

**Examples:**
```javascript
// Denmark - White nordic cross
{ type: 'nordic-cross', color: 'white', verticalOffset: 12/37, crossWidth: 4/28 }

// Finland - Blue nordic cross
{ type: 'nordic-cross', color: 'blue', verticalOffset: 5/18, crossWidth: 3/11 }

// Iceland - Layered red cross over white
{ type: 'nordic-cross', color: 'white', verticalOffset: 7/25, crossWidth: 2/9 }
{ type: 'nordic-cross', color: 'red', verticalOffset: 7/25, crossWidth: 1/9 }
```

---

### `side`

A vertical band on the left or right edge of the flag.

**Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `color` | string | required | Fill color |
| `widthRatio` | number | `0.2` | Width as fraction of flag width (0-1). `0.33` = band covering 1/3 of flag |
| `side` | string | `'left'` | Which edge: `'left'` or `'right'` |

**How it renders:**
- A vertical rectangle spanning full flag height along the specified edge
- Band width = `widthRatio` × flag width

**Example:**
```javascript
{ type: 'side', color: 'green', widthRatio: 0.33, side: 'left' }
```

---

### `diamond`

A diamond (rhombus) shape centered on the flag.

**Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `color` | string | required | Fill color |
| `widthRatio` | number | `0.8` | Horizontal span (corner to corner) as fraction of flag width (0-1) |
| `heightRatio` | number | `0.8` | Vertical span (corner to corner) as fraction of flag height (0-1) |

**How it renders:**
- A rotated square (45 degrees) centered on the flag
- Diamond width = `widthRatio` × flag width (left corner to right corner)
- Diamond height = `heightRatio` × flag height (top corner to bottom corner)
- Values of 1.0 would have corners touching the flag edges

**Example:**
```javascript
// Brazil - Gold diamond
{ type: 'diamond', color: 'gold', widthRatio: 0.85, heightRatio: 0.85 }
```

---

### `border`

A rectangular border/frame around the flag edge.

**Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `color` | string | required | Border color |
| `widthRatio` | number | `0.1` | Border thickness as fraction of flag width (0-1). Applied to all four edges |

**How it renders:**
- Creates a rectangular frame along all four edges
- Border thickness = `widthRatio` × flag width
- The inner area remains transparent (showing layers below)

**Example:**
```javascript
// Grenada - Red border
{ type: 'border', color: 'red', widthRatio: 84/600 }
```

---

### `polygon`
> [!WARNING]
> **DEPRECATED**: This overlay type is deprecated and should not be used for new flags. It is not supported in the builder UI. New flags should use specific shape overlays (e.g. `triangle`, `diagonal`, etc.) instead.

A custom polygon defined by explicit coordinate points.

**Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `colors` | array | required | Array of colors (uses first color for fill) |
| `points` | array | required | Array of `{x, y}` objects. `x` is fraction of flag width (0-1), `y` is fraction of flag height (0-1) |

**How it renders:**
- Points use normalized coordinates: (0,0) = top-left corner, (1,1) = bottom-right corner
- `x: 0.5` = horizontal center, `y: 0.5` = vertical center
- Points are connected in order to form a closed polygon

**Example:**
```javascript
// Bosnia - Yellow triangle
{ type: 'polygon', colors: ['gold'],
  points: [{x: 0.17, y: 0}, {x: 0.67, y: 0}, {x: 0.67, y: 1}] }
```

---

## Symbols

Symbols are decorative elements rendered on top of the flag (stars, crescents, emblems, etc.). They are defined in the `target.symbols` array.

### Overview

| Type | Description | Example Flags |
|------|-------------|---------------|
| `star` | Multi-pointed star | USA, China, EU |
| `circle` | Solid circle or ellipse | Japan, Bangladesh, Greenland |
| `crescent` | Crescent moon | Algeria, Turkey |
| `rising-sun` | Sun with radiating rays | Antigua and Barbuda |
| `cross` | Plus-sign shaped symbol | Georgia, Switzerland |
| `box` | Rectangle shape | Haiti |
| `seal` | External SVG image (full color) | Andorra, Afghanistan |
| `external` | External SVG with color masking | Albania, Austria |
| `pattern` | Decorative pattern SVG | Flags with script |
| `star-field` | Grid of stars | USA (canton) |

---

### `star`

A multi-pointed star, the most versatile symbol type.

**Core Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `color` | string | required | Fill color |
| `points` | number | `5` | Number of star points (5, 6, 7, 8...) |
| `scale` | number | `1` | Multiplier on base radius. Base radius = 0.15 × flag height, so `scale: 2` = 0.30 × flag height |
| `radius` | number | - | Direct radius as fraction of flag height (0-1). Overrides `scale` if both set |
| `innerRadius` | number | ~0.382 | Ratio of inner radius to outer radius (0-1). Controls point sharpness: lower = sharper points |
| `rotation` | number | `0` | Rotation angle in degrees, clockwise from upward-pointing |
| `xOffset` | number | `0` | Horizontal position as fraction of flag width. Range: -0.5 (left edge) to 0.5 (right edge), 0 = center |
| `yOffset` | number | `0` | Vertical position as fraction of flag height. Range: -0.5 (top edge) to 0.5 (bottom edge), 0 = center |

**Multi-Star Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `count` | number | `1` | Number of stars to render |
| `layout` | string | `'auto'` | Arrangement pattern |
| `spacing` | number | varies | Distance between star centers as fraction of flag height |
| `circleRadius` | number | - | Radius of arrangement circle as fraction of flag height (for arc layout) |
| `arcSpan` | number | `2*Math.PI` | Angular span in radians. `2*Math.PI` = full circle, `Math.PI` = half circle |
| `startAngle` | number | `0` | Starting angle in radians. 0 = right, -π/2 = top, π/2 = bottom, π = left |
| `spacingX` | number | - | Horizontal spacing between stars as fraction of flag width (for quincunx) |
| `spacingY` | number | - | Vertical spacing between stars as fraction of flag height (for quincunx) |
| `rotateRadially` | boolean | `false` | If true, each star rotates to point outward from arc center |

**Layout Options:**

| Layout | Description |
|--------|-------------|
| `'auto'` | Automatically chosen based on count |
| `'horizontal'` | Stars in a horizontal line |
| `'vertical'` | Stars in a vertical line |
| `'arc'` | Stars arranged in a circle or arc |
| `'grid'` | Stars in a rectangular grid |
| `'quincunx'` | 5-point die pattern (center + 4 corners) |

**How it renders:**

**Size:**
- `scale: 1.5` makes the star 50% larger than default
- `radius: 0.1` sets the star to exactly 10% of flag height
- If both `scale` and `radius` are set, `radius` takes precedence

**Position:**
- `xOffset: 0, yOffset: 0` = centered on flag
- `xOffset: -0.25` = 25% to the left of center
- `yOffset: 0.25` = 25% below center

**Sharpness:**
- `innerRadius: 0.382` (default for 5-point) creates classic star shape
- Lower `innerRadius` = sharper, more pointed stars
- Higher `innerRadius` = fuller, less pointed stars

**Multi-star arrangements:**
- `layout: 'arc'` + `circleRadius: 0.3` arranges stars in a circle of radius 0.3
- `arcSpan: Math.PI` creates a half-circle arrangement
- `startAngle: -Math.PI/2` starts arrangement from the top

**Examples:**
```javascript
// Simple centered star
{ type: 'star', color: 'white', points: 5, scale: 1.5 }

// Star in canton (Chile) - parentIndex references overlay
{ type: 'star', color: 'white', parentIndex: 0, scale: 1.8 }

// EU - 12 stars in a full circle
{ type: 'star', color: 'gold', points: 5, count: 12, layout: 'arc',
  radius: 1/18, circleRadius: 1/3, arcSpan: 2 * Math.PI }

// China - Large star
{ type: 'star', color: 'gold', points: 5, radius: 3/20,
  xOffset: -0.5 + 5/30, yOffset: -0.5 + 5/20 }

// China - 4 small stars in arc
{ type: 'star', color: 'gold', points: 5, count: 4, layout: 'arc',
  radius: 1/20, xOffset: -6.5/30, yOffset: -0.5 + 5/20,
  circleRadius: 0.2, startAngle: -1.166, arcSpan: 2.332 }

// Honduras - 5 stars in quincunx (X pattern)
{ type: 'star', color: 'blue', points: 5, count: 5, layout: 'quincunx',
  scale: 0.4, radius: 2/36, spacingX: 10/36, spacingY: 3/36 }

// 6-pointed star with rotation
{ type: 'star', color: 'blue', points: 6, rotation: 30, scale: 1.2 }
```

---

### `circle`

A solid circle or ellipse.

**Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `color` | string | required* | Fill color (*unless counterChanged) |
| `scale` | number | `1` | Multiplier on base radius. Base radius = 0.15 × flag height, so `scale: 2` = 0.30 × flag height |
| `radius` | number | - | Direct radius as fraction of flag height (0-1). Overrides `scale` if both set |
| `aspectRatio` | number | `1` | Width divided by height (unitless ratio). `1` = circle, `2` = ellipse twice as wide as tall |
| `xOffset` | number | `0` | Horizontal position as fraction of flag width. Range: -0.5 (left edge) to 0.5 (right edge), 0 = center |
| `yOffset` | number | `0` | Vertical position as fraction of flag height. Range: -0.5 (top edge) to 0.5 (bottom edge), 0 = center |
| `counterChanged` | boolean | `false` | If true, creates a two-color vertically split circle |
| `colors` | array | - | For counterChanged: array of [topColor, bottomColor] |

**How it renders:**
- `aspectRatio: 1` = perfect circle
- `aspectRatio: 2` = ellipse twice as wide as tall
- `counterChanged: true` creates a vertically split circle (like Greenland)

**Examples:**
```javascript
// Japan - Red circle (sun)
{ type: 'circle', color: 'red', scale: 1.8 }

// Bangladesh - Red circle, offset left
{ type: 'circle', color: 'red', radius: 0.2, xOffset: -0.05 }

// Greenland - Counter-changed circle (top red, bottom white)
{ type: 'circle', counterChanged: true, colors: ['red', 'white'],
  radius: 3/9, xOffset: -1/9 }
```

---

### `crescent`

A crescent moon shape.

**Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `color` | string | required | Fill color |
| `outerRadius` | number | `0.25` | Outer arc radius as fraction of flag height (0-1) |
| `innerRadius` | number | `0.2` | Inner arc radius as fraction of flag height (0-1) |
| `innerOffset` | number | `0.05` | Horizontal distance between outer and inner circle centers, as fraction of flag height |
| `xOffset` | number | `0` | Horizontal position as fraction of flag width. Range: -0.5 (left edge) to 0.5 (right edge), 0 = center |
| `yOffset` | number | `0` | Vertical position as fraction of flag height. Range: -0.5 (top edge) to 0.5 (bottom edge), 0 = center |

**How it renders:**
- Created by subtracting an inner circle from an outer circle
- `innerOffset` shifts the inner circle horizontally to create the crescent shape
- Larger `innerOffset` = thinner crescent (more of outer circle is removed)
- Smaller difference between `outerRadius` and `innerRadius` = thinner crescent

**Examples:**
```javascript
// Algeria - Red crescent
{ type: 'crescent', color: 'red', outerRadius: 0.25, innerRadius: 0.2, innerOffset: 0.0603814 }

// Turkey - White crescent
{ type: 'crescent', color: 'white', outerRadius: 0.25, innerRadius: 0.2, innerOffset: 0.06 }
```

---

### `rising-sun`

A sun with radiating rays (half visible above horizon).

**Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `color` | string | required | Fill color |
| `scale` | number | `1` | Multiplier on base size. Base size = 0.15 × flag height, so `scale: 2` = 0.30 × flag height |
| `xOffset` | number | `0` | Horizontal position as fraction of flag width. Range: -0.5 (left edge) to 0.5 (right edge), 0 = center |
| `yOffset` | number | `0` | Vertical position as fraction of flag height. Range: -0.5 (top edge) to 0.5 (bottom edge), 0 = center |

**How it renders:**
- A semi-circle with triangular rays extending upward
- `yOffset` positions the sun center; negative values raise it (typically used to place at horizon line)

**Example:**
```javascript
// Antigua and Barbuda - Golden rising sun
{ type: 'rising-sun', color: 'gold', scale: 1.5, yOffset: -0.125 }
```

---

### `cross`

A plus-sign (+) shaped symbol (distinct from the cross overlay).

**Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `color` | string | required | Fill color |
| `radius` | number | `0.1` | Arm length (from center to tip) as fraction of flag height (0-1) |
| `thickness` | number | `0.3` | Arm width as ratio of `radius` (unitless). `thickness: 0.5` means arm width = 0.5 × radius |
| `xOffset` | number | `0` | Horizontal position as fraction of flag width. Range: -0.5 (left edge) to 0.5 (right edge), 0 = center |
| `yOffset` | number | `0` | Vertical position as fraction of flag height. Range: -0.5 (top edge) to 0.5 (bottom edge), 0 = center |

**How it renders:**
- A small cross symbol (not spanning the full flag like the overlay)
- Total cross width/height = 2 × `radius`
- Arm width = `radius` × `thickness`

**Example:**
```javascript
// Georgia - Small red crosses in corners
{ type: 'cross', color: 'red', radius: 0.08, thickness: 0.5, xOffset: -0.3, yOffset: -0.3 }
{ type: 'cross', color: 'red', radius: 0.08, thickness: 0.5, xOffset: 0.3, yOffset: -0.3 }
{ type: 'cross', color: 'red', radius: 0.08, thickness: 0.5, xOffset: -0.3, yOffset: 0.3 }
{ type: 'cross', color: 'red', radius: 0.08, thickness: 0.5, xOffset: 0.3, yOffset: 0.3 }
```

---

### `box`

A rectangular shape.

**Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `color` | string | required | Fill color |
| `radius` | number | `0.1` | Half-height of box as fraction of flag height (0-1). Total height = 2 × `radius` |
| `aspectRatio` | number | `1` | Width divided by height (unitless ratio). `1` = square, `2` = twice as wide as tall |
| `xOffset` | number | `0` | Horizontal position as fraction of flag width. Range: -0.5 (left edge) to 0.5 (right edge), 0 = center |
| `yOffset` | number | `0` | Vertical position as fraction of flag height. Range: -0.5 (top edge) to 0.5 (bottom edge), 0 = center |

**How it renders:**
- A rectangle centered at the offset position
- Height = 2 × `radius` × flag height
- Width = height × `aspectRatio`

**Example:**
```javascript
// Haiti - White box behind coat of arms
{ type: 'box', color: 'white', radius: 0.2, aspectRatio: 900/716 }
```

---

### `seal`

An external SVG image rendered with its original colors (coat of arms, full-color emblem).

**Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `src` | string | required | URL or path to SVG file |
| `color` | null | `null` | Must be null to preserve original SVG colors |
| `scale` | number | `1` | Multiplier on base size. Base size = 0.15 × flag height, so `scale: 2` = 0.30 × flag height |
| `aspectRatio` | number | `1` | Width divided by height (unitless ratio). Adjusts image proportions |
| `xOffset` | number | `0` | Horizontal position as fraction of flag width. Range: -0.5 (left edge) to 0.5 (right edge), 0 = center |
| `yOffset` | number | `0` | Vertical position as fraction of flag height. Range: -0.5 (top edge) to 0.5 (bottom edge), 0 = center |

**How it renders:**
- Loads and displays the external SVG at full color
- Image height = base size × `scale`
- Image width = height × `aspectRatio`
- `color: null` is required to preserve the original artwork colors

**Example:**
```javascript
// Andorra - Full-color coat of arms
{ type: 'seal', src: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Coat_of_arms_of_Andorra.svg',
  color: null, scale: 1.5 }

// Afghanistan - Full-color emblem
{ type: 'seal', src: 'https://upload.wikimedia.org/.../Emblem_of_Afghanistan.svg',
  color: null, scale: 1.8, aspectRatio: 1.2 }
```

---

### `external`

An external SVG image with color masking (monochrome emblem).

**Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `src` | string | required | URL or path to SVG file |
| `color` | string | required | Color to apply as mask over the entire image |
| `scale` | number | `1` | Multiplier on base size. Base size = 0.15 × flag height, so `scale: 2` = 0.30 × flag height |
| `width` | number | - | Direct width as fraction of flag width (0-1). Overrides scale-based sizing |
| `height` | number | - | Direct height as fraction of flag height (0-1). Overrides scale-based sizing |
| `aspectRatio` | number | `1` | Width divided by height (unitless ratio). Used when only scale is specified |
| `rotation` | number | `0` | Rotation angle in degrees, clockwise |
| `xOffset` | number | `0` | Horizontal position as fraction of flag width. Range: -0.5 (left edge) to 0.5 (right edge), 0 = center |
| `yOffset` | number | `0` | Vertical position as fraction of flag height. Range: -0.5 (top edge) to 0.5 (bottom edge), 0 = center |

**How it renders:**
- Loads the external SVG and applies the specified color as a mask
- Used for single-color emblems (eagles, lions, etc.)
- The original colors are replaced with the specified `color`
- If `width`/`height` specified, uses those directly; otherwise uses `scale` × base size

**Example:**
```javascript
// Albania - Black double-headed eagle
{ type: 'external', src: 'https://upload.wikimedia.org/wikipedia/commons/b/b7/Albanian_Eagle.svg',
  color: 'black', scale: 2.22 }

// Austria - Red eagle
{ type: 'external', src: 'https://upload.wikimedia.org/.../Coat_of_arms_of_Austria.svg',
  color: 'red', scale: 1.5 }
```

---

### `pattern`

A decorative pattern SVG (script, ornaments).

**Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `src` | string | required | URL or path to SVG file |
| `color` | string | required | Color to apply as mask over the entire pattern |
| `scale` | number | `1` | Multiplier on base size. Base size = 0.15 × flag height, so `scale: 2` = 0.30 × flag height |
| `width` | number | - | Direct width as fraction of flag width (0-1). Overrides scale-based sizing |
| `height` | number | - | Direct height as fraction of flag height (0-1). Overrides scale-based sizing |
| `aspectRatio` | number | `1` | Width divided by height (unitless ratio). Used when only scale is specified |
| `rotation` | number | `0` | Rotation angle in degrees, clockwise |
| `xOffset` | number | `0` | Horizontal position as fraction of flag width. Range: -0.5 (left edge) to 0.5 (right edge), 0 = center |
| `yOffset` | number | `0` | Vertical position as fraction of flag height. Range: -0.5 (top edge) to 0.5 (bottom edge), 0 = center |

**How it renders:**
- Similar to `external` but semantically for decorative patterns
- Useful for Arabic script, ornamental borders, etc.
- If `width`/`height` specified, uses those directly; otherwise uses `scale` × base size

**Example:**
```javascript
// Flag with Arabic script
{ type: 'pattern', src: 'https://example.com/script.svg',
  color: 'white', scale: 0.8, xOffset: 0.1 }
```

---

### `star-field`

A grid of small stars, typically used in canton regions (like the US flag).

**Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `color` | string | required | Star color |
| `parentIndex` | number | required | Zero-based index of parent overlay in the overlays array |
| `width` | number | - | Override width as fraction of flag width (0-1). Defaults to parent overlay width |
| `height` | number | - | Override height as fraction of flag height (0-1). Defaults to parent overlay height |

**How it renders:**
- Creates a predefined grid of stars within the parent overlay bounds
- The stars are automatically arranged in the traditional US flag pattern (9-11 alternating rows)
- `parentIndex: 0` references the first overlay (typically a canton)
- Star sizes are calculated automatically based on the available space

**Example:**
```javascript
// USA - 50 stars in canton
{ type: 'canton', position: 'top-left', color: 'blue', widthRatio: 0.4, heightRatio: 7/13 }
// ...overlays...
{ type: 'star-field', color: 'white', parentIndex: 0 }
```

---

## Color System

### Default Colors

The application defines these base colors in `src/core/constants.js`:

| Name | Hex | Usage |
|------|-----|-------|
| `white` | `#FFFFFF` | Common background, symbols |
| `black` | `#000000` | Text, eagles, mourning bands |
| `red` | `#EF3340` | Very common in flags |
| `blue` | `#0055A4` | Common primary color |
| `lightBlue` | `#69B3E7` | Sky blue variations |
| `green` | `#007A3D` | Pan-African, Islamic flags |
| `aquamarine` | `#00778B` | Specific regional flags |
| `gold` | `#FFD700` | Stars, sun symbols |
| `orange` | `#FF6600` | Irish, Indian flags |

### Color Overrides

Individual flags can override default colors using `colorOverrides`:

```javascript
{
  id: 1,
  country: 'France',
  colorOverrides: {
    blue: '#003893',    // Darker blue
    red: '#CE1126'      // Different red shade
  },
  // ...
}
```

### Color Resolution Order

1. Check flag's `colorOverrides` for the color name
2. Fall back to default `COLORS` constant
3. If `null` or `undefined`, render without fill (transparent)

---

## Coordinate System

### Flag Dimensions

- Origin (0, 0) is at the **top-left** corner
- Standard flag aspect ratio varies by country (commonly 2:3 or 1:2)
- All ratios are normalized to 0-1 range

### Offset Coordinates

For `xOffset` and `yOffset` parameters:

| Value | Position |
|-------|----------|
| `-0.5` | Far left / top edge |
| `0` | Center |
| `0.5` | Far right / bottom edge |

**Visual representation:**
```
(-0.5, -0.5)              (0.5, -0.5)
     ┌────────────────────────┐
     │                        │
     │         (0, 0)         │
     │          center        │
     │                        │
     └────────────────────────┘
(-0.5, 0.5)               (0.5, 0.5)
```

### Ratio Parameters

For `widthRatio`, `heightRatio`, `radius`, etc.:

- Values are fractions from 0 to 1
- `widthRatio: 0.5` = 50% of flag width
- `heightRatio: 0.33` = 33% of flag height
- `radius: 0.1` = radius equal to 10% of flag height

### Parent Index

The `parentIndex` parameter positions a symbol relative to an overlay:

```javascript
// First, define overlays (index 0, 1, 2...)
overlays: [
  { type: 'canton', ... },  // index 0
  { type: 'triangle', ... } // index 1
],
// Then reference by index
symbols: [
  { type: 'star', parentIndex: 0, ... }  // Positioned in canton
]
```

When a symbol has `parentIndex`:
- It's centered within the parent overlay's bounds
- Scale is automatically reduced by 50% (unless using `radius`)
- Position offsets are relative to the parent, not the flag

---

## Quick Reference

### Common Overlay Patterns

| Pattern | Overlay Configuration |
|---------|----------------------|
| Canton | `{ type: 'canton', widthRatio: 0.4, heightRatio: 0.5 }` |
| Hoist triangle | `{ type: 'triangle', position: 'hoist' }` |
| Nordic cross | `{ type: 'nordic-cross', verticalOffset: 0.35, crossWidth: 0.15 }` |
| Diagonal X | `{ type: 'saltire', widthRatio: 0.1 }` |
| Center diamond | `{ type: 'diamond', widthRatio: 0.8, heightRatio: 0.8 }` |

### Common Symbol Patterns

| Pattern | Symbol Configuration |
|---------|---------------------|
| Center star | `{ type: 'star', points: 5, scale: 1.5 }` |
| Circle of stars | `{ type: 'star', count: 12, layout: 'arc', circleRadius: 0.3 }` |
| Sun disc | `{ type: 'circle', scale: 1.8 }` |
| Crescent & star | `{ type: 'crescent' }, { type: 'star', xOffset: 0.05 }` |
| Coat of arms | `{ type: 'seal', src: '...', color: null }` |
