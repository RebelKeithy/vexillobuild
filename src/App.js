import React, { useState, useEffect, useMemo } from 'react';
import {
  CheckCircle2,
  Flag,
  Star,
  Square,
  Triangle,
  Circle,
  HelpCircle,
  Trophy,
  Layout,
  Image as ImageIcon,
  Moon,
  Stamp,
  Cog,
  Sun
} from 'lucide-react';
import {LEVELS} from "./flags";

// --- CONSTANTS & UTILITIES ---

const COLORS = {
  white: '#FFFFFF',
  black: '#000000',
  red: '#EF3340',
  blue: '#0055A4',
  lightBlue: '#69B3E7',
  green: '#007A3D',
  gold: '#FFD700',
  orange: '#FF6600',
};

const PLACEHOLDER_GREYS = ['#E2E8F0', '#94A3B8', '#CBD5E1', '#64748B', '#475569'];

const resolveColor = (key, idx = 0) => {
  if (key && COLORS[key]) return COLORS[key];
  return PLACEHOLDER_GREYS[idx % PLACEHOLDER_GREYS.length];
};

// --- SHAPE & PATH GENERATORS ---

const SHAPE_GENERATORS = {
  triangle: ({ w, h, args }) => {
    const vx = args.vertexXRatio ? h * args.vertexXRatio : (h * Math.sqrt(3)) / 2 * 0.7;
    return `0,0 ${vx},${h/2} 0,${h}`;
  },
  triangleCorner: ({ w, h, args }) => {
    // Creates right-angled triangles in corners.
    // widthRatio determines how far along the x-axis the hypotenuse ends.
    const ratio = args.widthRatio || 0.5;
    const corner = args.corner || 'bottom-left';

    if (corner === 'bottom-left') {
      return `0,0 0,${h} ${w * ratio},${h}`;
    }
    if (corner === 'bottom-right') {
      return `${w},0 ${w},${h} ${w - (w * ratio)},${h}`;
    }
    return '';
  },
  pall: ({ w, h, args }) => {
    const barW = h * (args.widthRatio || 0.22);
    const crotchX = (barW / 2) / Math.tan(30 * Math.PI / 180);
    const chevron = `M -10,0 L ${crotchX},${h/2} L -10,${h}`;
    const tail = `M ${crotchX},${h/2} L ${w + 10},${h/2}`;
    return { chevron, tail, strokeWidth: barW };
  },
  star: ({ cx, cy, r, rotation = 0 }) => {
    const points = [];
    const offset = (rotation * Math.PI) / 180;
    for(let i=0; i<10; i++) {
      const ang = (i * 36) * (Math.PI/180) - (Math.PI/2) + offset;
      const rad = i % 2 === 0 ? r : r/2.618;
      points.push(`${cx + rad * Math.cos(ang)},${cy + rad * Math.sin(ang)}`);
    }
    return points.join(' ');
  },
  risingSun: ({ cx, cy, r, args }) => {
    // 7 Full Points for Antigua
    // We draw a semi-circle + rays.
    // Antigua sun: The rays emanate from the horizon.
    const points = 9;
    const innerR = r * 0.5;

    let polyPoints = [];

    for(let i = 0; i < (points * 2) - 1; i++) {
      const isTip = i % 2 === 0;
      const currentRadius = isTip ? r : innerR;

      // Distribute points evenly along the arc
      const pct = i / ((points * 2) - 2);
      const angle = Math.PI + (pct * Math.PI);

      const x = cx + currentRadius * Math.cos(angle);
      const y = cy + currentRadius * Math.sin(angle);
      polyPoints.push(`${x},${y}`);
    }

    return `M ${cx - innerR},${cy} L ${polyPoints.join(' L ')} L ${cx + innerR},${cy} Z`;
  },
  crescentStar: ({ cx, cy, h, args }) => {
    const rOuter = h * (args.outerRadius || 0.25);
    const rInner = h * (args.innerRadius || 0.2);
    const rStar = h * (args.starRadius || 0.125);

    const xInner = args.innerOffset !== undefined ? h * args.innerOffset : h * 0.1;
    const xStar = args.starOffset ? h * args.starOffset : h * 0.1;
    const starRot = args.starRotation || 0;

    const d = xInner;
    const a = (rOuter*rOuter - rInner*rInner + d*d) / (2*d);
    const term = rOuter*rOuter - a*a;

    let hDist = 0;
    if (term > 0.0001) hDist = Math.sqrt(term);
    else return "";

    const xIntersect = a;
    const yIntersect = hDist;
    const largeArcInner = xIntersect > xInner ? 1 : 0;

    const crescentPath = `
      M ${cx + xIntersect},${cy - yIntersect} 
      A ${rOuter} ${rOuter} 0 1 0 ${cx + xIntersect},${cy + yIntersect}
      A ${rInner} ${rInner} 0 ${largeArcInner} 1 ${cx + xIntersect},${cy - yIntersect} 
      Z
    `;

    const starPath = SHAPE_GENERATORS.star({
      cx: cx + xStar,
      cy: cy,
      r: rStar,
      rotation: starRot
    });

    const starPoly = `M ${starPath.split(' ')[0]} L ${starPath.split(' ').slice(1).join(' L ')} Z`;

    return `${crescentPath} ${starPoly}`;
  }
};

// --- HELPER COMPONENTS ---

const DraggableColor = ({ colorKey, colorValue }) => {
  const handleDragStart = (e) => {
    e.dataTransfer.setData("color", colorKey);
    e.dataTransfer.effectAllowed = "copy";
  };

  return (
      <div
          draggable
          onDragStart={handleDragStart}
          className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-white/20 shadow-md cursor-grab active:cursor-grabbing hover:scale-110 transition-transform relative group"
          style={{ backgroundColor: colorValue }}
          title={colorKey}
      >
        <div className="absolute inset-0 rounded-full ring-2 ring-white/0 group-hover:ring-white/50 transition-all" />
      </div>
  );
};

// --- RENDER ENGINE ---
// ... (Keep your imports, LEVELS, COLORS, and PLACEHOLDER_GREYS as they are)

// ... (Keep SHAPE_GENERATORS as is)

// ... (Keep DraggableColor as is)

// --- UPDATED RENDER ENGINE ---

const FlagPreview = ({ flagState, onColorDrop, currentLevelId }) => {
  const { base, overlays, symbols } = flagState;
  const [hovered, setHovered] = useState(null);
  const currentLevel = useMemo(() => LEVELS.find(l => l.id === currentLevelId), [currentLevelId]);

  const width = 300;
  const ratio = currentLevel?.aspectRatio || 2/3;
  const height = width * ratio;

  const isHovered = (type, index, subIndex) =>
      hovered && hovered.type === type && hovered.index === index && hovered.subIndex === subIndex;

  const bindEvents = (type, index, subIndex = null) => ({
    onDragOver: (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = "copy";
      if (!isHovered(type, index, subIndex)) setHovered({ type, index, subIndex });
    },
    onDrop: (e) => {
      e.preventDefault();
      e.stopPropagation();
      setHovered(null);
      const color = e.dataTransfer.getData("color");
      if (color && onColorDrop) onColorDrop(type, index, subIndex, color);
    },
    onMouseEnter: () => setHovered({ type, index, subIndex }),
    onMouseLeave: () => setHovered(null),
    className: "cursor-pointer transition-opacity hover:opacity-90"
  });

  // Helper for "Pop Out" styles
  const getHighlightStyles = (isActive) => {
    if (!isActive) return {};
    return {
      stroke: '#FACC15',
      strokeWidth: 4,
      // This ensures the shape scales from its own center
      style: {
        transform: 'scale(1.05)',
        transformBox: 'fill-box',
        transformOrigin: 'center',
        transition: 'transform 0.1s ease-out',
        filter: 'drop-shadow(0 0 8px rgba(0,0,0,0.5))'
      },
      className: 'pointer-events-none' // Pass clicks through the highlight to the real shape below
    };
  };

  // --- RENDERERS ---

  const renderBase = (onlyHighlightIndex = null) => {
    const { type, colors, count, ratios } = base;

    const renderRect = (idx, x, y, w, h) => {
      // If we are only rendering the highlight, skip indices that don't match
      if (onlyHighlightIndex !== null && idx !== onlyHighlightIndex) return null;

      const highlightProps = onlyHighlightIndex !== null ? getHighlightStyles(true) : {};
      const fill = onlyHighlightIndex !== null ? 'none' : resolveColor(colors[idx], idx);

      // Note: For the base layer, we usually don't scale/pop-out because it breaks the flag bounds.
      // We just apply the stroke.
      if (onlyHighlightIndex !== null) {
        delete highlightProps.style;
        highlightProps.strokeWidth = 6;
        highlightProps.stroke = "#FACC15";
      }

      return (
          <rect
              key={idx}
              x={x} y={y} width={w} height={h}
              fill={fill}
              {...(!onlyHighlightIndex ? bindEvents('base', idx) : {})}
              {...highlightProps}
          />
      );
    };

    // Logic duplicated from original to calculate positions
    switch (type) {
      case 'solid':
        return <g>{renderRect(0, 0, 0, width, height)}</g>;
      case 'vertical-tricolor':
        return (
            <g>
              {[0, 1, 2].map(i => renderRect(i, (width/3)*i, 0, width/3, height))}
            </g>
        );
      case 'horizontal-stripes':
        const c = count || 3;
        if (ratios && ratios.length === c) {
          const totalRatio = ratios.reduce((a, b) => a + b, 0);
          const unitHeight = height / totalRatio;
          let currentY = 0;
          return (
              <g>
                {ratios.map((r, i) => {
                  const h = r * unitHeight;
                  const colorIdx = colors.length === 2 ? i % 2 : i;
                  const rect = renderRect(colorIdx, 0, currentY, width, h);
                  currentY += h;
                  return rect;
                })}
              </g>
          );
        } else {
          const h = height / c;
          return (
              <g>
                {Array.from({ length: c }).map((_, i) => {
                  const colorIdx = colors.length === 2 ? i % 2 : i;
                  return renderRect(colorIdx, 0, i*h, width, h);
                })}
              </g>
          );
        }
      case 'bisection-horizontal':
        return (
            <g>
              {[0, 1].map(i => renderRect(i, 0, (height/2)*i, width, height/2))}
            </g>
        );
      case 'bisection-vertical':
        return (
            <g>
              {[0, 1].map(i => renderRect(i, (width/2)*i, 0, width/2, height))}
            </g>
        );
      default: return null;
    }
  };

  const renderOverlay = (overlay, index, isHighlight = false) => {
    const targetOverride = currentLevel?.target.overlays.find(o => o.type === overlay.type && o.corner === overlay.corner) || {};
    const { color: _c, borderColor: _bc, ...geoProps } = targetOverride;
    const mergedOverlay = { ...overlay, ...geoProps };

    const color = resolveColor(mergedOverlay.color, index, 3);
    const borderColor = mergedOverlay.borderColor ? COLORS[mergedOverlay.borderColor] : 'none';
    const borderW = mergedOverlay.borderColor ? height * 0.04 : 0;

    const styles = getHighlightStyles(isHighlight);
    const props = {
      fill: isHighlight ? 'none' : color,
      stroke: isHighlight ? styles.stroke : borderColor,
      strokeWidth: isHighlight ? styles.strokeWidth : borderW,
      ...(!isHighlight ? bindEvents('overlay', index) : {}),
      ...(isHighlight ? styles : {})
    };

    if (mergedOverlay.type === 'triangle') {
      const points = SHAPE_GENERATORS.triangle({ w: width, h: height, args: mergedOverlay });
      return <polygon key={index} points={points} strokeLinejoin="round" {...props} />;
    }
    if (mergedOverlay.type === 'triangle-corner') {
      const points = SHAPE_GENERATORS.triangleCorner({ w: width, h: height, args: mergedOverlay });
      return <polygon key={index} points={points} strokeLinejoin="round" {...props} />;
    }
    if (mergedOverlay.type === 'canton') {
      const cW = width * (mergedOverlay.widthRatio || 0.4);
      const cH = height * (mergedOverlay.heightRatio || 0.54);
      return <rect key={index} width={cW} height={cH} {...props} />;
    }
    if (mergedOverlay.type === 'pall') {
      const { chevron, tail, strokeWidth } = SHAPE_GENERATORS.pall({ w: width, h: height, args: mergedOverlay });

      // For pall highlight, we group them to ensure the whole shape pops
      if (isHighlight) {
        return (
            <g key={index} {...styles}>
              <path d={tail} stroke="#FACC15" strokeWidth={strokeWidth + 10} />
              <path d={chevron} stroke="#FACC15" strokeWidth={strokeWidth + 10} fill="none" />
            </g>
        )
      }

      return (
          <g key={index} {...(!isHighlight ? bindEvents('overlay', index) : {})}>
            {mergedOverlay.borderColor && (
                <>
                  <path d={tail} stroke={COLORS[mergedOverlay.borderColor]} strokeWidth={strokeWidth + (height*0.06)} />
                  <path d={chevron} stroke={COLORS[mergedOverlay.borderColor]} strokeWidth={strokeWidth + (height*0.06)} fill="none" />
                </>
            )}
            <path d={tail} stroke={color} strokeWidth={strokeWidth} />
            <path d={chevron} stroke={color} strokeWidth={strokeWidth} fill="none" />
          </g>
      );
    }
    return null;
  };

  const renderSymbol = (symbol, index, isHighlight = false) => {
    const targetOverride = currentLevel?.target.symbols.find(s => s.type === symbol.type) || {};
    const { color: _c, ...geoProps } = targetOverride;
    const mergedSymbol = { ...symbol, ...geoProps };

    let cx = width / 2;
    let cy = height / 2;
    let scale = mergedSymbol.scale || 1;
    let baseR = height * 0.15;

    if (mergedSymbol.yOffset) cy += height * mergedSymbol.yOffset;

    if (mergedSymbol.parentIndex !== null && overlays[mergedSymbol.parentIndex]) {
      const parent = overlays[mergedSymbol.parentIndex];
      const parentConfig = currentLevel?.target.overlays.find(o => o.type === parent.type) || {};
      if (parent.type === 'canton') {
        cx = (width * (parentConfig.widthRatio || 0.4)) / 2;
        cy = (height * (parentConfig.heightRatio || 0.54)) / 2;
        scale *= 0.5;
      } else if (parent.type === 'triangle') {
        const tW = parentConfig.vertexXRatio ? height * parentConfig.vertexXRatio : (height * Math.sqrt(3)) / 2 * 0.7;
        cx = tW * 0.35;
        scale *= 0.5;
      }
    }

    const color = resolveColor(mergedSymbol.color, index, 5);
    const styles = getHighlightStyles(isHighlight);
    const commonProps = {
      fill: isHighlight ? 'none' : color,
      display: 'block', // fixes mask issues sometimes
      ...(!isHighlight ? bindEvents('symbol', index) : {}),
      ...(isHighlight ? styles : {})
    };

    // If highlighting, ensure stroke is set on the element
    if(isHighlight) {
      commonProps.stroke = styles.stroke;
      commonProps.strokeWidth = styles.strokeWidth;
    }

    if (mergedSymbol.type === 'rising-sun') {
      const pathData = SHAPE_GENERATORS.risingSun({ cx, cy, r: baseR * scale, args: mergedSymbol });
      return <path key={index} d={pathData} {...commonProps} />;
    }

    if (mergedSymbol.type === 'crescent-star') {
      const pathData = SHAPE_GENERATORS.crescentStar({ cx, cy, h: height, args: mergedSymbol });
      return <path key={index} d={pathData} {...commonProps} />;
    }

    if (mergedSymbol.type === 'seal' && mergedSymbol.src) {
      const size = baseR * scale * 2;
      const imgProps = { ...commonProps };
      if(isHighlight) {
        // Images can't simply be stroked, so we stroke a rect around it or scaling applies via 'styles'
        return <rect x={cx - size/2} y={cy - size/2} width={size} height={size} fill="none" {...imgProps} />
      }
      return (
          <image
              key={index}
              href={mergedSymbol.src}
              x={cx - size/2}
              y={cy - size/2}
              width={size}
              height={size}
              {...imgProps}
          />
      );
    }

    if (mergedSymbol.type === 'external' && mergedSymbol.src) {
      const size = baseR * scale * 2;
      // ForeignObjects are tricky to scale cleanly without artifacts, but CSS transform works
      return (
          <foreignObject key={index} x={cx - size/2} y={cy - size/2} width={size} height={size} {...commonProps}>
            <div style={{
              width: '100%', height: '100%',
              backgroundColor: isHighlight ? 'transparent' : color,
              WebkitMaskImage: `url(${mergedSymbol.src})`, maskImage: `url(${mergedSymbol.src})`,
              WebkitMaskSize: 'contain', maskSize: 'contain',
              WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat', maskPosition: 'center',
              border: isHighlight ? '4px solid #FACC15' : 'none'
            }} />
          </foreignObject>
      );
    }

    if (mergedSymbol.type === 'star') {
      const pts = SHAPE_GENERATORS.star({ cx, cy, r: baseR * scale });
      return <polygon key={index} points={pts} {...commonProps} />;
    }

    if (mergedSymbol.type === 'circle') {
      const r = baseR * scale * 1.5;
      return <circle key={index} cx={cx} cy={cy} r={r} {...commonProps} />;
    }

    if (mergedSymbol.type === 'star-field') {
      const fieldW = mergedSymbol.parentIndex !== null ? cx * 2 : width * 0.4;
      const fieldH = mergedSymbol.parentIndex !== null ? cy * 2 : height * 0.54;
      if (isHighlight) return <rect width={fieldW} height={fieldH} fill="none" stroke="#FACC15" strokeWidth={4} />;

      // Logic for stars (implied simple placement)
      const rows=5, cols=6;
      const stepX = fieldW / (cols+1);
      const stepY = fieldH / (rows+1);
      return (
          <g key={index} {...commonProps}>
            {Array.from({length: rows*cols}).map((_, i) => {
              const r = Math.floor(i/cols) + 1;
              const c = (i%cols) + 1;
              return <circle key={i} cx={c*stepX} cy={r*stepY} r={height*0.012} fill={color} />
            })}
            {/* Invisible rect to catch mouse events over the gaps between stars */}
            <rect width={fieldW} height={fieldH} fill="transparent" />
          </g>
      );
    }

    return null;
  };

  return (
      <div className="w-full flex justify-center bg-gray-100 rounded-lg p-4 shadow-inner">
        <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: 'auto', maxWidth: '300px', backgroundColor: '#fff' }} className="shadow-xl">
          <mask id="flag-mask"><rect width={width} height={height} fill="white" /></mask>

          {/* MAIN LAYER STACK: Base -> Overlays -> Symbols */}
          <g mask="url(#flag-mask)">
            {renderBase()}
            {overlays.map((o, i) => renderOverlay(o, i, false))}
            {symbols.map((s, i) => renderSymbol(s, i, false))}
          </g>

          {/* BORDER (Permanent) */}
          <rect width={width} height={height} fill="none" stroke="#ddd" strokeWidth="1" className="pointer-events-none" />

          {/* HIGHLIGHT LAYER: Renders ON TOP of everything (Outside Mask usually, or inside if preferred) */}
          {/* We render ONLY the item that is currently hovered */}
          {hovered && (
              <g>
                {hovered.type === 'base' && renderBase(hovered.index)}
                {hovered.type === 'overlay' && renderOverlay(overlays[hovered.index], hovered.index, true)}
                {hovered.type === 'symbol' && renderSymbol(symbols[hovered.index], hovered.index, true)}
              </g>
          )}

        </svg>
      </div>
  );
};


// --- MAIN APP ---

export default function App() {
  const [currentLevelId, setCurrentLevelId] = useState(1);
  const [gameState, setGameState] = useState(null);
  const [activeTab, setActiveTab] = useState('base');
  const [feedback, setFeedback] = useState(null);

  const level = useMemo(() => LEVELS.find(l => l.id === currentLevelId), [currentLevelId]);

  useEffect(() => {
    // When level changes, initialize state.
    // CRITICAL: We must copy ratios from the level target if they exist for the initial pattern.
    const initialBaseType = 'solid'; // Default starting point is solid to encourage building

    setGameState({
      base: {
        type: initialBaseType,
        colors: [null, null, null],
        count: null, // Slider default
        ratios: null // Will be populated if user selects matching type
      },
      overlays: [],
      symbols: []
    });
    setFeedback(null);
    setActiveTab('base');
  }, [currentLevelId]);

  const updateState = (section, idx, key, val) => {
    setGameState(prev => {
      const next = { ...prev };
      if (section === 'base') {
        // If we are changing the base type, check if the NEW type matches the level target
        // If so, automatically bring in the ratios to help the user.
        if (key === 'type') {
          next.base.type = val;
          if (level.target.base.type === val && level.target.base.ratios) {
            next.base.ratios = level.target.base.ratios;
          } else {
            next.base.ratios = null; // Reset ratios for non-matching types
          }
        } else if (key === 'count') {
          next.base.count = val;
        } else {
          // Colors
          const c = [...next.base.colors];
          c[idx] = val;
          next.base.colors = c;
        }
      } else {
        const arr = [...next[section]];
        if (key) arr[idx] = { ...arr[idx], [key]: val };
        else arr[idx] = { ...arr[idx], color: val };
        next[section] = arr;
      }
      return next;
    });
  };

  const handleDrop = (type, idx, subIdx, color) => updateState(type === 'base' ? 'base' : type + 's', idx, null, color);

  // Generic add/remove helpers
  const addItem = (section, item) => setGameState(p => ({ ...p, [section]: [...p[section], item] }));
  const removeItem = (section, idx) => setGameState(p => ({ ...p, [section]: p[section].filter((_, i) => i !== idx) }));

  const validate = () => {
    const t = level.target;
    const u = gameState;

    let baseOk = t.base.type === u.base.type;
    if (!baseOk && ['bisection-horizontal', 'horizontal-stripes'].includes(t.base.type) && ['bisection-horizontal', 'horizontal-stripes'].includes(u.base.type)) {
      const tCount = t.base.count || 2;
      const uCount = u.base.count || 2;
      if (tCount === uCount) baseOk = true;
    }
    if (!baseOk) return setFeedback({ type: 'error', msg: "Incorrect Pattern." });

    const tCols = t.base.colors;
    const uCols = u.base.colors.slice(0, tCols.length);
    if (JSON.stringify(tCols) !== JSON.stringify(uCols)) return setFeedback({ type: 'error', msg: "Incorrect Base Colors." });

    if (t.overlays.length !== u.overlays.length) return setFeedback({ type: 'error', msg: "Wrong number of layers." });
    if (t.symbols.length !== u.symbols.length) return setFeedback({ type: 'error', msg: "Wrong number of symbols." });

    for(let i=0; i<t.overlays.length; i++) {
      const tType = t.overlays[i].type;
      const uType = u.overlays[i].type;

      if (tType !== uType) return setFeedback({ type: 'error', msg: `Overlay ${i+1} incorrect shape.` });

      if (tType === 'triangle-corner') {
        if (t.overlays[i].corner !== u.overlays[i].corner)
          return setFeedback({ type: 'error', msg: `Overlay ${i+1} incorrect corner.` });
      }

      if (t.overlays[i].color !== u.overlays[i].color)
        return setFeedback({ type: 'error', msg: `Overlay ${i+1} mismatch.` });
    }
    for(let i=0; i<t.symbols.length; i++) {
      const tType = t.symbols[i].type === 'external' ? 'external' : t.symbols[i].type;
      const uType = u.symbols[i].type === 'external' ? 'external' : u.symbols[i].type;

      if (tType !== uType) return setFeedback({ type: 'error', msg: `Symbol ${i+1} mismatch.` });

      // Skip color check for Seal
      if (tType === 'seal') continue;

      if (t.symbols[i].color !== u.symbols[i].color)
        return setFeedback({ type: 'error', msg: `Symbol ${i+1} mismatch.` });
    }

    setFeedback({ type: 'success', msg: "Flag Reconstructed Successfully!" });
  };

  if (!gameState) return <div className="p-10 text-center">Loading...</div>;

  return (
      <div className="min-h-screen bg-slate-900 text-slate-100 font-sans">
        <header className="bg-slate-800 p-4 shadow border-b border-slate-700 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-2 text-xl font-bold">
              <Flag className="text-blue-500" /> VexilloBuild
            </div>
            <select
                className="bg-slate-700 border-slate-600 rounded px-2 py-1"
                value={currentLevelId}
                onChange={(e) => setCurrentLevelId(Number(e.target.value))}
            >
              {LEVELS.map(l => <option key={l.id} value={l.id}>{l.name} ({l.difficulty})</option>)}
            </select>
          </div>
        </header>

        <main className="max-w-6xl mx-auto p-4 grid md:grid-cols-12 gap-8">
          <div className="md:col-span-7 flex flex-col gap-6">
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
              <div className="flex justify-between">
                <h2 className="text-2xl font-bold">{level.name}</h2>
                <HelpCircle className="text-slate-400 cursor-pointer" onClick={() => alert(level.hint)} />
              </div>
              <p className="text-slate-400">{level.description}</p>
            </div>

            <div className="bg-white/5 p-6 rounded-xl border border-white/10 flex flex-col items-center min-h-[350px]">
              <div className="flex gap-2 mb-6 bg-slate-800/50 p-2 rounded-full">
                {Object.keys(COLORS).map(k => <DraggableColor key={k} colorKey={k} colorValue={COLORS[k]} />)}
              </div>
              <FlagPreview flagState={gameState} onColorDrop={handleDrop} currentLevelId={currentLevelId} />
              {feedback && (
                  <div className={`mt-4 px-4 py-2 rounded flex items-center gap-2 ${feedback.type === 'success' ? 'bg-green-900/50 text-green-200' : 'bg-red-900/50 text-red-200'}`}>
                    {feedback.type === 'success' ? <Trophy size={16} /> : <CheckCircle2 size={16} />}
                    {feedback.msg}
                  </div>
              )}
            </div>

            <button onClick={validate} className="w-full py-4 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold text-lg flex justify-center gap-2">
              <CheckCircle2 /> Validate
            </button>
          </div>

          <div className="md:col-span-5 bg-slate-800 rounded-xl border border-slate-700 flex flex-col h-[600px]">
            <div className="flex border-b border-slate-700">
              {['base', 'overlays', 'symbols'].map(tab => (
                  <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex-1 py-3 capitalize font-bold ${activeTab === tab ? 'bg-slate-700 text-white' : 'text-slate-400 hover:bg-slate-700/50'}`}
                  >
                    {tab}
                  </button>
              ))}
            </div>

            <div className="p-6 overflow-y-auto flex-1 custom-scrollbar space-y-4">
              {activeTab === 'base' && (
                  <>
                    <div className="grid grid-cols-2 gap-2">
                      {['vertical-tricolor', 'horizontal-stripes', 'bisection-horizontal', 'bisection-vertical', 'solid'].map(t => (
                          <button
                              key={t}
                              onClick={() => updateState('base', null, 'type', t)}
                              className={`p-3 rounded border text-sm capitalize ${gameState.base.type === t ? 'bg-blue-600 border-blue-400' : 'bg-slate-700 border-slate-600'}`}
                          >
                            {t.replace('-', ' ')}
                          </button>
                      ))}
                    </div>
                    {gameState.base.type === 'horizontal-stripes' && (
                        <div className="mt-4">
                          <label className="text-xs font-bold uppercase text-slate-500">Stripes: {gameState.base.count || 3}</label>
                          <input type="range" min="2" max="13" value={gameState.base.count || 3} onChange={(e) => updateState('base', null, 'count', parseInt(e.target.value))} className="w-full" />
                        </div>
                    )}
                  </>
              )}

              {activeTab === 'overlays' && (
                  <>
                    {gameState.overlays.map((o, i) => (
                        <div key={i} className="bg-slate-700/50 p-3 rounded border border-slate-600 relative">
                          <button onClick={() => removeItem('overlays', i)} className="absolute top-2 right-2 hover:text-red-400">&times;</button>
                          <div className="text-sm font-bold text-blue-300 mb-2">{o.type}</div>
                          <label className="flex gap-2 text-xs">
                            <input type="checkbox" checked={!!o.borderColor} onChange={(e) => updateState('overlays', i, 'borderColor', e.target.checked ? 'white' : null)} />
                            Border
                          </label>
                          {o.type === 'triangle-corner' && (
                              <div className="mt-2 text-xs flex gap-2">
                                <label>
                                  <input type="radio" checked={o.corner === 'bottom-left'} onChange={() => updateState('overlays', i, 'corner', 'bottom-left')} /> B-Left
                                </label>
                                <label>
                                  <input type="radio" checked={o.corner === 'bottom-right'} onChange={() => updateState('overlays', i, 'corner', 'bottom-right')} /> B-Right
                                </label>
                              </div>
                          )}
                        </div>
                    ))}
                    <div className="grid grid-cols-2 gap-2 mt-4">
                      <button onClick={() => addItem('overlays', { type: 'triangle', color: null, position: 'hoist' })} className="p-2 bg-slate-700 rounded text-xs flex flex-col items-center gap-1"><Triangle size={14}/> Triangle</button>
                      <button onClick={() => addItem('overlays', { type: 'canton', color: null, position: 'top-left' })} className="p-2 bg-slate-700 rounded text-xs flex flex-col items-center gap-1"><Square size={14}/> Canton</button>
                      <button onClick={() => addItem('overlays', { type: 'pall', color: null })} className="p-2 bg-slate-700 rounded text-xs flex flex-col items-center gap-1"><Layout size={14}/> Pall</button>
                      <button onClick={() => addItem('overlays', { type: 'triangle-corner', color: null, corner: 'bottom-left', widthRatio: 0.5 })} className="p-2 bg-slate-700 rounded text-xs flex flex-col items-center gap-1"><Triangle className="rotate-90" size={14}/> Corner Tri</button>
                    </div>
                  </>
              )}

              {activeTab === 'symbols' && (
                  <>
                    {gameState.symbols.map((s, i) => (
                        <div key={i} className="bg-slate-700/50 p-3 rounded border border-slate-600 relative">
                          <button onClick={() => removeItem('symbols', i)} className="absolute top-2 right-2 hover:text-red-400">&times;</button>
                          <div className="text-sm font-bold text-yellow-500 mb-2">
                            {s.type === 'external' ? 'Image' : s.type === 'seal' ? 'Seal' : s.type}
                          </div>
                          <select
                              className="w-full bg-slate-800 text-xs p-1 rounded border border-slate-600"
                              value={s.parentIndex ?? -1}
                              onChange={(e) => updateState('symbols', i, 'parentIndex', parseInt(e.target.value) === -1 ? null : parseInt(e.target.value))}
                          >
                            <option value={-1}>Center</option>
                            {gameState.overlays.map((o, idx) => <option key={idx} value={idx}>Layer {idx+1} ({o.type})</option>)}
                          </select>
                        </div>
                    ))}
                    <div className="grid grid-cols-5 gap-2 mt-4">
                      <button onClick={() => addItem('symbols', { type: 'star', color: null })} className="p-2 bg-slate-700 rounded text-xs flex flex-col items-center gap-1"><Star size={14}/> Star</button>
                      <button onClick={() => addItem('symbols', { type: 'circle', color: null })} className="p-2 bg-slate-700 rounded text-xs flex flex-col items-center gap-1"><Circle size={14}/> Circle</button>
                      <button onClick={() => addItem('symbols', { type: 'crescent-star', color: null })} className="p-2 bg-slate-700 rounded text-xs flex flex-col items-center gap-1"><Moon size={14}/> Crescent</button>
                      <button onClick={() => addItem('symbols', { type: 'star-field', color: null })} className="p-2 bg-slate-700 rounded text-xs flex flex-col items-center gap-1"><Layout size={14}/> Field</button>
                      <button onClick={() => addItem('symbols', { type: 'external', src: 'https://upload.wikimedia.org/wikipedia/commons/b/b7/Albanian_Eagle.svg', color: null })} className="p-2 bg-slate-700 rounded text-xs flex flex-col items-center gap-1"><ImageIcon size={14}/> Eagle</button>
                      <button onClick={() => addItem('symbols', { type: 'seal', src: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Coat_of_arms_of_Andorra.svg', color: null })} className="p-2 bg-slate-700 rounded text-xs flex flex-col items-center gap-1"><Stamp size={14}/> Seal</button>
                      <button onClick={() => addItem('symbols', { type: 'external', src: 'https://upload.wikimedia.org/wikipedia/commons/0/02/Machete_and_Gear.svg', color: null })} className="p-2 bg-slate-700 rounded text-xs flex flex-col items-center gap-1"><Cog size={14}/> Gear</button>
                      <button onClick={() => addItem('symbols', { type: 'rising-sun', color: null })} className="p-2 bg-slate-700 rounded text-xs flex flex-col items-center gap-1"><Sun size={14}/> Rising Sun</button>
                      <button onClick={() => addItem('symbols', { type: 'seal', src: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Sol_de_Mayo-Bandera_de_Argentina.svg', color: null })} className="p-2 bg-slate-700 rounded text-xs flex flex-col items-center gap-1"><Sun size={14}/> Sun of May</button>
                    </div>
                  </>
              )}
            </div>
          </div>
        </main>
      </div>
  );
}