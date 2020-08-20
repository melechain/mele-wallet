import MainService from "./main-api-service";

// used by admin to manipulate user data
export default class TransactionService extends MainService {
	transactionSend = async (to: string, amount: number) => {
		return await this.put({
			path: `/transaction`,
			data: {
				to: to,
				type: "transfer",
				amount: parseFloat(amount as any),
			},
		});
	};
	searchTransactions = async (page: number, size: number) => {
		return await this.get({
			path: `/transaction?size=${size}&to=3000-07-01&from=2019-08-20&page=${page}`,
		});
	};
}
export const transactionService = new TransactionService();
