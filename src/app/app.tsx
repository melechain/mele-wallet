import React from "react";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { getApplicationStateStore } from "@mele-wallet/redux/application-state-store";
import { MainRouter } from "@mele-wallet/app/router/main-router";
const { store, persister } = getApplicationStateStore();

const App = () => {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persister}>
				<MainRouter />
			</PersistGate>
		</Provider>
	);
};

export default App;
