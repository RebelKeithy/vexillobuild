import { SYMBOL_RENDERERS } from './symbol-renderers';

describe('Cross Symbol Renderer', () => {
    const renderCross = SYMBOL_RENDERERS['cross'];
    const height = 300;
    const width = 450;
    const cx = 225;
    const cy = 150;

    const makeParams = (overrides = {}) => ({
        cx,
        cy,
        r: 45, // default when no radius
        flagWidth: width,
        flagHeight: height,
        resolvedColor: 'red',
        thickness: 0.4,
        ...overrides,
    });

    const baseRenderArgs = {
        index: 0,
        commonProps: { fill: 'red' },
        highlightMode: null,
        styles: {},
        bindEvents: () => ({}),
    };

    test('renders with default size when no radius specified', () => {
        const result = renderCross({
            ...baseRenderArgs,
            params: makeParams({ type: 'cross' }),
        });

        expect(result.props.points).toBeDefined();
        // With no radius, should use r=45, so size=45
        // Top point should be at cy - size = 150 - 45 = 105
        expect(result.props.points).toContain(',105');
    });

    test('radius parameter changes the rendered size', () => {
        const smallCross = renderCross({
            ...baseRenderArgs,
            params: makeParams({ type: 'cross', radius: height * 0.05 }),
        });

        const largeCross = renderCross({
            ...baseRenderArgs,
            params: makeParams({ type: 'cross', radius: height * 0.15 }),
        });

        expect(smallCross.props.points).not.toEqual(largeCross.props.points);
    });

    test('different radius values produce different polygon points', () => {
        const radiusValues = [0.05, 0.08, 0.10, 0.15, 0.20];
        const results = radiusValues.map(radius =>
            renderCross({
                ...baseRenderArgs,
                params: makeParams({ type: 'cross', radius: height * radius }),
            }).props.points
        );

        const uniqueResults = new Set(results);
        expect(uniqueResults.size).toBe(radiusValues.length);
    });

    test('radius: 0.08 produces size of 24px (height * 0.08)', () => {
        const result = renderCross({
            ...baseRenderArgs,
            params: makeParams({ type: 'cross', radius: height * 0.08 }),
        });

        // size = 300 * 0.08 = 24
        // armWidth = 24 * 0.4 = 9.6
        // halfArm = 4.8
        // Top point: cy - size = 150 - 24 = 126
        expect(result.props.points).toContain(',126');
        // Bottom point: cy + size = 150 + 24 = 174
        expect(result.props.points).toContain(',174');
    });

    test('radius: 0.15 produces size of 45px (height * 0.15)', () => {
        const result = renderCross({
            ...baseRenderArgs,
            params: makeParams({ type: 'cross', radius: height * 0.15 }),
        });

        // size = 300 * 0.15 = 45
        // Top point: cy - size = 150 - 45 = 105
        expect(result.props.points).toContain(',105');
        // Bottom point: cy + size = 150 + 45 = 195
        expect(result.props.points).toContain(',195');
    });
});