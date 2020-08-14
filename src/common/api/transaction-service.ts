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
}
export const transactionService = new TransactionService();
