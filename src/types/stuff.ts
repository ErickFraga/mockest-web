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
}
