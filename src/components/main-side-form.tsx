import { env } from "@/env";
import { useStuff } from "@/hooks/stuff-service";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircle } from "lucide-react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

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

type CreateMockForm = {
	title: string;
	content: string;
};

export const MainSideForm = () => {
	const { createStuff } = useStuff();

	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors },
	} = useForm<CreateMockForm>({
		resolver: zodResolver(createMockFormValidation),
	});

	const content = watch("content");

	const onSubmit: SubmitHandler<CreateMockForm> = async (data) => {
		const { title, content } = data;

		const parsed = content.replace(/\s+/g, "");

		const reponse = await createStuff({ title, content: parsed });

		if (!reponse) return;

		const { slug, stuffId } = reponse;

		console.log({
			url: `${env.API_URL}/stuff/read/${slug}`,
		});
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

	return (
		<div className="flex-1 flex flex-col  max-w-[38svw] bg-glass bg-glass-gradient backdrop-blur-3xl span">
			<div className="m-6 flex-grow flex flex-col ">
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
						<div className="space-y-1 flex flex-col flex-grow">
							<Label htmlFor="content">Response</Label>
							<Textarea
								{...register("content")}
								placeholder={`{\n\t"teste":123\n}`}
								className="flex-grow resize-none text-base"
								onBlur={handleFormat}
							/>
							<span
								className={`text-red-500 text-sm ${
									errors.content ? "block" : "hidden"
								}`}
							>
								{errors?.content?.message}
							</span>
						</div>
						<Button type="submit" id="" className="w-full gap-2 " size="lg">
							<PlusCircle className="w-5" /> Criar Mock
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
};
