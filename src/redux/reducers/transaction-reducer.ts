import { Reducer, Action } from "redux";
import { ITransactionModel } from "@mele-wallet/common/model/transaction.model";
import { number } from "prop-types";

export enum TransactionStateActionTypes {
	LOAD_TRANSACTIONS_REQUEST = "@@TRANSACTION/LOAD_TRANSACTIONS_REQUEST",
	LOAD_TRANSACTIONS_SUCCESS = "@@TRANSACTION/LOAD_TRANSACTIONS_SUCCESS",
	LOAD_TRANSACTIONS_ERROR = "@@TRANSACTION/LOAD_TRANSACTIONS_ERROR",
	LOAD_TRANSACTION_REQUEST = "@@TRANSACTION/LOAD_TRANSACTION_REQUEST",
	LOAD_TRANSACTION_SUCCESS = "@@TRANSACTION/LOAD_TRANSACTION_SUCCESS",
	LOAD_TRANSACTION_ERROR = "@@TRANSACTION/LOAD_TRANSACTION_ERROR",
	CREATE_TRANSACTION_START = "@@TRANSACTION/CREATE_TRANSACTION_START", // open window
	CREATE_TRANSACTION_REQUEST = "@@TRANSACTION/CREATE_TRANSACTION_REQUEST",
	CREATE_TRANSACTION_SUCCESS = "@@TRANSACTION/CREATE_TRANSACTION_SUCCESS",
	CREATE_TRANSACTION_ERROR = "@@TRANSACTION/CREATE_TRANSACTION_ERROR",
	CREATE_TRANSACTION_END = "@@TRANSACTION/CREATE_TRANSACTION_END", // close window
	PURCHASE_NUMBER_REQUEST = "@@TRANSACTION/PURCHASE_NUMBER_REQUEST",
	PURCHASE_NUMBER_SUCCESS = "@@TRANSACTION/PURCHASE_NUMBER_SUCCESS",
	PURCHASE_NUMBER_ERROR = "@@TRANSACTION/PURCHASE_NUMBER_ERROR",
	PURCHASE_REQUEST = "@@TRANSACTION/PURCHASE_REQUEST",
	PURCHASE_SUCCESS = "@@TRANSACTION/PURCHASE_SUCCESS",
	PURCHASE_ERROR = "@@TRANSACTION/PURCHASE_ERROR",
	PURCHASE_STATUS_CLEAR = "@@TRANSACTION/PURCHASE_STATUS_CLEAR",
	RESET_SEND_FLOW = "@@TRANSACTION/RESET_SEND_FLOW",
	NOT_ENOUGH_COINS_SEND = "@@TRANSACTION/NOT_ENOUGH_COINS_SEND",
}

export enum PurchaseFlowStatus {
	NOT_STARTED,
	PURCHASE_NUMBER_REQUESTED,
	PURCHASE_NUMBER_SUCCESS,
	PURCHASE_NUMBER_ERROR,
	PURCHASE_REQUESTED,
	PURCHASE_SUCCESS,
	PURCHASE_ERROR,
}
export enum TransactionStatus {
	STARTED, // open a window
	REQUESTED,
	SUCCESS,
	ERROR,
	ENDED, // close window
	NOT_ENOUGH_COINS_SEND,
}
export enum LoadTransactionsStatus {
	NOT_REQUESTED,
	REQUESTED,
	SUCCESS,
	ERROR,
}

export class ITransactionList {
	constructor() {
		this.loadedTransactions = [];
		this.totalCount = 0;
		this.loadTransactionsStatus = LoadTransactionsStatus.NOT_REQUESTED;
	}
	loadedTransactions: ITransactionModel[];
	totalCount: number;
	loadTransactionsStatus: LoadTransactionsStatus;
}

export class TransactionState {
	purchaseFlowStatus: PurchaseFlowStatus = PurchaseFlowStatus.NOT_STARTED;
	generatedPurchaseCode: string = "";
	loadedTransactionLists: {
		[key: string]: ITransactionList;
	} = {};
	loadedTransaction?: ITransactionModel;
	transactionStatus: TransactionStatus = TransactionStatus.ENDED;
}
export interface ITransactionReducerAction {
	generatedPurchaseCode: string;
	transactionType: string;
	transactionStatus: string;
	type: TransactionStateActionTypes;
	loadedTransactions: ITransactionModel[];
	totalCount: number;
	loadedTransaction: ITransactionModel;
	transactionListKeyword: string;
	page: number;
	size: number;
	email: string;
	to: string;
	from: string;
	amount: number;
}

export const initialState: TransactionState = new TransactionState();

const transactionReducer = (
	state: TransactionState = initialState,
	action: ITransactionReducerAction,
): TransactionState => {
	switch (action.type) {
		case TransactionStateActionTypes.LOAD_TRANSACTIONS_REQUEST:
			return {
				...state,
				...updateLoadedTransactions(
					state,
					action.transactionListKeyword,
					[],
					0,
					LoadTransactionsStatus.REQUESTED,
				),
			};
		case TransactionStateActionTypes.LOAD_TRANSACTIONS_SUCCESS:
			return {
				...state,
				...updateLoadedTransactions(
					state,
					action.transactionListKeyword,
					action.loadedTransactions,
					action.totalCount,
					LoadTransactionsStatus.SUCCESS,
				),
			};
		case TransactionStateActionTypes.LOAD_TRANSACTIONS_ERROR:
			return {
				...state,
				...updateLoadedTransactions(
					state,
					action.transactionListKeyword,
					action.loadedTransactions,
					action.totalCount,
					LoadTransactionsStatus.ERROR,
				),
			};
		case TransactionStateActionTypes.LOAD_TRANSACTION_SUCCESS:
			return {
				...state,
				loadedTransaction: action.loadedTransaction,
			};
		case TransactionStateActionTypes.LOAD_TRANSACTION_ERROR:
			return {
				...state,
				loadedTransaction: undefined,
			};
		case TransactionStateActionTypes.LOAD_TRANSACTION_ERROR:
			return {
				...state,
				loadedTransaction: undefined,
			};
		case TransactionStateActionTypes.CREATE_TRANSACTION_START:
			return {
				...state,
				transactionStatus: TransactionStatus.STARTED,
			};
		case TransactionStateActionTypes.CREATE_TRANSACTION_REQUEST:
			return {
				...state,
				transactionStatus: TransactionStatus.REQUESTED,
			};
		case TransactionStateActionTypes.CREATE_TRANSACTION_SUCCESS:
			return {
				...state,
				transactionStatus: TransactionStatus.SUCCESS,
				loadedTransaction: action.loadedTransaction,
			};
		case TransactionStateActionTypes.CREATE_TRANSACTION_ERROR:
			return {
				...state,
				transactionStatus: TransactionStatus.ERROR,
			};
		case TransactionStateActionTypes.CREATE_TRANSACTION_END:
			return {
				...state,
				transactionStatus: TransactionStatus.ENDED,
			};
		case TransactionStateActionTypes.PURCHASE_NUMBER_REQUEST:
			return {
				...state,
				purchaseFlowStatus: PurchaseFlowStatus.PURCHASE_NUMBER_REQUESTED,
			};
		case TransactionStateActionTypes.PURCHASE_NUMBER_SUCCESS:
			return {
				...state,
				purchaseFlowStatus: PurchaseFlowStatus.PURCHASE_NUMBER_SUCCESS,
				generatedPurchaseCode: action.generatedPurchaseCode,
			};
		case TransactionStateActionTypes.PURCHASE_NUMBER_ERROR:
			return {
				...state,
				purchaseFlowStatus: PurchaseFlowStatus.PURCHASE_NUMBER_ERROR,
			};
		case TransactionStateActionTypes.PURCHASE_REQUEST:
			return {
				...state,
				purchaseFlowStatus: PurchaseFlowStatus.PURCHASE_REQUESTED,
			};
		case TransactionStateActionTypes.PURCHASE_ERROR:
			return {
				...state,
				purchaseFlowStatus: PurchaseFlowStatus.PURCHASE_ERROR,
			};
		case TransactionStateActionTypes.PURCHASE_SUCCESS:
			return {
				...state,
				purchaseFlowStatus: PurchaseFlowStatus.PURCHASE_SUCCESS,
				loadedTransaction: action.loadedTransaction,
			};
		case TransactionStateActionTypes.PURCHASE_STATUS_CLEAR:
			return {
				...state,
				purchaseFlowStatus: PurchaseFlowStatus.NOT_STARTED,
				generatedPurchaseCode: "",
			};
		case TransactionStateActionTypes.RESET_SEND_FLOW:
			return {
				...state,
				transactionStatus: TransactionStatus.ENDED,
			};
		case TransactionStateActionTypes.NOT_ENOUGH_COINS_SEND:
			return {
				...state,
				transactionStatus: TransactionStatus.NOT_ENOUGH_COINS_SEND,
			};
		default:
			return {
				...state,
			};
	}
};

const updateLoadedTransactions = (
	state: TransactionState,
	transactionListKeyword: string,
	transactions: ITransactionModel[],
	total: number,
	status: LoadTransactionsStatus,
) => {
	const loadedTransactionLists = {
		...state.loadedTransactionLists,
		[transactionListKeyword]: {
			loadedTransactions: transactions,
			totalCount: total,
			loadTransactionsStatus: status,
		},
	};

	return {
		loadedTransactionLists: loadedTransactionLists,
	};
};

export default transactionReducer;
