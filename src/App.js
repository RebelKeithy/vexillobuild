import React, {useState} from 'react';
import {CheckCircle2, Trophy, MousePointer2} from 'lucide-react';
import {useGameState} from './hooks/useGameState';
import {Header} from './components/Header';
import {LevelInfo} from './components/LevelInfo';
import {Palette} from './components/Palette';
import {FlagPreview} from './components/flag-renderer/FlagRenderer';
import {ControlPanel} from './components/ControlPanel';

export default function App() {
    const [currentLevelId, setCurrentLevelId] = useState(16); // Default to Australia for debugging
    const [activeTab, setActiveTab] = useState('base');

    const {
        gameState,
        selectedColor,
        setSelectedColor,
        selectedElement,
        setSelectedElement,
        feedback,
        setFeedback,
        level,
        updateColor,
        updateProp,
        addItem,
        removeItem,
        validate
    } = useGameState(currentLevelId);

    // Reset active tab when level changes
    React.useEffect(() => {
        setActiveTab('base');
        setFeedback(null);
    }, [currentLevelId, setFeedback]);

    // --- INTERACTION HANDLERS ---

    const handlePaletteClick = (colorKey) => {
        if (selectedElement) {
            // If a shape is selected, apply this color to it immediately
            updateColor(selectedElement.type, selectedElement.index, colorKey, selectedElement.colorIndex);
        } else {
            // Toggle selection of color
            if (selectedColor === colorKey) setSelectedColor(null);
            else setSelectedColor(colorKey);
        }
    };

    const handleFlagInteraction = (action, payload) => {
        const {type, index, colorIndex} = payload.target || payload;

        if (action === 'click') {
            if (selectedColor) {
                // Painting mode
                updateColor(type, index, selectedColor, colorIndex);
            } else {
                // Selection mode
                if (selectedElement && selectedElement.type === type && selectedElement.index === index && selectedElement.colorIndex === colorIndex) {
                    setSelectedElement(null); // Deselect
                } else {
                    setSelectedElement({type, index, colorIndex});
                    // Switch tab to match selection
                    setActiveTab(type === 'base' ? 'base' : type + 's');
                }
            }
        } else if (action === 'drop') {
            const {data} = payload;
            if (data.source === 'palette') {
                // Standard drop from palette
                updateColor(type, index, data.color, colorIndex);
            }
        }
    };

    const handleBackgroundClick = (e) => {
        // Deselect if clicking pure background
        if (e.target.dataset.bg) {
            setSelectedColor(null);
            setSelectedElement(null);
        }
    };

    if (!gameState) return <div className="p-10 text-center">Loading...</div>;

    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 font-sans" onClick={handleBackgroundClick}
             data-bg="true">

            <Header currentLevelId={currentLevelId} setCurrentLevelId={setCurrentLevelId} />

            <main className="max-w-6xl mx-auto p-4 grid md:grid-cols-12 gap-8" data-bg="true">
                <div className="md:col-span-7 flex flex-col gap-6" data-bg="true">
                    <LevelInfo level={level} />

                    <div
                        className="bg-white/5 p-6 rounded-xl border border-white/10 flex flex-col items-center min-h-[400px]"
                        data-bg="true">
                        <Palette selectedColor={selectedColor} onColorClick={handlePaletteClick} />

                        <div className="relative group w-full">
                            {/* Visual Hint for Interactions */}
                            <div
                                className="absolute -top-8 left-0 right-0 text-center text-xs text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <span className="flex items-center justify-center gap-2">
                    <MousePointer2 size={12}/> Click to Select / Paint
                  </span>
                            </div>

                            <FlagPreview
                                flagState={gameState}
                                onInteraction={handleFlagInteraction}
                                selectedElement={selectedElement}
                                currentLevelId={currentLevelId}
                            />
                        </div>

                        {feedback && (
                            <div
                                className={`mt-4 px-4 py-2 rounded flex items-center gap-2 ${feedback.type === 'success' ? 'bg-green-900/50 text-green-200' : 'bg-red-900/50 text-red-200'}`}>
                                {feedback.type === 'success' ? <Trophy size={16}/> : <CheckCircle2 size={16}/>}
                                {feedback.msg}
                            </div>
                        )}
                    </div>

                    <button onClick={validate}
                            className="w-full py-4 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold text-lg flex justify-center gap-2 transition-colors">
                        <CheckCircle2/> Validate
                    </button>
                </div>

                <ControlPanel
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    gameState={gameState}
                    selectedElement={selectedElement}
                    setSelectedElement={setSelectedElement}
                    updateProp={updateProp}
                    removeItem={removeItem}
                    addItem={addItem}
                />
            </main>
        </div>
    );
}