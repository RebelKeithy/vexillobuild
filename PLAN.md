# Symbol Rendering Refactor Plan

## Problem Summary

Parameter resolution is scattered across 5+ locations:
- `SymbolLayer.js` (lines 32-62): radius calc, offsets, parent positioning, color
- `symbol-renderers.js`: each renderer re-converts percentages to absolute values
- `shape-generators.js`: some generators take height and do their own conversions
- `utils.js`: color resolution
- Flag definitions: mixed units (percentages, ratios, multipliers)

This causes:
- **Duplication**: radius calculation exists in 3+ places
- **Inconsistency**: `spacing` means different things in different contexts
- **Complexity**: adding a new symbol type requires changes in multiple files

## Proposed Solution: Single-Pass Parameter Resolution

### Core Concept

Move ALL parameter resolution to happen **once, upfront** in `SymbolLayer.js` before calling any renderer. Renderers receive fully-resolved, absolute pixel values only.

### Architecture

```
SymbolLayer.js
    │
    ├── resolveSymbolParams(symbol, dimensions, parent)
    │   ├── Apply defaults from SYMBOL_SCHEMAS
    │   ├── Convert ALL percentages → pixels
    │   ├── Apply parent positioning constraints
    │   └── Resolve colors
    │
    └── SYMBOL_RENDERERS[type](resolvedParams)
        └── Pure render logic only (no calculations)
```

---

## Implementation Steps

### Step 1: Create Parameter Schema Registry

Create `src/core/symbol-schemas.js`:

```javascript
export const SYMBOL_SCHEMAS = {
  star: {
    defaults: { points: 5, innerRadius: 0.382, rotation: 0 },
    percentOfHeight: ['radius', 'circleRadius', 'spacing', 'spacingX', 'spacingY'],
    percentOfWidth: ['xOffset'],  // special handling
    ratios: ['innerRadius'],       // leave as-is
  },
  crescent: {
    defaults: { rotation: 0 },
    percentOfHeight: ['outerRadius', 'innerRadius', 'innerOffset'],
  },
  circle: {
    defaults: { aspectRatio: 1 },
    percentOfHeight: ['radius'],
  },
  // ... etc
};
```

**LOC Impact**: ~60 lines new, but removes ~100+ scattered lines

### Step 2: Create Unified Parameter Resolver

Create `src/core/resolve-params.js`:

```javascript
export function resolveSymbolParams(symbol, { width, height }, overlays, targetOverlays, colorOverrides) {
  const schema = SYMBOL_SCHEMAS[symbol.type];

  // 1. Merge defaults
  const params = { ...schema.defaults, ...symbol };

  // 2. Convert percentages to absolute values
  for (const key of schema.percentOfHeight || []) {
    if (params[key] !== undefined) {
      params[key] = height * params[key];
    }
  }

  // 3. Handle legacy 'scale' → 'radius' conversion
  if (params.radius === undefined && params.scale !== undefined) {
    params.radius = height * 0.15 * params.scale;
  }

  // 4. Apply parent positioning
  if (params.parentIndex !== null) {
    applyParentConstraints(params, overlays, targetOverlays, width, height);
  }

  // 5. Calculate center position
  params.cx = width / 2 + (params.xOffset || 0);
  params.cy = height / 2 + (params.yOffset || 0);

  // 6. Resolve color
  params.resolvedColor = resolveColor(params.color, colorOverrides);

  return params;
}
```

**LOC Impact**: ~80 lines new, removes ~60 lines from SymbolLayer.js + ~40 lines from renderers

### Step 3: Simplify Renderers

Each renderer becomes pure SVG generation:

**Before** (`symbol-renderers.js` star renderer - 80+ lines):
```javascript
export const renderStar = (mergedSymbol, cx, cy, r, ...) => {
  const args = { ...mergedSymbol };
  if (args.circleRadius !== undefined) args.circleRadius = height * args.circleRadius;
  if (args.spacing !== undefined) args.spacing = height * args.spacing;
  // ... 20 more lines of parameter conversion
  // ... then actual rendering
};
```

**After** (~40 lines):
```javascript
export const renderStar = (params) => {
  // params already has: cx, cy, radius, circleRadius (absolute), spacing (absolute), etc.
  const positions = calculateStarPositions(params);
  return positions.map(pos => generateStarPath(pos));
};
```

### Step 4: Update SymbolLayer.js

**Before** (lines 20-75 of parameter handling):
```javascript
// Complex matching logic
// radius calculation
// offset application
// parent positioning
// color resolution
// then call renderer
```

**After**:
```javascript
const resolved = resolveSymbolParams(mergedSymbol, dimensions, overlays, targetOverlays, colorOverrides);
return SYMBOL_RENDERERS[symbol.type](resolved);
```

---

## Files Changed

| File | Change | Lines Before | Lines After |
|------|--------|--------------|-------------|
| `src/core/symbol-schemas.js` | NEW | 0 | ~60 |
| `src/core/resolve-params.js` | NEW | 0 | ~100 |
| `src/components/flag-renderer/SymbolLayer.js` | SIMPLIFY | 150 | ~70 |
| `src/components/flag-renderer/symbol-renderers.js` | SIMPLIFY | 450 | ~280 |
| `src/core/shape-generators.js` | SIMPLIFY | 250 | ~180 |

**Net LOC change**: ~1000 → ~690 (**-31%**)

---

## Migration Strategy

1. **Add new files** without changing existing code
2. **Migrate one symbol type at a time** (start with simplest: `box`)
3. **Test each migration** before proceeding
4. **Remove legacy code paths** once all types migrated

### Order of Migration

1. `box` - simplest, one shape
2. `circle` - simple but has counter-changed variant
3. `cross` - simple polygon
4. `star` - complex layouts, most parameter variations
5. `crescent` - complex geometry
6. `external/seal/pattern` - image handling
7. `star-field` / `rising-sun` - specialized

---

## Key Design Decisions

### Q1: Keep `scale` parameter or deprecate?

**Recommendation**: Support both during migration, log deprecation warning, remove in v2.

### Q2: How to handle parent positioning for future overlay types?

**Recommendation**: Create `PARENT_POSITION_STRATEGIES` map:
```javascript
const PARENT_POSITION_STRATEGIES = {
  canton: (params, parent, dims) => ({ cx: ..., cy: ..., scale: 0.5 }),
  triangle: (params, parent, dims) => ({ ... }),
};
```

### Q3: Should we change flag definition format?

**Recommendation**: No. Keep definitions unchanged. The resolver handles both old (`scale`) and new (`radius`) formats transparently.

---

## Success Criteria

1. All existing flag snapshots pass unchanged
2. No parameter conversion logic in individual renderers
3. Adding a new symbol type requires only:
   - Schema entry in `symbol-schemas.js`
   - Renderer function in `symbol-renderers.js`
4. Total LOC reduced by 25%+

---

## Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| Subtle rendering differences | Comprehensive snapshot tests before/after |
| Breaking existing flag definitions | Keep backward compatibility for `scale` |
| Complex parent positioning edge cases | Migrate parent types one at a time |