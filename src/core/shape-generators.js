import {generatePallPoints} from "../shapes/pall";

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

        const points = [];
        const offset = (rotation * Math.PI) / 180;

        for (let i = 0; i < pointsCount * 2; i++) {
            const ang = (i * Math.PI) / pointsCount - (Math.PI / 2) + offset;
            const rad = i % 2 === 0 ? r : r * innerRadius;
            points.push(`${cx + rad * Math.cos(ang)},${cy + rad * Math.sin(ang)}`);
        }
        return points.join(' ');
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
    crescentStar: ({cx, cy, h, args}) => {
        const rOuter = h * (args.outerRadius || 0.25);
        const rInner = h * (args.innerRadius || 0.2);
        const rStar = h * (args.starOuterRadius || args.starRadius || 0.125);
        const xInner = args.innerOffset !== undefined ? h * args.innerOffset : h * 0.1;
        const xStar = args.starOffset ? h * args.starOffset : h * 0.1;
        const starRot = args.starRotation || 0;
        const d = xInner;
        const a = (rOuter * rOuter - rInner * rInner + d * d) / (2 * d);
        const term = rOuter * rOuter - a * a;
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

        const starArgs = {
            points: args.starPoints || args.points || 5,
            innerRadius: args.starInnerRadius,
            rotation: starRot
        };

        const starPath = SHAPE_GENERATORS.star({cx: cx + xStar, cy, r: rStar, args: starArgs});
        const starPoly = `M ${starPath.split(' ')[0]} L ${starPath.split(' ').slice(1).join(' L ')} Z`;
        return `${crescentPath} ${starPoly}`;
    },
    diamond: ({h, w, cx, cy, width, height, args}) => {
        width = args.widthRatio ? args.widthRatio : width;
        height = args.heightRatio || height;
        console.log(`Diamond params: ${h}, ${w}, ${cx}, ${cy}, ${width}, ${height}`)
        const x1 = h * cx + w / 2 - h * width / 2;
        const x2 = h * cx + w / 2;
        const x3 = h * cx + w / 2 + h * width / 2;
        const y1 = h * cy + h / 2 + h * height / 2;
        const y2 = h * cy + h / 2;
        const y3 = h * cy + h / 2 - h * height / 2;
        console.log(`Diamond points: ${x1}`)
        const points = [
            `${x1},${y2}`,
            `${x2},${y3}`,
            `${x3},${y2}`,
            `${x2},${y1}`
        ]
        console.log(`Diamond points: ${points.join(' ')}`)
        return points.join(' ');
    }
};