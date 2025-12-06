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
    if (args.spacingX !== undefined) {
        args.spacingX = height * args.spacingX;
    }
    if (args.spacingY !== undefined) {
        args.spacingY = height * args.spacingY;
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

const renderCircle = ({index, cx, cy, r, height, mergedSymbol, commonProps, resolveColor, highlightMode, highlightColorIndex, styles, bindEvents}) => {
    const circleR = mergedSymbol.radius !== undefined ? height * mergedSymbol.radius : r * 1.5;

    // Counter-changed circle (two halves with different colors)
    if (mergedSymbol.counterChanged && mergedSymbol.colors) {
        const topColor = resolveColor(mergedSymbol.colors[0]);
        const bottomColor = resolveColor(mergedSymbol.colors[1]);
        const clipIdTop = `clip-circle-top-${index}`;
        const clipIdBottom = `clip-circle-bottom-${index}`;

        // In highlight mode, only show highlight for the specific half
        const showTopHighlight = highlightMode && highlightColorIndex === 0;
        const showBottomHighlight = highlightMode && highlightColorIndex === 1;

        // Semicircle paths for proper outline (arc + diameter line)
        // Top semicircle: arc from left to right, then line back
        const topPath = `M ${cx - circleR} ${cy} A ${circleR} ${circleR} 0 0 1 ${cx + circleR} ${cy} Z`;
        // Bottom semicircle: arc from right to left, then line back
        const bottomPath = `M ${cx + circleR} ${cy} A ${circleR} ${circleR} 0 0 1 ${cx - circleR} ${cy} Z`;

        return (
            <g key={index}>
                {!highlightMode && (
                    <>
                        <defs>
                            <clipPath id={clipIdTop}>
                                <rect x={cx - circleR} y={cy - circleR} width={circleR * 2} height={circleR} />
                            </clipPath>
                            <clipPath id={clipIdBottom}>
                                <rect x={cx - circleR} y={cy} width={circleR * 2} height={circleR} />
                            </clipPath>
                        </defs>
                        <circle
                            cx={cx}
                            cy={cy}
                            r={circleR}
                            fill={topColor}
                            clipPath={`url(#${clipIdTop})`}
                            {...bindEvents('symbol', index, 0)}
                        />
                        <circle
                            cx={cx}
                            cy={cy}
                            r={circleR}
                            fill={bottomColor}
                            clipPath={`url(#${clipIdBottom})`}
                            {...bindEvents('symbol', index, 1)}
                        />
                    </>
                )}
                {showTopHighlight && (
                    <path
                        d={topPath}
                        fill="none"
                        stroke={styles.stroke || '#3B82F6'}
                        strokeWidth={styles.strokeWidth || 4}
                    />
                )}
                {showBottomHighlight && (
                    <path
                        d={bottomPath}
                        fill="none"
                        stroke={styles.stroke || '#3B82F6'}
                        strokeWidth={styles.strokeWidth || 4}
                    />
                )}
            </g>
        );
    }

    if (mergedSymbol.aspectRatio) {
        const ry = circleR;
        const rx = circleR * mergedSymbol.aspectRatio;
        return <ellipse key={index} cx={cx} cy={cy} rx={rx} ry={ry} {...commonProps} />;
    }

    return <circle key={index} cx={cx} cy={cy} r={circleR} {...commonProps} />;
};

const renderCross = ({index, cx, cy, r, height, mergedSymbol, commonProps}) => {
    // Cross symbol - a + shape centered at cx, cy
    const size = mergedSymbol.radius !== undefined ? height * mergedSymbol.radius : r;
    const thickness = mergedSymbol.thickness !== undefined ?mergedSymbol.thickness : 0.4;
    const armWidth = size * thickness;
    const halfArm = armWidth / 2;

    console.log(`${mergedSymbol.radius} ${size} ${mergedSymbol.thickness}`)

    // Build 12-point polygon for cross shape
    const points = [
        `${cx - halfArm},${cy - size}`,     // Top of vertical arm, left
        `${cx + halfArm},${cy - size}`,     // Top of vertical arm, right
        `${cx + halfArm},${cy - halfArm}`,  // Inner top-right
        `${cx + size},${cy - halfArm}`,     // Right arm, top
        `${cx + size},${cy + halfArm}`,     // Right arm, bottom
        `${cx + halfArm},${cy + halfArm}`,  // Inner bottom-right
        `${cx + halfArm},${cy + size}`,     // Bottom of vertical arm, right
        `${cx - halfArm},${cy + size}`,     // Bottom of vertical arm, left
        `${cx - halfArm},${cy + halfArm}`,  // Inner bottom-left
        `${cx - size},${cy + halfArm}`,     // Left arm, bottom
        `${cx - size},${cy - halfArm}`,     // Left arm, top
        `${cx - halfArm},${cy - halfArm}`   // Inner top-left
    ].join(' ');

    return <polygon key={index} points={points} {...commonProps} />;
};

const renderBox = ({index, cx, cy, r, height, mergedSymbol, commonProps}) => {
    // Box/rectangle symbol centered at cx, cy
    const size = mergedSymbol.radius !== undefined ? height * mergedSymbol.radius : r * 1.5;
    const aspectRatio = mergedSymbol.aspectRatio || 1; // width/height ratio
    const w = size * 2 * aspectRatio;
    const h = size * 2;

    return <rect key={index} x={cx - w / 2} y={cy - h / 2} width={w} height={h} {...commonProps} />;
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
    'cross': renderCross,
    'box': renderBox,
    'star-field': renderStarField,
};
