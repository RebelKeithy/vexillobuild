import React from 'react';
import {OverlayOptionPreview} from '../previews/OverlayOptionPreview';

export const OverlayControls = ({gameState, selectedElement, setSelectedElement, updateProp, removeItem, addItem}) => {
    return (
        <>
            {gameState.overlays.map((o, i) => (
                <div
                    key={i}
                    className={`bg-slate-700/50 p-3 rounded border relative transition-all ${
                        selectedElement?.type === 'overlay' && selectedElement?.index === i ? 'border-blue-400 ring-1 ring-blue-400' : 'border-slate-600'
                    }`}
                    onClick={() => setSelectedElement({type: 'overlay', index: i})}
                >
                    <button onClick={(e) => {
                        e.stopPropagation();
                        removeItem('overlays', i);
                    }} className="absolute top-2 right-2 hover:text-red-400">&times;</button>
                    <div className="text-sm font-bold text-blue-300 mb-2">{o.type}</div>
                    <label className="flex gap-2 text-xs cursor-pointer">
                        <input type="checkbox" checked={!!o.borderColor}
                               onChange={(e) => updateProp('overlays', i, 'borderColor', e.target.checked ? 'white' : null)}/>
                        Border
                    </label>
                    {o.type === 'triangle-corner' && (
                        <div className="mt-2 text-xs flex gap-2">
                            <label className="cursor-pointer">
                                <input type="radio" checked={o.corner === 'bottom-left'}
                                       onChange={() => updateProp('overlays', i, 'corner', 'bottom-left')}/> B-Left
                            </label>
                            <label className="cursor-pointer">
                                <input type="radio" checked={o.corner === 'bottom-right'}
                                       onChange={() => updateProp('overlays', i, 'corner', 'bottom-right')}/> B-Right
                            </label>
                        </div>
                    )}
                    {o.type === 'side' && (
                        <div className="mt-2 text-xs flex gap-2">
                            <label className="cursor-pointer">
                                <input type="radio" checked={o.side !== 'right'}
                                       onChange={() => updateProp('overlays', i, 'side', 'left')}/> Left
                            </label>
                            <label className="cursor-pointer">
                                <input type="radio" checked={o.side === 'right'}
                                       onChange={() => updateProp('overlays', i, 'side', 'right')}/> Right
                            </label>
                        </div>
                    )}
                </div>
            ))}
            <div className="grid grid-cols-2 gap-2 mt-4">
                <button onClick={() => addItem('overlays', {type: 'triangle', color: null, position: 'hoist'})}
                        className="flex flex-col items-center gap-2 p-2 bg-slate-700 hover:bg-slate-600 rounded border border-slate-600 text-xs transition-all">
                    <div className="w-full aspect-[3/2] bg-slate-800/50 rounded overflow-hidden shadow-sm">
                        <OverlayOptionPreview type="triangle"/>
                    </div>
                    <span className="font-medium">Triangle</span>
                </button>
                <button onClick={() => addItem('overlays', {type: 'canton', color: null, position: 'top-left'})}
                        className="flex flex-col items-center gap-2 p-2 bg-slate-700 hover:bg-slate-600 rounded border border-slate-600 text-xs transition-all">
                    <div className="w-full aspect-[3/2] bg-slate-800/50 rounded overflow-hidden shadow-sm">
                        <OverlayOptionPreview type="canton"/>
                    </div>
                    <span className="font-medium">Canton</span>
                </button>
                <button onClick={() => addItem('overlays', {type: 'pall', color: null})}
                        className="flex flex-col items-center gap-2 p-2 bg-slate-700 hover:bg-slate-600 rounded border border-slate-600 text-xs transition-all">
                    <div className="w-full aspect-[3/2] bg-slate-800/50 rounded overflow-hidden shadow-sm">
                        <OverlayOptionPreview type="pall"/>
                    </div>
                    <span className="font-medium">Pall</span>
                </button>
                <button onClick={() => addItem('overlays', {type: 'triangle-corner', color: null, corner: 'bottom-left', widthRatio: 0.5})}
                        className="flex flex-col items-center gap-2 p-2 bg-slate-700 hover:bg-slate-600 rounded border border-slate-600 text-xs transition-all">
                    <div className="w-full aspect-[3/2] bg-slate-800/50 rounded overflow-hidden shadow-sm">
                        <OverlayOptionPreview type="triangle-corner" defaultProps={{corner: 'bottom-left', widthRatio: 0.5}}/>
                    </div>
                    <span className="font-medium">Corner Tri</span>
                </button>
                <button onClick={() => addItem('overlays', {type: 'side', color: null, side: 'left', widthRatio: 0.33})}
                        className="flex flex-col items-center gap-2 p-2 bg-slate-700 hover:bg-slate-600 rounded border border-slate-600 text-xs transition-all">
                    <div className="w-full aspect-[3/2] bg-slate-800/50 rounded overflow-hidden shadow-sm">
                        <OverlayOptionPreview type="side" defaultProps={{side: 'left', widthRatio: 0.33}}/>
                    </div>
                    <span className="font-medium">Side</span>
                </button>
                <button onClick={() => addItem('overlays', {type: 'diamond', color: null})}
                        className="flex flex-col items-center gap-2 p-2 bg-slate-700 hover:bg-slate-600 rounded border border-slate-600 text-xs transition-all">
                    <div className="w-full aspect-[3/2] bg-slate-800/50 rounded overflow-hidden shadow-sm">
                        <OverlayOptionPreview type="diamond"/>
                    </div>
                    <span className="font-medium">Diamond</span>
                </button>
                <button onClick={() => addItem('overlays', {type: 'saltire', color: null, widthRatio: 0.15})}
                        className="flex flex-col items-center gap-2 p-2 bg-slate-700 hover:bg-slate-600 rounded border border-slate-600 text-xs transition-all">
                    <div className="w-full aspect-[3/2] bg-slate-800/50 rounded overflow-hidden shadow-sm">
                        <OverlayOptionPreview type="saltire" defaultProps={{widthRatio: 0.15}}/>
                    </div>
                    <span className="font-medium">Saltire</span>
                </button>
            </div>
        </>
    );
};