import { MainSideForm } from "@/components/main-side-form";

function CreatePage() {
	document.body.style.overflow = "hidden";
	return (
		<>
			<div className="flex flex-1 items-center justify-center h-full z-30">
				<div className="bg-logo w-[319px] h-[286px] bg-contain bg-no-repeat animate-pulse absolute blur-lg opacity-80" />
				<div className="bg-logo w-[319px] h-[286px] bg-contain bg-no-repeat" />
			</div>
			<MainSideForm />
		</>
	);
}

export default CreatePage;
