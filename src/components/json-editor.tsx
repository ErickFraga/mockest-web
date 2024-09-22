import { Label } from "@radix-ui/react-label";
import * as monaco from "monaco-editor";
import { useEffect } from "react";
import {
	type Control,
	Controller,
	type FieldValues,
	type Path,
} from "react-hook-form";
import MonacoEditor from "react-monaco-editor";

interface JsonEditorProps<T extends FieldValues> {
	control: Control<T>;
	name: Path<T>;
	label?: string;
	editable?: boolean;
}

export const JsonEditor = <T extends FieldValues>({
	control,
	name,
	label,
	editable = true,
}: JsonEditorProps<T>) => {
	const options: monaco.editor.IStandaloneEditorConstructionOptions = {
		selectOnLineNumbers: true,
		lineNumbers: "on",
		scrollbar: {
			vertical: "hidden",
			horizontal: "hidden",
		},
		renderLineHighlight: "none",
		// glyphMargin: true,
		tabCompletion: "off",
		foldingHighlight: false,
		matchBrackets: "never",
		unicodeHighlight: {},
		selectionHighlight: false,
		occurrencesHighlight: "off",
		folding: false,
		lineNumbersMinChars: 4,

		lineDecorationsWidth: 10, // Desativar a largura de decorações da linha
		padding: {
			top: 10,
			bottom: 10,
		},
		guides: {
			indentation: false,
			bracketPairs: false,
			bracketPairsHorizontal: false,
		},
		minimap: {
			enabled: false,
		},
		readOnly: !editable,
		domReadOnly: !editable,
	};

	useEffect(() => {
		monaco.editor.defineTheme("custom-dark-theme", {
			base: "vs-dark", // Tema base escuro
			inherit: true, // Herda das cores base do tema escuro
			rules: [
				{ token: "string.key.json", foreground: "9d4edd" }, // Propriedades (chaves)
				{ token: "number", foreground: "ffeb3b" }, // Valores numéricos
				{ token: "string.value.json", foreground: "6ee7b7" }, // Strings
				{ token: "delimiter", foreground: "ffffff" }, // Pontuação (parênteses e colchetes)
				{ token: "operator", foreground: "f9a8d4" }, // Operadores (dois pontos)
			],
			colors: {
				"editor.background": "#03071280", // Cor do fundo do editor
				"editor.border-color": "#9d4edd", // Borda arredondada do editor
				"editor.borderRadius": ".5rem", // Cor do texto do editor
				focusBorder: "#9d4edd", // Cor da borda do editor
				"editorLineNumber.foreground": "#9d4edd6d", // Cor dos números de linha
				"editorGutter.background": "#03071299", // Cor do fundo do gutter
				"editorLineNumber.activeForeground": "#9d4eddd0", // Cor do número da linha ativa
			},
		});

		// Aplicar o tema definido
		monaco.editor.setTheme("custom-dark-theme");
	}, []);

	return (
		<>
			<Label htmlFor={name} className="text-sm font-semibold text-white ">
				{label}
			</Label>
			<Controller
				name={name}
				control={control}
				render={({ field, fieldState }) => (
					<>
						<MonacoEditor
							className="rounded-lg overflow-hidden flex-grow font-jetbrains"
							language="json"
							// Remova ou altere o tema "dracula" para não sobrescrever o tema personalizado
							onChange={field.onChange}
							value={field.value}
							options={options}
						/>
						{fieldState.error && (
							<p className="text-red-500 text-sm">{fieldState.error.message}</p>
						)}
					</>
				)}
			/>
		</>
	);
};
