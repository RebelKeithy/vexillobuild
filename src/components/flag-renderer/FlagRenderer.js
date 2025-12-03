import React, {useState, useMemo} from 'react';
import {LEVELS} from '../../flags';
import {BaseLayer} from './BaseLayer';
import {OverlayLayer} from './OverlayLayer';
import {SymbolLayer} from './SymbolLayer';

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
                    <BaseLayer
                        base={base}
                        width={width}
                        height={height}
                        bindEvents={bindEvents}
                        isSelected={isSelected}
                        isHovered={isHovered}
                        getHighlightStyles={getHighlightStyles}
                    />
                    {overlays.map((o, i) => (
                        <OverlayLayer
                            key={i}
                            overlay={o}
                            index={i}
                            width={width}
                            height={height}
                            currentLevel={currentLevel}
                            overlays={overlays}
                            bindEvents={bindEvents}
                            isSelected={isSelected}
                            isHovered={isHovered}
                            getHighlightStyles={getHighlightStyles}
                        />
                    ))}
                    {symbols.map((s, i) => (
                        <SymbolLayer
                            key={i}
                            symbol={s}
                            index={i}
                            width={width}
                            height={height}
                            currentLevel={currentLevel}
                            symbols={symbols}
                            overlays={overlays}
                            bindEvents={bindEvents}
                            isSelected={isSelected}
                            isHovered={isHovered}
                            getHighlightStyles={getHighlightStyles}
                        />
                    ))}
                </g>

                {/* BORDER */}
                <rect width={width} height={height} fill="none" stroke="#ddd" strokeWidth="1"
                      className="pointer-events-none"/>

                {/* SELECTION HIGHLIGHT LAYER (PERSISTENT) */}
                {selectedElement && (
                    <g className="pointer-events-none" style={{pointerEvents: 'none'}}>
                        {selectedElement.type === 'base' && (
                            <BaseLayer
                                base={base}
                                width={width}
                                height={height}
                                bindEvents={bindEvents}
                                isSelected={isSelected}
                                isHovered={isHovered}
                                highlightMode="selection"
                                getHighlightStyles={getHighlightStyles}
                            />
                        )}
                        {selectedElement.type === 'overlay' && (
                            <OverlayLayer
                                overlay={overlays[selectedElement.index]}
                                index={selectedElement.index}
                                width={width}
                                height={height}
                                currentLevel={currentLevel}
                                overlays={overlays}
                                bindEvents={bindEvents}
                                isSelected={isSelected}
                                isHovered={isHovered}
                                highlightMode="selection"
                                getHighlightStyles={getHighlightStyles}
                            />
                        )}
                        {selectedElement.type === 'symbol' && (
                            <SymbolLayer
                                symbol={symbols[selectedElement.index]}
                                index={selectedElement.index}
                                width={width}
                                height={height}
                                currentLevel={currentLevel}
                                symbols={symbols}
                                overlays={overlays}
                                bindEvents={bindEvents}
                                isSelected={isSelected}
                                isHovered={isHovered}
                                highlightMode="selection"
                                getHighlightStyles={getHighlightStyles}
                            />
                        )}
                    </g>
                )}

                {/* HOVER HIGHLIGHT LAYER (TRANSIENT) */}
                {hovered && (
                    <g className="pointer-events-none" style={{pointerEvents: 'none'}}>
                        {hovered.type === 'base' && (
                            <BaseLayer
                                base={base}
                                width={width}
                                height={height}
                                bindEvents={bindEvents}
                                isSelected={isSelected}
                                isHovered={isHovered}
                                highlightMode="hover"
                                getHighlightStyles={getHighlightStyles}
                            />
                        )}
                        {hovered.type === 'overlay' && (
                            <OverlayLayer
                                overlay={overlays[hovered.index]}
                                index={hovered.index}
                                width={width}
                                height={height}
                                currentLevel={currentLevel}
                                overlays={overlays}
                                bindEvents={bindEvents}
                                isSelected={isSelected}
                                isHovered={isHovered}
                                highlightMode="hover"
                                getHighlightStyles={getHighlightStyles}
                            />
                        )}
                        {hovered.type === 'symbol' && (
                            <SymbolLayer
                                symbol={symbols[hovered.index]}
                                index={hovered.index}
                                width={width}
                                height={height}
                                currentLevel={currentLevel}
                                symbols={symbols}
                                overlays={overlays}
                                bindEvents={bindEvents}
                                isSelected={isSelected}
                                isHovered={isHovered}
                                highlightMode="hover"
                                getHighlightStyles={getHighlightStyles}
                            />
                        )}
                    </g>
                )}
            </svg>
        </div>
    );
};