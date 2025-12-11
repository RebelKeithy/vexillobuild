// Symbol parameter schemas - defines defaults and unit types for each symbol
// Parameters marked as 'height%' are converted to absolute pixels (value * height)
// Parameters marked as 'width%' are converted to absolute pixels (value * width)

export const SYMBOL_SCHEMAS = {
    star: {
        defaults: { points: 5, innerRadius: 0.382, rotation: 0, count: 1 },
        heightPercent: ['radius', 'circleRadius', 'spacing', 'spacingX', 'spacingY'],
        widthPercent: [],
    },
    circle: {
        defaults: { aspectRatio: 1, radius: 0.225 },
        heightPercent: ['radius'],
        widthPercent: [],
    },
    crescent: {
        defaults: { rotation: 0, arc: 'full', outerRadius: 0.25, innerRadius: 0.2, innerOffset: 0 },
        heightPercent: ['outerRadius', 'innerRadius', 'innerRadiusX', 'innerRadiusY', 'innerOffset'],
        widthPercent: [],
    },
    cross: {
        defaults: { thickness: 0.4 },
        heightPercent: ['radius'],
        widthPercent: [],
    },
    box: {
        defaults: { aspectRatio: 1 },
        heightPercent: ['radius'],
        widthPercent: [],
    },
    external: {
        defaults: { rotation: 0 },
        heightPercent: ['height'],
        widthPercent: ['width'],
    },
    seal: {
        defaults: {},
        heightPercent: [],
        widthPercent: [],
    },
    pattern: {
        defaults: { rotation: 0 },
        heightPercent: ['height'],
        widthPercent: ['width'],
    },
    'rising-sun': {
        defaults: {},
        heightPercent: ['radius'],
        widthPercent: [],
    },
    'star-field': {
        defaults: { width: 0.4, height: 0.54, rows: 5, cols: 6, starRadius: 0.012 },
        heightPercent: ['height', 'starRadius'],
        widthPercent: ['width'],
    },
};