import { resolveSymbolParams } from '../../core/resolve-params';
import { resolveColor } from '../../core/utils';
import { SYMBOL_RENDERERS } from './symbol-renderers';

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
    highlightColorIndex = null,
    getHighlightStyles,
    colorOverrides = {}
}) => {
    // Match nth symbol of type T to nth target symbol of type T
    const myTypeIndex = symbols.slice(0, index).filter(s => s.type === symbol.type).length;
    const targetSymbolsOfType = currentLevel?.target.symbols.filter(s => s.type === symbol.type) || [];
    const targetOverride = targetSymbolsOfType[myTypeIndex] || targetSymbolsOfType[0] || {};

    // Merge target geometry with user symbol (target geo overrides, but user color wins)
    const { color: _c, colors: _cs, ...geoProps } = targetOverride;
    const mergedSymbol = { ...geoProps, ...symbol };

    // Resolve all parameters upfront
    const params = resolveSymbolParams({
        symbol: mergedSymbol,
        index,
        width,
        height,
        overlays,
        targetOverlays: currentLevel?.target.overlays,
        colorOverrides,
    });

    // Build common SVG props
    const styles = highlightMode ? getHighlightStyles(true, highlightMode === 'selection') : {};
    const commonProps = {
        fill: highlightMode ? 'none' : params.resolvedColor,
        display: 'block',
        ...(!highlightMode ? bindEvents('symbol', index) : {}),
        ...(highlightMode ? styles : {}),
    };

    if (highlightMode) {
        commonProps.stroke = styles.stroke;
        commonProps.strokeWidth = styles.strokeWidth;
    }

    const renderer = SYMBOL_RENDERERS[mergedSymbol.type];
    if (!renderer) {
        console.warn('No renderer for type:', mergedSymbol.type);
        return null;
    }

    return renderer({
        index,
        params,
        commonProps,
        highlightMode,
        highlightColorIndex,
        styles,
        bindEvents,
        resolveColor: (c) => resolveColor(c, index, colorOverrides),
    });
};