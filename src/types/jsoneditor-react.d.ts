// src/@types/jsoneditor-react.d.ts
declare module "jsoneditor-react" {
	import { Component } from "react";
	import type { JSONEditorOptions } from "jsoneditor";

	interface JsonEditorProps extends JSONEditorOptions {
		value?: any;
		onChange?: (value: any) => void;
	}

	export class JsonEditor extends Component<JsonEditorProps> {}
}
