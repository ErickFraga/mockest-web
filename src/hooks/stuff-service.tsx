import { api } from "@/lib/axios";
import type {
	IStuff,
	IStuffCreateParams,
	IStuffCreateResponse,
} from "@/types/stuff";
import { createContext, useContext, useState } from "react";

type StuffServiceProps = {
	children: React.ReactNode;
};

type StuffService = {
	myStuff: IStuff[];
	getStuff: () => Promise<IStuff>;
	createStuff: (
		params: IStuffCreateParams,
	) => Promise<IStuffCreateResponse | null>;
};

export const StuffServiceContext = createContext<StuffService | null>(null);

export function StuffServiceProvider({ children }: StuffServiceProps) {
	const [myStuff, setMyStuff] = useState<IStuff[]>([]);

	async function createStuff({
		title,
		content,
	}: IStuffCreateParams): Promise<IStuffCreateResponse | null> {
		const { data, status } = await api.post("/stuff", {
			title,
			raw_content: content,
		});

		if (status !== 201) {
			return null;
		}

		const stuff: IStuff = {
			title,
			content,
			createdAt: new Date(),
			slug: data.slug,
		};

		setMyStuff((prev) => {
			return [...prev, stuff];
		});

		return {
			stuffId: data.stuffId,
			slug: data.slug,
		};
	}

	async function getStuff(): Promise<IStuff> {
		const { data } = await api.get("/stuff");

		return data;
	}

	return (
		<StuffServiceContext.Provider
			value={{
				myStuff,
				createStuff,
				getStuff,
			}}
		>
			{children}
		</StuffServiceContext.Provider>
	);
}

export const useStuff = () => {
	const context = useContext(StuffServiceContext);

	if (!context) {
		throw new Error("useStuff must be used within a StuffServiceProvider");
	}

	return context;
};
