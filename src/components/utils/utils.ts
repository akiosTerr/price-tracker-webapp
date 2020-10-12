interface Response {
	status: number;
	errorData?: string;
	priceChange: boolean;
	newPrice: string;
	lastPrice?: string;
}

export interface ValidatedResponse {
	update: boolean;
	newPrice?: string;
	lastPrice?: string | undefined;
	error: string | undefined;
}

export const validateResponse = (res: Response): ValidatedResponse => {
	let validatedResponse: ValidatedResponse;

	if (res.status === 1) {
		validatedResponse = {
			update: res.priceChange,
			newPrice: res.newPrice,
			lastPrice: res.lastPrice,
			error: undefined,
		};
		return validatedResponse;
	} else {
		validatedResponse = {
			update: false,
			error: res.errorData,
		};

		return validatedResponse;
	}
};
