import * as React from "react";

import { cn } from "@/lib/utils";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
	({ className, ...props }, ref) => {
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

		return (
			<textarea
				className={cn(
					"flex min-h-[60px] bg-card/60 w-full rounded-md border border-input  px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
					className,
				)}
				style={{
					caretColor: "#fff",
				}}
				ref={ref}
				onKeyDown={handleKeyDown}
				{...props}
			/>
		);
	},
);
Textarea.displayName = "Textarea";

export { Textarea };
