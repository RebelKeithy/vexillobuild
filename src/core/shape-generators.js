import {generatePallPoints} from "../shapes/pall";

// Helper function to calculate positions for multiple stars
const calculateStarPositions = (count, cx, cy, r, args) => {
    const layout = args.layout || 'auto'; // 'auto', 'horizontal', 'vertical', 'grid', 'arc'

    const positions = [];

    if (count === 1) {
        positions.push({cx, cy});
        return positions;
    }

    // Determine layout based on count or explicit layout parameter
    let actualLayout = layout;
    if (layout === 'auto') {
        if (count <= 3) actualLayout = 'horizontal';
        else if (count <= 6) actualLayout = 'arc';
        else actualLayout = 'grid';
    }

    if (actualLayout === 'horizontal') {
        // Support both new 'spacing' (direct distance) and legacy 'spacing' (multiplier)
        const spacing = args.spacing || (r * 2.5);
        const totalWidth = (count - 1) * spacing;
        const startX = cx - totalWidth / 2;
        for (let i = 0; i < count; i++) {
            positions.push({
                cx: startX + i * spacing,
                cy: cy
            });
        }
    } else if (actualLayout === 'vertical') {
        const spacing = args.spacing || (r * 2.5);
        const totalHeight = (count - 1) * spacing;
        const startY = cy - totalHeight / 2;
        for (let i = 0; i < count; i++) {
            positions.push({
                cx: cx,
                cy: startY + i * spacing
            });
        }
    } else if (actualLayout === 'arc') {
        // Arrange stars in an arc (full circle or partial)
        // Use explicit circleRadius if provided, otherwise use legacy spacing calculation
        const arcRadius = args.circleRadius || (r * (args.spacing || 2.5) * 1.5);

        // Support custom arc span (default: full circle)
        const arcSpan = args.arcSpan !== undefined ? args.arcSpan : (2 * Math.PI); // Full circle by default
        const startAngle = args.startAngle !== undefined ? args.startAngle : -Math.PI / 2; // Top by default

        // For full circle (or very close to it), divide by count to avoid overlap
        // For partial arcs, divide by count-1 to place stars at endpoints
        const isFullCircle = Math.abs(arcSpan - 2 * Math.PI) < 0.01;
        const angleStep = isFullCircle ? arcSpan / count : arcSpan / (count === 1 ? 1 : (count - 1));

        for (let i = 0; i < count; i++) {
            const angle = startAngle + i * angleStep;
            positions.push({
                cx: cx + arcRadius * Math.cos(angle),
                cy: cy + arcRadius * Math.sin(angle)
            });
        }
    } else if (actualLayout === 'grid') {
        const spacing = args.spacing || (r * 2.5);
        const cols = Math.ceil(Math.sqrt(count));
        const rows = Math.ceil(count / cols);
        const gridWidth = (cols - 1) * spacing;
        const gridHeight = (rows - 1) * spacing;
        const startX = cx - gridWidth / 2;
        const startY = cy - gridHeight / 2;

        for (let i = 0; i < count; i++) {
            const row = Math.floor(i / cols);
            const col = i % cols;
            positions.push({
                cx: startX + col * spacing,
                cy: startY + row * spacing
            });
        }
    }

    return positions;
};

export const SHAPE_GENERATORS = {
    triangle: ({w, h, args}) => {
        const th = args.height ? h * args.height : h
        let vx = args.vertexXRatio ? h * args.vertexXRatio : w * 0.5
        if (args.equilateral) {
            vx = th * Math.sqrt(3) / 2
        }
        return `0,${h/2 - th/2} ${vx},${h/2} 0,${th/2 + h/2}`;
    },
    triangleCorner: ({w, h, args}) => {
        const ratio = args.widthRatio || 0.5;
        const corner = args.corner || 'bottom-left';
        if (corner === 'bottom-left') return `0,0 0,${h} ${w * ratio},${h}`;
        if (corner === 'bottom-right') return `${w},0 ${w},${h} ${w - (w * ratio)},${h}`;
        return '';
    },
    pall: ({w, h, args}) => {
        const width = h * args.widthRatio || h * 0.2
        let center_split_x = args.centerSplitX
        let edge_split_x = args.edgeSplitX
        if (!center_split_x && !edge_split_x) {
            center_split_x = w * 0.5
        }
        let center_y_start = args.centerYStart
        let edge_y_start = args.edgeYStart
        if (!center_y_start && !edge_y_start) {
            center_y_start = 0
        }

        const points = generatePallPoints({h, w, width, center_split_x, edge_split_x, center_y_start, edge_y_start});
        return points.map(p => `${p.x},${p.y}`).join(' ');
    },
    star: ({cx, cy, r, args}) => {
        const pointsCount = args.points || 5;
        const innerRadius = args.innerRadius || (pointsCount === 5 ? 0.382 : 0.4);
        const rotation = args.rotation || 0;
        const count = args.count || 1;

        const generateSingleStar = (centerX, centerY) => {
            const points = [];
            const offset = (rotation * Math.PI) / 180;

            for (let i = 0; i < pointsCount * 2; i++) {
                const ang = (i * Math.PI) / pointsCount - (Math.PI / 2) + offset;
                const rad = i % 2 === 0 ? r : r * innerRadius;
                points.push(`${centerX + rad * Math.cos(ang)},${centerY + rad * Math.sin(ang)}`);
            }
            return points;
        };

        if (count === 1) {
            return generateSingleStar(cx, cy).join(' ');
        }

        // For multiple stars, return metadata for group rendering
        // This will be handled specially in SymbolLayer
        return {
            count,
            positions: calculateStarPositions(count, cx, cy, r, args)
        };
    },
    risingSun: ({cx, cy, r, args}) => {
        const points = 9;
        const innerR = r * 0.5;
        let polyPoints = [];
        for (let i = 0; i < (points * 2) - 1; i++) {
            const isTip = i % 2 === 0;
            const currentRadius = isTip ? r : innerR;
            const pct = i / ((points * 2) - 2);
            const angle = Math.PI + (pct * Math.PI);
            const x = cx + currentRadius * Math.cos(angle);
            const y = cy + currentRadius * Math.sin(angle);
            polyPoints.push(`${x},${y}`);
        }
        return `M ${cx - innerR},${cy} L ${polyPoints.join(' L ')} L ${cx + innerR},${cy} Z`;
    },
    crescent: ({cx, cy, h, args}) => {
        const rOuter = h * (args.outerRadius || 0.25);
        const rInner = h * (args.innerRadius || 0.2);
        const xInner = args.innerOffset !== undefined ? h * args.innerOffset : h * 0.1;
        const d = xInner;
        const a = (rOuter * rOuter - rInner * rInner + d * d) / (2 * d);
        const term = rOuter * rOuter - a * a;
        let hDist = 0;
        if (term > 0.0001) hDist = Math.sqrt(term);
        else return "";
        const xIntersect = a;
        const yIntersect = hDist;
        const largeArcInner = xIntersect > xInner ? 1 : 0;
        return `
      M ${cx + xIntersect},${cy - yIntersect}
      A ${rOuter} ${rOuter} 0 1 0 ${cx + xIntersect},${cy + yIntersect}
      A ${rInner} ${rInner} 0 ${largeArcInner} 1 ${cx + xIntersect},${cy - yIntersect}
      Z
    `;
    },
    diamond: ({h, w, cx, cy, width, height, args}) => {
        width = args.widthRatio ? args.widthRatio : width;
        height = args.heightRatio || height;
        const x1 = h * cx + w / 2 - h * width / 2;
        const x2 = h * cx + w / 2;
        const x3 = h * cx + w / 2 + h * width / 2;
        const y1 = h * cy + h / 2 + h * height / 2;
        const y2 = h * cy + h / 2;
        const y3 = h * cy + h / 2 - h * height / 2;
        const points = [
            `${x1},${y2}`,
            `${x2},${y3}`,
            `${x3},${y2}`,
            `${x2},${y1}`
        ];
        return points.join(' ');
    },
    saltire: ({w, h, args}) => {
        // Saltire is an X-shaped cross
        // Returns a single polygon with 12 points (corners are beveled/flat)

        // Safety check for args
        const ratio = (args && args.widthRatio) ? args.widthRatio : 0.15;
        const bandWidth = h * ratio;
        const halfWidth = bandWidth / 2;
        const len = Math.sqrt(w * w + h * h);

        // Calculate axis intercepts (The "scissors" effect)
        // Instead of perpendicular offsets, we calculate how far the band
        // extends along the X and Y axes.
        // dx: Distance from corner/center along the X-axis
        // dy: Distance from corner/center along the Y-axis
        const dx = halfWidth * (len / h);
        const dy = halfWidth * (len / w);

        // Create the 12 vertices.
        // Order: Clockwise starting from the Top-Left arm's left side.
        const points = [
            // Top-Left Arm
            `${0},${dy}`,           // Hits Left Edge
            `${0},${0}`,
            `${dx},${0}`,           // Hits Top Edge

            // Top Center Notch (Armpit)
            `${w/2},${h/2 - dy}`,

            // Top-Right Arm
            `${w - dx},${0}`,       // Hits Top Edge
            `${w},${0}`,
            `${w},${dy}`,           // Hits Right Edge

            // Right Center Notch
            `${w/2 + dx},${h/2}`,

            // Bottom-Right Arm
            `${w},${h - dy}`,       // Hits Right Edge
            `${w},${h}`,
            `${w - dx},${h}`,       // Hits Bottom Edge

            // Bottom Center Notch
            `${w/2},${h/2 + dy}`,

            // Bottom-Left Arm
            `${dx},${h}`,           // Hits Bottom Edge
            `${0},${h}`,
            `${0},${h - dy}`,       // Hits Left Edge

            // Left Center Notch
            `${w/2 - dx},${h/2}`
        ];

        return points.join(' ');
    },
    nordicCross: ({w, h, args}) => {
        // Nordic/Scandinavian cross - offset towards hoist
        // Default proportions based on Danish flag (12:4:21 horizontal, 12:4:12 vertical)
        const verticalOffset = args.verticalOffset || 12/37;  // Where vertical bar starts (from left)
        const crossWidth = args.crossWidth || 4/28;           // Width of cross arms as ratio of height

        const bandWidth = h * crossWidth;
        const vBarX = w * verticalOffset;
        const hBarY = (h - bandWidth) / 2;

        // Single 12-point polygon for the cross shape (clockwise from top-left of vertical bar)
        const points = [
            `${vBarX},${0}`,                           // 1: Top-left of vertical bar
            `${vBarX + bandWidth},${0}`,               // 2: Top-right of vertical bar
            `${vBarX + bandWidth},${hBarY}`,           // 3: Inner corner (top-right)
            `${w},${hBarY}`,                           // 4: Right edge, top of horizontal
            `${w},${hBarY + bandWidth}`,               // 5: Right edge, bottom of horizontal
            `${vBarX + bandWidth},${hBarY + bandWidth}`, // 6: Inner corner (bottom-right)
            `${vBarX + bandWidth},${h}`,               // 7: Bottom-right of vertical bar
            `${vBarX},${h}`,                           // 8: Bottom-left of vertical bar
            `${vBarX},${hBarY + bandWidth}`,           // 9: Inner corner (bottom-left)
            `${0},${hBarY + bandWidth}`,               // 10: Left edge, bottom of horizontal
            `${0},${hBarY}`,                           // 11: Left edge, top of horizontal
            `${vBarX},${hBarY}`                        // 12: Inner corner (top-left)
        ];

        return points.join(' ');
    }
};