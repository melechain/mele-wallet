import { Reducer, applyMiddleware } from "redux";
import ApplicationState from "./application-state";
import accountReducer from "./reducers/account-reducer";
import createSagaMiddleware from "redux-saga";

import { createStore, combineReducers } from "redux";
import { rootSaga } from "./saga";
//import MainApiService from "mele-wallet/common/api/main-api-service";
import MainApiService from "@mele-wallet/common/api/main-api-service";
import languageReducer from "@mele-wallet/redux/reducers/language-reducer";
export const reducers: Reducer<ApplicationState> = combineReducers<
	ApplicationState
>({
	account: accountReducer,
	language: languageReducer,
});

export const getApplicationStateStore = () => {
	const sagaMiddleware = createSagaMiddleware();
	const store = createStore(
		reducers,
		{
			...new ApplicationState(),
		},
		applyMiddleware(sagaMiddleware),
	);
	MainApiService.APPLICATION_STORE = store;
	sagaMiddleware.run(rootSaga, undefined as any);
	return store;
};
