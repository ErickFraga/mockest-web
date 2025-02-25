import { env } from "@/env";
import { api } from "@/lib/axios";
import type {
	IGenerateMockParams,
	IGenerateMockResponse,
	IStuff,
	IStuffCreateParams,
	IStuffCreateResponse,
	IStuffGetResponse,
} from "@/types/stuff";
import { createContext, useCallback, useContext, useState } from "react";
import { useToast } from "./use-toast";

type StuffServiceProps = {
	children: React.ReactNode;
};

type StuffService = {
	myStuff: IStuff[];
	loading: boolean;
	generateMock: (
		params: IGenerateMockParams,
	) => Promise<IGenerateMockResponse | null>;
	getStuff: (slug: string) => Promise<IStuffGetResponse | null>;
	createStuff: (
		params: IStuffCreateParams,
	) => Promise<IStuffCreateResponse | null>;
};

export const StuffServiceContext = createContext<StuffService | null>(null);

export function StuffServiceProvider({ children }: StuffServiceProps) {
	const [myStuff, setMyStuff] = useState<IStuff[]>([]);
	const [loading, setLoading] = useState(false);

	const { toast } = useToast();

	const onError = useCallback(
		(message: string, duration: number) => {
			toast({
				variant: "destructive",
				description: message,
				duration: duration,
			});
		},
		[toast],
	);

	const generateMock = useCallback(
		async ({
			strategy,
			prompt,
		}: IGenerateMockParams): Promise<IGenerateMockResponse | null> => {
			try {
				setLoading(true);

				const response = await api.post("/generate", {
					type: strategy,
					input: prompt,
				});

				const { data, status } = response;

				if (status !== 200) {
					setLoading(false);
					onError("Não foi possível criar o mock", 1000 * 5);
					return null;
				}

				setLoading(false);
				return data;
			} catch (e) {
				console.log(e);
				setLoading(false);
				onError("Não foi possível criar o mock", 1000 * 5);
				return null;
			}
		},
		[onError],
	);

	const createStuff = useCallback(
		async ({
			title,
			content,
		}: IStuffCreateParams): Promise<IStuffCreateResponse | null> => {
			try {
				setLoading(true);

				const { data, status } = await api.post("/stuff", {
					title,
					raw_content: content,
				});

				setLoading(false);

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
					url: `${env.VITE_API_URL}/${data.url}`,
				};
			} catch (e) {
				console.log(e);
				setLoading(false);
				onError("Não foi possível criar o mock", 1000 * 5);
				return null;
			}
		},
		[onError],
	);

	const getStuff = useCallback(
		async (slug: string): Promise<IStuffGetResponse | null> => {
			try {
				setLoading(true);
				// await new Promise((resolve) => setTimeout(resolve, 500000000));
				const { data } = await api.get(`/stuff/${slug}`);
				setLoading(false);
				return {
					...data,
					stuff: {
						...data.stuff,
						url: `${env.VITE_API_URL}${data.stuff.url}`,
					},
				};
			} catch (e) {
				console.log(e);
				setLoading(false);
				onError("Mock não encontrado ou expirado", 999999999);
				return null;
			}
		},
		[onError],
	);

	return (
		<StuffServiceContext.Provider
			value={{
				myStuff,
				loading,
				generateMock,
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
