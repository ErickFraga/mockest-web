import { useRef } from "react";
import "./App.css";
import { backgroundJson, foregroundForeground } from "./consts/scrolling-text";
import MainRouter from "./pages";

function App() {
	document.body.style.overflow = "hidden";

	const backgroundJsonRef = useRef<HTMLPreElement>(null);
	const foregroundJsonRef = useRef<HTMLPreElement>(null);

	return (
		<div
			className="flex w-screen h-screen bg-cover bg-center bg-main  overflow-hidden block"
			// style={{
			// 	backgroundImage: `url(${background})`,
			// }}
		>
			<div className="bg-main-gradient backdrop-blur-[2px] w-full h-full bg-opacity-50  flex flex-row">
				<div className="absolute blur-[6px] -top-[50px] -left-[40%] origin-top-left -rotate-[20deg]  text-[#BFFF00]/20 text-[80px] font-normal font-['JetBrains Mono']">
					<pre
						id="background-json"
						ref={backgroundJsonRef}
						className="animate-scroll-reverse"
						style={{
							animationDuration: `${(backgroundJsonRef?.current?.offsetHeight ?? 1) / 100}s`,
						}}
						// style={{
						// 	transform: `translateY(1.95%)`,
						// }}
					>
						{JSON.stringify(foregroundForeground, null, 4)}
					</pre>
				</div>
				<div className="absolute blur-[4px] -top-[7px] left-[50%] origin-top-left rotate-[30deg] text-[#BFFF00]/30 text-5xl font-normal font-['JetBrains Mono']">
					<pre
						id="foreground-json"
						ref={foregroundJsonRef}
						className="animate-scroll"
						style={{
							animationDuration: `${(foregroundJsonRef?.current?.offsetHeight ?? 1) / 120}s`,
						}}
					>
						{JSON.stringify(backgroundJson, null, 4)}
					</pre>
				</div>
				<MainRouter />
			</div>
		</div>
	);
}

export default App;
