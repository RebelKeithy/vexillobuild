import React from 'react';
import {SHAPE_GENERATORS} from '../../core/shape-generators';

// Shared utility for generating star polygon points
export const generateStarPoints = (cx, cy, r, pointsCount = 5, innerRadius, rotation = 0) => {
    const inner = innerRadius ?? (pointsCount === 5 ? 0.382 : 0.4);
    const points = [];
    const offset = (rotation * Math.PI) / 180;

    for (let i = 0; i < pointsCount * 2; i++) {
        const ang = (i * Math.PI) / pointsCount - (Math.PI / 2) + offset;
        const rad = i % 2 === 0 ? r : r * inner;
        points.push(`${cx + rad * Math.cos(ang)},${cy + rad * Math.sin(ang)}`);
    }
    return points.join(' ');
};

// --- Individual Symbol Renderers ---

const renderRisingSun = ({index, cx, cy, r, mergedSymbol, commonProps}) => {
    const pathData = SHAPE_GENERATORS.risingSun({cx, cy, r, args: mergedSymbol});
    return <path key={index} d={pathData} {...commonProps} />;
};

const renderCrescent = ({index, cx, cy, height, mergedSymbol, commonProps}) => {
    const pathData = SHAPE_GENERATORS.crescent({cx, cy, h: height, args: mergedSymbol});
    return <path key={index} d={pathData} {...commonProps} />;
};

const renderSeal = ({index, cx, cy, r, mergedSymbol, commonProps, highlightMode}) => {
    const h = r * 2;
    const w = mergedSymbol.aspectRatio ? h * mergedSymbol.aspectRatio : h;

    if (highlightMode) {
        return <rect x={cx - w / 2} y={cy - h / 2} width={w} height={h} fill="none" {...commonProps} />;
    }
    return (
        <image
            key={index}
            href={mergedSymbol.src}
            x={cx - w / 2}
            y={cy - h / 2}
            width={w}
            height={h}
            {...commonProps}
        />
    );
};

const renderExternal = ({index, cx, cy, r, width, height, mergedSymbol, commonProps, highlightMode, styles, bindEvents, color}) => {
    // Support direct width/height (percentage of flag dimensions) or legacy radius-based sizing
    let w, h;
    if (mergedSymbol.width !== undefined || mergedSymbol.height !== undefined) {
        w = mergedSymbol.width !== undefined ? width * mergedSymbol.width : null;
        h = mergedSymbol.height !== undefined ? height * mergedSymbol.height : null;

        if (w && !h && mergedSymbol.aspectRatio) {
            h = w / mergedSymbol.aspectRatio;
        } else if (h && !w && mergedSymbol.aspectRatio) {
            w = h * mergedSymbol.aspectRatio;
        } else if (!w && !h) {
            h = r * 2;
            w = mergedSymbol.aspectRatio ? h * mergedSymbol.aspectRatio : h;
        }
    } else {
        h = r * 2;
        w = mergedSymbol.aspectRatio ? h * mergedSymbol.aspectRatio : h;
    }

    const rotation = mergedSymbol.rotation || 0;
    const transform = rotation ? `rotate(${rotation} ${cx} ${cy})` : undefined;

    // No color means render as plain image
    if (mergedSymbol.color === null || mergedSymbol.color === undefined) {
        if (highlightMode) {
            return <rect x={cx - w / 2} y={cy - h / 2} width={w} height={h} transform={transform} fill="none" {...commonProps} />;
        }
        return (
            <image
                key={index}
                href={mergedSymbol.src}
                x={cx - w / 2}
                y={cy - h / 2}
                width={w}
                height={h}
                transform={transform}
                {...commonProps}
            />
        );
    }

    // Color masking via foreignObject
    return (
        <g key={index}>
            <foreignObject
                x={cx - w / 2}
                y={cy - h / 2}
                width={w}
                height={h}
                transform={transform}
                {...(!highlightMode ? bindEvents('symbol', index) : {})}
            >
                <div style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: color,
                    WebkitMaskImage: `url(${mergedSymbol.src})`,
                    maskImage: `url(${mergedSymbol.src})`,
                    WebkitMaskSize: 'contain',
                    maskSize: 'contain',
                    WebkitMaskRepeat: 'no-repeat',
                    maskRepeat: 'no-repeat',
                    maskPosition: 'center'
                }}/>
            </foreignObject>
            {highlightMode && (
                <rect
                    x={cx - w / 2}
                    y={cy - h / 2}
                    width={w}
                    height={h}
                    transform={transform}
                    fill="none"
                    stroke={styles.stroke || '#3B82F6'}
                    strokeWidth={styles.strokeWidth || 4}
                />
            )}
        </g>
    );
};

const renderStar = ({index, cx, cy, r, height, mergedSymbol, commonProps, highlightMode, styles, bindEvents, color}) => {
    // Convert circleRadius and spacing from percentage to absolute value if needed
    const args = {...mergedSymbol};
    if (args.circleRadius !== undefined) {
        args.circleRadius = height * args.circleRadius;
    }
    if (args.spacing !== undefined) {
        args.spacing = height * args.spacing;
    }

    const starResult = SHAPE_GENERATORS.star({cx, cy, r, args});

    // Single star (returns string)
    if (typeof starResult === 'string') {
        return <polygon key={index} points={starResult} {...commonProps} />;
    }

    // Multiple stars (returns object with positions)
    const {positions} = starResult;
    const pointsCount = mergedSymbol.points || 5;

    // Calculate bounding box for the entire group
    const allPoints = [];
    positions.forEach(pos => {
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
            {positions.map((pos, i) => {
                let starRotation = null;
                if (mergedSymbol.rotateRadially && mergedSymbol.layout === 'arc') {
                    const angle = Math.atan2(pos.cy - cy, pos.cx - cx);
                    starRotation = (angle * 180 / Math.PI) + 90;
                }

                return (
                    <polygon
                        key={`star-${i}`}
                        points={generateStarPoints(pos.cx, pos.cy, r, pointsCount, mergedSymbol.innerRadius, starRotation ?? mergedSymbol.rotation)}
                        fill={highlightMode ? 'none' : color}
                    />
                );
            })}
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
};

const renderCircle = ({index, cx, cy, r, height, mergedSymbol, commonProps}) => {
    const circleR = mergedSymbol.radius !== undefined ? height * mergedSymbol.radius : r * 1.5;

    if (mergedSymbol.aspectRatio) {
        const ry = circleR;
        const rx = circleR * mergedSymbol.aspectRatio;
        return <ellipse key={index} cx={cx} cy={cy} rx={rx} ry={ry} {...commonProps} />;
    }

    return <circle key={index} cx={cx} cy={cy} r={circleR} {...commonProps} />;
};

const renderStarField = ({index, cx, cy, height, mergedSymbol, commonProps, highlightMode, color}) => {
    const fieldW = mergedSymbol.parentIndex !== null ? cx * 2 : mergedSymbol.width || 0.4;
    const fieldH = mergedSymbol.parentIndex !== null ? cy * 2 : mergedSymbol.height || 0.54;
    const actualW = typeof fieldW === 'number' && fieldW <= 1 ? height * fieldW / (mergedSymbol.parentIndex !== null ? 1 : 0.667) : fieldW;
    const actualH = typeof fieldH === 'number' && fieldH <= 1 ? height * fieldH : fieldH;

    if (highlightMode) {
        return <rect width={actualW} height={actualH} fill="none" {...commonProps} />;
    }

    const rows = 5, cols = 6;
    const stepX = actualW / (cols + 1);
    const stepY = actualH / (rows + 1);

    return (
        <g key={index} {...commonProps}>
            {Array.from({length: rows * cols}).map((_, i) => {
                const row = Math.floor(i / cols) + 1;
                const col = (i % cols) + 1;
                return <circle key={i} cx={col * stepX} cy={row * stepY} r={height * 0.012} fill={color}/>;
            })}
            <rect width={actualW} height={actualH} fill="transparent"/>
        </g>
    );
};

// --- Symbol Renderer Registry ---

export const SYMBOL_RENDERERS = {
    'rising-sun': renderRisingSun,
    'crescent': renderCrescent,
    'seal': renderSeal,
    'external': renderExternal,
    'star': renderStar,
    'circle': renderCircle,
    'star-field': renderStarField,
};
