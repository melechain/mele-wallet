export interface ITransactionModel {
	id: string;
	from: string;
	to: string;
	type: string;
	amount: number;
	createdAt: string;
	updatedAt: string;
	status: string;
	refCode: string;
}
