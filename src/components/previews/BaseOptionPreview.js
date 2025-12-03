import React from 'react';
import {renderFlagBase} from '../../utils/flagRenderers';

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
            case 'quadrisection-diagonal':
                return {colors: [yellow, greyBg, yellow, greyBg]};
            case 'quartered':
                return {colors: [yellow, greyBg, greyBg, yellow]};
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