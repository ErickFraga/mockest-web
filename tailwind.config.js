import { reverse } from "dns";

/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			keyframes: {
				scroll: {
					"0%": { transform: "translateY(3.9%)" },
					"100%": { transform: "translateY(-100.8%)" },
				},
				"scroll-reverse": {
					"0%": { transform: "translateY(-99.1%)" },
					"100%": { transform: "translateY(1.72%)" },
				},
			},
			animation: {
				scroll: "scroll linear infinite",
				"scroll-reverse": "scroll-reverse linear infinite",
			},
			backgroundImage: {
				mountain: "url('/src/assets/mountain-logo.svg')",
				logo: "url('/src/assets/mockest-logo.svg')",
				main: "url('/src/assets/background.jpg')",
				"main-gradient":
					"radial-gradient(55.22% 53.45% at 29.85% 46.74%, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.64) 100%)",
				glass:
					"radial-gradient(131.45% 109.12% at 40.48% 7.48%, rgba(109, 40, 217, 0.40) 0%, rgba(33, 0, 77, 0.40) 76.17%);",

				text: "linear-gradient(180deg, #9D7B02 0%, rgba(55, 43, 1, 0.00) 100%);",
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			fontFamily: {
				"jockey-one": ["Jockey One", "sans-serif"],
				kanit: ["Kanit", "sans-serif"],
				jetbrains: ["JetBrains Mono", "monospace"],
			},
			colors: {
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				chart: {
					1: "hsl(var(--chart-1))",
					2: "hsl(var(--chart-2))",
					3: "hsl(var(--chart-3))",
					4: "hsl(var(--chart-4))",
					5: "hsl(var(--chart-5))",
				},
			},
		},
	},
	plugins: [
		require("tailwindcss-animate"),
		({ addUtilities }) => {
			addUtilities({
				// Esconde a barra de rolagem no Webkit (Chrome, Safari)
				".scrollbar-hide::-webkit-scrollbar": {
					display: "none",
				},
				// Esconde a barra de rolagem no Firefox
				".scrollbar-hide": {
					"scrollbar-width": "none",
				},
			});
		},
	],
};
