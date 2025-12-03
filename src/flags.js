
export const LEVELS = [
    {
        id: 1,
        name: "France",
        difficulty: "Novice",
        description: "Construct the Tricolour.",
        hint: "Three vertical bands: Blue, White, Red.",
        aspectRatio: 2/3,
        "colorOverrides": {
            "blue": "#000091",
            "white": "#FFFFFF",
            "red": "#E1000F"
        },
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
        colorOverrides: {
            blue: '#002A8F'
        },
        target: {
            base: { type: 'horizontal-stripes', count: 5, colors: ['blue', 'white'] },
            overlays: [
                { type: 'triangle', position: 'hoist', color: 'red', vertexXRatio: 13/15, widthRatio: 1/3, heightRatio: 1/2 }
            ],
            symbols: [
                { type: 'star', color: 'white', parentIndex: 0, scale: 1/3 /0.15 }
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
        colorOverrides: {
            blue: '#3C3B6E'
        },
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
        colorOverrides: {
            blue: '#001489',
            gold: '#FFB612'
        },
        target: {
            base: { type: 'bisection-horizontal', colors: ['red', 'blue'] },
            overlays: [
                { type: 'pall', color: 'white', borderColor: 'white', widthRatio: 20/60, edgeLine: { yStart: 1 }, y_offset: 100 },
                { type: 'pall', color: 'green', borderColor: 'white', widthRatio: 12/60, edgeLine: { yStart: 1 }, y_offset: 100 },
                { type: 'triangle', position: 'hoist', color: 'black', borderColor: 'gold', height: 36/60, vertexXRatio: 27/60 }
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
    },
    {
        id: 16,
        name: "Australia",
        difficulty: "Advanced",
        description: "The Commonwealth Star and the Southern Cross.",
        hint: "Blue field. Union Jack in Canton. Large 7-point star below it. Southern Cross on the fly.",
        aspectRatio: 1/2,
        colorOverrides: {
            blue: '#00008B'
        },
        target: {
            base: { type: 'solid', colors: ['blue'] },
            overlays: [
                { type: 'canton', position: 'top-left', color: 'blue', widthRatio: 0.5, heightRatio: 0.5 }
            ],
            symbols: [
                // Union Jack (Use aspect ratio 2 to stretch it)
                {
                    type: 'seal',
                    src: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Flag_of_the_United_Kingdom_%281-2%29.svg',
                    parentIndex: 0,
                    scale: 3.33,
                    aspectRatio: 2
                },
                // Commonwealth Star (7 points)
                // baseR is already 0.15h, which matches spec, so scale should be 1.0
                {
                    type: 'star',
                    color: 'white',
                    points: 7,
                    innerRadius: 0.4,
                    scale: 1.0,
                    xOffset: -0.25,
                    yOffset: 0.25
                },
                // Southern Cross (Crux)
                // Major stars are 1/7 width diameter => radius 1/14 (~0.071). 0.071 / 0.15 base ≈ 0.47
                // Minor star is 1/12 width diameter => radius 1/24 (~0.042). 0.042 / 0.15 base ≈ 0.28

                // Gamma Crucis (Top)
                { type: 'star', color: 'white', points: 7, innerRadius: 0.4, scale: 0.47, xOffset: 0.25, yOffset: -0.35 },
                // Alpha Crucis (Bottom)
                { type: 'star', color: 'white', points: 7, innerRadius: 0.4, scale: 0.47, xOffset: 0.25, yOffset: 0.35 },
                // Beta Crucis (Left)
                { type: 'star', color: 'white', points: 7, innerRadius: 0.4, scale: 0.47, xOffset: 0.10, yOffset: 0.02 },
                // Delta Crucis (Right)
                { type: 'star', color: 'white', points: 7, innerRadius: 0.4, scale: 0.47, xOffset: 0.40, yOffset: -0.05 },
                // Epsilon Crucis (Small, 5pt)
                { type: 'star', color: 'white', points: 5, innerRadius: 0.38, scale: 0.28, xOffset: 0.32, yOffset: 0.16 },
            ]
        }
    },
    {
        id: 17,
        name: "Austria",
        difficulty: "Novice",
        description: "The Highland.",
        hint: "Red, White, Red",
        aspectRatio: 2/3,
        target: {
            base: { type: 'horizontal-stripes', count: 3, colors: ['red', 'white', 'red'] },
            overlays: [],
            symbols: []
        }
    },
    {
        id: 18,
        name: "Azerbaijan",
        difficulty: "Intermediate",
        description: "The Land of Fire.",
        hint: "Blue, Red, Green horizontal stripes. White Crescent and 8-pointed Star in the center.",
        aspectRatio: 1/2,
        target: {
            base: { type: 'horizontal-stripes', count: 3, colors: ['lightBlue', 'red', 'green'] },
            overlays: [],
            symbols: [
                {
                    type: 'crescent-star',
                    color: 'white',
                    outerRadius: 3/20,
                    innerRadius: 1/8,
                    innerOffset: 1/30,
                    starOuterRadius: 1/12,
                    starInnerRadius: 1/2,
                    starOffset: 2/5-3/20-1/12,
                    starRotation: 90,
                    starPoints: 8
                }
            ]
        }
    },
    {
        id: 19,
        name: "The Bahamas",
        difficulty: "Intermediate",
        description: "700 islands and cays.",
        hint: "Horizontal stripes: Aquamarine, Gold, Aquamarine. Black Triangle at hoist.",
        aspectRatio: 1/2,
        target: {
            base: { type: 'horizontal-stripes', count: 3, colors: ['aquamarine', 'gold', 'aquamarine'] },
            overlays: [
                { type: 'triangle', position: 'hoist', color: 'black', vertexXRatio: 13/15 }
            ],
            symbols: []
        }
    },
    {
        id: 20,
        name: "Bahrain",
        difficulty: "Intermediate",
        description: "The Pearl of the Gulf.",
        hint: "White band on the left, Red on the right, separated by 5 white triangles.",
        aspectRatio: 3/5,
        target: {
            base: { 
                type: 'serrated-vertical', 
                colors: ['white', 'red'],
                count: 5,
                xRatio: 0.25,
                serrationDepth: 0.15 
            },
            overlays: [],
            symbols: []
        }
    },
    {
        id: 21,
        name: "Bangladesh",
        difficulty: "Intermediate",
        description: "The Red Disc.",
        hint: "Green field with a large Red disk shifted slightly to the hoist.",
        aspectRatio: 3/5,
        target: {
            base: { type: 'solid', colors: ['green'] },
            overlays: [],
            symbols: [
                {
                    type: 'circle',
                    color: 'red',
                    scale: 1.5,
                    xOffset: -0.05
                }
            ]
        }
    },
    {
        id: 22,
        name: "Barbados",
        difficulty: "Intermediate",
        description: "The Broken Trident.",
        hint: "Vertical bands: Blue, Gold, Blue. Black Trident in the center.",
        aspectRatio: 2/3,
        target: {
            base: { type: 'vertical-tricolor', colors: ['blue', 'gold', 'blue'] },
            overlays: [],
            symbols: [
                {
                    type: 'external',
                    src: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/Barbados_trident.svg',
                    color: 'black',
                    scale: 1.6
                }
            ]
        }
    },
    {
        id: 23,
        name: "Belarus",
        difficulty: "Intermediate",
        description: "The Red and Green.",
        hint: "Red over Green (2:1 ratio). Vertical red-on-white decorative pattern at the hoist.",
        aspectRatio: 1/2,
        target: {
            base: { 
                type: 'horizontal-stripes', 
                count: 2, 
                colors: ['red', 'green'],
                ratios: [2, 1]
            },
            overlays: [],
            symbols: [
                {
                    type: 'external',
                    src: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Belarus_flag_pattern.svg',
                    color: null,
                    rotation: 90,
                    aspectRatio: 4.5,
                    scale: 0.74,
                    xOffset: -0.444
                }
            ]
        }
    },
    {
        id: 24,
        name: "Belgium",
        difficulty: "Novice",
        description: "The Black, Yellow, and Red.",
        hint: "Vertical bands: Black, Yellow, Red.",
        aspectRatio: 13/15,
        target: {
            base: { type: 'vertical-tricolor', colors: ['black', 'gold', 'red'] },
            overlays: [],
            symbols: []
        }
    },
    {
        id: 25,
        name: "Belize",
        difficulty: "Intermediate",
        description: "Sub Umbra Floreo.",
        hint: "Blue field. Top/Bottom narrow Red stripes. Large White Center Disk with Coat of Arms.",
        aspectRatio: 2/3,
        target: {
            base: { 
                type: 'horizontal-stripes', 
                count: 3, 
                colors: ['red', 'blue', 'red'],
                ratios: [1, 10, 1]
            },
            overlays: [],
            symbols: [
                {
                    type: 'circle',
                    color: 'white',
                    scale: 1.4
                },
                {
                    type: 'seal',
                    src: 'https://upload.wikimedia.org/wikipedia/commons/d/dd/Coat_of_arms_of_Belize.svg',
                    color: null,
                    scale: 1.7
                }
            ]
        }
    },
    {
        id: 26,
        name: "Benin",
        difficulty: "Novice",
        description: "The Green, Yellow and Red.",
        hint: "Vertical Green band at the hoist. Yellow and Red horizontal bands.",
        aspectRatio: 2/3,
        target: {
            base: { type: 'bisection-horizontal', colors: ['gold', 'red'] },
            overlays: [
                { type: 'side', color: 'green', widthRatio: 0.4, side: 'left' }
            ],
            symbols: []
        }
    },
    {
        id: 27,
        name: "Bhutan",
        difficulty: "Expert",
        description: "The Dragon Flag.",
        hint: "Diagonal Yellow (Top-Left) and Orange (Bottom-Right) split. Large white dragon.",
        aspectRatio: 2/3,
        target: {
            base: { type: 'bisection-diagonal-left', colors: ['gold', 'orange'] },
            overlays: [],
            symbols: [
                {
                    type: 'external',
                    src: 'https://upload.wikimedia.org/wikipedia/commons/6/6c/Dragon_from_Flag_of_Bhutan.svg',
                    color: null,
                    aspectRatio: 102/74,
                    scale: 3.3 * 74/90
                }
            ]
        }
    },
    {
        id: 28,
        name: "Bolivia",
        difficulty: "Intermediate",
        description: "La Tricolor.",
        hint: "Horizontal bands: Red, Yellow, Green. Coat of Arms in the center.",
        aspectRatio: 15/22,
        target: {
            base: { type: 'horizontal-stripes', count: 3, colors: ['red', 'gold', 'green'] },
            overlays: [],
            symbols: [
                {
                    type: 'seal',
                    src: 'https://upload.wikimedia.org/wikipedia/commons/0/06/Coat_of_arms_of_Bolivia.svg',
                    color: null,
                    aspectRatio: 150/130,
                    scale: 1.1
                }
            ]
        }
    },
    {
        id: 29,
        name: "Bosnia and Herzegovina",
        difficulty: "Intermediate",
        description: "The Heart-Shaped Land.",
        hint: "Blue field. Yellow Right Triangle. Diagonal line of white stars (7 full, 2 half).",
        aspectRatio: 1/2,
        target: {
            base: { type: 'solid', colors: ['blue'] },
            overlays: [
                {
                    type: 'polygon',
                    colors: ['gold'],
                    points: [{x: 0.17, y: 0}, {x: 0.67, y: 0}, {x: 0.67, y: 1}]
                }
            ],
            symbols: [
                // 9 stars distributed along the diagonal from (0.17, 0) to (0.67, 1).
                // Formula: x = 0.17 + (y / 2). y steps by 0.125.
                { type: 'star', color: 'white', points: 5, scale: 0.5, xOffset: -0.33, yOffset: -0.5112 },   // Top (Cut off)
                { type: 'star', color: 'white', points: 5, scale: 0.5, xOffset: -0.2675, yOffset: -0.3862 },
                { type: 'star', color: 'white', points: 5, scale: 0.5, xOffset: -0.205, yOffset: -0.2612 },
                { type: 'star', color: 'white', points: 5, scale: 0.5, xOffset: -0.1425, yOffset: -0.1362 },
                { type: 'star', color: 'white', points: 5, scale: 0.5, xOffset: -0.08, yOffset: -0.0112 },   // Center
                { type: 'star', color: 'white', points: 5, scale: 0.5, xOffset: -0.0175, yOffset: 0.1138 },
                { type: 'star', color: 'white', points: 5, scale: 0.5, xOffset: 0.045, yOffset: 0.2388 },
                { type: 'star', color: 'white', points: 5, scale: 0.5, xOffset: 0.1075, yOffset: 0.3638 },
                { type: 'star', color: 'white', points: 5, scale: 0.5, xOffset: 0.17, yOffset: 0.4888 }      // Bottom (Cut off)
            ]
        }
    },
    {
        id: 30,
        name: "Botswana",
        difficulty: "Novice",
        description: "Pula (Rain).",
        hint: "Light Blue field. Central horizontal Black stripe with White borders.",
        aspectRatio: 2/3,
        target: {
            base: {
                type: 'horizontal-stripes',
                count: 5,
                colors: ['lightBlue', 'white', 'black', 'white', 'lightBlue'],
                ratios: [9, 1, 4, 1, 9]
            },
            overlays: [],
            symbols: []
        }
    },
    {
        id: 31,
        name: "Brazil",
        difficulty: "Advanced",
        description: "Ordem e Progresso.",
        hint: "Green field. Yellow Rhombus. Blue Celestial Globe with 27 stars.",
        aspectRatio: 7/10,
        target: {
            base: { type: 'solid', colors: ['green'] },
            overlays: [
                { type: 'diamond', color: 'gold', widthRatio: 1660/1400, heightRatio: 1060/1400 }
            ],
            symbols: [
                {
                    type: 'external',
                    src: 'Flag-of-Brazil-06.svg',
                    scale: 3.11
                },
                {
                    type: 'circle',
                    color: 'blue',
                    scale: 0.5 / 1.5 / 0.15 / 2
                }
            ]
        }
    },
    {
        id: 32,
        name: "Bulgaria",
        difficulty: "Novice",
        description: "The Three Colors.",
        hint: "Horizontal bands: White, Green, Red.",
        aspectRatio: 3/5,
        target: {
            base: { type: 'horizontal-stripes', count: 3, colors: ['white', 'green', 'red'] },
            overlays: [],
            symbols: []
        }
    },
    {
        id: 33,
        name: "Burkina Faso",
        difficulty: "Intermediate",
        description: "Land of Upright People.",
        hint: "Horizontal Bisection (Red top, Green bottom). Yellow Star in the center.",
        aspectRatio: 2/3,
        target: {
            base: { type: 'bisection-horizontal', colors: ['red', 'green'] },
            overlays: [],
            symbols: [
                {
                    type: 'star',
                    color: 'gold',
                    points: 5,
                    scale: 1.0
                }
            ]
        }
    },
    {
        id: 34,
        name: "Burundi",
        difficulty: "Advanced",
        description: "Unity, Work, Progress.",
        hint: "Diagonal quadrisection (Red/Green). White Saltire. Three Red Stars with Green borders in the center.",
        aspectRatio: 3/5,
        target: {
            base: { type: 'quadrisection-diagonal', colors: ['red', 'green', 'red', 'green'] },
            overlays: [
                { type: 'saltire', color: 'white', widthRatio: 20/150 }
            ],
            symbols: [
                {
                    type: 'circle',
                    color: 'white',
                    scale: 1.33
                },
                {
                    type: 'star',
                    color: 'red',
                    borderColor: 'green',
                    points: 6,
                    scale: 0.5,
                    innerRadius: 0.577,
                    yOffset: -0.146
                },
                {
                    type: 'star',
                    color: 'red',
                    borderColor: 'green',
                    points: 6,
                    scale: 0.5,
                    innerRadius: 0.577,
                    xOffset: -0.127 * 3/5,
                    yOffset: 0.0733
                },
                {
                    type: 'star',
                    color: 'red',
                    borderColor: 'green',
                    points: 6,
                    scale: 0.5,
                    innerRadius: 0.577,
                    xOffset: 0.127 * 3/5,
                    yOffset: 0.0733
                }
            ]
        }
    },
    {
        id: 35,
        name: "Cabo Verde",
        difficulty: "Advanced",
        description: "Ten stars for ten islands.",
        hint: "Three horizontal stripes (Blue/White/Red). Ten yellow stars in a circle.",
        aspectRatio: 2/3,
        colorOverrides: {
            'blue': '#003893',
            'red': '#CF2027',
            'gold': '#F7D116',
        },
        target: {
            base: { type: 'horizontal-stripes', count: 5, colors: ['blue', 'white', 'red', 'white', 'blue'], ratios: [0.5, 1/12, 1/12, 1/12, 0.25] },
            overlays: [],
            symbols: [
                {
                    type: 'star',
                    color: 'gold',
                    count: 10,
                    layout: 'arc',
                    radius: 17/360,
                    xOffset: -76/612,
                    yOffset: 45/360,
                    circleRadius: 19 / 72
                }
            ]
        }
    },
    {
        id: 36,
        name: "Cambodia",
        difficulty: "Intermediate",
        description: "Angkor Wat - The Temple.",
        hint: "Three horizontal stripes (Blue/Red/Blue). White Angkor Wat temple in the center.",
        aspectRatio: 2/3,
        colorOverrides: {
            'blue': '#032EA1',
            'red': '#E00025'
        },
        target: {
            base: {
                type: 'horizontal-stripes',
                count: 3,
                colors: ['blue', 'red', 'blue'],
                ratios: [1, 2, 1]
            },
            overlays: [],
            symbols: [
                {
                    type: 'external',
                    src: 'https://upload.wikimedia.org/wikipedia/commons/0/06/Angkor_Wat_in_Flag_of_Cambodia.svg',
                    color: null,
                    width: 0.5,           // 50% of flag width
                    height: 168 / 360     // 168/360 of flag height
                }
            ]
        }
    },
    {
        id: 37,
        name: "Cameroon",
        difficulty: "Intermediate",
        description: "Peace, Work, Fatherland.",
        hint: "Vertical tricolor (Green, Red, Yellow). Yellow star in the center.",
        aspectRatio: 2/3,
        colorOverrides: {
            'green': '#007A5E',
            'red': '#CE1126',
            'gold': '#FCD116'
        },
        target: {
            base: { type: 'vertical-tricolor', colors: ['green', 'red', 'gold'] },
            overlays: [],
            symbols: [
                {
                    type: 'star',
                    color: 'gold',
                    points: 5,
                    scale: 1.0
                }
            ]
        }
    },
    {
        id: 38,
        name: "Canada",
        difficulty: "Intermediate",
        description: "The Maple Leaf.",
        hint: "Three vertical bands (Red, White, Red) with a red maple leaf in the center.",
        aspectRatio: 1/2,
        colorOverrides: {
            'red': '#FF0000'
        },
        target: {
            base: { type: 'vertical-tricolor', colors: ['red', 'white', 'red'], ratios: [1, 2, 1] },
            overlays: [],
            symbols: [
                {
                    type: 'external',
                    src: 'https://upload.wikimedia.org/wikipedia/commons/8/8f/Maple_Leaf.svg',
                    color: "red",
                    height: 108/128,
                    width: 104/256
                }
            ]
        }
    },
    {
        id: 39,
        name: "Chad",
        difficulty: "Novice",
        description: "Liberty, Equality, Fraternity.",
        hint: "Vertical tricolor: Blue, Gold, Red.",
        aspectRatio: 2/3,
        colorOverrides: {
            'blue': '#002664',
            'gold': '#FECB00',
            'red': '#C60C30'
        },
        target: {
            base: { type: 'vertical-tricolor', colors: ['blue', 'gold', 'red'] },
            overlays: [],
            symbols: []
        }
    }
];