import React from 'react';
import {BaseOptionPreview} from '../previews/BaseOptionPreview';

const BASE_TYPES = [
    'vertical-tricolor',
    'horizontal-stripes',
    'bisection-horizontal',
    'bisection-vertical',
    'bisection-diagonal-left',
    'bisection-diagonal-right',
    'solid',
    'serrated-vertical'
];

export const BaseControls = ({gameState, updateProp}) => {
    return (
        <>
            <div className="grid grid-cols-2 gap-2">
                {BASE_TYPES.map(t => (
                    <button
                        key={t}
                        onClick={() => updateProp('base', null, 'type', t)}
                        className={`flex flex-col items-center gap-2 p-3 rounded border text-sm capitalize transition-all ${gameState.base.type === t ? 'bg-blue-600 border-blue-400 ring-2 ring-blue-400/30' : 'bg-slate-700 border-slate-600 hover:border-slate-500 hover:bg-slate-600'}`}
                    >
                        <div className="w-full aspect-[3/2] bg-slate-800/50 rounded overflow-hidden shadow-sm">
                            <BaseOptionPreview type={t}/>
                        </div>
                        <span className="font-medium text-xs">{t.replace('-', ' ').replace('bisection diagonal', 'diagonal')}</span>
                    </button>
                ))}
            </div>
            {(gameState.base.type === 'horizontal-stripes' || gameState.base.type === 'serrated-vertical') && (
                <div className="mt-4">
                    <label className="text-xs font-bold uppercase text-slate-500">
                        {gameState.base.type === 'serrated-vertical' ? 'Serrations' : 'Stripes'}: {gameState.base.count || (gameState.base.type === 'serrated-vertical' ? 5 : 3)}
                    </label>
                    <input
                        type="range"
                        min="2"
                        max="13"
                        value={gameState.base.count || (gameState.base.type === 'serrated-vertical' ? 5 : 3)}
                        onChange={(e) => updateProp('base', null, 'count', parseInt(e.target.value))}
                        className="w-full accent-blue-500"
                    />
                </div>
            )}
        </>
    );
};