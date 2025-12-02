
export const LEVELS = [
    {
        id: 1,
        name: "France",
        difficulty: "Novice",
        description: "Construct the Tricolour.",
        hint: "Three vertical bands: Blue, White, Red.",
        aspectRatio: 2/3,
        target: {
            base: { type: 'vertical-tricolor', colors: ['blue', 'white', 'red'] },
            overlays: [],
            symbols: []
        }
    },
    {
        id: 2,
        name: "Italy",
        difficulty: "Novice",
        description: "The Il Tricolore.",
        hint: "Three vertical bands: Green, White, Red.",
        aspectRatio: 2/3,
        target: {
            base: { type: 'vertical-tricolor', colors: ['green', 'white', 'red'] },
            overlays: [],
            symbols: []
        }
    },
    {
        id: 3,
        name: "Japan",
        difficulty: "Novice",
        description: "The Land of the Rising Sun.",
        hint: "Solid White background. Red Circle in the center.",
        aspectRatio: 2/3,
        target: {
            base: { type: 'solid', colors: ['white'] },
            overlays: [],
            symbols: [
                { type: 'circle', color: 'red', scale: 1.8 }
            ]
        }
    },
    {
        id: 4,
        name: "Chile",
        difficulty: "Intermediate",
        description: "La Estrella Solitaria (The Lone Star).",
        hint: "2 Horizontal Stripes (White/Red). Blue Canton. White Star inside the Canton.",
        aspectRatio: 2/3,
        target: {
            base: { type: 'horizontal-stripes', count: 2, colors: ['white', 'red'] },
            overlays: [
                { type: 'canton', position: 'top-left', color: 'blue', widthRatio: 1/3, heightRatio: 1/2 }
            ],
            symbols: [
                { type: 'star', color: 'white', parentIndex: 0, scale: 1.8 }
            ]
        }
    },
    {
        id: 5,
        name: "Czech Republic",
        difficulty: "Intermediate",
        description: "A simple but striking geometric design.",
        hint: "Horizontal Bisection (White top, Red bottom). Blue Triangle at the hoist.",
        aspectRatio: 2/3,
        target: {
            base: { type: 'bisection-horizontal', colors: ['white', 'red'] },
            overlays: [
                { type: 'triangle', position: 'hoist', color: 'blue' }
            ],
            symbols: []
        }
    },
    {
        id: 6,
        name: "Cuba",
        difficulty: "Intermediate",
        description: "Stripes, a triangle, and a lone star.",
        hint: "5 Horizontal Stripes (Blue/White). Red Triangle. White Star.",
        aspectRatio: 1/2,
        target: {
            base: { type: 'horizontal-stripes', count: 5, colors: ['blue', 'white'] },
            overlays: [
                { type: 'triangle', position: 'hoist', color: 'red' }
            ],
            symbols: [
                { type: 'star', color: 'white', parentIndex: 0 }
            ]
        }
    },
    {
        id: 7,
        name: "United States",
        difficulty: "Medium-High",
        description: "Old Glory.",
        hint: "13 Stripes. Blue Canton. Star Field.",
        aspectRatio: 10/19,
        target: {
            base: { type: 'horizontal-stripes', count: 13, colors: ['red', 'white'] },
            overlays: [
                { type: 'canton', position: 'top-left', color: 'blue' }
            ],
            symbols: [
                { type: 'star-field', color: 'white', parentIndex: 0 }
            ]
        }
    },
    {
        id: 8,
        name: "South Africa",
        difficulty: "Master",
        description: "Complex layering with borders.",
        hint: "Red/Blue Bisection. Green Pall (Y-shape). Black Triangle.",
        aspectRatio: 2/3,
        target: {
            base: { type: 'bisection-horizontal', colors: ['red', 'blue'] },
            overlays: [
                { type: 'pall', color: 'green', borderColor: 'white' },
                { type: 'triangle', position: 'hoist', color: 'black', borderColor: 'gold', vertexXRatio: 0.57735 }
            ],
            symbols: []
        }
    },
    {
        id: 9,
        name: "Albania",
        difficulty: "Intermediate",
        description: "The Black Double-Headed Eagle.",
        hint: "Solid Red background. A Black Double-Headed Eagle in the center.",
        aspectRatio: 5/7,
        target: {
            base: { type: 'solid', colors: ['red'] },
            overlays: [],
            symbols: [
                {
                    type: 'external',
                    src: 'https://upload.wikimedia.org/wikipedia/commons/b/b7/Albanian_Eagle.svg',
                    color: 'black',
                    scale: 2.22
                }
            ]
        }
    },
    {
        id: 10,
        name: "Algeria",
        difficulty: "Intermediate",
        description: "Green and White with a Red Crescent.",
        hint: "Vertical Bisection (Green/White). Red Crescent and Star in the center.",
        aspectRatio: 2/3,
        target: {
            base: { type: 'bisection-vertical', colors: ['green', 'white'] },
            overlays: [],
            symbols: [
                {
                    type: 'crescent-star',
                    color: 'red',
                    outerRadius: 0.25,
                    innerRadius: 0.2,
                    innerOffset: 0.0603814,
                    starRadius: 0.125,
                    starOffset: 0.1011271,
                    starRotation: 90
                }
            ]
        }
    },
    {
        id: 11,
        name: "Andorra",
        difficulty: "Intermediate",
        description: "Virtus Unita Fortior.",
        hint: "Vertical Tricolor (Blue, Gold, Red). Coat of Arms in the center.",
        aspectRatio: 7/10,
        target: {
            base: { type: 'vertical-tricolor', colors: ['blue', 'gold', 'red'] },
            overlays: [],
            symbols: [
                {
                    type: 'seal',
                    src: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Coat_of_arms_of_Andorra.svg',
                    color: null,
                    scale: 1.5
                }
            ]
        }
    },
    {
        id: 12,
        name: "Angola",
        difficulty: "Intermediate",
        description: "Machete and Gear.",
        hint: "Horizontal Bisection (Red top, Black bottom). Gold Machete and Gear in center.",
        aspectRatio: 2/3,
        target: {
            base: { type: 'bisection-horizontal', colors: ['red', 'black'] },
            overlays: [],
            symbols: [
                {
                    type: 'external',
                    src: 'https://upload.wikimedia.org/wikipedia/commons/0/02/Machete_and_Gear.svg',
                    color: 'gold',
                    scale: 1.5
                }
            ]
        }
    },
    {
        id: 13,
        name: "Antigua and Barbuda",
        difficulty: "Advanced",
        description: "Sun, Sea, and Sand.",
        hint: "3 Stripes (Black, Blue, White). Red Triangles on sides. Rising Sun.",
        aspectRatio: 2/3,
        target: {
            base: {
                type: 'horizontal-stripes',
                count: 3,
                colors: ['black', 'blue', 'white'],
                ratios: [15, 10, 15] // 37.5%, 25%, 37.5%
            },
            overlays: [
                { type: 'triangle-corner', corner: 'bottom-left', color: 'red', widthRatio: 0.5 },
                { type: 'triangle-corner', corner: 'bottom-right', color: 'red', widthRatio: 0.5 }
            ],
            symbols: [
                { type: 'rising-sun', color: 'gold', scale: 1.5, yOffset: -0.125 }
                // 15/40 = 0.375.
                // Center 0.5. -0.125 offset = 0.375.
                // Sun sits exactly on the horizon of Black/Blue.
            ]
        }
    },
    {
        id: 14,
        name: "Argentina",
        difficulty: "Novice",
        description: "The Sun of May.",
        hint: "Three horizontal stripes (Light Blue, White, Light Blue). Sun of May in the center.",
        aspectRatio: 5/8,
        target: {
            base: {
                type: 'horizontal-stripes',
                count: 3,
                colors: ['lightBlue', 'white', 'lightBlue']
            },
            overlays: [],
            symbols: [
                {
                    type: 'seal',
                    src: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Sol_de_Mayo-Bandera_de_Argentina.svg',
                    color: null,
                    scale: 1.0
                }
            ]
        }
    },
    {
        id: 15,
        name: "Armenia",
        difficulty: "Novice",
        description: "The Highland.",
        hint: "Red, Blue, Orange (Apricot).",
        aspectRatio: 1/2,
        target: {
            base: { type: 'horizontal-stripes', count: 3, colors: ['red', 'blue', 'orange'] },
            overlays: [],
            symbols: []
        }
    }
];