import { Reducer, applyMiddleware } from "redux";
import ApplicationState from "./application-state";
import accountReducer from "./reducers/account-reducer";
import createSagaMiddleware from "redux-saga";

import { createStore, combineReducers } from "redux";
import { rootSaga } from "./saga";

export const reducers: Reducer<ApplicationState> = combineReducers<
	ApplicationState
>({
	account: accountReducer,
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
	sagaMiddleware.run(rootSaga, undefined as any);
	return store;
};
