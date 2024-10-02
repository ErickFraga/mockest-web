import { CornerDownRight, Plus, Trash2 } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./ui/select";

type FieldType = "string" | "number" | "boolean" | "object" | "array";

interface Field {
	id: string;
	name: string;
	type: FieldType;
	subFields?: Field[];
}

const DynamicJsonBuilder: React.FC<{
	onValueChange: (json: string) => void;
}> = ({ onValueChange }) => {
	const [fields, setFields] = useState<Field[]>([]);

	const inputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

	const addField = () => {
		const newFieldId = Math.random().toString();
		setFields([...fields, { id: newFieldId, name: "", type: "string" }]);

		setTimeout(() => {
			inputRefs.current[newFieldId]?.focus();
		}, 0);
	};

	const generateJSON = useCallback((fields: Field[]): any => {
		const json: any = {};

		fields.forEach((field) => {
			if (field.name === "") return;

			if (field.type === "string") {
				json[field.name] = "realistic string";
			}

			if (field.type === "number") {
				json[field.name] = "generic number";
			}

			if (field.type === "boolean") {
				json[field.name] = "random boolean";
			}

			if (field.type === "object") {
				json[field.name] = generateJSON(field.subFields || []);
			}

			if (field.type === "array") {
				json[field.name] = [generateJSON(field.subFields || [])];
			}
		});

		return json;
	}, []);

	const updateField = (
		id: string,
		name: string,
		type: FieldType,
		subFields?: Field[],
	) => {
		const recursiveUpdate = (fieldList: Field[]): Field[] => {
			return fieldList.map((field) => {
				if (field.id === id) {
					return { ...field, name, type, subFields };
				}
				if (field.subFields) {
					return { ...field, subFields: recursiveUpdate(field.subFields) };
				}
				return field;
			});
		};
		setFields(recursiveUpdate(fields));
	};

	const deleteField = (id: string) => {
		const recursiveDelete = (fieldList: Field[]): Field[] => {
			return fieldList
				.filter((field) => field.id !== id)
				.map((field) => ({
					...field,
					subFields: field.subFields
						? recursiveDelete(field.subFields)
						: field.subFields,
				}));
		};
		setFields(recursiveDelete(fields));
	};

	const addSubField = (parentId: string) => {
		const newSubFieldId = Math.random().toString();

		const recursiveAddSubField = (fieldList: Field[]): Field[] => {
			return fieldList.map((field) => {
				if (field.id === parentId) {
					return {
						...field,
						subFields: [
							{ id: newSubFieldId, name: "", type: "string" },
							...(field.subFields || []),
						],
					};
				}
				if (field.subFields) {
					return {
						...field,
						subFields: recursiveAddSubField(field.subFields),
					};
				}
				return field;
			});
		};

		setFields(recursiveAddSubField(fields));

		setTimeout(() => {
			inputRefs.current[newSubFieldId]?.focus();
		}, 0);
	};

	useEffect(() => {
		const json = generateJSON(fields);
		onValueChange(JSON.stringify(json, null, 2));
	}, [fields, onValueChange, generateJSON]);

	const renderField = (field: Field, isSubField = false) => {
		return (
			<div key={field.id}>
				<div className="flex space-x-2 items-center">
					{isSubField ? <CornerDownRight size={18} /> : null}
					<Select
						value={field.type}
						onValueChange={(value) => {
							const newType = value as FieldType;
							const newSubFields =
								newType === "object" || newType === "array" ? [] : undefined;
							updateField(field.id, field.name, newType, newSubFields);
						}}
					>
						<SelectTrigger className="w-1/6 bg-card/50">
							{field.type}
						</SelectTrigger>

						<SelectContent>
							<SelectItem value="string">String</SelectItem>
							<SelectItem value="number">Number</SelectItem>
							<SelectItem value="boolean">Boolean</SelectItem>
							<SelectItem value="object">Object</SelectItem>
							<SelectItem value="array">Array</SelectItem>
						</SelectContent>
					</Select>
					<Input
						ref={(ref) => (inputRefs.current[field.id] = ref)}
						value={field.name}
						onChange={(e) =>
							updateField(field.id, e.target.value, field.type, field.subFields)
						}
						placeholder="Field Name"
						className=""
					/>
					{(field.type === "object" || field.type === "array") && (
						<Button
							type="button"
							onClick={() => addSubField(field.id)}
							className="px-3"
						>
							<CornerDownRight size={18} />
						</Button>
					)}
					<Button
						type="button"
						// disabled={arr.length === 1}
						// onClick={() => handleRemoveField(index)}
						onClick={() => deleteField(field.id)}
						variant="ghost"
						className="px-2 hover:bg-red-500/20"
					>
						<Trash2 size={21} className="stroke-red-500 " />
					</Button>
				</div>
				{/* Render subfields for object or array types */}
				{(field.type === "object" || field.type === "array") && (
					<div className={`mt-2 space-y-2 ${isSubField ? "ml-4" : ""}`}>
						{field.subFields?.map((subField) => renderField(subField, true))}
						{/* <button
							type="button"
							onClick={() => addSubField(field.id)}
							className="flex space-x-2 items-center w-full pl-4 bg-blue-500"
						>
							<CornerDownRight size={18} />
							<Select value={"string"}>
								<SelectTrigger className="w-1/6 bg-card/50 pointer-events-none">
									{"string"}
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="string">String</SelectItem>
									<SelectItem value="string">String</SelectItem>
									<SelectItem value="string">String</SelectItem>
								</SelectContent>
							</Select>
							<Input
								placeholder="Field Name"
								className="w-1/3 disabled:opacity-100 pointer-events-none"
							/>
						</button> */}
					</div>
				)}
			</div>
		);
	};

	return (
		<div>
			<div className="space-y-4">
				{fields.map((field) => renderField(field))}
			</div>
			<Button type="button" onClick={addField} className="mt-4">
				Add Field
			</Button>
		</div>
	);
};

export default DynamicJsonBuilder;
