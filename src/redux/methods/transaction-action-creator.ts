import {
	ITransactionsReducerAction,
	TransactionsStateActionTypes,
} from "../reducers/transaction-reducer";
import BaseActionCreator from "./base-action-creator";

export default class TransactionsActionCreator extends BaseActionCreator<
	TransactionsStateActionTypes,
	ITransactionsReducerAction
> {
	searchTransactions = async (address: string) => {
		this.dispatch({
			type: TransactionsStateActionTypes.LOAD_TRANSACTIONS_REQUEST,
			address: address,
		});
	};

	getTransactionsCount = async () => {
		this.dispatch({
			type: TransactionsStateActionTypes.GET_TRANSACTIONS_COUNT_REQUEST,
		});
	};

	getTransaction = async (hash: string) => {
		this.dispatch({
			type: TransactionsStateActionTypes.LOAD_TRANSACTION_REQUEST,
			hash: hash,
		});
	};

	cleanTransactions = async () => {
		this.dispatch({
			type: TransactionsStateActionTypes.CLEAN_TRANSACTIONS,
		});
	};

	sendTransaction = async (address: string, denom: string, amount: string) => {
		this.dispatch({
			type: TransactionsStateActionTypes.SEND_TRANSACTION_REQUEST,
			address: address,
			denom: denom,
			amount: amount,
		});
	};
	logout = async () => {
		this.dispatch({
			type: TransactionsStateActionTypes.RESET_ALL,
		});
	};

	resetSendFlow = async () => {
		this.dispatch({
			type: TransactionsStateActionTypes.CLEAN_SEND_FLOW,
		});
	};

	startSendFlow = async () => {
		this.dispatch({
			type: TransactionsStateActionTypes.START_SEND_FLOW,
		});
	};
}
