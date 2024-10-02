export interface IStuff {
	title: string;
	slug: string;
	content: string;
	createdAt: Date;
}

export interface IStuffCreateParams {
	title: string;
	content: string;
}
export interface IStuffCreateResponse {
	stuffId: string;
	slug: string;
	url: string;
}

export interface IStuffGetResponse {
	stuff: {
		id: string;
		title: string;
		content: any;
		url: string;
		createdAt: string;
		updatedAt: string;
	};
}

export interface IGenerateMockParams {
	strategy: string;
	prompt: string;
}

export interface IGenerateMockResponse {
	success: boolean;
	mockSuggestion: string;
}
