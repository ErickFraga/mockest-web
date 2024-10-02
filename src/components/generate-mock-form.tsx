import { useStuff } from "@/hooks/stuff-service";
import { zodResolver } from "@hookform/resolvers/zod";
import { Bot, Loader2 } from "lucide-react";
import type React from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import DynamicFieldForm from "./dynamic-field-form";
import { JsonEditor } from "./json-editor";
import DynamicJsonBuilder from "./teste";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ControlledInput } from "./ui/input";
import { Separator } from "./ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

const strategies = ["quick", "json", "code"] as const;

const generateMockFormValidation = z.object({
	strategy: z.enum(strategies),
	prompt: z.string().optional(),
});

type GenerateMockFormFields = z.infer<typeof generateMockFormValidation>;

interface GenerateMockFormProps {
	onSuccess: (generatedMock: string) => void;
	visible: boolean;
}

export const GenerateMockForm: React.FC<GenerateMockFormProps> = ({
	onSuccess,
	visible,
}) => {
	const { loading, generateMock } = useStuff();

	const { control, handleSubmit, setValue, watch } =
		useForm<GenerateMockFormFields>({
			resolver: zodResolver(generateMockFormValidation),
			defaultValues: {
				strategy: "quick",
			},
		});

	const strategy = watch("strategy");

	const submitHandler: SubmitHandler<GenerateMockFormFields> = async ({
		strategy,
		prompt,
	}) => {
		if (!prompt) return;

		const result = await generateMock({ strategy, prompt });

		if (!result) return;

		const { mockSuggestion, success } = result;

		if (!success) {
			return;
		}

		onSuccess(mockSuggestion);
	};

	return (
		<Tabs
			value={strategy}
			defaultChecked
			defaultValue="quick"
			onValueChange={(value) => {
				const strat = value as "quick" | "json" | "code";

				if (strategies.includes(strat)) {
					setValue("strategy", strat);
					if (strat === "quick") {
						setValue("prompt", "");
					}
					if (strat === "json") {
						setValue("prompt", "{\n\n}");
					}
				}
			}}
			className={` ${visible ? "opacity-100 translate-y-0 max-h-[850px] z-0" : " opacity-0 -translate-y-full max-h-0 -z-10"} mt-0 transition-all duration-300 ease-in-out transform `}
		>
			<div className="mb-4">
				<TabsList className="bg-card/50 relative rounded-b-none">
					<TabsTrigger value="quick" className="aria-selected:!bg-primary/80">
						Modo Rápido
					</TabsTrigger>
					<TabsTrigger value="json" className="aria-selected:!bg-primary/80">
						JSON
					</TabsTrigger>

					<TabsTrigger
						value="code"
						disabled
						className="aria-selected:!bg-primary/80"
					>
						CodeSnippet
					</TabsTrigger>
					<Badge className="absolute -right-4 -top-4 ">em breve...</Badge>
				</TabsList>
				<Separator className="bg-primary/60" />
			</div>

			<TabsContent
				value="quick"
				className={`transition-opacity duration-500 ease-in-out ${
					strategy === "quick" ? "opacity-100" : "opacity-0"
				}`}
			>
				<ControlledInput
					control={control}
					name="prompt"
					label="Campos Separados por Vírgula"
					placeholder="Ex: name, age, email"
				/>
			</TabsContent>

			<TabsContent
				value="json"
				className={`transition-opacity duration-500 ease-in-out ${
					strategy === "json" ? "opacity-100" : "opacity-0"
				}`}
			>
				{/* <JsonEditor label="JSON base" control={control} name="prompt" /> */}
				{/* <DynamicFieldForm /> */}
				<DynamicJsonBuilder
					onValueChange={(json) => {
						setValue("prompt", json);
					}}
				/>
			</TabsContent>
			<Button
				type="button"
				disabled={loading}
				className="w-full gap-2 mt-6"
				size="lg"
				onClick={handleSubmit(submitHandler)}
			>
				{loading ? (
					<Loader2 size={16} className="animate-spin" />
				) : (
					<Bot className="w-5" />
				)}
				Gerar Mock
			</Button>
			<Separator className="bg-primary/60 mt-6 mb-4" />
		</Tabs>
	);
};
