import {
	AccountStateActionTypes,
	IAccountReducerAction,
} from "../actions-types/account-types";
import { put, call, takeEvery, takeLatest, select } from "redux-saga/effects";
import { accountService } from "mele-wallet/src/common/api/client-service";
export const accountSaga = function* handleMessage(
	params: any,
): IterableIterator<any> {
	yield takeEvery(AccountStateActionTypes.LOG_IN_REQUEST, doStuff);
};

function* doStuff(action: IAccountReducerAction): IterableIterator<any> {
	let accountState = yield select((state: any) => {
		return state.account;
	});
	console.log("doing this!!!");
	const response = yield call(
		accountService.login,
		action.username,
		action.password,
	);
	console.log(response, "!!!!!!!!!!");
	yield put({
		type: AccountStateActionTypes.LOG_IN_SUCCESSFUL,
		account: response.data,
	});
	//async
	//yield call

	console.log(accountState, "ACCOUNTSTATE11111");
	accountState = yield select((state: any) => {
		return state.account;
	});
	console.log(accountState, "ACCOUNTSTATE2222");
}
