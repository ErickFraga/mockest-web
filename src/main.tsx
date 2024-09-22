import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { StuffServiceProvider } from "./hooks/stuff-service.tsx";
import "./index.css";
import { Toaster } from "./components/ui/toaster.tsx";
import { TooltipProvider } from "./components/ui/tooltip.tsx";

// biome-ignore lint/style/noNonNullAssertion: <explanation>
createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<TooltipProvider>
			<StuffServiceProvider>
				<App />
				<Toaster />
			</StuffServiceProvider>
		</TooltipProvider>
	</StrictMode>,
);
