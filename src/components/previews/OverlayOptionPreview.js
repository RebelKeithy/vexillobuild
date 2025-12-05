import React from 'react';
import {renderFlagOverlay} from '../../utils/flagRenderers';

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
                    if (shapeType === 'path') return <path {...props} {...common} />;
                    return null;
                }
            })}
        </svg>
    );
};