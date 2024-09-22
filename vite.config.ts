import path from "node:path";
import { monaco } from "@bithero/monaco-editor-vite-plugin";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
	base: "/",
	plugins: [
		react(),
		monaco({
			features: "all",
			languages: ["json"],
			globalAPI: true,
		}),
	],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
});
