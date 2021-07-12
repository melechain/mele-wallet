interface TransactionMsg {
	action: string;
	data: any;
	module: string;
	sender: string;
	meta: any[];
	addresses: string[];
	log: string;
}

interface MsgObject {}

export interface ITRANSACTIONModel {
	_id: string;
	hash: string;
	height: string;
	msgs: TransactionMsg[];
	log: string;
	info: string;
	code: string;
	codespace: string;
	gas_wanted: string;
	gas_used: string;
	timestamp: string;
	valid: boolean;
}

export enum TransactionsStateActionTypes {
	LOAD_TRANSACTIONS_REQUEST = "@@Transactions/LOAD_TRANSACTIONS_REQUEST",
	LOAD_TRANSACTIONS_SUCCESS = "@@Transactions/LOAD_TRANSACTIONS_SUCCESS",
	LOAD_TRANSACTIONS_ERROR = "@@Transactions/LOAD_TRANSACTIONS_ERROR",
	LOAD_TRANSACTION_REQUEST = "@@Transactions/LOAD_TRANSACTION_REQUEST",
	LOAD_TRANSACTION_SUCCESS = "@@Transactions/LOAD_TRANSACTION_SUCCESS",
	LOAD_TRANSACTION_ERROR = "@@Transactions/LOAD_TRANSACTION_ERROR",
	GET_TRANSACTIONS_COUNT_REQUEST = "@@Transactions/GET_TRANSACTIONS_COUNT_REQUEST",
	GET_TRANSACTIONS_COUNT_SUCCESS = "@@Transactions/GET_TRANSACTIONS_COUNT_SUCCESS",
	GET_TRANSACTIONS_COUNT_ERROR = "@@Transactions/GET_TRANSACTIONS_COUNT_ERROR",
	SEND_TRANSACTION_REQUEST = "@@Transactions/SEND_TRANSACTION_REQUEST",
	SEND_TRANSACTION_SUCCESS = "@@Transactions/SEND_TRANSACTION_SUCCESS",
	SEND_TRANSACTION_ERROR = "@@Transactions/SEND_TRANSACTION_ERROR",
	CLEAN_TRANSACTIONS = "@@Transactions/CLEAN_TRANSACTIONS",
	CLEAN_SEND_FLOW = "@@Transactions/CLEAN_SEND_FLOW",
	START_SEND_FLOW = "@@Transactions/START_SEND_FLOW",
}

export enum LoadTransactionsStatus {
	REQUESTED,
	SUCCESS,
	ERROR,
	TRANSACTIONS_COUNT_REQUESTED,
	SEND_REQUEST,
	SEND_SUCCESS,
	SEND_ERROR,
	RESET,
	START,
}

export class TransactionsState {
	loadedTransactions: ITRANSACTIONModel[] = [];
	totalCount: number = 0;
	generatedTransactionsCount: number = 0;
	loadedTransaction?: ITRANSACTIONModel;
	loadTransactionsStatus?: LoadTransactionsStatus;
}

export class ITransactionsReducerAction {
	page: number = 0;
	size: number = 0;
	hash: string = "";
	type?: TransactionsStateActionTypes;
	loadedTransactions: ITRANSACTIONModel[] = [];
	totalCount: number = 0;
	loadedTransaction?: ITRANSACTIONModel;
	generatedTransactionsCount: number = 0;
	address: string = "";
	denom: string = "";
	amount: string = "";
}

export const initialState: TransactionsState = new TransactionsState();

const TransactionsReducer = (
	state: TransactionsState = initialState,
	action: ITransactionsReducerAction,
): TransactionsState => {
	switch (action.type) {
		case TransactionsStateActionTypes.LOAD_TRANSACTIONS_REQUEST:
			return {
				...state,
				loadTransactionsStatus: LoadTransactionsStatus.REQUESTED,
			};
		case TransactionsStateActionTypes.LOAD_TRANSACTIONS_SUCCESS:
			return {
				...state,
				loadedTransactions: action.loadedTransactions,
				totalCount: action.totalCount,
			};
		case TransactionsStateActionTypes.LOAD_TRANSACTIONS_ERROR:
			return {
				...state,
				loadTransactionsStatus: LoadTransactionsStatus.ERROR,
				loadedTransactions: [],
				totalCount: 0,
			};
		case TransactionsStateActionTypes.GET_TRANSACTIONS_COUNT_REQUEST:
			return {
				...state,
				loadTransactionsStatus:
					LoadTransactionsStatus.TRANSACTIONS_COUNT_REQUESTED,
			};
		case TransactionsStateActionTypes.GET_TRANSACTIONS_COUNT_SUCCESS:
			return {
				...state,
				generatedTransactionsCount: action.generatedTransactionsCount,
			};
		case TransactionsStateActionTypes.GET_TRANSACTIONS_COUNT_ERROR:
			return {
				...state,
				generatedTransactionsCount: 0,
			};
		case TransactionsStateActionTypes.LOAD_TRANSACTION_REQUEST:
			return {
				...state,
			};
		case TransactionsStateActionTypes.LOAD_TRANSACTION_SUCCESS:
			return {
				...state,
				loadedTransaction: action.loadedTransaction,
				loadTransactionsStatus: LoadTransactionsStatus.SUCCESS,
			};
		case TransactionsStateActionTypes.LOAD_TRANSACTION_ERROR:
			return {
				...state,
				loadedTransaction: undefined,
				loadTransactionsStatus: LoadTransactionsStatus.ERROR,
			};
		case TransactionsStateActionTypes.SEND_TRANSACTION_REQUEST:
			return {
				...state,
				loadTransactionsStatus: LoadTransactionsStatus.SEND_REQUEST,
			};
		case TransactionsStateActionTypes.SEND_TRANSACTION_SUCCESS:
			return {
				...state,
				loadTransactionsStatus: LoadTransactionsStatus.SEND_SUCCESS,
			};
		case TransactionsStateActionTypes.SEND_TRANSACTION_ERROR:
			return {
				...state,
				loadTransactionsStatus: LoadTransactionsStatus.SEND_ERROR,
			};
		case TransactionsStateActionTypes.CLEAN_TRANSACTIONS:
			return {
				...state,
				loadedTransaction: undefined,
				loadedTransactions: [],
			};
		case TransactionsStateActionTypes.CLEAN_SEND_FLOW:
			return {
				...state,
				loadTransactionsStatus: LoadTransactionsStatus.RESET,
			};
		case TransactionsStateActionTypes.START_SEND_FLOW:
			return {
				...state,
				loadTransactionsStatus: LoadTransactionsStatus.START,
			};
		default:
			return {
				...state,
			};
	}
};

export default TransactionsReducer;
