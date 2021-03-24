export interface ITransactionModel {
	id: string;
	from: {
		email: string;
		name: string;
		wallet: string;
	};
	to: {
		email: string;
		name: string;
		wallet: string;
	};
	type: string;
	amount: string;
	createdAt: string;
	approvedAt: string;
	updatedAt: string;
	status: string;
	refCode: string;

}

export function emptyTransaction(): ITransactionModel {
	return {
		id: '',
		from: {
			email: '',
			name: '',
			wallet: '',
		},
		to: {
			email: '',
			name: '',
			wallet: '',
		},
		type: '',
		amount: '',
		createdAt: '',
		approvedAt: '',
		updatedAt: '',
		status: '',
		refCode: '',
	}

}