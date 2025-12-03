import {resolveColor} from '../../core/utils';
import {SYMBOL_RENDERERS} from './symbol-renderers';

export const SymbolLayer = ({
    symbol,
    index,
    width,
    height,
    currentLevel,
    symbols,
    overlays,
    bindEvents,
    isSelected,
    isHovered,
    highlightMode = null,
    getHighlightStyles,
    colorOverrides = {}
}) => {
    // Intelligent Matching: match nth symbol of type T to nth target symbol of type T
    const myTypeIndex = symbols.slice(0, index).filter(s => s.type === symbol.type).length;
    const targetSymbolsOfType = currentLevel?.target.symbols.filter(s => s.type === symbol.type) || [];
    const targetOverride = targetSymbolsOfType[myTypeIndex] || targetSymbolsOfType[0] || {};

    const {color: _c, ...geoProps} = targetOverride;
    const mergedSymbol = {...geoProps, ...symbol};

    let cx = width / 2;
    let cy = height / 2;

    let r;
    if (mergedSymbol.radius !== undefined) {
        r = height * mergedSymbol.radius;
    } else {
        const scale = mergedSymbol.scale || 1;
        const baseR = height * 0.15;
        r = baseR * scale;
    }

    if (mergedSymbol.xOffset) cx += width * mergedSymbol.xOffset;
    if (mergedSymbol.yOffset) cy += height * mergedSymbol.yOffset;

    if (mergedSymbol.parentIndex !== null && overlays[mergedSymbol.parentIndex]) {
        const parent = overlays[mergedSymbol.parentIndex];
        const parentConfig = currentLevel?.target.overlays.find(o => o.type === parent.type) || {};
        if (parent.type === 'canton') {
            cx = (width * (parentConfig.widthRatio || 0.4)) / 2;
            cy = (height * (parentConfig.heightRatio || 0.54)) / 2;
            if (mergedSymbol.radius === undefined) {
                r *= 0.5; // Only apply parent scaling if using legacy scale
            }
        } else if (parent.type === 'triangle') {
            const tW = parentConfig.vertexXRatio ? height * parentConfig.vertexXRatio : (height * Math.sqrt(3)) / 2 * 0.7;
            cx = tW * 0.35;
            if (mergedSymbol.radius === undefined) {
                r *= 0.5;
            }
        }
    }

    // Resolve color and styles
    const color = resolveColor(mergedSymbol.color, index, colorOverrides);
    const styles = highlightMode ? getHighlightStyles(true, highlightMode === 'selection') : {};

    const commonProps = {
        fill: highlightMode ? 'none' : color,
        display: 'block',
        ...(!highlightMode ? bindEvents('symbol', index) : {}),
        ...(highlightMode ? styles : {})
    };

    if (highlightMode) {
        commonProps.stroke = styles.stroke;
        commonProps.strokeWidth = styles.strokeWidth;
    }

    // Look up and call the appropriate renderer
    const renderer = SYMBOL_RENDERERS[mergedSymbol.type];
    if (!renderer) return null;

    return renderer({
        index,
        cx,
        cy,
        r,
        width,
        height,
        mergedSymbol,
        commonProps,
        highlightMode,
        styles,
        bindEvents,
        color
    });
};
