import React from 'react';
import {HelpCircle} from 'lucide-react';

export const LevelInfo = ({level}) => {
    return (
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
            <div className="flex justify-between">
                <h2 className="text-2xl font-bold">{level.name}</h2>
                <HelpCircle className="text-slate-400 cursor-pointer" onClick={() => alert(level.hint)}/>
            </div>
            <p className="text-slate-400">{level.description}</p>
        </div>
    );
};