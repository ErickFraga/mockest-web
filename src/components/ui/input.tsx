import * as React from "react";

import { cn } from "@/lib/utils";
import { Label } from "@radix-ui/react-label";
import { Snail } from "lucide-react";
import {
	type Control,
	Controller,
	type FieldValues,
	type Path,
} from "react-hook-form";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, ...props }, ref) => {
		return (
			<input
				type={type}
				className={cn(
					"flex h-9 w-full rounded-md border border-input bg-card/50 px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
					className,
				)}
				ref={ref}
				{...props}
			/>
		);
	},
);
Input.displayName = "Input";

export { Input };

export type ControlledInputProps<T extends FieldValues> =
	React.InputHTMLAttributes<HTMLInputElement> & {
		name: Path<T>;
		control: Control<T>;
		visible?: boolean;
		label?: string;
	};

export const ControlledInput = <T extends FieldValues>({
	control,
	name,
	label,
	visible = true,
	...props
}: ControlledInputProps<T>) => (
	<Controller
		name={name}
		control={control}
		render={({ field, fieldState }) => (
			<div
				className={`${visible ? " opacity-100 translate-y-0" : "h-0 opacity-0 -translate-y-full"} space-y-1 transition-all duration-300 ease-in-out transform`}
			>
				<Label htmlFor={name} className={`${label ? "block" : "hidden"}`}>
					{label}
				</Label>
				<Input {...field} {...props} />
				<span className="text-red-500 text-sm">
					{fieldState.error?.message}
				</span>
			</div>
		)}
	/>
);
