import { accountSaga } from "./account-saga";
import { staticSaga } from "./static-saga";
import { all } from "redux-saga/effects";

export const rootSaga = function* handleMessage(
	params: any,
): IterableIterator<any> {
	yield all([accountSaga(params), staticSaga(params)]);
};
