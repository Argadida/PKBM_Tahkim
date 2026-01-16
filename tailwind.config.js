const daisyui = require("daisyui");

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: "#10B981",
                    foreground: "#FFFFFF",
                },
                secondary: {
                    DEFAULT: "#FBBF24",
                    foreground: "#1F2937",
                },
                accent: {
                    DEFAULT: "#1E3A8A",
                    foreground: "#FFFFFF",
                },
                background: "#FFFFFF",
                foreground: "#1F2937",
            },
            fontFamily: {
                sans: ['var(--font-poppins)', 'Poppins', 'sans-serif'],
            },
            keyframes: {
                'gradient-x': {
                    '0%, 100%': {
                        'background-size': '200% 200%',
                        'background-position': 'left center'
                    },
                    '50%': {
                        'background-size': '200% 200%',
                        'background-position': 'right center'
                    },
                },
                shimmer: {
                    from: {
                        "background-position": "0 0"
                    },
                    to: {
                        "background-position": "-200% 0"
                    }
                }
            },
            animation: {
                'gradient-x': 'gradient-x 3s ease infinite',
                shimmer: "shimmer 2s linear infinite",
            },
        },
    },
    plugins: [
        daisyui,
    ],
    daisyui: {
        themes: [
            {
                pkbmTheme: {
                    "primary": "#10B981",
                    "secondary": "#FBBF24",
                    "accent": "#1E3A8A",
                    "neutral": "#3D4451",
                    "base-100": "#FFFFFF",
                },
            },
            "light",
        ],
    },
};
