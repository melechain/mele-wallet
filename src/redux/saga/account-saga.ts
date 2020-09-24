import { put, call, takeEvery, takeLatest, select } from "redux-saga/effects";
import { accountService } from "@mele-wallet/common/api/account-service";
import { SagaIterator } from "redux-saga";
import {
	AccountStateActionTypes,
	IAccountReducerAction,
	AccountSyncStatus,
} from "@mele-wallet/redux/reducers/account-reducer";
import {
	StaticStateActionTypes,
	StaticState,
} from "@mele-wallet/redux/reducers/static-reducer";

export const accountSaga = function* handleMessage(params: any): SagaIterator {
	yield takeEvery(AccountStateActionTypes.WALLET_SYNC_REQUEST, walletSync);
	yield takeEvery(AccountStateActionTypes.ACCOUNT_SYNC_REQUEST, accountSync);
};

function* walletSync(action: IAccountReducerAction): SagaIterator {
	try {
		const response = yield call(
			accountService.walletSync,
			action.accountId!,
			action.wallet!,
		);

		yield put({
			type: AccountStateActionTypes.WALLET_SYNC_SUCCESSFUL,
			account: response,
		});

		yield put({
			type: StaticStateActionTypes.SET_ACCOUNT_ID,
			accountId: action.accountId,
		});

		// yield put({
		//     type: AccountStateActionTypes.ACCOUNT_SYNC_REQUEST
		// })
	} catch (e) {
		yield put({
			type: AccountStateActionTypes.WALLET_SYNC_ERROR,
		});
	}
}

function* accountSync(action: IAccountReducerAction): SagaIterator {
	try {
		const response = yield call(accountService.checkSession);
		console.log("RESPONSE!!!!!! <========>>>");
		console.log("RESPONSE!!!!!! <========>>>");
		console.log("RESPONSE!!!!!! <========>>>");
		console.log("RESPONSE!!!!!! <========>>>");
		console.log("RESPONSE!!!!!! <========>>>");
		console.log("RESPONSE!!!!!! <========>>>", response);
		console.log("RESPONSE!!!!!! <========>>>");
		console.log("RESPONSE!!!!!! <========>>>");
		console.log("RESPONSE!!!!!! <========>>>");
		console.log("RESPONSE!!!!!! <========>>>");
		console.log("RESPONSE!!!!!! <========>>>");
		yield put({
			type: AccountStateActionTypes.ACCOUNT_SYNC_SUCCESSFUL,
			account: response,
		});
	} catch (e) {
		console.log("ERRRORRRRRRR");
		yield put({
			type: AccountStateActionTypes.ACCOUNT_SYNC_ERROR,
		});
	}
}

// let accountState = yield select((state: any) => {
//     return state.account;
// });
// console.log("doing this!!!");
// const response = yield call(
//     accountService.login,
//     action.username,
//     action.password,
// );
// yield put({
//     type: AccountStateActionTypes.LOG_IN_SUCCESSFUL,
//     account: response,
// });
// //async
// //yield call

// console.log(accountState, "ACCOUNTSTATE11111");
// accountState = yield select((state: any) => {
//     return state.account;
// });
// console.log(accountState, "ACCOUNTSTATE2222");
