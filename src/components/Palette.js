import React from 'react';
import {COLORS} from '../core/constants';
import {DraggableColor} from './DraggableColor';

export const Palette = ({selectedColor, onColorClick}) => {
    return (
        <div className="flex flex-wrap justify-center gap-2 mb-6 bg-slate-800/50 p-2 rounded-xl border border-slate-700">
            {Object.keys(COLORS).map(k => (
                <DraggableColor
                    key={k}
                    colorKey={k}
                    colorValue={COLORS[k]}
                    isSelected={selectedColor === k}
                    onClick={onColorClick}
                />
            ))}
        </div>
    );
};