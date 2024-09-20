import { env } from "@/env";
import { api } from "@/lib/axios";
import type {
	IStuff,
	IStuffCreateParams,
	IStuffCreateResponse,
	IStuffGetResponse,
} from "@/types/stuff";
import { createContext, useContext, useState } from "react";

type StuffServiceProps = {
	children: React.ReactNode;
};

type StuffService = {
	myStuff: IStuff[];
	getStuff: (slug: string) => Promise<IStuffGetResponse>;
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
		console.log(env);

		return {
			stuffId: data.stuffId,
			slug: data.slug,
			url: `${env.API_URL}/${data.url}`,
		};
	}

	async function getStuff(slug: string): Promise<IStuffGetResponse> {
		const { data } = await api.get(`/stuff/${slug}`);
		console.log(env);

		return {
			...data,
			stuff: {
				...data.stuff,
				url: `${env.API_URL}${data.stuff.url}`,
			},
		};
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
