import { CornerDownRight, Plus, Trash, Trash2 } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./ui/select";

const FieldTypeOptions = {
	String: "",
	Number: 0,
	Boolean: true,
	Array: [],
	Object: {},
};

const FIELD_INITIAL_VALUE: Field = {
	name: "",
	type: "String",
};

// {
// 	name: "teste",
// 	type: "Object",
// 	subFields: [
// 		{
// 			name: "subItemTeste",
// 			type: "String",
// 		},
// 	],}

interface Field {
	name: string;
	type: keyof typeof FieldTypeOptions;
	subFields?: Field[];
}

export interface DynamicFieldFormProps {
	defaultFields?: Field[];
}

const DynamicFieldForm: React.FC<DynamicFieldFormProps> = ({
	defaultFields,
}) => {
	const [fields, setFields] = useState<Field[]>([
		{
			name: "teste",
			type: "Object",
			subFields: [
				{
					name: "subItemTeste",
					type: "String",
				},
			],
		},
		FIELD_INITIAL_VALUE,
	]);

	const handleAddField = () => {
		setFields([...fields, FIELD_INITIAL_VALUE]);
	};

	const handleRemoveField = (index: number) => {
		if (fields.length === 1) return setFields([FIELD_INITIAL_VALUE]);
		const newFields = fields.filter((_, i) => i !== index);
		setFields(newFields);
	};

	const handleFieldChange = (index: number, field: string, value: string) => {
		const parsedFieldsName = field.replace(/\s/g, "");

		const newFields = fields.map((f, i) =>
			i === index ? { ...f, [field]: value } : f,
		);
		setFields(newFields);
	};

	const generateJSON = (fields: Field[]): any => {
		const json: any = {};

		fields.forEach((field) => {
			if (field.name === "") return;

			if (field.type === "Object") {
				generateJSON(field.subFields || []);
			}

			if (field.type === "Array") {
				field.subFields?.forEach((child) => {
					generateJSON([child]);
				});
			}
		});

		return json;
	};

	const handleSubmit = () => {
		const json = generateJSON(fields);
	};

	return (
		<div className="w-full rounded-lg shadow-lg">
			{fields.map((field, index, arr) => (
				<div key={index.toString()}>
					<div className="flex items-center space-x-2 mb-3">
						<Select
							onValueChange={(value) => handleFieldChange(index, "type", value)}
							value={field.type}
						>
							<SelectTrigger className="w-1/6 bg-card/50">
								{field.type}
							</SelectTrigger>
							<SelectContent>
								{Object.keys(FieldTypeOptions).map((option) => (
									<SelectItem key={option} value={option}>
										{option}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						<Input
							type="text"
							placeholder="Nome do campo"
							value={field.name}
							onChange={(e) => handleFieldChange(index, "name", e.target.value)}
							className="max-w-[200px]"
						/>
						{arr.length - 1 === index ? (
							<Button
								type="button"
								disabled={field.name === ""}
								onClick={() => handleAddField()}
								variant="default"
								className="px-2 bg-purple-500"
							>
								<Plus size={21} />
							</Button>
						) : (
							<Button
								type="button"
								disabled={arr.length === 1}
								onClick={() => handleRemoveField(index)}
								variant="ghost"
								className="px-2 hover:bg-red-500/20"
							>
								<Trash2 size={21} className="stroke-red-500 " />
							</Button>
						)}
					</div>
					<div className="ml-2">
						{(field.type === "Object" || field.type === "Array") &&
						field.subFields ? (
							<SubFieldList
								subFields={field.subFields}
								onChangeSubField={(subIndex, subField) => {
									setFields((prev) => {
										const newSubFields = prev[index].subFields?.map((sf, i) =>
											i === subIndex ? { ...sf, name: subField.name } : sf,
										);
										const newFields = fields.map((f, i) =>
											i === index ? { ...f, subFields: newSubFields } : f,
										);

										return newFields;
									});
								}}
							/>
						) : null}
					</div>
				</div>
			))}
			<Button
				type="button"
				onClick={handleSubmit}
				className="w-full mt-8"
				size="lg"
			>
				Gerar JSON
			</Button>
		</div>
	);
};

export default DynamicFieldForm;

interface SubFieldProps {
	subFields: Field[];
	// onAddSubFiled: () => void;
	onChangeSubField: (index: number, subfield: Field) => void;
	// handleSubFieldChange: (index: number, field: SubFieldProps) => void;
	// handleHandleSubField: (index: number) => void;
	// handleAddField: (subField: SubFieldProps) => void;
}

const SubFieldList: React.FC<SubFieldProps> = ({
	subFields,
	onChangeSubField,
}) => {
	return subFields.map((sub, index, arr) => (
		<div key={sub.name} className="flex items-center space-x-2 mb-3 ">
			<CornerDownRight className="stroke-purple-300" size={18} />
			<Select
				// onValueChange={(value) => handleSubFieldChange(index, self)}
				value={sub.type}
			>
				<SelectTrigger className="w-1/6 bg-card/50">{sub.type}</SelectTrigger>
				<SelectContent>
					{Object.keys(FieldTypeOptions).map((option) => (
						<SelectItem key={option} value={option}>
							{option}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
			<Input
				type="text"
				placeholder="Nome do campo"
				value={sub.name}
				onChange={(e) =>
					onChangeSubField(index, { ...sub, name: e.target.value })
				}
				className="max-w-[200px]"
			/>
			{arr.length - 1 === index ? (
				<Button
					type="button"
					disabled={sub.name === ""}
					// onClick={() => handleAddField()}
					variant="default"
					className="px-2 bg-purple-500"
				>
					<Plus size={21} />
				</Button>
			) : (
				<Button
					type="button"
					disabled={arr.length === 1}
					// onClick={() => handleRemoveField(index)}
					variant="ghost"
					className="px-2 hover:bg-red-500/20"
				>
					<Trash2 size={21} className="stroke-red-500 " />
				</Button>
			)}
		</div>
	));
};
