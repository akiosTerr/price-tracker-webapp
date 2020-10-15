export interface Response {
	status: number;
	errorData?: string;
	priceChange: boolean;
	newPrice: string;
	lastPrice?: string;
	createdAt: string;
}
