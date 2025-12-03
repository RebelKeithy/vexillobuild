import React from 'react';
import {SHAPE_GENERATORS} from '../core/shape-generators';

export const renderFlagBase = ({type, width, height, colors, count, ratios, baseState = {}, renderRect, renderPolygon}) => {
    const _renderRect = renderRect || ((idx, x, y, w, h, key) => (
        <rect key={key || idx} x={x} y={y} width={w} height={h} fill={colors[idx % colors.length]}/>
    ));

    switch (type) {
        case 'solid':
            return <g>{_renderRect(0, 0, 0, width, height)}</g>;
        case 'vertical-tricolor':
            if (ratios && ratios.length === 3) {
                const totalRatio = ratios.reduce((a, b) => a + b, 0);
                const unitWidth = width / totalRatio;
                let currentX = 0;
                return <g>{ratios.map((r, i) => {
                    const w = r * unitWidth;
                    const rEl = _renderRect(i, currentX, 0, w, height, i);
                    currentX += w;
                    return rEl;
                })}</g>;
            } else {
                return <g>{[0, 1, 2].map(i => _renderRect(i, (width / 3) * i, 0, width / 3, height))}</g>;
            }
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
        case 'quadrisection-diagonal':
            // Four triangular sections: top-left, top-right, bottom-left, bottom-right
            const cx = width / 2;
            const cy = height / 2;
            const qtl = `0,0 ${width},0 ${cx},${cy}`;
            const qtr = `${width},0 ${width},${height} ${cx},${cy}`;
            const qbr = `${width},${height} 0,${height} ${cx},${cy}`;
            const qbl = `0,${height} 0,0 ${cx},${cy}`;
            return (
                <g>
                    {renderPolygon ? renderPolygon(0, qtl, 'tl') : <polygon points={qtl} fill={colors[0]}/>}
                    {renderPolygon ? renderPolygon(1, qtr, 'tr') : <polygon points={qtr} fill={colors[1]}/>}
                    {renderPolygon ? renderPolygon(2, qbr, 'br') : <polygon points={qbr} fill={colors[2]}/>}
                    {renderPolygon ? renderPolygon(3, qbl, 'bl') : <polygon points={qbl} fill={colors[3]}/>}
                </g>
            );
        case 'quartered':
            // Four rectangular quarters: top-left, top-right, bottom-left, bottom-right
            const qw = width / 2;
            const qh = height / 2;
            return (
                <g>
                    {_renderRect(0, 0, 0, qw, qh, 'tl')}
                    {_renderRect(1, qw, 0, qw, qh, 'tr')}
                    {_renderRect(2, 0, qh, qw, qh, 'bl')}
                    {_renderRect(3, qw, qh, qw, qh, 'br')}
                </g>
            );
        default:
            return <g>{_renderRect(0, 0, 0, width, height)}</g>;
    }
};

export const renderFlagOverlay = ({type, width, height, overlayConfig, renderShape}) => {
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
        case 'diamond':
            const cx = 0;
            const cy = 0;
            const diamond_height = 0.75;
            const diamond_width = 0.75 * width / height;
            const points = SHAPE_GENERATORS.diamond({w: width, h: height, cx, cy, width: diamond_width, height: diamond_height, args: overlayConfig});
            return renderShape('polygon', {points: points, strokeLinejoin: "round"});
        case 'saltire':
            const saltirePoints = SHAPE_GENERATORS.saltire({w: width, h: height, args: overlayConfig});
            return renderShape('polygon', {points: saltirePoints, strokeLinejoin: "miter"});
        case 'cross':
            const crossPoints = SHAPE_GENERATORS.cross({w: width, h: height, args: overlayConfig});
            return renderShape('polygon', {points: crossPoints});
        case 'nordic-cross':
            const nordicCrossPoints = SHAPE_GENERATORS.nordicCross({w: width, h: height, args: overlayConfig});
            return renderShape('polygon', {points: nordicCrossPoints});
        default:
            return null;
    }
};