import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { StuffServiceProvider } from "./hooks/stuff-service.tsx";
import "./index.css";

// biome-ignore lint/style/noNonNullAssertion: <explanation>
createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<StuffServiceProvider>
			<App />
		</StuffServiceProvider>
	</StrictMode>,
);
