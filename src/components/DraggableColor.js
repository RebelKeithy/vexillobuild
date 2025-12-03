import React from 'react';

export const DraggableColor = ({colorKey, colorValue, isSelected, onClick}) => {
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