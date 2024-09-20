import "./App.css";
import { MainSideForm } from "./components/main-side-form";
import MainRouter from "./pages";

const bugjsonBackground = {
	transaction_id: "78c5e542-6ef2-43a9-8449-87c3c7fe2f72",
	vehicle: {
		make: "Collins, Rodriguez and Grant",
		model: "Game",
		year: "2018",
		mileage: 139538,
		price: 6769.02,
		vin: "JM79276ET526084",
	},
	seller: {
		id: 29,
		name: "Aaron Burke",
		contact: {
			phone: "504-535-5581x30092",
			email: "anthonythomas@pace-blair.com",
		},
	},
	buyer: {
		id: 65,
		name: "Jessica Arnold",
		contact: {
			phone: "3787200717",
			email: "galvancody@cook-wallace.com",
		},
	},
	payment: {
		method: "Credit Card",
		status: "Failed",
	},
	transaction_date: "2024-03-27 16:35:15",
};

export const smalljsonBackground = [
	{
		id: 1,
		name: "Whole Bed",
		description:
			"Ok save kitchen quickly figure least address stand attention thing.",
		price: 495.12,
		stock: 56,
		category: "Management",
	},
	{
		id: 2,
		name: "Election Energy",
		description:
			"Partner expect return whether system clear something wide democratic.",
		price: 518.97,
		stock: 19,
		category: "Sign",
	},
	{
		id: 3,
		name: "Probably Force",
		description:
			"Century something fear nearly notice president operation radio majority site.",
		price: 265.18,
		stock: 45,
		category: "Well",
	},
	{
		id: 4,
		name: "Value Yet",
		description:
			"Address close defense visit sense democratic spring opportunity all.",
		price: 947.28,
		stock: 9,
		category: "Top",
	},
	{
		id: 5,
		name: "Position Join",
		description: "Someone morning expect degree forget will rise sea guess.",
		price: 972.32,
		stock: 12,
		category: "Civil",
	},
	{
		id: 6,
		name: "New Base",
		description:
			"Stock long individual yard visit seek either to new loss tree difficult across.",
		price: 803.83,
		stock: 96,
		category: "Minute",
	},
	{
		id: 7,
		name: "Outside Pressure",
		description:
			"Example church success south item market full sister question.",
		price: 277.29,
		stock: 11,
		category: "Just",
	},
	{
		id: 8,
		name: "Control Respond",
		description:
			"Congress show decide candidate discuss health effect town listen cultural agency.",
		price: 305.62,
		stock: 83,
		category: "New",
	},
	{
		id: 9,
		name: "Send Appear",
		description:
			"Professor stuff poor clear turn improve already both of join speak million if.",
		price: 340.41,
		stock: 89,
		category: "Teach",
	},
	{
		id: 10,
		name: "Same Front",
		description: "Example people art western behavior from throw interest.",
		price: 814.16,
		stock: 31,
		category: "Couple",
	},
];

function App() {
	document.body.style.overflow = "hidden";
	return (
		<div
			className="flex w-screen h-screen bg-cover bg-center bg-main  overflow-hidden block"
			// style={{
			// 	backgroundImage: `url(${background})`,
			// }}
		>
			<div className="bg-main-gradient backdrop-blur-[2px] w-full h-full bg-opacity-50  flex flex-row">
				<div className="absolute blur-[6px] -top-[50px] -left-[1000px] origin-top-left rotate-[-28.99deg] text-[#9d7b01]/15 text-[80px] font-normal font-['JetBrains Mono']">
					<pre>{JSON.stringify(bugjsonBackground, null, 4)}</pre>
				</div>
				<div className="absolute blur-[2px]  -top-[7px] -right-[2770px] origin-top-left rotate-[17.24deg] text-[#ffa800]/5 text-6xl font-normal font-['JetBrains Mono']">
					<pre>{JSON.stringify(smalljsonBackground, null, 4)}</pre>
				</div>

				<MainRouter />
			</div>
		</div>
	);
}

export default App;
