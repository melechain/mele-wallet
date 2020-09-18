import {
	StaticStateActionTypes,
	IStaticReducerAction,
} from "../reducers/static-reducer";
import { put, call, takeEvery, takeLatest, select } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";
import { Actions } from "react-native-router-flux";
import { ROUTES } from "@mele-wallet/app/router/routes";

export const staticSaga = function* handleMessage(params: any): SagaIterator {
	yield takeLatest(
		StaticStateActionTypes.SET_MNEMONIC_AND_PIN,
		redirectToLogin,
	);
};

function* redirectToLogin(action: IStaticReducerAction): SagaIterator {
	Actions.jump(ROUTES.checkAuthentication);
}
