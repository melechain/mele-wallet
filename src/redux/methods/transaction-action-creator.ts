import {
	TransactionStateActionTypes,
	ITransactionReducerAction,
} from "../reducers/transaction-reducer";
import BaseActionCreator from "./base-action-creator";

export default class TransactionActionCreator extends BaseActionCreator<
	TransactionStateActionTypes,
	ITransactionReducerAction
> {
	transactionStart = async () => {
		this.dispatch({
			type: TransactionStateActionTypes.CREATE_TRANSACTION_START,
		});
	};

	transactionEnd = async () => {
		this.dispatch({
			type: TransactionStateActionTypes.CREATE_TRANSACTION_END,
		});
	};

	transactionSend = async (to: string, amount: number) => {
		this.dispatch({
			type: TransactionStateActionTypes.CREATE_TRANSACTION_REQUEST,
			to: to,
			amount: amount,
		});
	};

	searchNotPayedOrdersTransactions = async (
		page: number,
		size: number,
		transactionType: string,
	) => {
		this.dispatch({
			type: TransactionStateActionTypes.LOAD_TRANSACTIONS_REQUEST,
			page: page,
			size: size,
			transactionType: transactionType,
		});
	};
	searchTransactions = async (p: {
		page: number;
		size: number;
		from?: string;
		to?: string;
		transactionType?: string;
		transactionStatus?: string;
		transactionListKeyword: string;
	}) => {
		this.dispatch({
			type: TransactionStateActionTypes.LOAD_TRANSACTIONS_REQUEST,
			...p,
		});
	};
	generateNewPurchaseNumber = async () => {
		this.dispatch({
			type: TransactionStateActionTypes.PURCHASE_NUMBER_REQUEST,
		});
	};
	processPurchase = async (amount: number, generatedPurchaseCode: string) => {
		this.dispatch({
			type: TransactionStateActionTypes.PURCHASE_REQUEST,
			amount: amount,
			generatedPurchaseCode: generatedPurchaseCode,
		});
	};
	resetPurchaseFlow = async () => {
		this.dispatch({
			type: TransactionStateActionTypes.PURCHASE_STATUS_CLEAR,
		});
	};
}
