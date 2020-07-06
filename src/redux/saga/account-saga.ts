import {
	AccountStateActionTypes,
	IAccountReducerAction,
} from "../actions-types/account-types";
import { put, call, takeEvery, takeLatest, select } from "redux-saga/effects";
export const accountSaga = function* handleMessage(
	params: any,
): IterableIterator<any> {
	yield takeEvery(AccountStateActionTypes.LOG_IN_REQUEST, doStuff);
};

function* doStuff(action: IAccountReducerAction): IterableIterator<any> {
	let accountState = yield select((state: any) => {
		return state.account;
	});
	console.log(accountState);
	yield put({
		type: AccountStateActionTypes.LOG_IN_SUCCESSFUL,
	});
	//async
	//yield call

	console.log(accountState);
	accountState = yield select((state: any) => {
		return state.account;
	});
	console.log(accountState);
}
