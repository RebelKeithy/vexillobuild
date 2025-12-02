import React, {useState, useEffect, useMemo} from 'react';
import {
    CheckCircle2,
    Flag,
    Star,
    Square,
    Triangle,
    Circle,
    HelpCircle,
    Trophy,
    Layout,
    Image as ImageIcon,
    Moon,
    Stamp,
    Cog,
    Sun,
    MousePointer2,
    Anchor,
    GripVertical
} from 'lucide-react';
import {LEVELS} from "./flags";
import { calculateCenterParams, generatePallPoints } from './shapes/pall';

// --- DATA: LEVELS ---

// --- CONSTANTS & UTILITIES ---

const COLORS = {
    white: '#FFFFFF',
    black: '#000000',
    red: '#EF3340',
    blue: '#00205B', // Darker blue for Australia/UK match
    lightBlue: '#69B3E7',
    green: '#007A3D',
    aquamarine: '#00778B',
    gold: '#FFD700',
    orange: '#FF6600',
};

const PLACEHOLDER_GREYS = ['#E2E8F0', '#94A3B8', '#CBD5E1', '#64748B', '#475569'];

const resolveColor = (key, idx = 0) => {
    if (key && COLORS[key]) return COLORS[key];
    return PLACEHOLDER_GREYS[idx % PLACEHOLDER_GREYS.length];
};

// --- SHAPE GENERATORS ---

const SHAPE_GENERATORS = {
    triangle: ({w, h, args}) => {
        const th = args.height ? h * args.height : h
        let vx = args.vertexXRatio ? h * args.vertexXRatio : w * 0.5
        if (args.equilateral) {
            vx = th * Math.sqrt(3) / 2
        }
        console.log(`h: ${h} vx: ${vx} th: ${th}`)
        return `0,${h/2 - th/2} ${vx},${h/2} 0,${th/2 + h/2}`;
    },
    triangleCorner: ({w, h, args}) => {
        const ratio = args.widthRatio || 0.5;
        const corner = args.corner || 'bottom-left';
        if (corner === 'bottom-left') return `0,0 0,${h} ${w * ratio},${h}`;
        if (corner === 'bottom-right') return `${w},0 ${w},${h} ${w - (w * ratio)},${h}`;
        return '';
    },
    pall: ({w, h, args}) => {
        const width = h * args.widthRatio || h * 0.2
        let center_split_x = args.centerSplitX
        let edge_split_x = args.edgeSplitX
        if (!center_split_x && !edge_split_x) {
            center_split_x = w * 0.5
        }
        let center_y_start = args.centerYStart
        let edge_y_start = args.edgeYStart
        if (!center_y_start && !edge_y_start) {
            center_y_start = 0
        }

        const points = generatePallPoints({h, w, width, center_split_x, edge_split_x, center_y_start, edge_y_start});
        return points.map(p => `${p.x},${p.y}`).join(' ');
    },
    star: ({cx, cy, r, args}) => {
        const pointsCount = args.points || 5;
        const innerRadius = args.innerRadius || (pointsCount === 5 ? 0.382 : 0.4);
        const rotation = args.rotation || 0;

        const points = [];
        const offset = (rotation * Math.PI) / 180;

        for (let i = 0; i < pointsCount * 2; i++) {
            const ang = (i * Math.PI) / pointsCount - (Math.PI / 2) + offset;
            const rad = i % 2 === 0 ? r : r * innerRadius;
            points.push(`${cx + rad * Math.cos(ang)},${cy + rad * Math.sin(ang)}`);
        }
        return points.join(' ');
    },
    risingSun: ({cx, cy, r, args}) => {
        const points = 9;
        const innerR = r * 0.5;
        let polyPoints = [];
        for (let i = 0; i < (points * 2) - 1; i++) {
            const isTip = i % 2 === 0;
            const currentRadius = isTip ? r : innerR;
            const pct = i / ((points * 2) - 2);
            const angle = Math.PI + (pct * Math.PI);
            const x = cx + currentRadius * Math.cos(angle);
            const y = cy + currentRadius * Math.sin(angle);
            polyPoints.push(`${x},${y}`);
        }
        return `M ${cx - innerR},${cy} L ${polyPoints.join(' L ')} L ${cx + innerR},${cy} Z`;
    },
    crescentStar: ({cx, cy, h, args}) => {
        const rOuter = h * (args.outerRadius || 0.25);
        const rInner = h * (args.innerRadius || 0.2);
        const rStar = h * (args.starOuterRadius || args.starRadius || 0.125);
        const xInner = args.innerOffset !== undefined ? h * args.innerOffset : h * 0.1;
        const xStar = args.starOffset ? h * args.starOffset : h * 0.1;
        const starRot = args.starRotation || 0;
        const d = xInner;
        const a = (rOuter * rOuter - rInner * rInner + d * d) / (2 * d);
        const term = rOuter * rOuter - a * a;
        let hDist = 0;
        if (term > 0.0001) hDist = Math.sqrt(term);
        else return "";
        const xIntersect = a;
        const yIntersect = hDist;
        const largeArcInner = xIntersect > xInner ? 1 : 0;
        const crescentPath = `
      M ${cx + xIntersect},${cy - yIntersect} 
      A ${rOuter} ${rOuter} 0 1 0 ${cx + xIntersect},${cy + yIntersect}
      A ${rInner} ${rInner} 0 ${largeArcInner} 1 ${cx + xIntersect},${cy - yIntersect} 
      Z
    `;

        const starArgs = {
            points: args.starPoints || args.points || 5,
            innerRadius: args.starInnerRadius,
            rotation: starRot
        };

        const starPath = SHAPE_GENERATORS.star({cx: cx + xStar, cy, r: rStar, args: starArgs});
        const starPoly = `M ${starPath.split(' ')[0]} L ${starPath.split(' ').slice(1).join(' L ')} Z`;
        return `${crescentPath} ${starPoly}`;
    }
};

// --- HELPER COMPONENTS ---

const DraggableColor = ({colorKey, colorValue, isSelected, onClick}) => {
    const handleDragStart = (e) => {
        e.dataTransfer.setData("application/json", JSON.stringify({source: 'palette', color: colorKey}));
        e.dataTransfer.effectAllowed = "copy";
    };

    return (
        <div
            draggable
            onDragStart={handleDragStart}
            onClick={() => onClick(colorKey)}
            className={`w-10 h-10 md:w-12 md:h-12 rounded-full border-2 shadow-md cursor-pointer active:cursor-grabbing hover:scale-110 transition-all relative group ${isSelected ? 'border-white ring-2 ring-blue-400 scale-110' : 'border-white/20'}`}
            style={{backgroundColor: colorValue}}
            title={colorKey}
        >
            <div
                className="absolute inset-0 rounded-full ring-2 ring-white/0 group-hover:ring-white/50 transition-all"/>
        </div>
    );
};

// --- REUSABLE RENDER LOGIC ---

const renderFlagBase = ({type, width, height, colors, count, ratios, baseState = {}, renderRect, renderPolygon}) => {
    const _renderRect = renderRect || ((idx, x, y, w, h, key) => (
        <rect key={key || idx} x={x} y={y} width={w} height={h} fill={colors[idx % colors.length]}/>
    ));

    switch (type) {
        case 'solid':
            return <g>{_renderRect(0, 0, 0, width, height)}</g>;
        case 'vertical-tricolor':
            return <g>{[0, 1, 2].map(i => _renderRect(i, (width / 3) * i, 0, width / 3, height))}</g>;
        case 'horizontal-stripes':
            const c = count || 3;
            if (ratios && ratios.length === c) {
                const totalRatio = ratios.reduce((a, b) => a + b, 0);
                const unitHeight = height / totalRatio;
                let currentY = 0;
                return <g>{ratios.map((r, i) => {
                    const h = r * unitHeight;
                    const colorIdx = colors.length === 2 ? i % 2 : i;
                    const rEl = _renderRect(colorIdx, 0, currentY, width, h, i);
                    currentY += h;
                    return rEl;
                })}</g>;
            } else {
                const h = height / c;
                return <g>{Array.from({length: c}).map((_, i) => {
                    const colorIdx = colors.length === 2 ? i % 2 : i;
                    return _renderRect(colorIdx, 0, i * h, width, h, i);
                })}</g>;
            }
        case 'bisection-horizontal':
            return <g>{[0, 1].map(i => _renderRect(i, 0, (height / 2) * i, width, height / 2))}</g>;
        case 'bisection-vertical':
            return <g>{[0, 1].map(i => _renderRect(i, (width / 2) * i, 0, width / 2, height))}</g>;
        case 'bisection-diagonal-left':
            const p1_r = `0,0 ${width},0 0,${height}`;
            const p2_r = `0,${height} ${width},${height} ${width},0`;
            return (
                <g>
                    {renderPolygon ? renderPolygon(0, p1_r, 0) : <polygon points={p1_r} fill={colors[0]}/>}
                    {renderPolygon ? renderPolygon(1, p2_r, 1) : <polygon points={p2_r} fill={colors[1]}/>}
                </g>
            );
        case 'bisection-diagonal-right':
            const p1_l = `0,0 ${width},0 ${width},${height}`;
            const p2_l = `0,0 0,${height} ${width},${height}`;
            return (
                <g>
                    {renderPolygon ? renderPolygon(0, p1_l, 0) : <polygon points={p1_l} fill={colors[0]}/>}
                    {renderPolygon ? renderPolygon(1, p2_l, 1) : <polygon points={p2_l} fill={colors[1]}/>}
                </g>
            );
        case 'serrated-vertical':
            const sCount = count || 5;
            const sRatio = baseState.xRatio || 0.25;
            const sDepth = baseState.serrationDepth || 0.15;

            // Background (Right side color) - covers whole flag (index 1)
            const bgRect = _renderRect(1, 0, 0, width, height);

            // Foreground (Left side color) - serrated polygon (index 0)
            const toothH = height / sCount;
            const xValley = width * sRatio;
            const xPeak = xValley + (width * sDepth);

            let pts = [`0,0`, `${xValley},0`];
            for (let i = 0; i < sCount; i++) {
                const yTop = i * toothH;
                const yTip = yTop + (toothH / 2);
                const yBot = (i + 1) * toothH;
                pts.push(`${xPeak},${yTip}`);
                pts.push(`${xValley},${yBot}`);
            }
            pts.push(`0,${height}`);
            const pointsStr = pts.join(' ');

            // Use provided renderPolygon or default fallback
            const poly = renderPolygon
                ? renderPolygon(0, pointsStr)
                : <polygon points={pointsStr} fill={colors[0]}/>;

            return (
                <g>
                    {bgRect}
                    {poly}
                </g>
            );
        default:
            return <g>{_renderRect(0, 0, 0, width, height)}</g>;
    }
};

export const BaseOptionPreview = ({type}) => {
    const w = 60;
    const h = 40;
    const yellow = '#FACC15'; // yellow-400
    const greyBg = '#374151'; // slate-700
    const stripesGreys = ['#D1D5DB', '#9CA3AF', '#6B7280']; // gray-300, 400, 500

    const getPreviewConfig = () => {
        switch (type) {
            case 'solid':
                return {colors: [yellow]};
            case 'vertical-tricolor':
                return {colors: stripesGreys};
            case 'horizontal-stripes':
                return {colors: stripesGreys};
            case 'bisection-horizontal':
                return {colors: [yellow, greyBg]};
            case 'bisection-vertical':
                return {colors: [yellow, greyBg]};
            case 'bisection-diagonal-left':
                return {colors: [yellow, greyBg]};
            case 'bisection-diagonal-right':
                return {colors: [yellow, greyBg]};
            case 'serrated-vertical':
                // Serrated: index 0 (foreground) = yellow, index 1 (bg) = greyBg
                return {colors: [yellow, greyBg], count: 3, baseState: {xRatio: 0.4, serrationDepth: 0.2}};
            default:
                return {colors: [greyBg]};
        }
    };

    const config = getPreviewConfig();

    return (
        <svg viewBox={`0 0 ${w} ${h}`}
             className="w-full h-auto rounded border border-slate-500 bg-slate-800 pointer-events-none">
            {renderFlagBase({
                type,
                width: w,
                height: h,
                ...config
            })}
        </svg>
    );
};

const renderFlagOverlay = ({type, width, height, overlayConfig, renderShape}) => {
    switch (type) {
        case 'triangle':
            const tPoints = SHAPE_GENERATORS.triangle({w: width, h: height, args: overlayConfig});
            return renderShape('polygon', {points: tPoints, strokeLinejoin: "round"});
        case 'triangle-corner':
            const tcPoints = SHAPE_GENERATORS.triangleCorner({w: width, h: height, args: overlayConfig});
            return renderShape('polygon', {points: tcPoints, strokeLinejoin: "round"});
        case 'canton':
            const cW = width * (overlayConfig.widthRatio || 0.4);
            const cH = height * (overlayConfig.heightRatio || 0.54);
            return renderShape('rect', {width: cW, height: cH});
        case 'pall':
            const pallPoints = SHAPE_GENERATORS.pall({w: width, h: height, args: overlayConfig});
            return renderShape('polygon', {points: pallPoints, strokeLinejoin: "round"});
        case 'side':
            const sW = width * (overlayConfig.widthRatio || 0.33);
            const side = overlayConfig.side || 'left';
            const sX = side === 'right' ? width - sW : 0;
            return renderShape('rect', {x: sX, width: sW, height});
        default:
            return null;
    }
};

export const OverlayOptionPreview = ({type, defaultProps = {}}) => {
    const w = 60;
    const h = 40;
    const yellow = '#FACC15';
    const greyBg = '#374151';

    const config = {...defaultProps};

    return (
        <svg viewBox={`0 0 ${w} ${h}`}
             className="w-full h-auto rounded border border-slate-500 bg-slate-800 pointer-events-none">
            <rect width={w} height={h} fill={greyBg}/>
            {renderFlagOverlay({
                type,
                width: w,
                height: h,
                overlayConfig: config,
                renderShape: (shapeType, props) => {
                    const common = {fill: yellow};
                    if (shapeType === 'polygon') return <polygon {...props} {...common} />;
                    if (shapeType === 'rect') return <rect {...props} {...common} />;
                    return null;
                }
            })}
        </svg>
    );
};

export const FlagPreview = ({flagState, onInteraction, selectedElement, currentLevelId}) => {
    const {base, overlays, symbols} = flagState;
    const [hovered, setHovered] = useState(null);

    const currentLevel = useMemo(() => LEVELS.find(l => l.id === currentLevelId), [currentLevelId]);

    const width = 600;
    const ratio = currentLevel?.aspectRatio || 2 / 3;
    const height = width * ratio;

    const isSelected = (type, index) =>
        selectedElement && selectedElement.type === type && selectedElement.index === index;

    const isHovered = (type, index) =>
        hovered && hovered.type === type && hovered.index === index;

    // --- INTERACTION HANDLER ---
    const bindEvents = (type, index) => ({
        onDragOver: (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = "copy";
            if (!isHovered(type, index)) setHovered({type, index});
        },
        onDrop: (e) => {
            e.preventDefault();
            e.stopPropagation();
            setHovered(null);
            const rawData = e.dataTransfer.getData("application/json");
            if (rawData) {
                try {
                    const data = JSON.parse(rawData);
                    if (data.source === 'palette') {
                        onInteraction('drop', {target: {type, index}, data});
                    }
                } catch (err) {
                    console.error(err);
                }
            }
        },
        onClick: (e) => {
            e.stopPropagation();
            onInteraction('click', {type, index});
        },
        onMouseEnter: () => setHovered({type, index}),
        onMouseLeave: () => setHovered(null),
        className: "cursor-pointer transition-opacity hover:opacity-90 outline-none"
    });

    const getHighlightStyles = (active, isSelection = false) => {
        if (!active) return {};
        return {
            stroke: isSelection ? '#3B82F6' : '#FACC15',
            strokeWidth: isSelection ? 6 : 4,
            style: {
                transform: 'scale(1.05)',
                transformBox: 'fill-box',
                transformOrigin: 'center',
                transition: 'transform 0.1s ease-out',
                filter: isSelection ? 'drop-shadow(0 0 10px rgba(59, 130, 246, 0.6))' : 'drop-shadow(0 0 8px rgba(0,0,0,0.5))',
                pointerEvents: 'none'
            },
            className: 'pointer-events-none'
        };
    };

    // --- RENDERERS ---

    const renderBase = (highlightMode = null) => {
        const {type, colors, count, ratios} = base;

        const renderRect = (idx, x, y, w, h, uniqueKey = idx) => {
            const currentlySelected = isSelected('base', idx);
            const currentlyHovered = isHovered('base', idx);

            if (highlightMode === 'selection' && !currentlySelected) return null;
            if (highlightMode === 'hover' && !currentlyHovered) return null;

            const highlightProps = highlightMode ? getHighlightStyles(true, highlightMode === 'selection') : {};
            const fill = highlightMode ? 'none' : resolveColor(colors[idx], idx);

            if (highlightMode) {
                delete highlightProps.style;
                highlightProps.strokeWidth = highlightMode === 'selection' ? 8 : 6;
                highlightProps.strokeOpacity = 0.8;
                highlightProps.style = {pointerEvents: 'none'};
            }

            const interactionProps = !highlightMode ? bindEvents('base', idx) : {};

            return (
                <rect
                    key={`${uniqueKey}-${highlightMode}`}
                    x={x} y={y} width={w} height={h}
                    fill={fill}
                    {...interactionProps}
                    {...highlightProps}
                />
            );
        };

        const renderPolygon = (idx, points, uniqueKey) => {
            const currentlySelected = isSelected('base', idx);
            const currentlyHovered = isHovered('base', idx);

            if (highlightMode === 'selection' && !currentlySelected) return null;
            if (highlightMode === 'hover' && !currentlyHovered) return null;

            const highlightProps = highlightMode ? getHighlightStyles(true, highlightMode === 'selection') : {};
            const fill = highlightMode ? 'none' : resolveColor(colors[idx], idx);

            if (highlightMode) {
                delete highlightProps.style;
                highlightProps.strokeWidth = highlightMode === 'selection' ? 8 : 6;
                highlightProps.strokeOpacity = 0.8;
                highlightProps.style = {pointerEvents: 'none'};
            }

            const interactionProps = !highlightMode ? bindEvents('base', idx) : {};

            return (
                <polygon
                    key={`${uniqueKey || idx}-${highlightMode}`}
                    points={points}
                    fill={fill}
                    {...interactionProps}
                    {...highlightProps}
                />
            );
        };

        return renderFlagBase({
            type, width, height, colors, count, ratios, baseState: base,
            renderRect,
            renderPolygon
        });
    };

    const renderOverlay = (overlay, index, highlightMode = null) => {
        const currentlySelected = isSelected('overlay', index);
        const currentlyHovered = isHovered('overlay', index);

        if (highlightMode === 'selection' && !currentlySelected) return null;
        if (highlightMode === 'hover' && !currentlyHovered) return null;

        // Intelligent Matching for Overlays
        // We only filter by corner if the overlay type implies a corner (like triangle-corner)
        // Otherwise we just match by type order (pall, triangle, etc)
        const isCornerType = ['triangle-corner'].includes(overlay.type);
        const filterFn = (o) => {
            if (o.type !== overlay.type) return false;
            if (isCornerType) return o.corner === overlay.corner;
            return true;
        };

        const myTypeIndex = overlays.slice(0, index).filter(filterFn).length;
        const targetOverlaysOfType = currentLevel?.target.overlays.filter(filterFn) || [];
        const targetOverride = targetOverlaysOfType[myTypeIndex] || targetOverlaysOfType[0] || {};

        const {color: _c, borderColor: _bc, ...geoProps} = targetOverride;
        const mergedOverlay = {...overlay, ...geoProps};

        const color = resolveColor(mergedOverlay.color, index, 3);
        const borderColor = mergedOverlay.borderColor ? COLORS[mergedOverlay.borderColor] : 'none';
        const borderW = mergedOverlay.borderColor ? height * 0.04 : 0;

        const styles = highlightMode ? getHighlightStyles(true, highlightMode === 'selection') : {};

        const props = {
            fill: highlightMode ? 'none' : color,
            stroke: highlightMode ? styles.stroke : borderColor,
            strokeWidth: highlightMode ? styles.strokeWidth : borderW,
            ...(!highlightMode ? bindEvents('overlay', index) : {}),
            ...(highlightMode ? styles : {})
        };

        const renderShape = (shapeType, shapeProps) => {
            if (shapeType === 'polygon') return <polygon key={index} {...shapeProps} {...props} />;
            if (shapeType === 'rect') return <rect key={index} {...shapeProps} {...props} />;
            return null;
        };

        return renderFlagOverlay({
            type: mergedOverlay.type,
            width, height,
            overlayConfig: mergedOverlay,
            renderShape
        });
    };

    const renderSymbol = (symbol, index, highlightMode = null) => {
        const currentlySelected = isSelected('symbol', index);
        const currentlyHovered = isHovered('symbol', index);

        // --- CRITICAL FIX START: Intelligent Matching ---
        // Instead of using .find() which just gets the first match (causing stacking),
        // we match the n-th user symbol of type T to the n-th target symbol of type T.

        // 1. Calculate which "number" symbol of this type we are rendering (e.g., "I am the 2nd Star")
        const myTypeIndex = symbols.slice(0, index).filter(s => s.type === symbol.type).length;

        // 2. Get all target symbols of this type
        const targetSymbolsOfType = currentLevel?.target.symbols.filter(s => s.type === symbol.type) || [];

        // 3. Pick the corresponding target configuration, or fall back to the first one if we exceed count
        const targetOverride = targetSymbolsOfType[myTypeIndex] || targetSymbolsOfType[0] || {};

        // --- CRITICAL FIX END ---

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

    return (
        <div className="w-full flex justify-center bg-gray-100 rounded-lg p-4 shadow-inner">
            <svg
                viewBox={`0 0 ${width} ${height}`}
                style={{width: '100%', height: 'auto', maxWidth: '600px', backgroundColor: '#fff'}}
                className="shadow-xl select-none"
            >
                <mask id="flag-mask">
                    <rect width={width} height={height} fill="white"/>
                </mask>

                {/* MAIN LAYER */}
                <g mask="url(#flag-mask)">
                    {renderBase()}
                    {overlays.map((o, i) => renderOverlay(o, i))}
                    {symbols.map((s, i) => renderSymbol(s, i))}
                </g>

                {/* BORDER */}
                <rect width={width} height={height} fill="none" stroke="#ddd" strokeWidth="1"
                      className="pointer-events-none"/>

                {/* SELECTION HIGHLIGHT LAYER (PERSISTENT) */}
                {selectedElement && (
                    <g className="pointer-events-none" style={{pointerEvents: 'none'}}>
                        {selectedElement.type === 'base' && renderBase('selection')}
                        {selectedElement.type === 'overlay' && renderOverlay(overlays[selectedElement.index], selectedElement.index, 'selection')}
                        {selectedElement.type === 'symbol' && renderSymbol(symbols[selectedElement.index], selectedElement.index, 'selection')}
                    </g>
                )}

                {/* HOVER HIGHLIGHT LAYER (TRANSIENT) */}
                {hovered && (
                    <g className="pointer-events-none" style={{pointerEvents: 'none'}}>
                        {hovered.type === 'base' && renderBase('hover')}
                        {hovered.type === 'overlay' && renderOverlay(overlays[hovered.index], hovered.index, 'hover')}
                        {hovered.type === 'symbol' && renderSymbol(symbols[hovered.index], hovered.index, 'hover')}
                    </g>
                )}
            </svg>
        </div>
    );
};


// --- MAIN APP ---

export default function App() {
    const [currentLevelId, setCurrentLevelId] = useState(16); // Default to Australia for debugging
    const [gameState, setGameState] = useState(null);
    const [activeTab, setActiveTab] = useState('base');
    const [feedback, setFeedback] = useState(null);

    // Interaction States
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedElement, setSelectedElement] = useState(null);

    const level = useMemo(() => LEVELS.find(l => l.id === currentLevelId), [currentLevelId]);

    useEffect(() => {
        const initialBaseType = 'solid';
        setGameState({
            base: {type: initialBaseType, colors: [null, null, null], count: null, ratios: null},
            overlays: [],
            symbols: []
        });
        setFeedback(null);
        setActiveTab('base');
        setSelectedColor(null);
        setSelectedElement(null);
    }, [currentLevelId]);

    // --- CORE STATE UPDATERS ---

    const updateColor = (type, index, color) => {
        setGameState(prev => {
            const next = {...prev};
            if (type === 'base') {
                const c = [...next.base.colors];
                c[index] = color;
                next.base.colors = c;
            } else if (type === 'overlay') {
                const arr = [...next.overlays];
                arr[index] = {...arr[index], color: color};
                next.overlays = arr;
            } else if (type === 'symbol') {
                const arr = [...next.symbols];
                arr[index] = {...arr[index], color: color};
                next.symbols = arr;
            }
            return next;
        });
    };

    const updateProp = (section, idx, key, val) => {
        setGameState(prev => {
            const next = {...prev};
            if (section === 'base') {
                if (key === 'type') {
                    next.base.type = val;
                    if (level.target.base.type === val && level.target.base.ratios) {
                        next.base.ratios = level.target.base.ratios;
                    } else {
                        next.base.ratios = null;
                    }
                } else if (key === 'count') {
                    next.base.count = val;
                }
            } else {
                const arr = [...next[section]];
                arr[idx] = {...arr[idx], [key]: val};
                next[section] = arr;
            }
            return next;
        });
    };

    // --- INTERACTION HANDLERS ---

    const handlePaletteClick = (colorKey) => {
        if (selectedElement) {
            // If a shape is selected, apply this color to it immediately
            updateColor(selectedElement.type, selectedElement.index, colorKey);
        } else {
            // Toggle selection of color
            if (selectedColor === colorKey) setSelectedColor(null);
            else setSelectedColor(colorKey);
        }
    };

    const handleFlagInteraction = (action, payload) => {
        const {type, index} = payload.target || payload;

        if (action === 'click') {
            if (selectedColor) {
                // Painting mode
                updateColor(type, index, selectedColor);
            } else {
                // Selection mode
                if (selectedElement && selectedElement.type === type && selectedElement.index === index) {
                    setSelectedElement(null); // Deselect
                } else {
                    setSelectedElement({type, index});
                    // Switch tab to match selection
                    setActiveTab(type === 'base' ? 'base' : type + 's');
                }
            }
        } else if (action === 'drop') {
            const {data} = payload;
            if (data.source === 'palette') {
                // Standard drop from palette
                updateColor(type, index, data.color);
            }
        }
    };

    const handleBackgroundClick = (e) => {
        // Deselect if clicking pure background
        if (e.target.dataset.bg) {
            setSelectedColor(null);
            setSelectedElement(null);
        }
    };

    // --- GENERIC HELPERS ---
    const addItem = (section, item) => setGameState(p => ({...p, [section]: [...p[section], item]}));
    const removeItem = (section, idx) => {
        setGameState(p => ({...p, [section]: p[section].filter((_, i) => i !== idx)}));
        if (selectedElement && selectedElement.type === (section === 'overlays' ? 'overlay' : 'symbol') && selectedElement.index === idx) {
            setSelectedElement(null);
        }
    };

    const validate = () => {
        const t = level.target;
        const u = gameState;

        let baseOk = t.base.type === u.base.type;
        if (!baseOk && ['bisection-horizontal', 'horizontal-stripes'].includes(t.base.type) && ['bisection-horizontal', 'horizontal-stripes'].includes(u.base.type)) {
            const tCount = t.base.count || 2;
            const uCount = u.base.count || 2;
            if (tCount === uCount) baseOk = true;
        }
        if (!baseOk) return setFeedback({type: 'error', msg: "Incorrect Pattern."});

        const tCols = t.base.colors;
        const uCols = u.base.colors.slice(0, tCols.length);
        if (JSON.stringify(tCols) !== JSON.stringify(uCols)) return setFeedback({
            type: 'error',
            msg: "Incorrect Base Colors."
        });

        if (t.overlays.length !== u.overlays.length) return setFeedback({
            type: 'error',
            msg: "Wrong number of layers."
        });
        if (t.symbols.length !== u.symbols.length) return setFeedback({type: 'error', msg: "Wrong number of symbols."});

        for (let i = 0; i < t.overlays.length; i++) {
            const tType = t.overlays[i].type;
            const uType = u.overlays[i].type;

            if (tType !== uType) return setFeedback({type: 'error', msg: `Overlay ${i + 1} incorrect shape.`});

            if (tType === 'triangle-corner') {
                if (t.overlays[i].corner !== u.overlays[i].corner)
                    return setFeedback({type: 'error', msg: `Overlay ${i + 1} incorrect corner.`});
            }

            if (t.overlays[i].color !== u.overlays[i].color)
                return setFeedback({type: 'error', msg: `Overlay ${i + 1} mismatch.`});
        }
        for (let i = 0; i < t.symbols.length; i++) {
            const tType = t.symbols[i].type === 'external' ? 'external' : t.symbols[i].type;
            const uType = u.symbols[i].type === 'external' ? 'external' : u.symbols[i].type;

            if (tType !== uType) return setFeedback({type: 'error', msg: `Symbol ${i + 1} mismatch.`});
            if (tType === 'seal') continue;
            if (t.symbols[i].color !== u.symbols[i].color)
                return setFeedback({type: 'error', msg: `Symbol ${i + 1} mismatch.`});
        }

        setFeedback({type: 'success', msg: "Flag Reconstructed Successfully!"});
    };

    if (!gameState) return <div className="p-10 text-center">Loading...</div>;

    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 font-sans" onClick={handleBackgroundClick}
             data-bg="true">

            <header className="bg-slate-800 p-4 shadow border-b border-slate-700 sticky top-0 z-50">
                <div className="max-w-6xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-2 text-xl font-bold">
                        <Flag className="text-blue-500"/> VexilloBuild
                    </div>
                    <select
                        className="bg-slate-700 border-slate-600 rounded px-2 py-1"
                        value={currentLevelId}
                        onChange={(e) => setCurrentLevelId(Number(e.target.value))}
                    >
                        {LEVELS.map(l => <option key={l.id} value={l.id}>{l.name} ({l.difficulty})</option>)}
                    </select>
                </div>
            </header>

            <main className="max-w-6xl mx-auto p-4 grid md:grid-cols-12 gap-8" data-bg="true">
                <div className="md:col-span-7 flex flex-col gap-6" data-bg="true">
                    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                        <div className="flex justify-between">
                            <h2 className="text-2xl font-bold">{level.name}</h2>
                            <HelpCircle className="text-slate-400 cursor-pointer" onClick={() => alert(level.hint)}/>
                        </div>
                        <p className="text-slate-400">{level.description}</p>
                    </div>

                    <div
                        className="bg-white/5 p-6 rounded-xl border border-white/10 flex flex-col items-center min-h-[400px]"
                        data-bg="true">
                        <div
                            className="flex flex-wrap justify-center gap-2 mb-6 bg-slate-800/50 p-2 rounded-xl border border-slate-700">
                            {/* PALETTE */}
                            {Object.keys(COLORS).map(k => (
                                <DraggableColor
                                    key={k}
                                    colorKey={k}
                                    colorValue={COLORS[k]}
                                    isSelected={selectedColor === k}
                                    onClick={handlePaletteClick}
                                />
                            ))}
                        </div>

                        <div className="relative group w-full">
                            {/* Visual Hint for Interactions */}
                            <div
                                className="absolute -top-8 left-0 right-0 text-center text-xs text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <span className="flex items-center justify-center gap-2">
                    <MousePointer2 size={12}/> Click to Select / Paint
                  </span>
                            </div>

                            <FlagPreview
                                flagState={gameState}
                                onInteraction={handleFlagInteraction}
                                selectedElement={selectedElement}
                                currentLevelId={currentLevelId}
                            />
                        </div>

                        {feedback && (
                            <div
                                className={`mt-4 px-4 py-2 rounded flex items-center gap-2 ${feedback.type === 'success' ? 'bg-green-900/50 text-green-200' : 'bg-red-900/50 text-red-200'}`}>
                                {feedback.type === 'success' ? <Trophy size={16}/> : <CheckCircle2 size={16}/>}
                                {feedback.msg}
                            </div>
                        )}
                    </div>

                    <button onClick={validate}
                            className="w-full py-4 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold text-lg flex justify-center gap-2 transition-colors">
                        <CheckCircle2/> Validate
                    </button>
                </div>

                <div
                    className="md:col-span-5 bg-slate-800 rounded-xl border border-slate-700 flex flex-col h-[600px] overflow-hidden">
                    <div className="flex border-b border-slate-700">
                        {['base', 'overlays', 'symbols'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`flex-1 py-3 capitalize font-bold transition-colors ${activeTab === tab ? 'bg-slate-700 text-white' : 'text-slate-400 hover:bg-slate-700/50'}`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <div className="p-6 overflow-y-auto flex-1 custom-scrollbar space-y-4">
                        {activeTab === 'base' && (
                            <>
                                <div className="grid grid-cols-2 gap-2">
                                    {['vertical-tricolor', 'horizontal-stripes', 'bisection-horizontal', 'bisection-vertical', 'bisection-diagonal-left', 'bisection-diagonal-right', 'solid', 'serrated-vertical'].map(t => (
                                        <button
                                            key={t}
                                            onClick={() => updateProp('base', null, 'type', t)}
                                            className={`flex flex-col items-center gap-2 p-3 rounded border text-sm capitalize transition-all ${gameState.base.type === t ? 'bg-blue-600 border-blue-400 ring-2 ring-blue-400/30' : 'bg-slate-700 border-slate-600 hover:border-slate-500 hover:bg-slate-600'}`}
                                        >
                                            <div
                                                className="w-full aspect-[3/2] bg-slate-800/50 rounded overflow-hidden shadow-sm">
                                                <BaseOptionPreview type={t}/>
                                            </div>
                                            <span className="font-medium text-xs">{t.replace('-', ' ').replace('bisection diagonal', 'diagonal')}</span>
                                        </button>
                                    ))}
                                </div>
                                {(gameState.base.type === 'horizontal-stripes' || gameState.base.type === 'serrated-vertical') && (
                                    <div className="mt-4">
                                        <label className="text-xs font-bold uppercase text-slate-500">
                                            {gameState.base.type === 'serrated-vertical' ? 'Serrations' : 'Stripes'}: {gameState.base.count || (gameState.base.type === 'serrated-vertical' ? 5 : 3)}
                                        </label>
                                        <input
                                            type="range"
                                            min="2"
                                            max="13"
                                            value={gameState.base.count || (gameState.base.type === 'serrated-vertical' ? 5 : 3)}
                                            onChange={(e) => updateProp('base', null, 'count', parseInt(e.target.value))}
                                            className="w-full accent-blue-500"
                                        />
                                    </div>
                                )}
                            </>
                        )}

                        {activeTab === 'overlays' && (
                            <>
                                {gameState.overlays.map((o, i) => (
                                    <div
                                        key={i}
                                        className={`bg-slate-700/50 p-3 rounded border relative transition-all ${
                                            selectedElement?.type === 'overlay' && selectedElement?.index === i ? 'border-blue-400 ring-1 ring-blue-400' : 'border-slate-600'
                                        }`}
                                        onClick={() => setSelectedElement({type: 'overlay', index: i})}
                                    >
                                        <button onClick={(e) => {
                                            e.stopPropagation();
                                            removeItem('overlays', i);
                                        }} className="absolute top-2 right-2 hover:text-red-400">&times;</button>
                                        <div className="text-sm font-bold text-blue-300 mb-2">{o.type}</div>
                                        <label className="flex gap-2 text-xs cursor-pointer">
                                            <input type="checkbox" checked={!!o.borderColor}
                                                   onChange={(e) => updateProp('overlays', i, 'borderColor', e.target.checked ? 'white' : null)}/>
                                            Border
                                        </label>
                                        {o.type === 'triangle-corner' && (
                                            <div className="mt-2 text-xs flex gap-2">
                                                <label className="cursor-pointer">
                                                    <input type="radio" checked={o.corner === 'bottom-left'}
                                                           onChange={() => updateProp('overlays', i, 'corner', 'bottom-left')}/> B-Left
                                                </label>
                                                <label className="cursor-pointer">
                                                    <input type="radio" checked={o.corner === 'bottom-right'}
                                                           onChange={() => updateProp('overlays', i, 'corner', 'bottom-right')}/> B-Right
                                                </label>
                                            </div>
                                        )}
                                        {o.type === 'side' && (
                                            <div className="mt-2 text-xs flex gap-2">
                                                <label className="cursor-pointer">
                                                    <input type="radio" checked={o.side !== 'right'}
                                                           onChange={() => updateProp('overlays', i, 'side', 'left')}/> Left
                                                </label>
                                                <label className="cursor-pointer">
                                                    <input type="radio" checked={o.side === 'right'}
                                                           onChange={() => updateProp('overlays', i, 'side', 'right')}/> Right
                                                </label>
                                            </div>
                                        )}
                                    </div>
                                ))}
                                <div className="grid grid-cols-2 gap-2 mt-4">
                                    <button onClick={() => addItem('overlays', {
                                        type: 'triangle',
                                        color: null,
                                        position: 'hoist'
                                    })}
                                            className="flex flex-col items-center gap-2 p-2 bg-slate-700 hover:bg-slate-600 rounded border border-slate-600 text-xs transition-all">
                                        <div
                                            className="w-full aspect-[3/2] bg-slate-800/50 rounded overflow-hidden shadow-sm">
                                            <OverlayOptionPreview type="triangle"/>
                                        </div>
                                        <span className="font-medium">Triangle</span>
                                    </button>
                                    <button onClick={() => addItem('overlays', {
                                        type: 'canton',
                                        color: null,
                                        position: 'top-left'
                                    })}
                                            className="flex flex-col items-center gap-2 p-2 bg-slate-700 hover:bg-slate-600 rounded border border-slate-600 text-xs transition-all">
                                        <div
                                            className="w-full aspect-[3/2] bg-slate-800/50 rounded overflow-hidden shadow-sm">
                                            <OverlayOptionPreview type="canton"/>
                                        </div>
                                        <span className="font-medium">Canton</span>
                                    </button>
                                    <button onClick={() => addItem('overlays', {type: 'pall', color: null})}
                                            className="flex flex-col items-center gap-2 p-2 bg-slate-700 hover:bg-slate-600 rounded border border-slate-600 text-xs transition-all">
                                        <div
                                            className="w-full aspect-[3/2] bg-slate-800/50 rounded overflow-hidden shadow-sm">
                                            <OverlayOptionPreview type="pall"/>
                                        </div>
                                        <span className="font-medium">Pall</span>
                                    </button>
                                    <button onClick={() => addItem('overlays', {
                                        type: 'triangle-corner',
                                        color: null,
                                        corner: 'bottom-left',
                                        widthRatio: 0.5
                                    })}
                                            className="flex flex-col items-center gap-2 p-2 bg-slate-700 hover:bg-slate-600 rounded border border-slate-600 text-xs transition-all">
                                        <div
                                            className="w-full aspect-[3/2] bg-slate-800/50 rounded overflow-hidden shadow-sm">
                                            <OverlayOptionPreview type="triangle-corner" defaultProps={{
                                                corner: 'bottom-left',
                                                widthRatio: 0.5
                                            }}/>
                                        </div>
                                        <span className="font-medium">Corner Tri</span>
                                    </button>
                                    <button onClick={() => addItem('overlays', {
                                        type: 'side',
                                        color: null,
                                        side: 'left',
                                        widthRatio: 0.33
                                    })}
                                            className="flex flex-col items-center gap-2 p-2 bg-slate-700 hover:bg-slate-600 rounded border border-slate-600 text-xs transition-all">
                                        <div
                                            className="w-full aspect-[3/2] bg-slate-800/50 rounded overflow-hidden shadow-sm">
                                            <OverlayOptionPreview type="side" defaultProps={{side: 'left', widthRatio: 0.33}}/>
                                        </div>
                                        <span className="font-medium">Side</span>
                                    </button>
                                </div>
                            </>
                        )}

                        {activeTab === 'symbols' && (
                            <>
                                {gameState.symbols.map((s, i) => (
                                    <div
                                        key={i}
                                        className={`bg-slate-700/50 p-3 rounded border relative transition-all ${
                                            selectedElement?.type === 'symbol' && selectedElement?.index === i ? 'border-blue-400 ring-1 ring-blue-400' : 'border-slate-600'
                                        }`}
                                        onClick={() => setSelectedElement({type: 'symbol', index: i})}
                                    >
                                        <button onClick={(e) => {
                                            e.stopPropagation();
                                            removeItem('symbols', i);
                                        }} className="absolute top-2 right-2 hover:text-red-400">&times;</button>
                                        <div className="text-sm font-bold text-yellow-500 mb-2">
                                            {s.type === 'external' ? 'Image' : s.type === 'seal' ? 'Seal' : s.type}
                                        </div>
                                        <select
                                            className="w-full bg-slate-800 text-xs p-1 rounded border border-slate-600 outline-none focus:border-blue-400"
                                            value={s.parentIndex ?? -1}
                                            onChange={(e) => updateProp('symbols', i, 'parentIndex', parseInt(e.target.value) === -1 ? null : parseInt(e.target.value))}
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <option value={-1}>Center</option>
                                            {gameState.overlays.map((o, idx) => <option key={idx}
                                                                                        value={idx}>Layer {idx + 1} ({o.type})</option>)}
                                        </select>
                                    </div>
                                ))}
                                <div className="grid grid-cols-5 gap-2 mt-4">
                                    <button onClick={() => addItem('symbols', {type: 'star', color: null})}
                                            className="p-2 bg-slate-700 hover:bg-slate-600 rounded text-xs flex flex-col items-center gap-1 transition-colors">
                                        <Star size={14}/> Star
                                    </button>
                                    <button onClick={() => addItem('symbols', {type: 'circle', color: null})}
                                            className="p-2 bg-slate-700 hover:bg-slate-600 rounded text-xs flex flex-col items-center gap-1 transition-colors">
                                        <Circle size={14}/> Circle
                                    </button>
                                    <button onClick={() => addItem('symbols', {type: 'crescent-star', color: null})}
                                            className="p-2 bg-slate-700 hover:bg-slate-600 rounded text-xs flex flex-col items-center gap-1 transition-colors">
                                        <Moon size={14}/> Crescent
                                    </button>
                                    <button onClick={() => addItem('symbols', {type: 'star-field', color: null})}
                                            className="p-2 bg-slate-700 hover:bg-slate-600 rounded text-xs flex flex-col items-center gap-1 transition-colors">
                                        <Layout size={14}/> Field
                                    </button>
                                    <button onClick={() => addItem('symbols', {
                                        type: 'external',
                                        src: 'https://upload.wikimedia.org/wikipedia/commons/b/b7/Albanian_Eagle.svg',
                                        color: null
                                    })}
                                            className="p-2 bg-slate-700 hover:bg-slate-600 rounded text-xs flex flex-col items-center gap-1 transition-colors">
                                        <ImageIcon size={14}/> Eagle
                                    </button>
                                    <button onClick={() => addItem('symbols', {
                                        type: 'seal',
                                        src: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Coat_of_arms_of_Andorra.svg',
                                        color: null
                                    })}
                                            className="p-2 bg-slate-700 hover:bg-slate-600 rounded text-xs flex flex-col items-center gap-1 transition-colors">
                                        <Stamp size={14}/> Seal
                                    </button>
                                    <button onClick={() => addItem('symbols', {
                                        type: 'external',
                                        src: 'https://upload.wikimedia.org/wikipedia/commons/0/02/Machete_and_Gear.svg',
                                        color: null
                                    })}
                                            className="p-2 bg-slate-700 hover:bg-slate-600 rounded text-xs flex flex-col items-center gap-1 transition-colors">
                                        <Cog size={14}/> Gear
                                    </button>
                                    <button onClick={() => addItem('symbols', {type: 'rising-sun', color: null})}
                                            className="p-2 bg-slate-700 hover:bg-slate-600 rounded text-xs flex flex-col items-center gap-1 transition-colors">
                                        <Sun size={14}/> Rising Sun
                                    </button>
                                    <button onClick={() => addItem('symbols', {
                                        type: 'seal',
                                        src: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Sol_de_Mayo-Bandera_de_Argentina.svg',
                                        color: null
                                    })}
                                            className="p-2 bg-slate-700 hover:bg-slate-600 rounded text-xs flex flex-col items-center gap-1 transition-colors">
                                        <Sun size={14}/> Sun of May
                                    </button>
                                    <button onClick={() => addItem('symbols', {
                                        type: 'external',
                                        src: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/Barbados_trident.svg',
                                        color: null
                                    })}
                                            className="p-2 bg-slate-700 hover:bg-slate-600 rounded text-xs flex flex-col items-center gap-1 transition-colors">
                                        <Anchor size={14}/> Trident
                                    </button>
                                    <button onClick={() => addItem('symbols', {
                                        type: 'external',
                                        src: 'https://upload.wikimedia.org/wikipedia/commons/6/6c/Dragon_from_Flag_of_Bhutan.svg',
                                        color: null
                                    })}
                                            className="p-2 bg-slate-700 hover:bg-slate-600 rounded text-xs flex flex-col items-center gap-1 transition-colors">
                                        <ImageIcon size={14}/> Dragon
                                    </button>
                                    <button onClick={() => addItem('symbols', {
                                        type: 'external',
                                        src: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Belarus_flag_pattern.svg',
                                        color: null,
                                        rotation: 90,
                                        aspectRatio: 4.5
                                    })}
                                            className="p-2 bg-slate-700 hover:bg-slate-600 rounded text-xs flex flex-col items-center gap-1 transition-colors">
                                        <GripVertical size={14}/> Pattern
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}