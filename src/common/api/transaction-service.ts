import MainService from "./main-api-service";
import buildUrl from "build-url";
// used by admin to manipulate user data
export enum TransactionType {
	TRANSFER = "transfer",
	PURCHASE = "purchase",
}

export enum TransactionStatus {
	PENDING = "pending",
	DENIED = "denied",
	APPROVED = "approved",
}

export interface ISearchTransactionParameter {
	page: number;
	size: number;
	from?: string;
	to?: string;
	type?: TransactionType;
	status?: TransactionStatus;
}

export default class TransactionService extends MainService {
	transactionSend = async (to: string, amount: number) => {
		return await this.put({
			path: `/transaction`,
			data: {
				to: to,
				type: "transfer",
				amount: parseInt(amount as any),
			},
		});
	};
	transactionPurchase = async (amount: number, refCode: string) => {
		return await this.put({
			path: `/transaction`,
			data: {
				type: "purchase",
				amount: parseInt(amount as any),
				refCode: refCode,
			},
		});
	};
	searchTransactions = async (p: ISearchTransactionParameter) => {
		const url = buildUrl("/transaction", {
			queryParams: {
				from: "1000-01-01",
				to: "3000-01-01",
				...(p as any),
			},
		});
		return await this.get({
			path: url,
		});
	};
	getNewTransactionNumber = async () => {
		return await this.get({
			path: "/sequence",
		});
	};
}
export const transactionService = new TransactionService();
