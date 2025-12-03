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
    getHighlightStyles,
    colorOverrides = {}
}) => {
    // Intelligent Matching: match nth symbol of type T to nth target symbol of type T
    const myTypeIndex = symbols.slice(0, index).filter(s => s.type === symbol.type).length;
    const targetSymbolsOfType = currentLevel?.target.symbols.filter(s => s.type === symbol.type) || [];
    const targetOverride = targetSymbolsOfType[myTypeIndex] || targetSymbolsOfType[0] || {};

    // Merge target properties first, then user properties to ensure user control
    // Exclude 'color' from target (user always controls color)
    const {color: _c, ...geoProps} = targetOverride;
    // For 'count', if user has explicitly set it, use user's value; otherwise use target's default
    const mergedSymbol = {...geoProps, ...symbol};

    let cx = width / 2;
    let cy = height / 2;

    // Support both legacy 'scale' and new 'radius' (percentage of height)
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
                r *= 0.5; // Only apply parent scaling if using legacy scale
            }
        }
    }

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

    if (mergedSymbol.type === 'rising-sun') {
        const pathData = SHAPE_GENERATORS.risingSun({cx, cy, r, args: mergedSymbol});
        return <path key={index} d={pathData} {...commonProps} />;
    }
    if (mergedSymbol.type === 'crescent') {
        const pathData = SHAPE_GENERATORS.crescent({cx, cy, h: height, args: mergedSymbol});
        return <path key={index} d={pathData} {...commonProps} />;
    }
    if (mergedSymbol.type === 'seal' && mergedSymbol.src) {
        const h = r * 2;
        const w = mergedSymbol.aspectRatio ? h * mergedSymbol.aspectRatio : h;

        const imgProps = {...commonProps};
        if (highlightMode) return <rect x={cx - w / 2} y={cy - h / 2} width={w} height={h}
                                        fill="none" {...imgProps} />
        return <image key={index} href={mergedSymbol.src} x={cx - w / 2} y={cy - h / 2} width={w}
                      height={h} {...imgProps} />;
    }
    if (mergedSymbol.type === 'external' && mergedSymbol.src) {
        // Support direct width/height (percentage of flag dimensions) or legacy radius-based sizing
        let w, h;
        if (mergedSymbol.width !== undefined || mergedSymbol.height !== undefined) {
            // Direct width/height specification (percentage of flag dimensions)
            w = mergedSymbol.width !== undefined ? width * mergedSymbol.width : null;
            h = mergedSymbol.height !== undefined ? height * mergedSymbol.height : null;

            // If only one dimension specified, calculate the other from aspectRatio
            if (w && !h && mergedSymbol.aspectRatio) {
                h = w / mergedSymbol.aspectRatio;
            } else if (h && !w && mergedSymbol.aspectRatio) {
                w = h * mergedSymbol.aspectRatio;
            } else if (!w && !h) {
                // Fallback to radius-based if no dimensions provided
                h = r * 2;
                w = mergedSymbol.aspectRatio ? h * mergedSymbol.aspectRatio : h;
            }
        } else {
            // Legacy: use radius-based sizing
            h = r * 2;
            w = mergedSymbol.aspectRatio ? h * mergedSymbol.aspectRatio : h;
        }

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
            <g key={index}>
                <foreignObject x={cx - w / 2} y={cy - h / 2} width={w} height={h}
                               transform={transform} {...(!highlightMode ? bindEvents('symbol', index) : {})}>
                    <div style={{
                        width: '100%', height: '100%',
                        backgroundColor: color,
                        WebkitMaskImage: `url(${mergedSymbol.src})`, maskImage: `url(${mergedSymbol.src})`,
                        WebkitMaskSize: 'contain', maskSize: 'contain',
                        WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat', maskPosition: 'center'
                    }}/>
                </foreignObject>
                {highlightMode && (
                    <rect x={cx - w / 2} y={cy - h / 2} width={w} height={h}
                          transform={transform}
                          fill="none"
                          stroke={styles.stroke || '#3B82F6'}
                          strokeWidth={styles.strokeWidth || 4}
                    />
                )}
            </g>
        );
    }
    if (mergedSymbol.type === 'star') {
        // Convert circleRadius and spacing from percentage to absolute value if needed
        const argsWithAbsoluteRadius = {...mergedSymbol};
        if (argsWithAbsoluteRadius.circleRadius !== undefined) {
            argsWithAbsoluteRadius.circleRadius = height * argsWithAbsoluteRadius.circleRadius;
        }
        if (argsWithAbsoluteRadius.spacing !== undefined) {
            argsWithAbsoluteRadius.spacing = height * argsWithAbsoluteRadius.spacing;
        }

        const starResult = SHAPE_GENERATORS.star({cx, cy, r, args: argsWithAbsoluteRadius});

        // Handle single star (returns string)
        if (typeof starResult === 'string') {
            return <polygon key={index} points={starResult} {...commonProps} />;
        }

        // Handle multiple stars (returns object with positions)
        const {positions} = starResult;
        const generateSingleStarPoints = (centerX, centerY, customRotation = null) => {
            const pointsCount = mergedSymbol.points || 5;
            const innerRadius = mergedSymbol.innerRadius || (pointsCount === 5 ? 0.382 : 0.4);
            const rotation = customRotation !== null ? customRotation : (mergedSymbol.rotation || 0);

            const points = [];
            const offset = (rotation * Math.PI) / 180;

            for (let i = 0; i < pointsCount * 2; i++) {
                const ang = (i * Math.PI) / pointsCount - (Math.PI / 2) + offset;
                const rad = i % 2 === 0 ? r : r * innerRadius;
                points.push(`${centerX + rad * Math.cos(ang)},${centerY + rad * Math.sin(ang)}`);
            }
            return points.join(' ');
        };

        // Calculate bounding box for the entire group (for highlight/selection)
        const allPoints = [];
        positions.forEach(pos => {
            const pointsCount = mergedSymbol.points || 5;
            for (let i = 0; i < pointsCount * 2; i++) {
                const ang = (i * Math.PI) / pointsCount - (Math.PI / 2);
                const rad = i % 2 === 0 ? r : r * (mergedSymbol.innerRadius || 0.382);
                allPoints.push({
                    x: pos.cx + rad * Math.cos(ang),
                    y: pos.cy + rad * Math.sin(ang)
                });
            }
        });

        const minX = Math.min(...allPoints.map(p => p.x));
        const maxX = Math.max(...allPoints.map(p => p.x));
        const minY = Math.min(...allPoints.map(p => p.y));
        const maxY = Math.max(...allPoints.map(p => p.y));
        const padding = r * 0.2;

        return (
            <g key={index}>
                {/* Render all stars in the group */}
                {positions.map((pos, i) => {
                    // Calculate radial rotation if enabled
                    let starRotation = null;
                    if (mergedSymbol.rotateRadially && mergedSymbol.layout === 'arc') {
                        // Calculate angle from center (cx, cy) to this star's position
                        const angle = Math.atan2(pos.cy - cy, pos.cx - cx);
                        // Convert to degrees and add 90 to point outward
                        starRotation = (angle * 180 / Math.PI) + 90;
                    }

                    return (
                        <polygon
                            key={`star-${i}`}
                            points={generateSingleStarPoints(pos.cx, pos.cy, starRotation)}
                            fill={highlightMode ? 'none' : color}
                            {...(!highlightMode ? {} : {})}
                        />
                    );
                })}
                {/* Single invisible rect for interaction - covers the entire group */}
                <rect
                    x={minX - padding}
                    y={minY - padding}
                    width={maxX - minX + padding * 2}
                    height={maxY - minY + padding * 2}
                    fill="transparent"
                    stroke={highlightMode ? (styles.stroke || '#3B82F6') : 'none'}
                    strokeWidth={highlightMode ? (styles.strokeWidth || 4) : 0}
                    {...(!highlightMode ? bindEvents('symbol', index) : {})}
                />
            </g>
        );
    }
    if (mergedSymbol.type === 'circle') {
        const circleR = mergedSymbol.radius !== undefined ? height * mergedSymbol.radius : r * 1.5;

        // Support aspectRatio to create ovals/ellipses
        if (mergedSymbol.aspectRatio) {
            const ry = circleR;
            const rx = circleR * mergedSymbol.aspectRatio;
            return <ellipse key={index} cx={cx} cy={cy} rx={rx} ry={ry} {...commonProps} />;
        }

        return <circle key={index} cx={cx} cy={cy} r={circleR} {...commonProps} />;
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