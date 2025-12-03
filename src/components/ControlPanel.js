import React from 'react';
import {BaseControls} from './controls/BaseControls';
import {OverlayControls} from './controls/OverlayControls';
import {SymbolControls} from './controls/SymbolControls';

export const ControlPanel = ({
    activeTab,
    setActiveTab,
    gameState,
    selectedElement,
    setSelectedElement,
    updateProp,
    removeItem,
    addItem
}) => {
    return (
        <div className="md:col-span-5 bg-slate-800 rounded-xl border border-slate-700 flex flex-col h-[720px] overflow-hidden">
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
                    <BaseControls gameState={gameState} updateProp={updateProp} />
                )}

                {activeTab === 'overlays' && (
                    <OverlayControls
                        gameState={gameState}
                        selectedElement={selectedElement}
                        setSelectedElement={setSelectedElement}
                        updateProp={updateProp}
                        removeItem={removeItem}
                        addItem={addItem}
                    />
                )}

                {activeTab === 'symbols' && (
                    <SymbolControls
                        gameState={gameState}
                        selectedElement={selectedElement}
                        setSelectedElement={setSelectedElement}
                        updateProp={updateProp}
                        removeItem={removeItem}
                        addItem={addItem}
                    />
                )}
            </div>
        </div>
    );
};