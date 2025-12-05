import {useState, useEffect, useMemo} from 'react';
import {LEVELS} from '../flags';

export const useGameState = (currentLevelId) => {
    const [gameState, setGameState] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedElement, setSelectedElement] = useState(null);
    const [feedback, setFeedback] = useState(null);

    const level = useMemo(() => LEVELS.find(l => l.id === currentLevelId), [currentLevelId]);

    useEffect(() => {
        const initialBaseType = 'solid';
        setGameState({
            base: {type: initialBaseType, colors: [null, null, null], count: null, ratios: null},
            overlays: [],
            symbols: []
        });
        setFeedback(null);
        setSelectedColor(null);
        setSelectedElement(null);
    }, [currentLevelId]);

    const updateColor = (type, index, color, colorIndex = null) => {
        setGameState(prev => {
            const next = {...prev};
            if (type === 'base') {
                const c = [...next.base.colors];
                c[index] = color;
                next.base.colors = c;
            } else if (type === 'overlay') {
                const arr = [...next.overlays];
                arr[index] = {...arr[index], color: color};
                next.overlays = arr;
            } else if (type === 'symbol') {
                const arr = [...next.symbols];
                // Support multi-color symbols (e.g., counter-changed circles)
                if (colorIndex !== null && arr[index].colors) {
                    const colors = [...arr[index].colors];
                    colors[colorIndex] = color;
                    arr[index] = {...arr[index], colors: colors};
                } else {
                    arr[index] = {...arr[index], color: color};
                }
                next.symbols = arr;
            }
            return next;
        });
    };

    const updateProp = (section, idx, key, val) => {
        setGameState(prev => {
            const next = {...prev};
            if (section === 'base') {
                if (key === 'type') {
                    next.base.type = val;
                    if (level.target.base.type === val && level.target.base.ratios) {
                        next.base.ratios = level.target.base.ratios;
                    } else {
                        next.base.ratios = null;
                    }
                } else if (key === 'count') {
                    next.base.count = val;
                }
            } else {
                const arr = [...next[section]];
                arr[idx] = {...arr[idx], [key]: val};
                next[section] = arr;
            }
            return next;
        });
    };

    const addItem = (section, item) => setGameState(p => ({...p, [section]: [...p[section], item]}));

    const removeItem = (section, idx) => {
        setGameState(p => ({...p, [section]: p[section].filter((_, i) => i !== idx)}));
        if (selectedElement && selectedElement.type === (section === 'overlays' ? 'overlay' : 'symbol') && selectedElement.index === idx) {
            setSelectedElement(null);
        }
    };

    const validate = () => {
        const t = level.target;
        const u = gameState;

        let baseOk = t.base.type === u.base.type;
        if (!baseOk && ['bisection-horizontal', 'horizontal-stripes'].includes(t.base.type) && ['bisection-horizontal', 'horizontal-stripes'].includes(u.base.type)) {
            const tCount = t.base.count || 2;
            const uCount = u.base.count || 2;
            if (tCount === uCount) baseOk = true;
        }
        if (!baseOk) return setFeedback({type: 'error', msg: "Incorrect Pattern."});

        const tCols = t.base.colors;
        const uCols = u.base.colors.slice(0, tCols.length);
        if (JSON.stringify(tCols) !== JSON.stringify(uCols)) return setFeedback({
            type: 'error',
            msg: "Incorrect Base Colors."
        });

        if (t.overlays.length !== u.overlays.length) return setFeedback({
            type: 'error',
            msg: "Wrong number of layers."
        });
        if (t.symbols.length !== u.symbols.length) return setFeedback({type: 'error', msg: "Wrong number of symbols."});

        for (let i = 0; i < t.overlays.length; i++) {
            const tType = t.overlays[i].type;
            const uType = u.overlays[i].type;

            if (tType !== uType) return setFeedback({type: 'error', msg: `Overlay ${i + 1} incorrect shape.`});

            if (tType === 'triangle-corner') {
                if (t.overlays[i].corner !== u.overlays[i].corner)
                    return setFeedback({type: 'error', msg: `Overlay ${i + 1} incorrect corner.`});
            }

            if (t.overlays[i].color !== u.overlays[i].color)
                return setFeedback({type: 'error', msg: `Overlay ${i + 1} mismatch.`});
        }
        for (let i = 0; i < t.symbols.length; i++) {
            const tType = t.symbols[i].type === 'external' ? 'external' : t.symbols[i].type;
            const uType = u.symbols[i].type === 'external' ? 'external' : u.symbols[i].type;

            if (tType !== uType) return setFeedback({type: 'error', msg: `Symbol ${i + 1} mismatch.`});
            if (tType === 'seal') continue;

            // Check colors for counter-changed symbols (e.g., circles with two halves)
            if (t.symbols[i].colors && t.symbols[i].counterChanged) {
                const tColors = t.symbols[i].colors;
                const uColors = u.symbols[i].colors || [];
                if (tColors.length !== uColors.length || !tColors.every((c, idx) => c === uColors[idx])) {
                    return setFeedback({type: 'error', msg: `Symbol ${i + 1} colors mismatch.`});
                }
            } else if (t.symbols[i].color !== u.symbols[i].color) {
                return setFeedback({type: 'error', msg: `Symbol ${i + 1} mismatch.`});
            }

            // Check star count if specified in target
            if (tType === 'star' && t.symbols[i].count !== undefined) {
                const targetCount = t.symbols[i].count;
                const userCount = u.symbols[i].count || 1;
                if (targetCount !== userCount) {
                    return setFeedback({type: 'error', msg: `Symbol ${i + 1}: Wrong number of stars.`});
                }
            }
        }

        setFeedback({type: 'success', msg: "Flag Reconstructed Successfully!"});
    };

    return {
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
    };
};