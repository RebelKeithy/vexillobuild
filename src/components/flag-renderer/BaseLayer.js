import React from 'react';
import {renderFlagBase} from '../../utils/flagRenderers';
import {resolveColor} from '../../core/utils';

export const BaseLayer = ({base, width, height, bindEvents, isSelected, isHovered, highlightMode = null, getHighlightStyles}) => {
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