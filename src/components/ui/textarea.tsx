import * as React from "react";
import {
	type Control,
	Controller,
	type FieldValues,
	type Path,
} from "react-hook-form";

import { cn } from "@/lib/utils";

export type TextareaProps<T extends FieldValues> =
	React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
		name: Path<T>; // O nome do campo, tipado dinamicamente de acordo com os valores do formulário
		control: Control<T>; // O controle do react-hook-form
	};

const Textarea = <T extends FieldValues>({
	className,
	control,
	name,
	...props
}: TextareaProps<T>) => {
	const [lineNumbers, setLineNumbers] = React.useState(
		Array.from({ length: 100 }, (_, i) =>
			(i + 1).toString().padStart(2, "0"),
		).join("\n"),
	);

	const lineNumberRef = React.useRef<HTMLTextAreaElement | null>(null);
	const textAreaRef = React.useRef<HTMLTextAreaElement | null>(null);

	const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (event.key === "Tab") {
			event.preventDefault();

			const textarea = event.currentTarget;
			const start = textarea.selectionStart;
			const end = textarea.selectionEnd;

			// Insere um caractere de tabulação
			textarea.value = `${textarea.value.substring(0, start)}\t${textarea.value.substring(end)}`;

			// Move o cursor para a nova posição
			textarea.selectionStart = textarea.selectionEnd = start + 1;
		}
	};

	const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		props.onInput?.(event);
		const lineCount = event.target.value.split("\n").length;

		setLineNumbers(
			Array.from({ length: lineCount }, (_, i) =>
				(i + 1).toString().padStart(2, "0"),
			).join("\n"),
		);
	};

	const handleScrollTextArea = () => {
		if (textAreaRef?.current && lineNumberRef.current) {
			lineNumberRef.current.scrollTop = textAreaRef.current.scrollTop;
		}
	};

	const handleScrollNumbers = () => {
		if (textAreaRef?.current && lineNumberRef.current) {
			textAreaRef.current.scrollTop = lineNumberRef.current.scrollTop;
		}
	};

	return (
		<Controller
			name={name}
			control={control}
			render={({ field }) => (
				<div className="relative w-full flex flex-grow">
					{/* Contador de Linhas */}
					<div
						className="absolute left-0 top-0 w-8 h-full text-muted-foreground border-r-[1px] border-r-primary/50 text-sm flex flex-col justify-start items-end pr-1 pt-2"
						aria-hidden="true"
					>
						<textarea
							ref={lineNumberRef}
							value={lineNumbers}
							readOnly
							onScroll={handleScrollNumbers}
							className="w-full h-full scrollbar-hide font-jetbrains overflow-auto resize-none bg-transparent text-right opacity-50 text-sm"
							style={{
								caretColor: "transparent",
								lineHeight: `${1.5}rem`,
								padding: "0px",
							}}
						/>
					</div>

					<textarea
						className={cn(
							"flex min-h-[60px] bg-card/60 w-full rounded-md border border-input px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 pl-10",
							className,
						)}
						style={{
							caretColor: "white",
							lineHeight: `${1.5}em`,
						}}
						ref={(node) => {
							textAreaRef.current = node;
							if (typeof field.ref === "function") {
								field.ref(node);
							} else if (field.ref && node) {
								(
									field.ref as React.MutableRefObject<HTMLTextAreaElement>
								).current = node;
							}
						}}
						onScroll={handleScrollTextArea}
						onKeyDown={handleKeyDown}
						onInput={handleInput}
						{...props}
					/>
				</div>
			)}
		/>
	);
};

Textarea.displayName = "Textarea";

export { Textarea };
