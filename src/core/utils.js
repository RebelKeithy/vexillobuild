import {COLORS, PLACEHOLDER_GREYS} from "./constants";

export const resolveColor = (key, idx = 0, colorOverrides = {}) => {
    if (key && colorOverrides[key]) return colorOverrides[key];
    if (key && COLORS[key]) return COLORS[key];
    return PLACEHOLDER_GREYS[idx % PLACEHOLDER_GREYS.length];
};