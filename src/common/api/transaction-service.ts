import MainService from "./main-api-service";
import buildUrl from "build-url";
import AsyncStorage from "@react-native-community/async-storage";
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
		const response = await this.put({
			path: `/transaction`,
			data: {
				to: to,
				type: "transfer",
				amount: amount,
			},
		});
		return response;
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
	transactionLoad = async (transactionId: string) => {
		return await this.get({
			path: `/transaction/${transactionId}`,
		});
	};
	transactionApprove = async (transactionId: string) => {
		return await this.post({
			path: `/transaction/${transactionId}`,
			data: {
				status: "approved",
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
		const response = await this.get({
			path: url,
		});
		return response;
	};
	getNewTransactionNumber = async () => {
		return await this.get({
			path: "/sequence",
		});
	};
}

export const transactionService = new TransactionService();
