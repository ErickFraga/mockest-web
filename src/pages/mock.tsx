import { JsonEditor } from "@/components/json-editor";
import { MockPageSkeleton } from "@/components/mock-card-skeleton";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent } from "@/components/ui/tooltip";
import { useStuff } from "@/hooks/stuff-service";
import type { IStuffGetResponse } from "@/types/stuff";
import { TooltipTrigger } from "@radix-ui/react-tooltip";
import { Clipboard } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

function MockPage() {
	const { slug } = useParams();
	const [hasCopiedContent, setHasCopiedContent] = useState(false);
	const [mock, setMock] = useState<IStuffGetResponse>();
	const { control, setValue } = useForm({
		defaultValues: {
			content: JSON.stringify(mock?.stuff.content, null, 2),
		},
	});

	const { loading, getStuff } = useStuff();

	const fetchStuff = useCallback(async () => {
		if (!slug) return;
		const stuff = await getStuff(slug);

		if (!stuff) return;
		setValue("content", JSON.stringify(stuff.stuff.content, null, 2));
		setMock(stuff);
	}, [slug, getStuff, setValue]);

	const copyContent = useCallback(() => {
		if (!mock) return;
		navigator.clipboard.writeText(mock?.stuff.url);
		setHasCopiedContent(true);
		setTimeout(() => {
			setHasCopiedContent(false);
		}, 2000);
	}, [mock]);

	useEffect(() => {
		fetchStuff();
	}, [fetchStuff]);

	return (
		<div className="flex flex-col items-center justify-center w-full h-full">
			<a href="/" className="flex flex-row gap-3 mb-5 absolute top-5 left-6">
				<div className="bg-mountain  w-12 h-9 bg-no-repeat bg-contain" />
				<span className="text-3xl font-bold text-white uppercase font-jockey-one">
					mockest
				</span>
			</a>
			{loading ? (
				<MockPageSkeleton />
			) : (
				<div className="flex-1 flex flex-col flex  w-[70svw] my-20 bg-glass bg-glass-gradient backdrop-blur-3xl rounded-xl border border-primary px-8 py-6">
					<div className="flex flex-grow justify-between">
						<div className="flex flex-1 felx flex-col">
							<span className=" text-white text-[32px] font-normal font-['Kanit'] capitalize">
								{mock?.stuff.title}
							</span>
							<span className="text-[#858585] text-xs font-light font-['JetBrains Mono'] -mt-2">
								{slug}
							</span>
						</div>
						<Tooltip open={hasCopiedContent}>
							<TooltipTrigger asChild>
								<Button
									variant="outline"
									className="bg-card/50 gap-2 text-primary font-medium border-primary text-muted-foreground hover:bg-card "
									onClick={copyContent}
								>
									<Clipboard size={16} className="stroke-white" />
									{mock?.stuff.url
										.replace(
											"https://mockest-api.fly.dev/stuff/read",
											"mockest.io",
										)
										.slice(0, 30)}
									...
								</Button>
							</TooltipTrigger>
							<TooltipContent align="center" side="bottom" sticky="partial">
								{"Copiado"}
							</TooltipContent>
						</Tooltip>
					</div>
					<JsonEditor control={control} name="content" editable={false} />
				</div>
			)}
		</div>
	);
}

export default MockPage;
