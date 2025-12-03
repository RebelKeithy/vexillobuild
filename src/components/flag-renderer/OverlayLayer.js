import React from 'react';
import {renderFlagOverlay} from '../../utils/flagRenderers';
import {resolveColor} from '../../core/utils';
import {COLORS} from '../../core/constants';

export const OverlayLayer = ({
    overlay,
    index,
    width,
    height,
    currentLevel,
    overlays,
    bindEvents,
    isSelected,
    isHovered,
    highlightMode = null,
    getHighlightStyles,
    colorOverrides = {}
}) => {
    const currentlySelected = isSelected('overlay', index);
    const currentlyHovered = isHovered('overlay', index);

    if (highlightMode === 'selection' && !currentlySelected) return null;
    if (highlightMode === 'hover' && !currentlyHovered) return null;

    // Intelligent Matching for Overlays
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

    const color = resolveColor(mergedOverlay.color, index, colorOverrides);
    const borderColor = mergedOverlay.borderColor ? (colorOverrides[mergedOverlay.borderColor] || COLORS[mergedOverlay.borderColor]) : 'none';
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