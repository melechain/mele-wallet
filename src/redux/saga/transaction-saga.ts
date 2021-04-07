import { put, call, takeEvery, takeLatest, select } from "redux-saga/effects";
import { userService } from "@mele-wallet/common/api/user-service";
import {
	transactionService,
	ISearchTransactionParameter,
} from "@mele-wallet/common/api/transaction-service";
import { SagaIterator } from "redux-saga";
import {
	TransactionStateActionTypes,
	ITransactionReducerAction,
} from "@mele-wallet/redux/reducers/transaction-reducer";

export const transactionSaga = function* handleMessage(
	params: any,
): SagaIterator {
	yield takeLatest(
		TransactionStateActionTypes.CREATE_TRANSACTION_REQUEST,
		transactionSend,
	);
	yield takeLatest(
		TransactionStateActionTypes.LOAD_TRANSACTIONS_REQUEST,
		searchTransactions,
	);
	yield takeLatest(
		TransactionStateActionTypes.PURCHASE_NUMBER_REQUEST,
		generateNewPurchaseNumber,
	);
	yield takeLatest(
		TransactionStateActionTypes.PURCHASE_REQUEST,
		processPurchase,
	);
};

function* generateNewPurchaseNumber(): SagaIterator {
	try {
		const response = yield call(transactionService.getNewTransactionNumber);
		const pad = "000000";
		var generatedPurchaseCode =
			"TNX" + (pad + response.transaction).slice(-pad.length);
		return yield put({
			type: TransactionStateActionTypes.PURCHASE_NUMBER_SUCCESS,
			generatedPurchaseCode: generatedPurchaseCode,
		});
	} catch (e) {
		return yield put({
			type: TransactionStateActionTypes.PURCHASE_NUMBER_ERROR,
		});
	}
}

function* processPurchase(action: ITransactionReducerAction): SagaIterator {
	try {
		const response = yield call(
			transactionService.transactionPurchase,
			action.amount,
			action.generatedPurchaseCode,
		);
		return yield put({
			type: TransactionStateActionTypes.PURCHASE_SUCCESS,
			loadedTransaction: response,
		});
	} catch (e) {
		return yield put({
			type: TransactionStateActionTypes.PURCHASE_ERROR,
		});
	}
}
function* transactionSend(action: ITransactionReducerAction): SagaIterator {
	try {
		const response = yield call(
			transactionService.transactionSend,
			action.to,
			action.amount,
		);
		return yield put({
			type: TransactionStateActionTypes.CREATE_TRANSACTION_SUCCESS,
			loadedTransaction: response,
		});
	} catch (e) {
		return yield put({
			type: TransactionStateActionTypes.CREATE_TRANSACTION_ERROR,
		});
	}
}

function* searchTransactions(action: ITransactionReducerAction): SagaIterator {
	try {
		const p: ISearchTransactionParameter = {
			page: action.page,
			size: action.size || 9999,
		};
		if (action.transactionStatus) {
			p.status = action.transactionStatus as any;
		}
		if (action.transactionType) {
			p.type = action.transactionType as any;
		}
		if (action.from) {
			p.from = action.from;
		}
		if (action.to) {
			p.to = action.to;
		}

		const response = yield call(transactionService.searchTransactions, p);
		return yield put({
			type: TransactionStateActionTypes.LOAD_TRANSACTIONS_SUCCESS,
			loadedTransactions: response.slice(1),
			totalCount: response[0],
			transactionListKeyword: action.transactionListKeyword,
		});
	} catch (e) {
		return yield put({
			type: TransactionStateActionTypes.LOAD_TRANSACTIONS_ERROR,
			loadedTransactions: [],
			totalCount: 0,
			transactionListKeyword: action.transactionListKeyword,
		});
	}
}
