import { env } from "@/env";
import { useStuff } from "@/hooks/stuff-service";
import { smalljsonBackground } from "@/pages/create";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, PlusCircle } from "lucide-react";
import { useRef, useState } from "react";
import AceEditor from "react-ace";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useNavigation } from "react-router-dom";
import {
	dracula,
	duotoneSpace,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { z } from "zod";
import { JsonEditor } from "./json-editor";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const customTheme = {
	...dracula,
	'code[class*="language-"]': {
		// #dd672c
		// ...duotoneSpace['code[class*="language-"]'],
		color: "#fff", // Altera a cor do texto
	},
	comment: {
		color: "#6d28d999",
	},

	property: { color: "#9d4edd" }, // Cor principal (um tom mais claro de #6d28d9)
	number: { color: "#ffeb3b" }, // Valor numérico (amarelo mais claro)
	string: { color: "#6ee7b7" }, // Valor string (verde claro)
	punctuation: { color: "#ffffff" }, // Pontuação (branco)
	operator: { color: "#f9a8d4" },
};

const createMockFormValidation = z.object({
	title: z.string().min(3, "O nome deve ter no mínimo 3 caracteres"),
	content: z.string().refine(
		(content) => {
			try {
				JSON.parse(content);
				return true;
			} catch {
				return;
			}
		},
		{
			message: "Insira um json valido",
		},
	),
});

type CreateMockForm = z.infer<typeof createMockFormValidation>;

export const MainSideForm = () => {
	const navigate = useNavigate();
	const { loading, createStuff } = useStuff();

	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors },
		control,
	} = useForm<CreateMockForm>({
		resolver: zodResolver(createMockFormValidation),
		defaultValues: {
			// content: JSON.stringify(smalljsonBackground, null, 2),
		},
	});

	const content = watch("content");

	const onSubmit: SubmitHandler<CreateMockForm> = async (data) => {
		const { title, content } = data;

		const parsed = content.replace(/\s+/g, "");

		const reponse = await createStuff({ title, content: parsed });

		if (!reponse) return;

		const { url, slug } = reponse;
		console.log(url);
		if (url) {
			navigate(`/mock/${slug}`);
		}
	};

	const handleFormat = async () => {
		try {
			console.log("blur");
			const parsed = JSON.parse(content);
			const formatted = JSON.stringify(parsed, null, 2);
			setValue("content", formatted);
		} catch (e) {
			console.log(e);
			// Se não for JSON, não formate
		}
	};

	const [cursorPosition, setCursorPosition] = useState(0);
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	// Função para capturar mudanças no textarea e posição do cursor aaaa
	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setValue("content", e.target.value);
		setCursorPosition(e.target.selectionStart); // Captura a posição do cursor sdasd
	};

	// Função para simular o cursor no texto
	const getContentWithCursor = () => {
		const beforeCursor = content.slice(0, cursorPosition);
		const afterCursor = content.slice(cursorPosition);

		// Inserimos um marcador de cursor (pipe '|') na posição do cursor
		return `${beforeCursor}|${afterCursor}`;
	};

	return (
		<div className="flex-1 flex flex-col  max-w-[38svw] bg-glass bg-glass-gradient backdrop-blur-3xl span ">
			<div className="m-6 flex-grow flex flex-col slide-in-from-right">
				<div className="flex flex-row gap-3 mb-5">
					<div className="bg-mountain  w-12 h-9 bg-no-repeat bg-contain" />
					<span className="text-3xl font-bold text-white uppercase font-jockey-one">
						mockest
					</span>
				</div>

				<div className="w-[536px] text-white text-lg font-normal font-kanit mb-9">
					Mock de Requisições JSON com Facilidade: Preencha o Formulário,
					Obtenha o Link e Volte a Codar!
				</div>
				<form
					className="flex flex-col flex-grow"
					onSubmit={handleSubmit(onSubmit)}
				>
					<div className="flex flex-col flex-grow gap-4 mb-20 ">
						<div className="space-y-1">
							<Label htmlFor="title">Nome</Label>
							<Input
								{...register("title")}
								placeholder="Title"
								className="text-base h-10"
							/>
							<span
								className={`text-red-500 text-sm ${
									errors.title ? "block" : "hidden"
								}`}
							>
								{errors?.title?.message}
							</span>
						</div>

						<JsonEditor label="JSON" control={control} name="content" />

						<Button
							type="submit"
							id=""
							disabled={loading}
							className="w-full gap-2 "
							size="lg"
						>
							{loading ? (
								<Loader2 size={16} className="animate-spin" />
							) : (
								<PlusCircle className="w-5" />
							)}
							Criar Mock
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
};
