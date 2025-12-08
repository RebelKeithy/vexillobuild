import { SYMBOL_SCHEMAS } from './symbol-schemas';
import { resolveColor } from './utils';

// Parent positioning strategies - return base center position for the parent
const PARENT_STRATEGIES = {
    canton: (parentConfig, width, height) => ({
        cx: (width * (parentConfig.widthRatio || 0.4)) / 2,
        cy: (height * (parentConfig.heightRatio || 0.54)) / 2,
    }),
    triangle: (parentConfig, width, height) => {
        const tW = parentConfig.vertexXRatio
            ? height * parentConfig.vertexXRatio
            : (height * Math.sqrt(3)) / 2 * 0.7;
        return {
            cx: tW * 0.35,
            cy: height / 2,
        };
    },
};

/**
 * Resolves all symbol parameters upfront.
 * Converts percentages to absolute pixels, applies defaults, handles parent positioning.
 */
export function resolveSymbolParams({
    symbol,
    index,
    width,
    height,
    overlays,
    targetOverlays,
    colorOverrides,
}) {
    const schema = SYMBOL_SCHEMAS[symbol.type] || { defaults: {}, heightPercent: [], widthPercent: [] };

    // Start with defaults, then overlay symbol params
    const params = { ...schema.defaults, ...symbol };

    // Calculate base radius (from explicit radius or legacy scale)
    let r;
    if (params.radius !== undefined) {
        r = height * params.radius;
    } else {
        const scale = params.scale || 1;
        r = height * 0.15 * scale;
    }
    params.r = r;

    // Convert height-percentage params to absolute values
    for (const key of schema.heightPercent) {
        if (params[key] !== undefined) {
            params[key] = height * params[key];
        }
    }

    // Convert width-percentage params to absolute values
    for (const key of schema.widthPercent) {
        if (params[key] !== undefined) {
            params[key] = width * params[key];
        }
    }

    // Determine base center position (from parent or flag center)
    let cx = width / 2;
    let cy = height / 2;

    if (params.parentIndex !== null && overlays?.[params.parentIndex]) {
        const parent = overlays[params.parentIndex];
        const parentConfig = targetOverlays?.find(o => o.type === parent.type) || {};
        const strategy = PARENT_STRATEGIES[parent.type];

        if (strategy) {
            const positioned = strategy(parentConfig, width, height);
            cx = positioned.cx;
            cy = positioned.cy;
            // Apply legacy scale factor for symbols without explicit radius
            if (params.radius === undefined) {
                params.r *= 0.5;
            }
        }
    }

    // Apply offsets AFTER parent positioning (relative to parent center)
    if (params.xOffset) cx += width * params.xOffset;
    if (params.yOffset) cy += height * params.yOffset;

    params.cx = cx;
    params.cy = cy;

    // Store flag dimensions for layouts that need them
    params.flagWidth = width;
    params.flagHeight = height;

    // Resolve color
    params.resolvedColor = resolveColor(params.color, index, colorOverrides);

    return params;
}