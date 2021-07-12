import { accountSaga } from "./account-saga";
import { staticSaga } from "./static-saga";
import { statisticsSaga } from "./statistics-saga";
import { transactionsSaga } from "./transaction-saga";
import { walletSaga } from "./wallet-saga";
import { all } from "redux-saga/effects";

export const rootSaga = function* handleMessage(
	params: any,
): IterableIterator<any> {
	yield all([
		accountSaga(params),
		staticSaga(params),
		statisticsSaga(params),
		transactionsSaga(params),
		walletSaga(params),
	]);
};
