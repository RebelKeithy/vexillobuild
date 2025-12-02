export function generatePallPoints({
   h,
   w,
   width,
   center_split_x,
   edge_split_x,
   center_y_start,
   edge_y_start
}) {
    const mid_y = h / 2.0;
    const half_w = width / 2.0;

    let m = 0; // slope
    let c_start = 0; // center_y_start
    let c_split = 0; // center_split_x

    // --- SOLVER LOGIC ---
    // We need to determine the slope 'm' and the Center Line parameters.

    // CASE 1: Center Split + Center Start
    if (center_split_x !== undefined && center_y_start !== undefined) {
        c_start = center_y_start;
        c_split = center_split_x;
        const dy = mid_y - c_start;
        const dx = c_split;
        m = (dx !== 0) ? dy / dx : 0;
    }

    // CASE 2: Edge Split + Edge Start
    else if (edge_split_x !== undefined && edge_y_start !== undefined) {
        // Target Y for top edge: horizontal bar top
        const target_y = mid_y - half_w;
        const dy = target_y - edge_y_start;
        const dx = edge_split_x;
        m = (dx !== 0) ? dy / dx : 0;

        // Calculate Vertical Shift to find center line
        const v_shift = half_w * Math.sqrt(1 + m*m);
        c_start = edge_y_start + v_shift;
        // Center split x found by intersection of center line (y = mx + c_start) with (y = mid_y)
        c_split = (m !== 0) ? (mid_y - c_start) / m : edge_split_x;
    }

    // CASE 3: Center Split + Edge Start (Mixed)
    else if (center_split_x !== undefined && edge_y_start !== undefined) {
        c_split = center_split_x;
        // We solve for slope m using quadratic equation derived from parallel distance
        // Quadratic: (X^2 - W^2)m^2 - 2KXm + (K^2 - W^2) = 0
        // Where X = center_split_x, W = half_w, K = mid_y - edge_y_start
        const K = mid_y - edge_y_start;
        const X = c_split;
        const W = half_w;

        const A = X*X - W*W;
        const B = -2 * K * X;
        const C = K*K - W*W;

        // Solve (-B +/- sqrt(D)) / 2A
        if (Math.abs(A) < 1e-9) {
            // Linear fallback if A is 0
            m = -C / B;
        } else {
            const D = B*B - 4*A*C;
            if (D < 0) m = 0; // Should not happen geometrically unless impossible
            else {
                // Usually the positive slope (y-down coordinate system)
                m = (-B + Math.sqrt(D)) / (2*A);
            }
        }
        const v_shift = half_w * Math.sqrt(1 + m*m);
        c_start = edge_y_start + v_shift;
    }

    // CASE 4: Edge Split + Center Start (Mixed)
    else if (edge_split_x !== undefined && center_y_start !== undefined) {
        c_start = center_y_start;
        // Similar geometric relation
        // Edge line ends at (ex, mid_y - half_w).
        // Center line starts at (0, c_start).
        // Derived equation: m^2(ex^2 - W^2) - m(2*ex*Ydiff) + (Ydiff^2 - W^2) = 0
        // Where Ydiff = (mid_y - half_w) - c_start
        const Ydiff = (mid_y - half_w) - c_start;
        const X = edge_split_x;
        const W = half_w;

        const A = X*X - W*W;
        const B = -2 * X * Ydiff;
        const C = Ydiff*Ydiff - W*W;

        if (Math.abs(A) < 1e-9) {
            m = -C / B;
        } else {
            const D = B*B - 4*A*C;
            if (D < 0) m = 0;
            else m = (-B + Math.sqrt(D)) / (2*A);
        }
        c_split = (m !== 0) ? (mid_y - c_start) / m : edge_split_x;
    }

    // --- GEOMETRY GENERATION ---
    // Now that we have standardized m, c_start, and c_split (Center Line params), generate points.

    // Vertical shift from center line to edges
    const v_shift = half_w * Math.sqrt(1 + m*m);

    const outer_start_y = c_start - v_shift;
    const inner_start_y = c_start + v_shift;

    // Calculate Elbows (Intersections)
    // Outer Elbow: Intersect outer diagonal (y = mx + outer_start_y) with (y = mid_y - half_w)
    const outer_target_y = mid_y - half_w;
    const outer_elbow_x = (m !== 0) ? (outer_target_y - outer_start_y) / m : c_split;

    // Inner Apex: Intersect inner diagonal (y = mx + inner_start_y) with (y = mid_y)
    const inner_target_y = mid_y;
    const inner_apex_x = (m !== 0) ? (inner_target_y - inner_start_y) / m : c_split;

    return [
        { x: w, y: mid_y - half_w },
        { x: outer_elbow_x, y: mid_y - half_w },
        { x: 0, y: outer_start_y },
        { x: 0, y: inner_start_y },
        { x: inner_apex_x, y: mid_y },
        { x: 0, y: h - inner_start_y },
        { x: 0, y: h - outer_start_y },
        { x: outer_elbow_x, y: mid_y + half_w },
        { x: w, y: mid_y + half_w }
    ];
}