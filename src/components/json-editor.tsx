import { Label } from "@radix-ui/react-label";
import * as monaco from "monaco-editor";
import { useEffect, useRef, useState } from "react";
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
	fixedHeight?: string;
}

export const JsonEditor = <T extends FieldValues>({
	control,
	name,
	label,
	editable = true,
	fixedHeight,
}: JsonEditorProps<T>) => {
	const [editorHeight, setEditorHeight] = useState(200);
	const editorRef = useRef<HTMLDivElement | null>(null);
	const monacoEditorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(
		null,
	);

	const options: monaco.editor.IStandaloneEditorConstructionOptions = {
		selectOnLineNumbers: true,
		lineNumbers: "on",
		scrollbar: {
			vertical: "hidden",
			horizontal: "hidden",
			alwaysConsumeMouseWheel: false,
		},
		hideCursorInOverviewRuler: true,
		renderLineHighlight: "none",
		suggestOnTriggerCharacters: false,
		tabCompletion: "off",
		folding: false,
		foldingHighlight: false,
		matchBrackets: "near",
		occurrencesHighlight: "off",
		scrollBeyondLastLine: false,
		lineNumbersMinChars: 4,
		lineDecorationsWidth: 10,
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
		overviewRulerLanes: 0,
		quickSuggestions: false,
		domReadOnly: !editable,
		readOnly: !editable,
		automaticLayout: false,
		tabSize: 2,
	};

	useEffect(() => {
		monaco.editor.defineTheme("custom-dark-theme", {
			base: "vs-dark",
			inherit: true,
			rules: [
				{ token: "string.key.json", foreground: "9d4edd" },
				{ token: "number", foreground: "ffeb3b" },
				{ token: "string.value.json", foreground: "6ee7b7" },
				{ token: "delimiter", foreground: "ffffff" },
				{ token: "operator", foreground: "f9a8d4" },
			],
			colors: {
				"editor.background": "#03071280",
				"editor.border-color": "#9d4edd",
				"editor.borderRadius": ".5rem",
				focusBorder: "#9d4edd",
				"editorLineNumber.foreground": "#9d4edd6d",
				"editorGutter.background": "#03071299",
				"editorLineNumber.activeForeground": "#9d4eddd0",
			},
		});

		monaco.editor.setTheme("custom-dark-theme");

		return () => {
			monacoEditorRef.current?.dispose();
		};
	}, []);

	const formatJson = () => {
		if (monacoEditorRef.current) {
			const unformattedValue = monacoEditorRef.current.getValue();
			try {
				// Tenta formatar o valor do JSON
				const formattedValue = JSON.stringify(
					JSON.parse(unformattedValue),
					null,
					2,
				);
				// Atualiza o valor formatado no editor
				monacoEditorRef.current.setValue(formattedValue);
			} catch (error) {
				console.error("Erro ao formatar JSON:", error);
			}
		}
	};

	const adjustEditorHeight = (editor: monaco.editor.IStandaloneCodeEditor) => {
		const lineCount = editor.getModel()?.getLineCount() ?? 1; // Conta as linhas no editor
		const newHeight = lineCount * 18 + 20; // Cada linha tem aproximadamente 20px de altura
		setEditorHeight(newHeight); // Atualiza o estado da altura
		editor.layout(); // Recalcula o layout do editor
	};

	return (
		<>
			<Label htmlFor={name} className=" font-semibold text-white ">
				{label}
			</Label>
			<Controller
				name={name}
				control={control}
				render={({ field, fieldState }) => (
					<>
						<MonacoEditor
							// ref={editorRef}
							value={field.value}
							language="json"
							theme="custom-dark-theme"
							className="rounded-lg overflow-hidden font-jetbrains focus-within:ring-1 focus-within:ring-foreground/80"
							height={fixedHeight ?? editorHeight}
							options={options}
							onChange={(value: string) => field.onChange(value)}
							editorDidMount={(editor) => {
								monacoEditorRef.current = editor;

								if (!fixedHeight) {
									editor.onDidChangeModelContent(() =>
										adjustEditorHeight(editor),
									);

									adjustEditorHeight(editor);
								}

								editor.onDidBlurEditorText(() => {
									field.onBlur();
									formatJson();
								});
							}}
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
