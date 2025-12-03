import React from 'react';
import {resolveColor} from '../../core/utils';
import {SHAPE_GENERATORS} from '../../core/shape-generators';

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
    getHighlightStyles
}) => {
    // Intelligent Matching: match nth symbol of type T to nth target symbol of type T
    const myTypeIndex = symbols.slice(0, index).filter(s => s.type === symbol.type).length;
    const targetSymbolsOfType = currentLevel?.target.symbols.filter(s => s.type === symbol.type) || [];
    const targetOverride = targetSymbolsOfType[myTypeIndex] || targetSymbolsOfType[0] || {};

    const {color: _c, ...geoProps} = targetOverride;
    const mergedSymbol = {...symbol, ...geoProps};

    let cx = width / 2;
    let cy = height / 2;
    let scale = mergedSymbol.scale || 1;
    let baseR = height * 0.15;

    if (mergedSymbol.xOffset) cx += width * mergedSymbol.xOffset;
    if (mergedSymbol.yOffset) cy += height * mergedSymbol.yOffset;

    if (mergedSymbol.parentIndex !== null && overlays[mergedSymbol.parentIndex]) {
        const parent = overlays[mergedSymbol.parentIndex];
        const parentConfig = currentLevel?.target.overlays.find(o => o.type === parent.type) || {};
        if (parent.type === 'canton') {
            cx = (width * (parentConfig.widthRatio || 0.4)) / 2;
            cy = (height * (parentConfig.heightRatio || 0.54)) / 2;
            scale *= 0.5;
        } else if (parent.type === 'triangle') {
            const tW = parentConfig.vertexXRatio ? height * parentConfig.vertexXRatio : (height * Math.sqrt(3)) / 2 * 0.7;
            cx = tW * 0.35;
            scale *= 0.5;
        }
    }

    const color = resolveColor(mergedSymbol.color, index, 5);
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

    if (mergedSymbol.type === 'rising-sun') {
        const pathData = SHAPE_GENERATORS.risingSun({cx, cy, r: baseR * scale, args: mergedSymbol});
        return <path key={index} d={pathData} {...commonProps} />;
    }
    if (mergedSymbol.type === 'crescent-star') {
        const pathData = SHAPE_GENERATORS.crescentStar({cx, cy, h: height, args: mergedSymbol});
        return <path key={index} d={pathData} {...commonProps} />;
    }
    if (mergedSymbol.type === 'seal' && mergedSymbol.src) {
        const h = baseR * scale * 2;
        const w = mergedSymbol.aspectRatio ? h * mergedSymbol.aspectRatio : h;

        const imgProps = {...commonProps};
        if (highlightMode) return <rect x={cx - w / 2} y={cy - h / 2} width={w} height={h}
                                        fill="none" {...imgProps} />
        return <image key={index} href={mergedSymbol.src} x={cx - w / 2} y={cy - h / 2} width={w}
                      height={h} {...imgProps} />;
    }
    if (mergedSymbol.type === 'external' && mergedSymbol.src) {
        const h = baseR * scale * 2;
        const w = mergedSymbol.aspectRatio ? h * mergedSymbol.aspectRatio : h;
        const rotation = mergedSymbol.rotation || 0;
        const transform = rotation ? `rotate(${rotation} ${cx} ${cy})` : undefined;

        if (mergedSymbol.color === null || mergedSymbol.color === undefined) {
            const imgProps = {...commonProps};
            if (highlightMode) return <rect x={cx - w / 2} y={cy - h / 2} width={w} height={h} transform={transform}
                                            fill="none" {...imgProps} />
            return <image key={index} href={mergedSymbol.src} x={cx - w / 2} y={cy - h / 2} width={w} height={h}
                          transform={transform} {...imgProps} />;
        }

        return (
            <foreignObject key={index} x={cx - w / 2} y={cy - h / 2} width={w} height={h}
                           transform={transform} {...commonProps}>
                <div style={{
                    width: '100%', height: '100%',
                    backgroundColor: highlightMode ? 'transparent' : color,
                    WebkitMaskImage: `url(${mergedSymbol.src})`, maskImage: `url(${mergedSymbol.src})`,
                    WebkitMaskSize: 'contain', maskSize: 'contain',
                    WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat', maskPosition: 'center',
                    border: highlightMode ? (highlightMode === 'selection' ? '4px solid #3B82F6' : '4px solid #FACC15') : 'none'
                }}/>
            </foreignObject>
        );
    }
    if (mergedSymbol.type === 'star') {
        const pts = SHAPE_GENERATORS.star({cx, cy, r: baseR * scale, args: mergedSymbol});
        return <polygon key={index} points={pts} {...commonProps} />;
    }
    if (mergedSymbol.type === 'circle') {
        const r = baseR * scale * 1.5;
        return <circle key={index} cx={cx} cy={cy} r={r} {...commonProps} />;
    }
    if (mergedSymbol.type === 'star-field') {
        const fieldW = mergedSymbol.parentIndex !== null ? cx * 2 : width * 0.4;
        const fieldH = mergedSymbol.parentIndex !== null ? cy * 2 : height * 0.54;
        if (highlightMode) return <rect width={fieldW} height={fieldH} fill="none" {...commonProps} />;
        const rows = 5, cols = 6;
        const stepX = fieldW / (cols + 1);
        const stepY = fieldH / (rows + 1);
        return (
            <g key={index} {...commonProps}>
                {Array.from({length: rows * cols}).map((_, i) => {
                    const r = Math.floor(i / cols) + 1;
                    const c = (i % cols) + 1;
                    return <circle key={i} cx={c * stepX} cy={r * stepY} r={height * 0.012} fill={color}/>
                })}
                <rect width={fieldW} height={fieldH} fill="transparent"/>
            </g>
        );
    }
    return null;
};