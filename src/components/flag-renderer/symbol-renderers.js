import React from 'react';
import { SHAPE_GENERATORS } from '../../core/shape-generators';

// Generate star polygon points
const generateStarPoints = (cx, cy, r, pointsCount = 5, innerRadius = 0.382, rotation = 0) => {
    const points = [];
    const offset = (rotation * Math.PI) / 180;
    for (let i = 0; i < pointsCount * 2; i++) {
        const ang = (i * Math.PI) / pointsCount - Math.PI / 2 + offset;
        const rad = i % 2 === 0 ? r : r * innerRadius;
        points.push(`${cx + rad * Math.cos(ang)},${cy + rad * Math.sin(ang)}`);
    }
    return points.join(' ');
};

// --- Symbol Renderers ---

const renderBox = ({ index, params, commonProps }) => {
    const { cx, cy, r, radius, aspectRatio } = params;
    const size = radius ?? r;
    const w = size * 2 * aspectRatio;
    const h = size * 2;
    return <rect key={index} x={cx - w / 2} y={cy - h / 2} width={w} height={h} {...commonProps} />;
};

const renderCircle = ({ index, params, commonProps, resolveColor, highlightMode, highlightColorIndex, styles, bindEvents }) => {
    const { cx, cy, r, resolvedColor } = params;
    const circleR = params.radius ?? r * 1.5;

    // Counter-changed circle (two halves with different colors)
    if (params.counterChanged && params.colors) {
        const topColor = resolveColor(params.colors[0]);
        const bottomColor = resolveColor(params.colors[1]);
        const clipIdTop = `clip-circle-top-${index}`;
        const clipIdBottom = `clip-circle-bottom-${index}`;

        const showTopHighlight = highlightMode && highlightColorIndex === 0;
        const showBottomHighlight = highlightMode && highlightColorIndex === 1;

        const topPath = `M ${cx - circleR} ${cy} A ${circleR} ${circleR} 0 0 1 ${cx + circleR} ${cy} Z`;
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
                        <circle cx={cx} cy={cy} r={circleR} fill={topColor} clipPath={`url(#${clipIdTop})`} {...bindEvents('symbol', index, 0)} />
                        <circle cx={cx} cy={cy} r={circleR} fill={bottomColor} clipPath={`url(#${clipIdBottom})`} {...bindEvents('symbol', index, 1)} />
                    </>
                )}
                {showTopHighlight && <path d={topPath} fill="none" stroke={styles.stroke || '#3B82F6'} strokeWidth={styles.strokeWidth || 4} />}
                {showBottomHighlight && <path d={bottomPath} fill="none" stroke={styles.stroke || '#3B82F6'} strokeWidth={styles.strokeWidth || 4} />}
            </g>
        );
    }

    if (params.aspectRatio && params.aspectRatio !== 1) {
        return <ellipse key={index} cx={cx} cy={cy} rx={circleR * params.aspectRatio} ry={circleR} {...commonProps} />;
    }

    return <circle key={index} cx={cx} cy={cy} r={circleR} {...commonProps} />;
};

const renderCross = ({ index, params, commonProps }) => {
    const { cx, cy, r, radius, thickness } = params;
    const size = radius ?? r;
    const armWidth = size * thickness;
    const halfArm = armWidth / 2;

    const points = [
        `${cx - halfArm},${cy - size}`, `${cx + halfArm},${cy - size}`,
        `${cx + halfArm},${cy - halfArm}`, `${cx + size},${cy - halfArm}`,
        `${cx + size},${cy + halfArm}`, `${cx + halfArm},${cy + halfArm}`,
        `${cx + halfArm},${cy + size}`, `${cx - halfArm},${cy + size}`,
        `${cx - halfArm},${cy + halfArm}`, `${cx - size},${cy + halfArm}`,
        `${cx - size},${cy - halfArm}`, `${cx - halfArm},${cy - halfArm}`,
    ].join(' ');

    return <polygon key={index} points={points} {...commonProps} />;
};

const renderStar = ({ index, params, commonProps, highlightMode, styles, bindEvents }) => {
    const { cx, cy, r, resolvedColor, flagWidth, flagHeight, points, innerRadius, rotation, count } = params;

    // Single star
    if (count === 1) {
        return <polygon key={index} points={generateStarPoints(cx, cy, r, points, innerRadius, rotation)} {...commonProps} />;
    }

    // Multiple stars - calculate positions
    const positions = SHAPE_GENERATORS.star({
        cx, cy, r,
        args: {
            ...params,
            flagWidth,
            flagHeight,
        },
    }).positions;

    // Calculate bounding box for the entire group
    const allPoints = [];
    positions.forEach(pos => {
        for (let i = 0; i < points * 2; i++) {
            const ang = (i * Math.PI) / points - Math.PI / 2;
            const rad = i % 2 === 0 ? r : r * innerRadius;
            allPoints.push({ x: pos.cx + rad * Math.cos(ang), y: pos.cy + rad * Math.sin(ang) });
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
                let starRotation = rotation;
                if (params.rotateRadially && params.layout === 'arc') {
                    const angle = Math.atan2(pos.cy - cy, pos.cx - cx);
                    starRotation = (angle * 180 / Math.PI) + 90;
                }
                return (
                    <polygon
                        key={`star-${i}`}
                        points={generateStarPoints(pos.cx, pos.cy, r, points, innerRadius, starRotation)}
                        fill={highlightMode ? 'none' : resolvedColor}
                    />
                );
            })}
            <rect
                x={minX - padding} y={minY - padding}
                width={maxX - minX + padding * 2} height={maxY - minY + padding * 2}
                fill="transparent"
                stroke={highlightMode ? (styles.stroke || '#3B82F6') : 'none'}
                strokeWidth={highlightMode ? (styles.strokeWidth || 4) : 0}
                {...(!highlightMode ? bindEvents('symbol', index) : {})}
            />
        </g>
    );
};

const renderCrescent = ({ index, params, commonProps }) => {
    const { cx, cy, outerRadius, innerRadius, innerRadiusX, innerRadiusY, innerOffset, arc, rotation } = params;

    const pathData = SHAPE_GENERATORS.crescent({
        cx, cy,
        rOuter: outerRadius,
        rInnerX: innerRadiusX ?? innerRadius,
        rInnerY: innerRadiusY ?? innerRadius,
        innerOffset,
        arc,
    });

    if (rotation) {
        return (
            <g key={index} transform={`rotate(${rotation} ${cx} ${cy})`}>
                <path d={pathData} {...commonProps} />
            </g>
        );
    }
    return <path key={index} d={pathData} {...commonProps} />;
};

const renderRisingSun = ({ index, params, commonProps }) => {
    const { cx, cy, r } = params;
    const pathData = SHAPE_GENERATORS.risingSun({ cx, cy, r, args: params });
    return <path key={index} d={pathData} {...commonProps} />;
};

const renderSeal = ({ index, params, commonProps, highlightMode }) => {
    const { cx, cy, r } = params;
    const h = r * 2;
    const w = params.aspectRatio ? h * params.aspectRatio : h;

    if (highlightMode) {
        return <rect key={index} x={cx - w / 2} y={cy - h / 2} width={w} height={h} fill="none" {...commonProps} />;
    }
    return <image key={index} href={params.src} x={cx - w / 2} y={cy - h / 2} width={w} height={h} {...commonProps} />;
};

const renderPattern = ({ index, params, commonProps, highlightMode }) => {
    const { cx, cy, r } = params;

    let w, h;
    if (params.width !== undefined || params.height !== undefined) {
        w = params.width ?? null;
        h = params.height ?? null;
        if (w && !h && params.aspectRatio) h = w / params.aspectRatio;
        else if (h && !w && params.aspectRatio) w = h * params.aspectRatio;
    } else {
        h = r * 2;
        w = params.aspectRatio ? h * params.aspectRatio : h;
    }

    const transform = params.rotation ? `rotate(${params.rotation} ${cx} ${cy})` : undefined;

    if (highlightMode) {
        return <rect key={index} x={cx - w / 2} y={cy - h / 2} width={w} height={h} transform={transform} fill="none" {...commonProps} />;
    }
    return <image key={index} href={params.src} x={cx - w / 2} y={cy - h / 2} width={w} height={h} transform={transform} {...commonProps} />;
};

const renderExternal = ({ index, params, commonProps, highlightMode, styles, bindEvents }) => {
    const { cx, cy, r, resolvedColor } = params;

    let w, h;
    if (params.width !== undefined || params.height !== undefined) {
        w = params.width ?? null;
        h = params.height ?? null;
        if (w && !h && params.aspectRatio) h = w / params.aspectRatio;
        else if (h && !w && params.aspectRatio) w = h * params.aspectRatio;
        else if (!w && !h) {
            h = r * 2;
            w = params.aspectRatio ? h * params.aspectRatio : h;
        }
    } else {
        h = r * 2;
        w = params.aspectRatio ? h * params.aspectRatio : h;
    }

    const transform = params.rotation ? `rotate(${params.rotation} ${cx} ${cy})` : undefined;

    // No color means render as plain image
    if (params.color === null || params.color === undefined) {
        if (highlightMode) {
            return <rect key={index} x={cx - w / 2} y={cy - h / 2} width={w} height={h} transform={transform} fill="none" {...commonProps} />;
        }
        return <image key={index} href={params.src} x={cx - w / 2} y={cy - h / 2} width={w} height={h} transform={transform} {...commonProps} />;
    }

    // Color masking via foreignObject
    return (
        <g key={index}>
            <foreignObject x={cx - w / 2} y={cy - h / 2} width={w} height={h} transform={transform} {...(!highlightMode ? bindEvents('symbol', index) : {})}>
                <div style={{
                    width: '100%', height: '100%',
                    backgroundColor: resolvedColor,
                    WebkitMaskImage: `url(${params.src})`,
                    maskImage: `url(${params.src})`,
                    WebkitMaskSize: 'contain',
                    maskSize: 'contain',
                    WebkitMaskRepeat: 'no-repeat',
                    maskRepeat: 'no-repeat',
                    maskPosition: 'center',
                }} />
            </foreignObject>
            {highlightMode && (
                <rect x={cx - w / 2} y={cy - h / 2} width={w} height={h} transform={transform} fill="none" stroke={styles.stroke || '#3B82F6'} strokeWidth={styles.strokeWidth || 4} />
            )}
        </g>
    );
};

const renderStarField = ({ index, params, commonProps, highlightMode }) => {
    const { cx, cy, resolvedColor, width, height, rows, cols, starRadius, parentIndex } = params;

    // If inside a parent (canton), use parent bounds; otherwise use schema defaults (pre-converted)
    const fieldW = parentIndex !== null ? cx * 2 : width;
    const fieldH = parentIndex !== null ? cy * 2 : height;

    if (highlightMode) {
        return <rect key={index} width={fieldW} height={fieldH} fill="none" {...commonProps} />;
    }

    const stepX = fieldW / (cols + 1);
    const stepY = fieldH / (rows + 1);

    return (
        <g key={index} {...commonProps}>
            {Array.from({ length: rows * cols }).map((_, i) => {
                const row = Math.floor(i / cols) + 1;
                const col = (i % cols) + 1;
                return <circle key={i} cx={col * stepX} cy={row * stepY} r={starRadius} fill={resolvedColor} />;
            })}
            <rect width={fieldW} height={fieldH} fill="transparent" />
        </g>
    );
};

// --- Symbol Renderer Registry ---

export const SYMBOL_RENDERERS = {
    'box': renderBox,
    'circle': renderCircle,
    'cross': renderCross,
    'star': renderStar,
    'crescent': renderCrescent,
    'rising-sun': renderRisingSun,
    'seal': renderSeal,
    'pattern': renderPattern,
    'external': renderExternal,
    'star-field': renderStarField,
};