import React from 'react';
import {Star, Circle, Moon, Layout, Image as ImageIcon, Stamp, Cog, Sun, Anchor, GripVertical, Building2, Leaf} from 'lucide-react';

export const SymbolControls = ({gameState, selectedElement, setSelectedElement, updateProp, removeItem, addItem}) => {
    return (
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
                        className="w-full bg-slate-800 text-xs p-1 rounded border border-slate-600 outline-none focus:border-blue-400 mb-2"
                        value={s.parentIndex ?? -1}
                        onChange={(e) => updateProp('symbols', i, 'parentIndex', parseInt(e.target.value) === -1 ? null : parseInt(e.target.value))}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <option value={-1}>Center</option>
                        {gameState.overlays.map((o, idx) => <option key={idx} value={idx}>Layer {idx + 1} ({o.type})</option>)}
                    </select>

                    {/* Star count control - only show for star symbols */}
                    {s.type === 'star' && (
                        <div className="mt-2" onClick={(e) => e.stopPropagation()}>
                            <label className="text-xs text-slate-300 block mb-1">
                                Star Count: {s.count || 1}
                            </label>
                            <input
                                type="range"
                                min="1"
                                max="20"
                                value={s.count || 1}
                                onChange={(e) => updateProp('symbols', i, 'count', parseInt(e.target.value))}
                                className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-blue-500"
                            />
                        </div>
                    )}
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
                <button onClick={() => addItem('symbols', {type: 'crescent', color: null})}
                        className="p-2 bg-slate-700 hover:bg-slate-600 rounded text-xs flex flex-col items-center gap-1 transition-colors">
                    <Moon size={14}/> Crescent
                </button>
                <button onClick={() => addItem('symbols', {type: 'star-field', color: null})}
                        className="p-2 bg-slate-700 hover:bg-slate-600 rounded text-xs flex flex-col items-center gap-1 transition-colors">
                    <Layout size={14}/> Field
                </button>
                <button onClick={() => addItem('symbols', {type: 'external', src: 'https://upload.wikimedia.org/wikipedia/commons/b/b7/Albanian_Eagle.svg', color: 'grey'})}
                        className="p-2 bg-slate-700 hover:bg-slate-600 rounded text-xs flex flex-col items-center gap-1 transition-colors">
                    <ImageIcon size={14}/> Eagle
                </button>
                <button onClick={() => addItem('symbols', {type: 'seal', src: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Coat_of_arms_of_Andorra.svg', color: null})}
                        className="p-2 bg-slate-700 hover:bg-slate-600 rounded text-xs flex flex-col items-center gap-1 transition-colors">
                    <Stamp size={14}/> Seal
                </button>
                <button onClick={() => addItem('symbols', {type: 'external', src: 'https://upload.wikimedia.org/wikipedia/commons/0/02/Machete_and_Gear.svg', color: 'grey'})}
                        className="p-2 bg-slate-700 hover:bg-slate-600 rounded text-xs flex flex-col items-center gap-1 transition-colors">
                    <Cog size={14}/> Gear
                </button>
                <button onClick={() => addItem('symbols', {type: 'rising-sun', color: null})}
                        className="p-2 bg-slate-700 hover:bg-slate-600 rounded text-xs flex flex-col items-center gap-1 transition-colors">
                    <Sun size={14}/> Rising Sun
                </button>
                <button onClick={() => addItem('symbols', {type: 'seal', src: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Sol_de_Mayo-Bandera_de_Argentina.svg', color: null})}
                        className="p-2 bg-slate-700 hover:bg-slate-600 rounded text-xs flex flex-col items-center gap-1 transition-colors">
                    <Sun size={14}/> Sun of May
                </button>
                <button onClick={() => addItem('symbols', {type: 'external', src: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/Barbados_trident.svg', color: 'grey'})}
                        className="p-2 bg-slate-700 hover:bg-slate-600 rounded text-xs flex flex-col items-center gap-1 transition-colors">
                    <Anchor size={14}/> Trident
                </button>
                <button onClick={() => addItem('symbols', {type: 'external', src: 'https://upload.wikimedia.org/wikipedia/commons/6/6c/Dragon_from_Flag_of_Bhutan.svg', color: null})}
                        className="p-2 bg-slate-700 hover:bg-slate-600 rounded text-xs flex flex-col items-center gap-1 transition-colors">
                    <ImageIcon size={14}/> Dragon
                </button>
                <button onClick={() => addItem('symbols', {type: 'external', src: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Belarus_flag_pattern.svg', color: null, rotation: 90, aspectRatio: 4.5})}
                        className="p-2 bg-slate-700 hover:bg-slate-600 rounded text-xs flex flex-col items-center gap-1 transition-colors">
                    <GripVertical size={14}/> Pattern
                </button>
                <button onClick={() => addItem('symbols', {type: 'external', src: 'https://upload.wikimedia.org/wikipedia/commons/0/06/Angkor_Wat_in_Flag_of_Cambodia.svg', color: null, aspectRatio: 1.2})}
                        className="p-2 bg-slate-700 hover:bg-slate-600 rounded text-xs flex flex-col items-center gap-1 transition-colors">
                    <Building2 size={14}/> Temple
                </button>
                <button onClick={() => addItem('symbols', {type: 'external', src: 'https://upload.wikimedia.org/wikipedia/commons/6/66/Flag_of_Canada_%28leaf%29.svg', color: 'grey'})}
                        className="p-2 bg-slate-700 hover:bg-slate-600 rounded text-xs flex flex-col items-center gap-1 transition-colors">
                    <Leaf size={14}/> Maple Leaf
                </button>
            </div>
        </>
    );
};