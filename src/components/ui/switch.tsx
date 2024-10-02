import * as SwitchPrimitives from "@radix-ui/react-switch";
import * as React from "react";

import { cn } from "@/lib/utils";
import { Label } from "@radix-ui/react-label";
import { Brain, Check, X } from "lucide-react";
import {
	type Control,
	Controller,
	type FieldValues,
	type Path,
} from "react-hook-form";
// Brain
// Bot

const DefaultCheckIcon = <Check size={14} className="stroke-primary" />;
const DefaultUncheckedIcon = <X size={14} className="stroke-primary/50" />;

interface SwitchProps
	extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> {
	checkedIcon?: React.ReactNode;
	uncheckedIcon?: React.ReactNode;
}

const Switch = React.forwardRef<
	React.ElementRef<typeof SwitchPrimitives.Root>,
	SwitchProps
>(
	(
		{
			className,
			checkedIcon = DefaultCheckIcon,
			uncheckedIcon = DefaultUncheckedIcon,
			...props
		},
		ref,
	) => (
		<SwitchPrimitives.Root
			className={cn(
				"peer inline-flex h-6 w-10 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-card/50",
				className,
			)}
			{...props}
			data-state={props.checked ? "checked" : "unchecked"}
			ref={ref}
		>
			<SwitchPrimitives.Thumb
				className={cn(
					"justify-center flex items-center pointer-events-none  h-5 w-5 rounded-full bg-foreground shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0",
				)}
			>
				{props.checked ? checkedIcon : uncheckedIcon}
			</SwitchPrimitives.Thumb>
		</SwitchPrimitives.Root>
	),
);
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };

export type ControlledSwitchProps<T extends FieldValues> = SwitchProps & {
	name: Path<T>;
	control: Control<T>;
	label?: string;
	visible?: boolean;
};

export const ControlledSwitch = <T extends FieldValues>({
	control,
	name,
	label,
	visible = true,
	...props
}: ControlledSwitchProps<T>) => {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState }) => (
				<>
					<div
						className={`flex flex-row items-center justify-between ${visible ? " opacity-100 translate-y-0 max-h-96" : " opacity-0 -translate-y-full max-h-0"} transition-all duration-300 ease-in-out transform`}
					>
						<Label htmlFor={name} className={`${label ? "block" : "hidden"}`}>
							{label}
						</Label>
						<Switch
							// {...field}
							checked={field.value}
							onCheckedChange={field.onChange}
							{...props}
						/>
					</div>
					<span className="text-red-500 text-sm">
						{fieldState.error?.message}
					</span>
				</>
			)}
		/>
	);
};
