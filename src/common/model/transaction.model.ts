export interface ITransactionModel {
	id: string;
	from: {
		email: string;
		name: string;
	};
	to: {
		email: string;
		name: string;
	};
	type: string;
	amount: string;
	createdAt: string;
	approvedAt: string;
	updatedAt: string;
	status: string;
	refCode: string;
}
