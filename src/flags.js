
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
                { type: 'circle', color: 'red', radius: 6/20 }
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
                { type: 'star', color: 'white', parentIndex: 0, radius: 1/8 }
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
                { type: 'star', color: 'white', parentIndex: 0, radius: 1/6 }
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
                    type: 'crescent',
                    color: 'red',
                    outerRadius: 0.25,
                    innerRadius: 0.2,
                    innerOffset: 0.0603814
                },
                {
                    type: 'star',
                    color: 'red',
                    radius: 2.5/20,
                    xOffset: 2.02/30,
                    points: 5,
                    rotation: 90
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
                    type: 'external',
                    src: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Flag_of_the_United_Kingdom_%281-2%29.svg',
                    parentIndex: 0,
                    color: null,
                    scale: 3.33,
                    aspectRatio: 2
                },
                // Commonwealth Star (7 points) - radius 3/20 of flag height
                {
                    type: 'star',
                    color: 'white',
                    points: 7,
                    innerRadius: 0.4,
                    radius: 3/20,
                    xOffset: -0.25,
                    yOffset: 0.25
                },
                // Southern Cross (Crux)
                // Major stars: 1/14 height radius, Minor star: 1/24 height radius

                // Gamma Crucis (Top)
                { type: 'star', color: 'white', points: 7, innerRadius: 0.4, radius: 1/14, xOffset: 0.25, yOffset: -0.35 },
                // Alpha Crucis (Bottom)
                { type: 'star', color: 'white', points: 7, innerRadius: 0.4, radius: 1/14, xOffset: 0.25, yOffset: 0.35 },
                // Beta Crucis (Left)
                { type: 'star', color: 'white', points: 7, innerRadius: 0.4, radius: 1/14, xOffset: 0.10, yOffset: 0.02 },
                // Delta Crucis (Right)
                { type: 'star', color: 'white', points: 7, innerRadius: 0.4, radius: 1/14, xOffset: 0.40, yOffset: -0.05 },
                // Epsilon Crucis (Small, 5pt)
                { type: 'star', color: 'white', points: 5, innerRadius: 0.38, radius: 1/24, xOffset: 0.32, yOffset: 0.16 },
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
                    type: 'crescent',
                    color: 'white',
                    outerRadius: 3/20,
                    innerRadius: 1/8,
                    innerOffset: 1/30
                },
                {
                    type: 'star',
                    color: 'white',
                    radius: 1/12,
                    innerRadius: 1/2,
                    xOffset: 2/10-3/40-1/24,
                    rotation: 90,
                    points: 8
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
                    radius: 0.3375,
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
                    type: 'pattern',
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
                    radius: 0.315
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
                { type: 'star', color: 'white', points: 5, radius: 3/40, xOffset: -0.33, yOffset: -0.5112 },   // Top (Cut off)
                { type: 'star', color: 'white', points: 5, radius: 3/40, xOffset: -0.2675, yOffset: -0.3862 },
                { type: 'star', color: 'white', points: 5, radius: 3/40, xOffset: -0.205, yOffset: -0.2612 },
                { type: 'star', color: 'white', points: 5, radius: 3/40, xOffset: -0.1425, yOffset: -0.1362 },
                { type: 'star', color: 'white', points: 5, radius: 3/40, xOffset: -0.08, yOffset: -0.0112 },   // Center
                { type: 'star', color: 'white', points: 5, radius: 3/40, xOffset: -0.0175, yOffset: 0.1138 },
                { type: 'star', color: 'white', points: 5, radius: 3/40, xOffset: 0.045, yOffset: 0.2388 },
                { type: 'star', color: 'white', points: 5, radius: 3/40, xOffset: 0.1075, yOffset: 0.3638 },
                { type: 'star', color: 'white', points: 5, radius: 3/40, xOffset: 0.17, yOffset: 0.4888 }      // Bottom (Cut off)
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
                    radius: 0.25
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
                    radius: 3/20
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
                    radius: 0.29925
                },
                {
                    type: 'star',
                    color: 'red',
                    borderColor: 'green',
                    points: 6,
                    radius: 3/40,
                    innerRadius: 0.577,
                    yOffset: -0.146
                },
                {
                    type: 'star',
                    color: 'red',
                    borderColor: 'green',
                    points: 6,
                    radius: 3/40,
                    innerRadius: 0.577,
                    xOffset: -0.127 * 3/5,
                    yOffset: 0.0733
                },
                {
                    type: 'star',
                    color: 'red',
                    borderColor: 'green',
                    points: 6,
                    radius: 3/40,
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
                    circleRadius: 19 / 72,
                    arcSpan: 2 * Math.PI  // Full circle
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
                    radius: 3/20
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
    },
    {
        id: 40,
        name: "China",
        difficulty: "Intermediate",
        description: "Five Stars, One Nation.",
        hint: "Red field. One large gold star in the upper left. Four smaller gold stars in an arc to its right.",
        aspectRatio: 2/3,
        colorOverrides: {
            'red': '#DE2910',
            'gold': '#FFDE00'
        },
        target: {
            base: { type: 'solid', colors: ['red'] },
            overlays: [],
            symbols: [
                {
                    type: 'star',
                    color: 'gold',
                    points: 5,
                    radius: 3/20,
                    xOffset: -0.5 + 5/30,
                    yOffset: -0.5 + 5/20
                },
                {
                    type: 'star',
                    color: 'gold',
                    points: 5,
                    count: 4,
                    layout: 'arc',
                    radius: 1/20,
                    xOffset: -6.5/30,
                    yOffset: -0.5 + 5/20,
                    circleRadius: 0.2,
                    startAngle: -1.166,  // Start at upper-right diagonal
                    arcSpan: 2.332      // Span 90 degrees (vertical arc)
                }
            ]
        }
    },
    {
        id: 41,
        name: "Colombia",
        difficulty: "Novice",
        description: "Yellow, Blue, and Red.",
        hint: "Three horizontal stripes: Yellow (larger), Blue, Red.",
        aspectRatio: 2/3,
        colorOverrides: {
            'gold': '#FCD116',
            'blue': '#003893',
            'red': '#CE1126'
        },
        target: {
            base: { type: 'horizontal-stripes', count: 3, colors: ['gold', 'blue', 'red'], ratios: [2, 1, 1] },
            overlays: [],
            symbols: []
        }
    },
    {
        id: 42,
        name: "Comoros",
        difficulty: "Advanced",
        description: "Four stars for four islands.",
        hint: "Four horizontal stripes (Yellow, White, Red, Blue). Green triangle at hoist with white crescent and four stars.",
        aspectRatio: 3/5,
        colorOverrides: {
            'gold': '#FFC61E',
            'red': '#CE1126',
            'blue': '#3A75C4',
            'green': '#3D8E33'
        },
        target: {
            base: { type: 'horizontal-stripes', count: 4, colors: ['gold', 'white', 'red', 'blue'] },
            overlays: [
                { type: 'triangle', position: 'hoist', color: 'green', vertexXRatio: 13/15 }
            ],
            symbols: [
                {
                    type: 'crescent',
                    color: 'white',
                    outerRadius: 68/144 * 0.5,
                    innerRadius: 66/144 * 0.5,
                    innerOffset: 13/140,
                    xOffset: 41/240 - 0.5
                },
                {
                    type: 'star',
                    color: 'white',
                    points: 5,
                    count: 4,
                    layout: 'vertical',
                    radius: 0.04,
                    spacing: 15/144,
                    xOffset: 50/240 - 0.5
                }
            ]
        }
    },
    {
        id: 43,
        name: "Cook Islands",
        difficulty: "Advanced",
        description: "Fifteen stars for fifteen islands.",
        hint: "Blue field. Union Jack in the canton. Circle of 15 white stars on the fly.",
        aspectRatio: 1/2,
        colorOverrides: {
            'blue': '#012169'
        },
        target: {
            base: { type: 'solid', colors: ['blue'] },
            overlays: [
                { type: 'canton', position: 'top-left', color: 'blue', widthRatio: 0.5, heightRatio: 0.5 }
            ],
            symbols: [
                {
                    type: 'external',
                    src: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Flag_of_the_United_Kingdom_%281-2%29.svg',
                    parentIndex: 0,
                    color: null,
                    scale: 3.33,
                    aspectRatio: 2
                },
                {
                    type: 'star',
                    color: 'white',
                    count: 15,
                    layout: 'arc',
                    radius: 9/120,
                    xOffset: 0.25,
                    yOffset: 0,
                    circleRadius: 44/120,
                    arcSpan: 2 * Math.PI,
                    rotateRadially: true
                }
            ]
        }
    },
    {
        id: 44,
        name: "Costa Rica",
        difficulty: "Intermediate",
        description: "Pura Vida.",
        hint: "Five horizontal stripes: Blue, White, Red (double width), White, Blue. Coat of arms on the red stripe.",
        aspectRatio: 3/5,
        colorOverrides: {
            'blue': '#002B7F',
            'red': '#CE1126'
        },
        target: {
            base: {
                type: 'horizontal-stripes',
                count: 5,
                colors: ['blue', 'white', 'red', 'white', 'blue'],
                ratios: [1, 1, 2, 1, 1]
            },
            overlays: [],
            symbols: [
                {
                    type: 'circle',
                    color: 'white',
                    radius: 0.151875,
                    aspectRatio: 10/12,
                    xOffset: -0.5 + 0.3
                },
                {
                    type: 'seal',
                    src: 'https://upload.wikimedia.org/wikipedia/commons/8/84/Coat_of_arms_of_Costa_Rica.svg',
                    color: null,
                    aspectRatio: 11/12,
                    scale: 0.85,
                    xOffset: -0.5 + 0.3
                }
            ]
        }
    },
    {
        id: 45,
        name: "Ivory Coast",
        difficulty: "Novice",
        description: "Côte d'Ivoire.",
        hint: "Three vertical stripes: Orange, White, Green.",
        aspectRatio: 2/3,
        colorOverrides: {
            'orange': '#F77F00'
        },
        target: {
            base: { type: 'vertical-tricolor', colors: ['orange', 'white', 'green'] },
            overlays: [],
            symbols: []
        }
    },
    {
        id: 46,
        name: "Croatia",
        difficulty: "Intermediate",
        description: "The Checkered Shield.",
        hint: "Three horizontal stripes: Red, White, Blue. Checkered coat of arms in the center.",
        aspectRatio: 1/2,
        colorOverrides: {
            'red': '#E1000F',
            'blue': '#000091'
        },
        target: {
            base: { type: 'horizontal-stripes', count: 3, colors: ['red', 'white', 'blue'] },
            overlays: [],
            symbols: [
                {
                    type: 'seal',
                    src: 'https://upload.wikimedia.org/wikipedia/commons/c/c9/Coat_of_arms_of_Croatia.svg',
                    color: null,
                    aspectRatio: 9/12,
                    scale: 2.05,
                    yOffset: -0.055,
                }
            ]
        }
    },
    {
        id: 47,
        name: "Cyprus",
        difficulty: "Intermediate",
        description: "The Island of Copper.",
        hint: "White field. Copper-colored silhouette of the island. Two green olive branches below.",
        aspectRatio: 2/3,
        target: {
            base: { type: 'solid', colors: ['white'] },
            overlays: [],
            symbols: [
                {
                    type: 'seal',
                    src: 'Flag_of_Cyprus.svg',
                    color: null,
                    scale: 3.33,
                    aspectRatio: 1200/800
                }
            ]
        }
    },
    {
        id: 48,
        name: "Denmark",
        difficulty: "Intermediate",
        description: "The Dannebrog - oldest national flag in continuous use.",
        hint: "Red field. White Nordic cross offset towards the hoist.",
        aspectRatio: 28/37,
        colorOverrides: {
            'red': '#C60C30'
        },
        target: {
            base: { type: 'solid', colors: ['red'] },
            overlays: [
                { type: 'nordic-cross', color: 'white', verticalOffset: 12/37, crossWidth: 4/28 }
            ],
            symbols: []
        }
    },
    {
        id: 49,
        name: "Djibouti",
        difficulty: "Intermediate",
        description: "Unity, Equality, Peace.",
        hint: "Light blue over green. White triangle at hoist. Red star in the triangle.",
        aspectRatio: 2/3,
        colorOverrides: {
            'lightBlue': '#6AB2E7',
            'green': '#12AD2B',
            'red': '#D7141A'
        },
        target: {
            base: { type: 'bisection-horizontal', colors: ['lightBlue', 'green'] },
            overlays: [
                { type: 'triangle', position: 'hoist', color: 'white', equilateral: true }
            ],
            symbols: [
                {
                    type: 'star',
                    color: 'red',
                    points: 5,
                    radius: 5/30,
                    xOffset: -0.28
                }
            ]
        }
    },
    {
        id: 50,
        name: "Dominican Republic",
        difficulty: "Intermediate",
        description: "Dios, Patria, Libertad.",
        hint: "Quartered blue and red. White centered cross. Coat of arms in center.",
        aspectRatio: 2/3,
        colorOverrides: {
            'blue': '#002D62',
            'red': '#CE1126'
        },
        target: {
            base: { type: 'quartered', colors: ['blue', 'red', 'red', 'blue'] },
            overlays: [
                { type: 'cross', color: 'white', crossWidth: 0.2 }
            ],
            symbols: [
                {
                    type: 'seal',
                    src: 'https://upload.wikimedia.org/wikipedia/commons/2/26/Coat_of_arms_of_the_Dominican_Republic.svg',
                    color: null,
                    scale: 0.65
                }
            ]
        }
    },
    {
        id: 51,
        name: "Ecuador",
        difficulty: "Intermediate",
        description: "Dios, patria y libertad.",
        hint: "Yellow (double), blue, red horizontal stripes. Coat of arms in center.",
        aspectRatio: 2/3,
        colorOverrides: {
            'gold': '#FFD100',
            'blue': '#0033A0',
            'red': '#EF3340'
        },
        target: {
            base: { type: 'horizontal-stripes', count: 3, colors: ['gold', 'blue', 'red'], ratios: [2, 1, 1] },
            overlays: [],
            symbols: [
                {
                    type: 'seal',
                    src: 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Coat_of_arms_of_Ecuador.svg',
                    color: null,
                    scale: 1.5
                }
            ]
        }
    },
    {
        id: 52,
        name: "Egypt",
        difficulty: "Intermediate",
        description: "The Eagle of Saladin.",
        hint: "Red, white, black horizontal stripes. Eagle emblem in center.",
        aspectRatio: 2/3,
        colorOverrides: {
            'red': '#CE1126',
            'black': '#000000'
        },
        target: {
            base: { type: 'horizontal-stripes', count: 3, colors: ['red', 'white', 'black'] },
            overlays: [],
            symbols: [
                {
                    type: 'seal',
                    src: 'https://upload.wikimedia.org/wikipedia/commons/c/c2/Coat_of_arms_of_Egypt_%28on_flag%29.svg',
                    color: null,
                    aspectRatio: 4.4/6,
                    scale: 1.0
                }
            ]
        }
    },
    {
        id: 53,
        name: "El Salvador",
        difficulty: "Intermediate",
        description: "Dios, Unión, Libertad.",
        hint: "Blue, white, blue horizontal stripes. Coat of arms in center.",
        aspectRatio: 189/335,
        colorOverrides: {
            'blue': '#0047AB'
        },
        target: {
            base: { type: 'horizontal-stripes', count: 3, colors: ['blue', 'white', 'blue'] },
            overlays: [],
            symbols: [
                {
                    type: 'seal',
                    src: 'https://upload.wikimedia.org/wikipedia/commons/e/e6/Coat_of_arms_of_El_Salvador.svg',
                    color: null,
                    scale: 1
                }
            ]
        }
    },
    {
        id: 54,
        name: "England",
        difficulty: "Novice",
        description: "St George's Cross.",
        hint: "White field. Red centered cross.",
        aspectRatio: 3/5,
        colorOverrides: {
            'red': '#CE1126'
        },
        target: {
            base: { type: 'solid', colors: ['white'] },
            overlays: [
                { type: 'cross', color: 'red', crossWidth: 0.2 }
            ],
            symbols: []
        }
    },
    {
        id: 55,
        name: "Equatorial Guinea",
        difficulty: "Intermediate",
        description: "Unidad, Paz, Justicia.",
        hint: "Green, white, red horizontal stripes. Blue triangle at hoist. Coat of arms in center.",
        aspectRatio: 2/3,
        colorOverrides: {
            'green': '#3E9A00',
            'red': '#E32118',
            'blue': '#0073CE'
        },
        target: {
            base: { type: 'horizontal-stripes', count: 3, colors: ['green', 'white', 'red'] },
            overlays: [
                { type: 'triangle', position: 'hoist', color: 'blue', vertexXRatio: 9/24 }
            ],
            symbols: [
                {
                    type: 'seal',
                    src: 'https://upload.wikimedia.org/wikipedia/commons/f/f8/Coat_of_arms_of_Equatorial_Guinea.svg',
                    color: null,
                    aspectRatio: 1277/1527,
                    scale: 1
                }
            ]
        }
    },
    {
        id: 56,
        name: "Eritrea",
        difficulty: "Intermediate",
        description: "The Red Sea nation.",
        hint: "Green and blue triangles. Large red triangle from hoist. Gold olive wreath emblem.",
        aspectRatio: 1/2,
        colorOverrides: {
            'green': '#12AD2B',
            'blue': '#4189DD',
            'red': '#EA0437'
        },
        target: {
            base: { type: 'bisection-horizontal', colors: ['green', 'blue'] },
            overlays: [
                { type: 'pile', color: 'red' }
            ],
            symbols: [
                {
                    type: 'seal',
                    src: 'https://upload.wikimedia.org/wikipedia/commons/0/02/Insigne_Eritreae.svg',
                    color: null,
                    scale: 1.7,
                    xOffset: -0.25
                }
            ]
        }
    },
    {
        id: 57,
        name: "Estonia",
        difficulty: "Novice",
        description: "The Nordic-Baltic tricolor.",
        hint: "Blue, black, white horizontal stripes.",
        aspectRatio: 7/11,
        colorOverrides: {
            'blue': '#0072CE',
            'black': '#000000'
        },
        target: {
            base: { type: 'horizontal-stripes', count: 3, colors: ['blue', 'black', 'white'] },
            overlays: [],
            symbols: []
        }
    },
    {
        id: 58,
        name: "Eswatini",
        difficulty: "Intermediate",
        description: "The Kingdom of Eswatini.",
        hint: "Blue, yellow, red, yellow, blue stripes. Nguni shield with spears in center.",
        aspectRatio: 2/3,
        colorOverrides: {
            'blue': '#3E5EB9',
            'gold': '#FFD900',
            'red': '#B10C0C'
        },
        target: {
            base: { type: 'horizontal-stripes', count: 5, colors: ['blue', 'gold', 'red', 'gold', 'blue'], ratios: [3, 1, 8, 1, 3] },
            overlays: [],
            symbols: [
                {
                    type: 'seal',
                    src: 'Eswatini.svg',
                    color: null,
                    aspectRatio: 3/2,
                    scale: 3.3
                }
            ]
        }
    },
    {
        id: 59,
        name: "Ethiopia",
        difficulty: "Intermediate",
        description: "Land of Origins.",
        hint: "Green, yellow, red horizontal stripes. Blue circle with gold star in center.",
        aspectRatio: 1/2,
        colorOverrides: {
            'green': '#078930',
            'gold': '#FCDD09',
            'red': '#DA121A',
            'blue': '#0F47AF'
        },
        target: {
            base: { type: 'horizontal-stripes', count: 3, colors: ['green', 'gold', 'red'] },
            overlays: [],
            symbols: [
                {
                    type: 'circle',
                    color: 'blue',
                    radius: 1/3
                },
                {
                    type: 'seal',
                    src: 'Ethiopia.svg',
                    color: null,
                    scale: 2.2
                }
            ]
        }
    },
    {
        id: 60,
        name: "European Union",
        difficulty: "Intermediate",
        description: "United in diversity.",
        hint: "Blue field. Circle of 12 gold stars.",
        aspectRatio: 2/3,
        colorOverrides: {
            'blue': '#003399',
            'gold': '#FFCC00'
        },
        target: {
            base: { type: 'solid', colors: ['blue'] },
            overlays: [],
            symbols: [
                {
                    type: 'star',
                    color: 'gold',
                    points: 5,
                    count: 12,
                    layout: 'arc',
                    radius: 1/18,
                    circleRadius: 1/3,
                    arcSpan: 2 * Math.PI
                }
            ]
        }
    },
    {
        id: 61,
        name: "Faroe Islands",
        difficulty: "Intermediate",
        description: "The Merkið - Banner of the Faroese.",
        hint: "White field. Blue-bordered red Nordic cross.",
        aspectRatio: 8/11,
        colorOverrides: {
            'blue': '#005EB8',
            'red': '#ED2939'
        },
        target: {
            base: { type: 'solid', colors: ['white'] },
            overlays: [
                { type: 'nordic-cross', color: 'blue', verticalOffset: 6/22, crossWidth: 4/16 },
                { type: 'nordic-cross', color: 'red', verticalOffset: 7/22, crossWidth: 2/16 }
            ],
            symbols: []
        }
    },
    {
        id: 62,
        name: "Fiji",
        difficulty: "Intermediate",
        description: "Rerevaka na Kalou ka Doka na Tui.",
        hint: "Light blue field. Union Jack in canton. Shield on the fly.",
        aspectRatio: 1/2,
        colorOverrides: {
            'lightBlue': '#68BFE5'
        },
        target: {
            base: { type: 'solid', colors: ['lightBlue'] },
            overlays: [
                { type: 'canton', position: 'top-left', color: 'blue', widthRatio: 0.5, heightRatio: 0.5 }
            ],
            symbols: [
                {
                    type: 'external',
                    src: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Flag_of_the_United_Kingdom_%281-2%29.svg',
                    parentIndex: 0,
                    color: null,
                    scale: 3.33,
                    aspectRatio: 2
                },
                {
                    type: 'seal',
                    src: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Arms_of_Fiji.svg',
                    color: null,
                    scale: 1.8,
                    xOffset: 0.25
                }
            ]
        }
    },
    {
        id: 63,
        name: "Finland",
        difficulty: "Novice",
        description: "The Blue Cross Flag.",
        hint: "White field. Blue Nordic cross.",
        aspectRatio: 11/18,
        colorOverrides: {
            'blue': '#003580'
        },
        target: {
            base: { type: 'solid', colors: ['white'] },
            overlays: [
                { type: 'nordic-cross', color: 'blue', verticalOffset: 5/18, crossWidth: 3/11 }
            ],
            symbols: []
        }
    },
    {
        id: 64,
        name: "French Polynesia",
        difficulty: "Intermediate",
        description: "Tahiti Nui.",
        hint: "Red, white, red horizontal stripes (1:2:1). Coat of arms in center.",
        aspectRatio: 2/3,
        colorOverrides: {
            'red': '#CE1126'
        },
        target: {
            base: { type: 'horizontal-stripes', count: 3, colors: ['red', 'white', 'red'], ratios: [1, 2, 1] },
            overlays: [],
            symbols: [
                {
                    type: 'seal',
                    src: 'https://upload.wikimedia.org/wikipedia/commons/6/65/Coat_of_arms_of_French_Polynesia.svg',
                    color: null,
                    scale: 1.6
                }
            ]
        }
    },
    {
        id: 65,
        name: "Gabon",
        difficulty: "Novice",
        description: "Union, Travail, Justice.",
        hint: "Green, yellow, blue horizontal stripes.",
        aspectRatio: 3/4,
        colorOverrides: {
            'green': '#009E60',
            'gold': '#FCD116',
            'blue': '#3A75C4'
        },
        target: {
            base: { type: 'horizontal-stripes', count: 3, colors: ['green', 'gold', 'blue'] },
            overlays: [],
            symbols: []
        }
    },
    {
        id: 66,
        name: "The Gambia",
        difficulty: "Novice",
        description: "Progress, Peace, Prosperity.",
        hint: "Red, white, blue, white, green horizontal stripes.",
        aspectRatio: 2/3,
        colorOverrides: {
            'red': '#CE1126',
            'blue': '#0C1C8C',
            'green': '#3A7728'
        },
        target: {
            base: { type: 'horizontal-stripes', count: 5, colors: ['red', 'white', 'blue', 'white', 'green'], ratios: [6, 1, 4, 1, 6] },
            overlays: [],
            symbols: []
        }
    },
    {
        id: 67,
        name: "Georgia",
        difficulty: "Advanced",
        description: "The Five Cross Flag.",
        hint: "White field. Large red cross. Four small red Bolnisi crosses in each quadrant.",
        aspectRatio: 2/3,
        colorOverrides: {
            'red': '#FF0000'
        },
        target: {
            base: { type: 'solid', colors: ['white'] },
            overlays: [
                { type: 'cross', color: 'red', crossWidth: 1/5 }
            ],
            symbols: [
                { type: 'cross', color: 'red', radius: 0.08, thickness: 0.5, xOffset: -0.3, yOffset: -0.3 },
                { type: 'cross', color: 'red', radius: 0.08, thickness: 0.5, xOffset: 0.3, yOffset: -0.3 },
                { type: 'cross', color: 'red', radius: 0.08, thickness: 0.5, xOffset: -0.3, yOffset: 0.3 },
                { type: 'cross', color: 'red', radius: 0.08, thickness: 0.5, xOffset: 0.3, yOffset: 0.3 }
            ]
        }
    },
    {
        id: 68,
        name: "Germany",
        difficulty: "Novice",
        description: "Einigkeit und Recht und Freiheit.",
        hint: "Three horizontal stripes: Black, Red, Gold.",
        aspectRatio: 3/5,
        target: {
            base: { type: 'horizontal-stripes', count: 3, colors: ['black', 'red', 'gold'] },
            overlays: [],
            symbols: []
        }
    },
    {
        id: 69,
        name: "Ghana",
        difficulty: "Intermediate",
        description: "Freedom and Justice.",
        hint: "Three horizontal stripes: Red, Gold, Green. Black star in the center.",
        aspectRatio: 2/3,
        target: {
            base: { type: 'horizontal-stripes', count: 3, colors: ['red', 'gold', 'green'] },
            overlays: [],
            symbols: [
                {
                    type: 'star',
                    color: 'black',
                    points: 5,
                    radius: 0.1845,
                    yOffset: 0.017,
                }
            ]
        }
    },
    {
        id: 70,
        name: "Greece",
        difficulty: "Intermediate",
        description: "Eleftheria i Thanatos (Freedom or Death).",
        hint: "Nine horizontal stripes: Blue and White alternating. Blue canton with white cross.",
        aspectRatio: 2/3,
        colorOverrides: {
            'blue': '#0D5EAF'
        },
        target: {
            base: { type: 'horizontal-stripes', count: 9, colors: ['blue', 'white'] },
            overlays: [
                { type: 'canton', position: 'top-left', color: 'blue', widthRatio: 10/27, heightRatio: 5/9 }
            ],
            symbols: [
                {
                    type: 'cross',
                    color: 'white',
                    parentIndex: 0,
                    radius: 0.278,
                    thickness: 0.4
                }
            ]
        }
    },
    {
        id: 71,
        name: "Greenland",
        difficulty: "Intermediate",
        description: "Kalaallit Nunaat.",
        hint: "White and red horizontal halves. Counter-changed disk offset toward the hoist.",
        aspectRatio: 2/3,
        colorOverrides: {
            'red': '#C8102E'
        },
        target: {
            base: { type: 'bisection-horizontal', colors: ['white', 'red'] },
            overlays: [],
            symbols: [
                {
                    type: 'circle',
                    counterChanged: true,
                    colors: ['red', 'white'],
                    radius: 3/9,
                    xOffset: -1/9
                }
            ]
        }
    },
    {
        id: 72,
        name: "Grenada",
        difficulty: "Advanced",
        description: "Isle of Spice.",
        hint: "Red border. Diagonal gold and green quarters. Red circle with gold star. Six stars in border. Nutmeg on hoist.",
        aspectRatio: 3/5,
        colorOverrides: {
            'red': '#CE1126',
            'gold': '#FCD116',
            'green': '#007A5E'
        },
        target: {
            base: { type: 'quadrisection-diagonal', colors: ['gold', 'green', 'gold', 'green'] },
            overlays: [
                { type: 'border', color: 'red', widthRatio: 84/600 }
            ],
            symbols: [
                // Red circle in center
                { type: 'circle', color: 'red', radius: 0.12 },
                // Gold 5-pointed star in center circle
                { type: 'star', color: 'gold', points: 5, radius: 9/80 },
                // 3 stars at top border
                { type: 'star', color: 'gold', points: 5, radius: 3/50, xOffset: -0.2, yOffset: 42/600 - 0.5 },
                { type: 'star', color: 'gold', points: 5, radius: 3/50, xOffset: 0, yOffset: 42/600 - 0.5 },
                { type: 'star', color: 'gold', points: 5, radius: 3/50, xOffset: 0.2, yOffset: 42/600 - 0.5 },
                // 3 stars at bottom border
                { type: 'star', color: 'gold', points: 5, radius: 21/400, xOffset: -0.2, yOffset: -42/600 + 0.5 },
                { type: 'star', color: 'gold', points: 5, radius: 21/400, xOffset: 0, yOffset: -42/600 + 0.5 },
                { type: 'star', color: 'gold', points: 5, radius: 21/400, xOffset: 0.2, yOffset: -42/600 + 0.5 },
                // Nutmeg on left green triangle
                {
                    type: 'seal',
                    src: 'Grenada.svg',
                    color: null,
                    scale: 0.6,
                    xOffset: -0.32
                }
            ]
        }
    },
    {
        id: 73,
        name: "Guatemala",
        difficulty: "Intermediate",
        description: "Libertad 15 de Septiembre de 1821.",
        hint: "Three vertical stripes: Light Blue, White, Light Blue. Coat of arms in the center.",
        aspectRatio: 5/8,
        colorOverrides: {
            'lightBlue': '#4997D0'
        },
        target: {
            base: { type: 'vertical-tricolor', colors: ['lightBlue', 'white', 'lightBlue'] },
            overlays: [],
            symbols: [
                {
                    type: 'seal',
                    src: 'https://upload.wikimedia.org/wikipedia/commons/1/15/Coat_of_arms_of_Guatemala.svg',
                    color: null,
                    scale: 1.6
                }
            ]
        }
    },
    {
        id: 74,
        name: "Guinea",
        difficulty: "Novice",
        description: "Travail, Justice, Solidarité.",
        hint: "Three vertical stripes: Red, Yellow, Green.",
        aspectRatio: 2/3,
        colorOverrides: {
            'red': '#CE1126',
            'gold': '#FCD116',
            'green': '#009460'
        },
        target: {
            base: { type: 'vertical-tricolor', colors: ['red', 'gold', 'green'] },
            overlays: [],
            symbols: []
        }
    },
    {
        id: 75,
        name: "Guinea-Bissau",
        difficulty: "Intermediate",
        description: "Unidade, Luta, Progresso.",
        hint: "Red vertical stripe at hoist with black star. Yellow and green horizontal stripes on fly.",
        aspectRatio: 1/2,
        colorOverrides: {
            'red': '#CE1126',
            'gold': '#FCD116',
            'green': '#009E49'
        },
        target: {
            base: { type: 'bisection-horizontal', colors: ['gold', 'green'] },
            overlays: [
                { type: 'side', color: 'red', widthRatio: 1/3, side: 'left' }
            ],
            symbols: [
                {
                    type: 'star',
                    color: 'black',
                    points: 5,
                    radius: 3/20,
                    xOffset: -1/3
                }
            ]
        }
    },
    {
        id: 76,
        name: "Guyana",
        difficulty: "Intermediate",
        description: "The Golden Arrowhead.",
        hint: "Green field. Golden arrow from hoist. Red triangle with black border inside.",
        aspectRatio: 3/5,
        colorOverrides: {
            'green': '#009E49',
            'gold': '#FCD116',
            'red': '#CE1126'
        },
        target: {
            base: { type: 'solid', colors: ['green'] },
            overlays: [
                { type: 'pile', color: 'white' },
                { type: 'pile', color: 'gold', vertexXRatio: 0.93, height: 0.95 },
                { type: 'triangle', color: 'black', vertexXRatio: 0.5 * 5/3 },
                { type: 'triangle', color: 'red', vertexXRatio: 0.43 * 5/3, height: 0.85 }
            ],
            symbols: []
        }
    },
    {
        id: 77,
        name: "Haiti",
        difficulty: "Intermediate",
        description: "L'Union Fait La Force.",
        hint: "Blue over red horizontal bisection. White square in center with coat of arms.",
        aspectRatio: 3/5,
        colorOverrides: {
            'blue': '#00209F',
            'red': '#D21034'
        },
        target: {
            base: { type: 'bisection-horizontal', colors: ['blue', 'red'] },
            overlays: [],
            symbols: [
                {
                    type: 'box',
                    color: 'white',
                    radius: 0.2,
                    aspectRatio: 900/716
                },
                {
                    type: 'seal',
                    src: 'https://upload.wikimedia.org/wikipedia/commons/7/75/Coat_of_arms_of_Haiti.svg',
                    color: null,
                    aspectRatio: 900/716,
                    scale: 1.35
                }
            ]
        }
    },
    {
        id: 78,
        name: "Honduras",
        difficulty: "Intermediate",
        description: "Libre, Soberana e Independiente.",
        hint: "Blue, white, blue horizontal stripes. Five blue stars in X pattern in center.",
        aspectRatio: 1/2,
        colorOverrides: {
            'blue': '#00bce4'
        },
        target: {
            base: { type: 'horizontal-stripes', count: 3, colors: ['blue', 'white', 'blue'] },
            overlays: [],
            symbols: [
                {
                    type: 'star',
                    color: 'blue',
                    points: 5,
                    count: 5,
                    layout: 'quincunx',
                    radius: 2/36,
                    spacingX: 10/36,
                    spacingY: 3/36
                }
            ]
        }
    },
    {
        id: 79,
        name: "Hungary",
        difficulty: "Novice",
        description: "Strength, Fidelity, Hope.",
        hint: "Three horizontal stripes: Red, White, Green.",
        aspectRatio: 1/2,
        colorOverrides: {
            'red': '#CE2939',
            'green': '#477050'
        },
        target: {
            base: { type: 'horizontal-stripes', count: 3, colors: ['red', 'white', 'green'] },
            overlays: [],
            symbols: []
        }
    },
    {
        id: 80,
        name: "Iceland",
        difficulty: "Intermediate",
        description: "The Blue Field with Fire and Ice.",
        hint: "Blue field. White-bordered red Nordic cross.",
        aspectRatio: 18/25,
        colorOverrides: {
            'blue': '#02529C',
            'red': '#DC1E35'
        },
        target: {
            base: { type: 'solid', colors: ['blue'] },
            overlays: [
                { type: 'nordic-cross', color: 'white', verticalOffset: 7/25, crossWidth: 4/18 },
                { type: 'nordic-cross', color: 'red', verticalOffset: 8/25, crossWidth: 2/18 }
            ],
            symbols: []
        }
    },
    {
        id: 81,
        name: "India",
        difficulty: "Intermediate",
        description: "Satyameva Jayate - Truth Alone Triumphs.",
        hint: "Three horizontal stripes: Saffron, White, Green. Ashoka Chakra (24-spoke wheel) in center.",
        aspectRatio: 2/3,
        colorOverrides: {
            'orange': '#FF9933',
            'green': '#138808',
            'blue': '#000080'
        },
        target: {
            base: { type: 'horizontal-stripes', count: 3, colors: ['orange', 'white', 'green'] },
            overlays: [],
            symbols: [
                {
                    type: 'seal',
                    src: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/Ashoka_Chakra_1.svg',
                    color: null,
                    scale: 1.0
                }
            ]
        }
    },
    {
        id: 82,
        name: "Indonesia",
        difficulty: "Novice",
        description: "Sang Saka Merah-Putih.",
        hint: "Two horizontal stripes: Red over White.",
        aspectRatio: 2/3,
        colorOverrides: {
            'red': '#CE1126'
        },
        target: {
            base: { type: 'bisection-horizontal', colors: ['red', 'white'] },
            overlays: [],
            symbols: []
        }
    },
    {
        id: 83,
        name: "Iran",
        difficulty: "Advanced",
        description: "Allahu Akbar.",
        hint: "Green, white, red horizontal stripes. Emblem in center. Kufic script pattern on stripe borders.",
        aspectRatio: 4/7,
        colorOverrides: {
            'green': '#239F40',
            'red': '#DA0000'
        },
        target: {
            base: { type: 'horizontal-stripes', count: 3, colors: ['green', 'white', 'red'] },
            overlays: [],
            symbols: [
                {
                    type: 'pattern',
                    src: 'Iran.svg',
                    color: null,
                    width: 1,
                    aspectRatio: 985/254
                },
                {
                    type: 'external',
                    src: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Emblem_of_Iran.svg',
                    color: 'red',
                    scale: 1.0
                }
            ]
        }
    },
    {
        id: 84,
        name: "Iraq",
        difficulty: "Intermediate",
        description: "Allahu Akbar - God is Greatest.",
        hint: "Red, white, black horizontal stripes. Green Takbir script in the center.",
        aspectRatio: 2/3,
        colorOverrides: {
            'red': '#CE1126',
            'green': '#007A3D'
        },
        target: {
            base: { type: 'horizontal-stripes', count: 3, colors: ['red', 'white', 'black'] },
            overlays: [],
            symbols: [
                {
                    type: 'external',
                    src: 'Iraq.svg',
                    color: 'green',
                    width: 0.45,
                    aspectRatio: 4500/1650
                }
            ]
        }
    },
    {
        id: 85,
        name: "Ireland",
        difficulty: "Novice",
        description: "The Irish Tricolour.",
        hint: "Three vertical stripes: Green, White, Orange.",
        aspectRatio: 1/2,
        colorOverrides: {
            'green': '#169B62',
            'orange': '#FF883E'
        },
        target: {
            base: { type: 'vertical-tricolor', colors: ['green', 'white', 'orange'] },
            overlays: [],
            symbols: []
        }
    },
    {
        id: 86,
        name: "Israel",
        difficulty: "Intermediate",
        description: "The Star of David.",
        hint: "White field with two blue horizontal stripes. Blue Star of David in the center.",
        aspectRatio: 8/11,
        colorOverrides: {
            'blue': '#0038B8'
        },
        target: {
            base: {
                type: 'horizontal-stripes',
                count: 5,
                colors: ['white', 'blue', 'white', 'blue', 'white'],
                ratios: [4, 3, 18, 3, 4]
            },
            overlays: [],
            symbols: [
                {
                    type: 'external',
                    src: 'https://upload.wikimedia.org/wikipedia/commons/4/49/Star_of_David.svg',
                    color: 'blue',
                    scale: 1.7
                }
            ]
        }
    },
    {
        id: 87,
        name: "Jamaica",
        difficulty: "Intermediate",
        description: "Out of Many, One People.",
        hint: "Gold saltire (diagonal cross). Green triangles top and bottom. Black triangles left and right.",
        aspectRatio: 1/2,
        colorOverrides: {
            'gold': '#FED100',
            'green': '#009B3A'
        },
        target: {
            base: { type: 'quadrisection-diagonal', colors: ['green', 'black', 'green', 'black'] },
            overlays: [
                { type: 'saltire', color: 'gold', widthRatio: 1/6 }
            ],
            symbols: []
        }
    },
    {
        id: 88,
        name: "Jordan",
        difficulty: "Intermediate",
        description: "The Hashemite Kingdom.",
        hint: "Three horizontal stripes: Black, White, Green. Red triangle at hoist with a white 7-pointed star.",
        aspectRatio: 1/2,
        colorOverrides: {
            'red': '#CE1126',
            'green': '#007A3D'
        },
        target: {
            base: { type: 'horizontal-stripes', count: 3, colors: ['black', 'white', 'green'] },
            overlays: [
                { type: 'triangle', position: 'hoist', color: 'red', vertexXRatio: 1 }
            ],
            symbols: [
                {
                    type: 'star',
                    color: 'white',
                    points: 7,
                    parentIndex: 0,
                    innerRadius: 0.5,
                    outerRadius: 6/42,
                }
            ]
        }
    },
    {
        id: 89,
        name: "Kazakhstan",
        difficulty: "Advanced",
        description: "The Golden Sun and Steppe Eagle.",
        hint: "Light blue field. Golden sun with 32 rays. Golden eagle below. Golden ornamental pattern at hoist.",
        aspectRatio: 1/2,
        colorOverrides: {
            'lightBlue': '#00abc2',
            'gold': '#FFEC2D'
        },
        target: {
            base: { type: 'solid', colors: ['lightBlue'] },
            overlays: [],
            symbols: [
                {
                    type: 'external',
                    src: 'kazakastan_symbol.svg',
                    color: 'gold',
                    scale: 2.2,
                    xOffset: 36/400/2
                },
                {
                    type: 'pattern',
                    src: 'kazakastan_pattern.svg',
                    color: null,
                    height: 1,
                    aspectRatio: 100/500,
                    xOffset: -0.45
                }
            ]
        }
    },
    {
        id: 90,
        name: "Kenya",
        difficulty: "Advanced",
        description: "Harambee - Let us all pull together.",
        hint: "Black, red, green horizontal stripes with white fimbriations. Maasai shield and spears in center.",
        aspectRatio: 2/3,
        colorOverrides: {
            'red': '#BB0000',
            'green': '#006600'
        },
        target: {
            base: {
                type: 'horizontal-stripes',
                count: 5,
                colors: ['black', 'white', 'red', 'white', 'green'],
                ratios: [3, 1, 4, 1, 3]
            },
            overlays: [],
            symbols: [
                {
                    type: 'seal',
                    src: 'http://upload.wikimedia.org/wikipedia/commons/e/e2/Flag_of_Kenya_%28shield%29.svg',
                    color: null,
                    scale: 2.5,
                    yOffset: -0.02,
                    aspectRatio: 2.5/4,
                }
            ]
        }
    },
    {
        id: 91,
        name: "Kosovo",
        difficulty: "Intermediate",
        description: "The youngest European nation.",
        hint: "Blue field. Golden map of Kosovo. Six white stars in an arc above.",
        aspectRatio: 5/7,
        colorOverrides: {
            'blue': '#244AA5',
            'gold': '#D0A650'
        },
        target: {
            base: { type: 'solid', colors: ['blue'] },
            overlays: [],
            symbols: [
                {
                    type: 'star',
                    color: 'white',
                    points: 5,
                    count: 6,
                    layout: 'arc',
                    radius: 1/20,
                    yOffset: 0.5,
                    circleRadius: 225/280,
                    arcSpan: Math.PI * 0.25,
                    startAngle: -Math.PI * 112.5/180
                },
                {
                    type: 'external',
                    src: 'kosovo_country.svg',
                    color: 'gold',
                    scale: 2.2,
                    yOffset: 0.12
                }
            ]
        }
    },
    {
        id: 92,
        name: "Kyrgyzstan",
        difficulty: "Intermediate",
        description: "The 40-Ray Sun and Tunduk.",
        hint: "Red field. Golden sun with 40 rays and a tunduk (yurt crown) in the center.",
        aspectRatio: 3/5,
        colorOverrides: {
            'red': '#FF0000',
            'gold': '#FFFF00'
        },
        target: {
            base: { type: 'solid', colors: ['red'] },
            overlays: [],
            symbols: [
                {
                    type: 'external',
                    src: 'kyrgyzstan_sun.svg',
                    color: 'gold',
                    scale: 2
                }
            ]
        }
    },
    {
        id: 93,
        name: "Laos",
        difficulty: "Intermediate",
        description: "The Land of a Million Elephants.",
        hint: "Red, blue, red horizontal stripes (1:2:1 ratio). White circle in the center.",
        aspectRatio: 2/3,
        colorOverrides: {
            'red': '#CE1126',
            'blue': '#002868'
        },
        target: {
            base: {
                type: 'horizontal-stripes',
                count: 3,
                colors: ['red', 'blue', 'red'],
                ratios: [1, 2, 1]
            },
            overlays: [],
            symbols: [
                {
                    type: 'circle',
                    color: 'white',
                    radius: 2/10
                }
            ]
        }
    },
    {
        id: 94,
        name: "Kuwait",
        difficulty: "Intermediate",
        description: "Pearl of the Gulf.",
        hint: "Green, white, red horizontal stripes. Black trapezoid at hoist.",
        aspectRatio: 1/2,
        colorOverrides: {
            'green': '#007A3D',
            'red': '#CE1126'
        },
        target: {
            base: {
                type: 'horizontal-stripes',
                count: 3,
                colors: ['green', 'white', 'red']
            },
            overlays: [
                {
                    type: 'trapezoid',
                    color: 'black',
                    widthRatio: 0.25,
                    heightRatio: 1/3
                }
            ],
            symbols: []
        }
    },
    {
        id: 95,
        name: "Latvia",
        difficulty: "Easy",
        description: "The Carmine Banner.",
        hint: "Carmine (dark red), white, carmine horizontal stripes (2:1:2 ratio).",
        aspectRatio: 1/2,
        colorOverrides: {
            'red': '#9D2235'
        },
        target: {
            base: {
                type: 'horizontal-stripes',
                count: 3,
                colors: ['red', 'white', 'red'],
                ratios: [2, 1, 2]
            },
            overlays: [],
            symbols: []
        }
    },
    {
        id: 96,
        name: "Lebanon",
        difficulty: "Intermediate",
        description: "The Cedar of Lebanon.",
        hint: "Red, white, red horizontal stripes (1:2:1 ratio). Green cedar tree in center.",
        aspectRatio: 2/3,
        colorOverrides: {
            'red': '#ED1C24',
            'green': '#00A651'
        },
        target: {
            base: {
                type: 'horizontal-stripes',
                count: 3,
                colors: ['red', 'white', 'red'],
                ratios: [1, 2, 1]
            },
            overlays: [],
            symbols: [
                {
                    type: 'external',
                    src: 'https://upload.wikimedia.org/wikipedia/commons/f/fd/Arms_of_Lebanon.svg',
                    color: 'green',
                    scale: 1.67
                }
            ]
        }
    },
    {
        id: 97,
        name: "Lesotho",
        difficulty: "Intermediate",
        description: "The Kingdom in the Sky.",
        hint: "Blue, white, green horizontal stripes (3:4:3 ratio). Black Basotho hat (mokorotlo) in center.",
        aspectRatio: 2/3,
        colorOverrides: {
            'blue': '#00209F',
            'green': '#009543'
        },
        target: {
            base: {
                type: 'horizontal-stripes',
                count: 3,
                colors: ['blue', 'white', 'green'],
                ratios: [3, 4, 3]
            },
            overlays: [],
            symbols: [
                {
                    type: 'external',
                    src: 'https://upload.wikimedia.org/wikipedia/commons/a/aa/Lesotho_Mokorotlo.svg',
                    color: 'black',
                    scale: 92/75,
                    aspectRatio: 195/220
                }
            ]
        }
    },
    {
        id: 98,
        name: "Liberia",
        difficulty: "Intermediate",
        description: "The Lone Star.",
        hint: "11 red and white horizontal stripes. Blue canton with a single white star.",
        aspectRatio: 10/19,
        colorOverrides: {
            'red': '#BF0A30',
            'blue': '#002868'
        },
        target: {
            base: {
                type: 'horizontal-stripes',
                count: 11,
                colors: ['red', 'white']
            },
            overlays: [
                {
                    type: 'canton',
                    color: 'blue',
                    widthRatio: 50/209,
                    heightRatio: 5/11
                }
            ],
            symbols: [
                {
                    type: 'star',
                    color: 'white',
                    points: 5,
                    parentIndex: 0,
                    radius: 0.12
                }
            ]
        }
    },
    {
        id: 99,
        name: "Libya",
        difficulty: "Intermediate",
        description: "The Land of the Free.",
        hint: "Red, black, green horizontal stripes (1:2:1 ratio). White crescent and star in center.",
        aspectRatio: 1/2,
        colorOverrides: {
            'red': '#E70013',
            'green': '#239E46'
        },
        target: {
            base: {
                type: 'horizontal-stripes',
                count: 3,
                colors: ['red', 'black', 'green'],
                ratios: [1, 2, 1]
            },
            overlays: [],
            symbols: [
                {
                    type: 'crescent',
                    color: 'white',
                    outerRadius: 3/24,
                    innerRadius: 2.605/24,
                    innerOffset: 1/24
                },
                {
                    type: 'star',
                    color: 'white',
                    points: 5,
                    radius: 0.065,
                    xOffset: 0.0768,
                    rotation: -90
                }
            ]
        }
    },
    {
        id: 100,
        name: "Liechtenstein",
        difficulty: "Intermediate",
        description: "The Princely Crown.",
        hint: "Blue and red horizontal stripes. Gold crown in upper hoist corner.",
        aspectRatio: 3/5,
        colorOverrides: {
            'blue': '#002B7F',
            'red': '#CE1126',
            'gold': '#FFD83D'
        },
        target: {
            base: {
                type: 'horizontal-stripes',
                count: 2,
                colors: ['blue', 'red']
            },
            overlays: [],
            symbols: [
                {
                    type: 'seal',
                    src: 'https://upload.wikimedia.org/wikipedia/commons/7/7f/Liechtenstein_Crown.svg',
                    color: null,
                    height: 3/12,
                    aspectRatio: 4/3,
                    xOffset: (4 - 10)/20,
                    yOffset: (3 - 6)/12
                }
            ]
        }
    },
    {
        id: 101,
        name: "Lithuania",
        difficulty: "Novice",
        description: "The Tricolor of the Baltics.",
        hint: "Three horizontal stripes: Yellow, Green, Red.",
        aspectRatio: 3/5,
        colorOverrides: {
            'gold': '#FDB913',
            'green': '#006A44',
            'red': '#C1272D'
        },
        target: {
            base: { type: 'horizontal-stripes', count: 3, colors: ['gold', 'green', 'red'] },
            overlays: [],
            symbols: []
        }
    },
    {
        id: 102,
        name: "Luxembourg",
        difficulty: "Novice",
        description: "The Red, White and Blue.",
        hint: "Three horizontal stripes: Red, White, Light Blue.",
        aspectRatio: 3/5,
        colorOverrides: {
            'red': '#EF3340',
            'lightBlue': '#00A2E1'
        },
        target: {
            base: { type: 'horizontal-stripes', count: 3, colors: ['red', 'white', 'lightBlue'] },
            overlays: [],
            symbols: []
        }
    },
    {
        id: 103,
        name: "Madagascar",
        difficulty: "Intermediate",
        description: "The Great Red Island.",
        hint: "White vertical band at hoist. Red over green horizontal bands on the fly.",
        aspectRatio: 2/3,
        colorOverrides: {
            'red': '#FC3D32',
            'green': '#007E3A'
        },
        target: {
            base: { type: 'bisection-horizontal', colors: ['red', 'green'] },
            overlays: [
                { type: 'side', color: 'white', widthRatio: 1/3, side: 'left' }
            ],
            symbols: []
        }
    },
    {
        id: 104,
        name: "Malawi",
        difficulty: "Intermediate",
        description: "The Warm Heart of Africa.",
        hint: "Three horizontal stripes: Black, Red, Green. Rising sun with 31 rays in the black stripe.",
        aspectRatio: 2/3,
        colorOverrides: {
            'red': '#CE1126',
            'green': '#339E35'
        },
        target: {
            base: { type: 'horizontal-stripes', count: 3, colors: ['black', 'red', 'green'] },
            overlays: [],
            symbols: [
                {
                    type: 'external',
                    src: 'malawi_sun.svg',
                    color: 'red',
                    scale: 1.5,
                    yOffset: -1/3
                }
            ]
        }
    },
    {
        id: 105,
        name: "Malaysia",
        difficulty: "Advanced",
        description: "Jalur Gemilang - Stripes of Glory.",
        hint: "14 red and white horizontal stripes. Dark blue canton with yellow crescent and 14-pointed star.",
        aspectRatio: 1/2,
        colorOverrides: {
            'red': '#CC0001',
            'blue': '#010066',
            'gold': '#FFCC00'
        },
        target: {
            base: { type: 'horizontal-stripes', count: 14, colors: ['red', 'white'] },
            overlays: [
                { type: 'canton', position: 'top-left', color: 'blue', widthRatio: 1/2, heightRatio: 8/14 }
            ],
            symbols: [
                {
                    type: 'crescent',
                    color: 'gold',
                    outerRadius: 3/14,
                    innerRadius: 16/3/28,
                    innerOffset: 2/3/14,
                    xOffset: -0.5 + 23/4/28,
                    yOffset: -0.5 + 4/14
                },
                {
                    type: 'star',
                    color: 'gold',
                    points: 14,
                    outerRadius: 5/28,
                    innerRadius: 2/5,
                    xOffset: -0.5 + 35/4/28,
                    yOffset: -0.5 + 4/14
                }
            ]
        }
    },
    {
        id: 106,
        name: "Maldives",
        difficulty: "Intermediate",
        description: "The Island Nation.",
        hint: "Green field with red border. White crescent facing the fly.",
        aspectRatio: 2/3,
        colorOverrides: {
            'red': '#D21034',
            'green': '#007E3A'
        },
        target: {
            base: { type: 'solid', colors: ['green'] },
            overlays: [
                { type: 'border', color: 'red', widthRatio: 6/24 }
            ],
            symbols: [
                {
                    type: 'crescent',
                    color: 'white',
                    outerRadius: 8/48,
                    innerRadius: 8/48,
                    innerOffset: 3/48
                }
            ]
        }
    },
    {
        id: 107,
        name: "Mali",
        difficulty: "Novice",
        description: "One People, One Goal, One Faith.",
        hint: "Three vertical stripes: Green, Gold, Red.",
        aspectRatio: 2/3,
        colorOverrides: {
            'green': '#14B53A',
            'gold': '#FCD116',
            'red': '#CE1126'
        },
        target: {
            base: { type: 'vertical-tricolor', colors: ['green', 'gold', 'red'] },
            overlays: [],
            symbols: []
        }
    },
    {
        id: 108,
        name: "Malta",
        difficulty: "Intermediate",
        description: "The George Cross Island.",
        hint: "Two vertical stripes: White and Red. George Cross in the upper left corner.",
        aspectRatio: 2/3,
        colorOverrides: {
            'red': '#CF142B'
        },
        target: {
            base: { type: 'bisection-vertical', colors: ['white', 'red'] },
            overlays: [],
            symbols: [
                {
                    type: 'seal',
                    src: 'https://upload.wikimedia.org/wikipedia/commons/6/6e/George_Cross_Malta.svg',
                    color: null,
                    scale: 27/30,
                    aspectRatio: 1,
                    xOffset: -0.5 + (4 + 13.5)/150,
                    yOffset: -0.5 + (4 + 13.5)/100
                }
            ]
        }
    },
    {
        id: 109,
        name: "Mauritania",
        difficulty: "Intermediate",
        description: "The Islamic Republic.",
        hint: "Red, green, red horizontal stripes (1:3:1). Gold crescent with horns pointing up. Gold star above.",
        aspectRatio: 2/3,
        colorOverrides: {
            'green': '#00A95C',
            'gold': '#FFD700',
            'red': '#CD2A3E'
        },
        target: {
            base: {
                type: 'horizontal-stripes',
                count: 3,
                colors: ['red', 'green', 'red'],
                ratios: [1, 3, 1]
            },
            overlays: [],
            symbols: [
                {
                    type: 'crescent',
                    color: 'gold',
                    yOffset: -150/1000,
                    outerRadius: 375/1000,
                    innerRadiusX: 375/1000,
                    innerRadiusY: 273/1000,
                    arc: 'top'
                },
                {
                    type: 'star',
                    color: 'gold',
                    points: 5,
                    radius: 107/1000,
                    yOffset: -1/2 + (300 + 107)/1000
                }
            ]
        }
    },
    {
        id: 110,
        name: "Mauritius",
        difficulty: "Novice",
        description: "The Four Bands.",
        hint: "Four equal horizontal stripes: Red, Blue, Yellow, Green.",
        aspectRatio: 2/3,
        colorOverrides: {
            'red': '#EA2839',
            'blue': '#1A206D',
            'gold': '#FFD500',
            'green': '#00A551'
        },
        target: {
            base: { type: 'horizontal-stripes', count: 4, colors: ['red', 'blue', 'gold', 'green'] },
            overlays: [],
            symbols: []
        }
    },
    {
        id: 111,
        name: "Mexico",
        difficulty: "Intermediate",
        description: "The Eagle and Serpent.",
        hint: "Three vertical stripes: Green, White, Red. Coat of arms in the center.",
        aspectRatio: 4/7,
        colorOverrides: {
            'green': '#006341',
            'red': '#CE1126'
        },
        target: {
            base: { type: 'vertical-tricolor', colors: ['green', 'white', 'red'] },
            overlays: [],
            symbols: [
                {
                    type: 'seal',
                    src: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Coat_of_arms_of_Mexico.svg',
                    color: null,
                    scale: 1.4
                }
            ]
        }
    },
    {
        id: 112,
        name: "Micronesia",
        difficulty: "Intermediate",
        description: "Federated States of Micronesia.",
        hint: "Light blue field. Four white stars in a diamond pattern.",
        aspectRatio: 10/19,
        colorOverrides: {
            'lightBlue': '#75B2DD'
        },
        target: {
            base: { type: 'solid', colors: ['lightBlue'] },
            overlays: [],
            symbols: [
                {
                    type: 'star',
                    color: 'white',
                    points: 5,
                    count: 4,
                    layout: 'arc',
                    circleRadius: 6/20,
                    radius: 1/10,
                    rotateRadially: true,
                }
            ]
        }
    },
    {
        id: 113,
        name: "Moldova",
        difficulty: "Intermediate",
        description: "The Aurochs Head.",
        hint: "Three vertical stripes: Blue, Yellow, Red. Coat of arms in the center.",
        aspectRatio: 1/2,
        colorOverrides: {
            'blue': '#0046AE',
            'gold': '#FFD200',
            'red': '#CC0000'
        },
        target: {
            base: { type: 'vertical-tricolor', colors: ['blue', 'gold', 'red'] },
            overlays: [],
            symbols: [
                {
                    type: 'seal',
                    src: 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Coat_of_arms_of_Moldova.svg',
                    color: null,
                    scale: 168/90
                }
            ]
        }
    },
    {
        id: 114,
        name: "Monaco",
        difficulty: "Novice",
        description: "The Principality.",
        hint: "Two horizontal stripes: Red on top, White on bottom.",
        aspectRatio: 4/5,
        colorOverrides: {
            'red': '#CE1126'
        },
        target: {
            base: { type: 'bisection-horizontal', colors: ['red', 'white'] },
            overlays: [],
            symbols: []
        }
    },
    {
        id: 115,
        name: "Mongolia",
        difficulty: "Intermediate",
        description: "Land of the Eternal Blue Sky.",
        hint: "Three vertical stripes: Red, Blue, Red. Yellow Soyombo symbol in the left stripe.",
        aspectRatio: 1/2,
        colorOverrides: {
            'red': '#C4272F',
            'blue': '#015197'
        },
        target: {
            base: { type: 'vertical-tricolor', colors: ['red', 'blue', 'red'] },
            overlays: [],
            symbols: [
                {
                    type: 'external',
                    src: 'https://upload.wikimedia.org/wikipedia/commons/6/68/Soyombo_yellow.svg',
                    color: 'gold',
                    width: 22/120,
                    aspectRatio: 90/175,
                    xOffset: -1/3
                }
            ]
        }
    },
    {
        id: 116,
        name: "Montenegro",
        difficulty: "Intermediate",
        description: "The Land of the Black Mountain.",
        hint: "Red field with gold border. Coat of arms in the center.",
        aspectRatio: 1/2,
        colorOverrides: {
            'red': '#C40308',
            'gold': '#D4AF37'
        },
        target: {
            base: { type: 'solid', colors: ['red'] },
            overlays: [
                { type: 'border', color: 'gold', widthRatio: 1/20 }
            ],
            symbols: [
                {
                    type: 'external',
                    src: 'https://upload.wikimedia.org/wikipedia/commons/2/23/Coat_of_arms_of_Montenegro.svg',
                    color: 'gold',
                    aspectRatio: 5/6,
                    scale: 2.3
                }
            ]
        }
    },
    {
        id: 117,
        name: "Morocco",
        difficulty: "Intermediate",
        description: "The Sharifian Star.",
        hint: "Red field. Green five-pointed star (pentagram) in the center.",
        aspectRatio: 2/3,
        colorOverrides: {
            'red': '#C1272D',
            'green': '#006233'
        },
        target: {
            base: { type: 'solid', colors: ['red'] },
            overlays: [],
            symbols: [
                {
                    type: 'external',
                    src: 'https://upload.wikimedia.org/wikipedia/commons/2/28/Star_of_Morocco_%28unbordered%29.svg',
                    color: 'green',
                    scale: 1.5
                }
            ]
        }
    },
    {
        id: 118,
        name: "Mozambique",
        difficulty: "Advanced",
        description: "The AK-47 Flag.",
        hint: "Green, white, black, white, yellow stripes. Red triangle at hoist with emblem.",
        aspectRatio: 2/3,
        colorOverrides: {
            'green': '#007168',
            'gold': '#FCE100',
            'red': '#D21034'
        },
        target: {
            base: {
                type: 'horizontal-stripes',
                count: 5,
                colors: ['green', 'white', 'black', 'white', 'gold'],
                ratios: [10, 1, 10, 1, 10]
            },
            overlays: [
                { type: 'triangle', color: 'red', vertexXRatio: 21/32 }
            ],
            symbols: [
                {
                    type: 'star',
                    color: 'gold',
                    points: 5,
                    radius: 12/32/1.809,
                    // xOffset removed - with consistent parent positioning, offsets are relative to parent center
                    yOffset: 0.0955 * 12/32/1.809,
                    parentIndex: 0
                },
                {
                    type: 'external',
                    src: 'mozambique_symbol.svg',
                    color: null,
                    aspectRatio: 236.571/225,
                    scale: 2.5,
                    parentIndex: 0
                }
            ]
        }
    },
    {
        id: 119,
        name: "Myanmar",
        difficulty: "Intermediate",
        description: "The Golden Land.",
        hint: "Three horizontal stripes: Yellow, Green, Red. Large white star in the center.",
        aspectRatio: 12/18,
        colorOverrides: {
            'gold': '#FECB00',
            'green': '#34B233',
            'red': '#EA2839'
        },
        target: {
            base: { type: 'horizontal-stripes', count: 3, colors: ['gold', 'green', 'red'] },
            overlays: [],
            symbols: [
                {
                    type: 'star',
                    color: 'white',
                    points: 5,
                    radius: 4.42/12,
                    yOffset: 0.422/12
                }
            ]
        }
    },
    {
        id: 120,
        name: "Nauru",
        difficulty: "Intermediate",
        description: "The Pleasant Island.",
        hint: "Blue field with gold horizontal stripe. White 12-pointed star in lower hoist.",
        aspectRatio: 1/2,
        colorOverrides: {
            'blue': '#002B7F',
            'gold': '#FFC61E'
        },
        target: {
            base: {
                type: 'horizontal-stripes',
                count: 3,
                colors: ['blue', 'gold', 'blue'],
                ratios: [11, 2, 11]
            },
            overlays: [],
            symbols: [
                {
                    type: 'star',
                    color: 'white',
                    points: 12,
                    radius: 4/24,
                    innerRadius: 1/2,
                    xOffset: (12 - 24)/48,
                    yOffset: (17 - 12)/24
                }
            ]
        }
    },
    {
        id: 121,
        name: "Netherlands",
        difficulty: "Novice",
        description: "The Dutch Tricolor.",
        hint: "Three horizontal stripes: Red, White, Blue.",
        aspectRatio: 2/3,
        colorOverrides: {
            'red': '#AE1C28',
            'blue': '#21468B'
        },
        target: {
            base: { type: 'horizontal-stripes', count: 3, colors: ['red', 'white', 'blue'] },
            overlays: [],
            symbols: []
        }
    },
    {
        id: 122,
        name: "Nicaragua",
        difficulty: "Intermediate",
        description: "En Dios Confiamos.",
        hint: "Blue, white, blue horizontal stripes. Coat of arms in center.",
        aspectRatio: 3/5,
        colorOverrides: {
            'blue': '#0067C6'
        },
        target: {
            base: { type: 'horizontal-stripes', count: 3, colors: ['blue', 'white', 'blue'] },
            overlays: [],
            symbols: [
                {
                    type: 'seal',
                    src: 'https://upload.wikimedia.org/wikipedia/commons/c/cc/Coat_of_arms_of_Nicaragua.svg',
                    color: null,
                    scale: 1
                }
            ]
        }
    },
    {
        id: 123,
        name: "Niger",
        difficulty: "Easy",
        description: "The Sun of the Sahel.",
        hint: "Orange, white, green horizontal stripes. Orange circle in center.",
        aspectRatio: 6/7,
        colorOverrides: {
            'orange': '#E05206',
            'green': '#0DB02B'
        },
        target: {
            base: { type: 'horizontal-stripes', count: 3, colors: ['orange', 'white', 'green'] },
            overlays: [],
            symbols: [
                {
                    type: 'circle',
                    color: 'orange',
                    radius: 3.4/24
                }
            ]
        }
    },
    {
        id: 124,
        name: "Nigeria",
        difficulty: "Novice",
        description: "Unity and Faith, Peace and Progress.",
        hint: "Three vertical stripes: Green, White, Green.",
        aspectRatio: 1/2,
        colorOverrides: {
            'green': '#008751'
        },
        target: {
            base: { type: 'vertical-tricolor', count: 3, colors: ['green', 'white', 'green'] },
            overlays: [],
            symbols: []
        }
    },
    {
        id: 125,
        name: "Niue",
        difficulty: "Advanced",
        description: "A self-governing territory in free association with New Zealand.",
        hint: "Gold field. Union Jack canton with blue circle and yellow stars.",
        aspectRatio: 1/2,
        colorOverrides: {
            'gold': '#FFF200',
            'blue': '#012169'
        },
        target: {
            base: { type: 'solid', colors: ['gold'] },
            overlays: [
                { type: 'canton', position: 'top-left', color: 'blue', widthRatio: 0.5, heightRatio: 0.5 }
            ],
            symbols: [
                // Union Jack in canton
                {
                    type: 'external',
                    src: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Flag_of_the_United_Kingdom_%281-2%29.svg',
                    parentIndex: 0,
                    color: null,
                    scale: 3.33,
                    aspectRatio: 2
                },
                // Blue circle in center of canton
                {
                    type: 'circle',
                    color: 'blue',
                    radius: 5/60,
                    xOffset: -0.25,
                    yOffset: -0.25
                },
                // Yellow star on top of circle
                {
                    type: 'star',
                    color: 'gold',
                    points: 5,
                    radius: 5/60,
                    xOffset: -0.25,
                    yOffset: -0.25
                },
                // 4 smaller yellow stars on Union Jack arms
                {
                    type: 'star',
                    color: 'gold',
                    points: 5,
                    count: 4,
                    layout: 'custom',
                    radius: 3/60,
                    xOffset: -0.25,
                    yOffset: -0.25,
                    positions: [
                        {x: 0, y: -8/60},      // Up
                        {x: 0, y: 8/60},       // Down
                        {x: -16/120, y: 0},    // Left
                        {x: 16/120, y: 0}      // Right
                    ]
                }
            ]
        }
    }
];