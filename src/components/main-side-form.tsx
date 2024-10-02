import { useStuff } from "@/hooks/stuff-service";
import { zodResolver } from "@hookform/resolvers/zod";
import { Bot, Brain, Loader2, PlusCircle } from "lucide-react";
import { useRef, useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { GenerateMockForm } from "./generate-mock-form";
import { JsonEditor } from "./json-editor";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ControlledInput } from "./ui/input";
import { Separator } from "./ui/separator";
import { ControlledSwitch } from "./ui/switch"; // shadcn/ui switch para toggle de múltiplos mocks
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"; // shadcn/ui tabs

const generateMockFormValidation = z.object({
	strategy: z.enum(["quick", "json", "code"]),
	prompt: z.string(),
});

const createMockFormValidation = z.object({
	title: z.string().min(3, "O nome deve ter no mínimo 3 caracteres"),
	useOpenAI: z.boolean().default(false), // Controle de uso da OpenAI
	content: z.string().optional(),
	// fieldNames: z.string().optional(), // Para o input de campos separados por vírgula
	// jsonExample: z.string().optional(), // Para o input de JSON de exemplo
	// isMultiple: z.boolean().default(false), // Controle de múltiplos mocks
});

type CreateMockForm = z.infer<typeof createMockFormValidation>;

export const MainSideForm = () => {
	const navigate = useNavigate();
	const { loading, createStuff } = useStuff();

	const parentDivRef = useRef<HTMLDivElement | null>(null);

	const {
		register,
		handleSubmit,
		control,
		setValue,
		formState: { errors },
		watch,
	} = useForm<CreateMockForm>({
		resolver: zodResolver(createMockFormValidation),
		defaultValues: {
			useOpenAI: false,
		},
	});

	const isUsingOpenAI = watch("useOpenAI");

	const onSubmit: SubmitHandler<CreateMockForm> = async (data) => {
		const { title, content, useOpenAI } = data;

		if (!content) return;

		const response = null;
		await createStuff({ title, content: content });

		if (!response) return;

		const { url, slug } = response;
		if (url) {
			navigate(`/mock/${slug}`);
		}
	};

	const [selectedTab, setSelectedTab] = useState<"fields" | "code" | "json">(
		"fields",
	);

	return (
		<div className="flex-1 flex flex-col overflow-y-auto w-full max-w-[100vw] md:max-w-[60vw] lg:max-w-[38vw] bg-glass bg-glass-gradient backdrop-blur-3xl span">
			<div className="m-4 sm:m-6 flex-grow flex flex-col slide-in-from-right">
				<div className="flex flex-row gap-3 mb-5">
					<div className="bg-mountain w-12 h-9 bg-no-repeat bg-contain" />
					<span className="text-2xl sm:text-3xl font-bold text-white uppercase font-jockey-one">
						mockest
					</span>
				</div>

				<div className="w-full sm:w-[536px] text-white text-base sm:text-lg font-normal font-kanit mb-6">
					Mock de Requisições JSON com Facilidade: Preencha o Formulário,
					Obtenha o Link e Volte a Codar!
				</div>

				<form
					className="flex flex-col flex-grow"
					onSubmit={handleSubmit(onSubmit)}
				>
					<div
						ref={parentDivRef}
						className="flex flex-1 flex-col justify-between space-y-8"
					>
						<div className="flex flex-col flex-grow gap-2 ">
							{/* Campo de título */}
							<ControlledInput
								control={control}
								name="title"
								label="Título"
								placeholder="Ex: Usuário"
							/>

							<ControlledSwitch
								control={control}
								name="useOpenAI"
								label="Gerar com OpenAI?"
								className="mt-4"
								checkedIcon={
									<Bot size={14} className="stroke-primary fill-primary/10" />
								}
								uncheckedIcon={
									<Brain
										size={14}
										className="stroke-primary/50 fill-primary/10"
									/>
								}
							/>

							<GenerateMockForm
								visible={isUsingOpenAI}
								onSuccess={(prompt) => {
									setValue("content", prompt);
								}}
							/>

							<JsonEditor
								label="Mock"
								control={control}
								name="content"
								fixedHeight="650px"
							/>
						</div>
						<Button
							type="submit"
							disabled={loading}
							className="w-full gap-2"
							size="lg"
						>
							{loading ? (
								<Loader2 size={16} className="animate-spin" />
							) : (
								<PlusCircle className="w-5" />
							)}
							Salvar Mock
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
};
