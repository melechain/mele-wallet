import { Reducer, applyMiddleware, compose } from "redux";
import ApplicationState from "./application-state";
import accountReducer from "./reducers/account-reducer";
import { persistStore, persistReducer } from "redux-persist";
import createSagaMiddleware from "redux-saga";
import AsyncStorage from "@react-native-community/async-storage";
import { createStore, combineReducers } from "redux";
import { rootSaga } from "./saga";
//import MainApiService from "mele-wallet/common/api/main-api-service";
import MainApiService from "@mele-wallet/common/api/main-api-service";
import languageReducer from "@mele-wallet/redux/reducers/language-reducer";
import staticReducer from "@mele-wallet/redux/reducers/static-reducer";
import statisticsReducer from "@mele-wallet/redux/reducers/statistics-reducer";

const AccountPersistConfig = {
	key: "static",
	storage: AsyncStorage,
};

export const reducers: Reducer<ApplicationState> = combineReducers<
	ApplicationState
>({
	account: accountReducer,
	language: languageReducer,
	statistics: statisticsReducer,
	static: persistReducer(AccountPersistConfig, staticReducer) as any,
});

export const getApplicationStateStore = () => {
	const sagaMiddleware = createSagaMiddleware();

	const enhancer = compose(applyMiddleware(sagaMiddleware));
	const store = createStore(
		reducers,
		{
			...new ApplicationState(),
		},
		enhancer,
	);

	sagaMiddleware.run(rootSaga, {});
	let persister = persistStore(store);

	MainApiService.APPLICATION_STORE = store;
	return { store, persister };
};
