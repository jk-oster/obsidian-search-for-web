module.exports = {
    // prefix: 'ob-',
    content: [
        "./src/**/*.{vue,js,ts,jsx,tsx,html}",
    ],
    darkMode: "class", // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                yellow: "#ffff33",
                white: "white",
                black: "black",
                success: "#8fce00",
                warn: "#ffe834",
                error: "#d53032",
                unknown: "#444444",

                blue: {
                    google: '#8ca8ff'
                },

                purple: {
                    600: '#9b6ff9',
                    700: '#8250e5',
                    800: '#7044c3',
                    900: '#623baa',
                    obsidian: '#8250e5',
                },

                gray: {
                    50: '#f6f6f6',
                    // 500: false,
                    // 600: false,
                    900: '#363636',
                    800: '#262626',
                    700: '#1e1e1e',
                }

                // #363636 // Obsidian BG
                // #262626 // Obsidian BG
                // #1e1e1e // Obsidian BG
            },
            fontSize: {
                '4xl': '32px',
                '3xl': '24px',
                '2xl': '22px',
                'xl': '20px',
                'lg': '18px',
                'base': '16px',
                'md': '16px',
                'sm': '14px',
                'xs': '12px',
            },
            spacing: {
                0: '0em',
                '0.5': '0.125em',
                1: '0.25em',
                '1.5': '0.375em',
                2: '0.5em',
                '2.5': '0.625em',
                3: '0.75em',
                4: '1em',
                5: '1.25em',
                6: '1.5em',
                7: '1.75em',
                8: '2em',
                9: '2.25em',
                10: '2.5em',
                11: '2.75em',
                12: '3em',
                14: '3.5em',
                16: '4em',
                20: '5em',
                24: '6em',
                28: '7em',
                32: '8em',
                36: '9em',
                40: '10em',
                44: '11em',
                48: '12em',
                52: '13em',
                56: '14em',
                60: '15em',
                64: '16em',
                72: '18em',
                80: '20em',
                96: '24em',

                xs: '20em',
                sm: '24em',
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
};
