import React from 'react';
import {Flag, Shuffle} from 'lucide-react';
import {LEVELS} from '../flags';

export const Header = ({currentLevelId, setCurrentLevelId}) => {
    const selectRandomFlag = () => {
        const availableIds = LEVELS.map(l => l.id);
        const randomId = availableIds[Math.floor(Math.random() * availableIds.length)];
        setCurrentLevelId(randomId);
    };

    return (
        <header className="bg-slate-800 p-4 shadow border-b border-slate-700 sticky top-0 z-50">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
                <div className="flex items-center gap-2 text-xl font-bold">
                    <Flag className="text-blue-500"/> VexilloBuild
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={selectRandomFlag}
                        className="bg-slate-700 hover:bg-slate-600 border border-slate-600 rounded px-3 py-1 flex items-center gap-2 transition-colors"
                        title="Select random flag"
                    >
                        <Shuffle size={16}/> Random
                    </button>
                    <select
                        className="bg-slate-700 border-slate-600 rounded px-2 py-1"
                        value={currentLevelId}
                        onChange={(e) => setCurrentLevelId(Number(e.target.value))}
                    >
                        {LEVELS.map(l => <option key={l.id} value={l.id}>{l.name} ({l.difficulty})</option>)}
                    </select>
                </div>
            </div>
        </header>
    );
};