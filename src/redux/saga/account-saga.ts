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
import StatisticsService from "@mele-wallet/common/api/statistics-service";
import { StatisticsStateActionTypes } from "@mele-wallet/redux/reducers/statistics-reducer";

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
	} catch (e) {
		yield put({
			type: AccountStateActionTypes.WALLET_SYNC_ERROR,
		});
	}
}

function* accountSync(action: IAccountReducerAction): SagaIterator {
	try {
		const response = yield call(accountService.checkSession);
		yield put({
			type: AccountStateActionTypes.ACCOUNT_SYNC_SUCCESSFUL,
			account: response,
		});
	} catch (e) {
		yield put({
			type: AccountStateActionTypes.ACCOUNT_SYNC_ERROR,
		});
	}
}
