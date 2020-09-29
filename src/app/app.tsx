import React from "react";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { getApplicationStateStore } from "@mele-wallet/redux/application-state-store";
import { MainRouter } from "@mele-wallet/app/router/main-router";
import { AppState, AppStateStatus } from "react-native";
import { Actions } from "react-native-router-flux";

const { store, persister } = getApplicationStateStore();

class App extends React.PureComponent {
	componentDidMount() {
		AppState.addEventListener("change", this.handleAppStateChange);

		return () => {
			AppState.removeEventListener("change", this.handleAppStateChange);
		};
	}
	handleAppStateChange = (appStateStatus: AppStateStatus) => {
		if (appStateStatus === "background") {
			Actions.replace("nonAuthenticated");
		}
	};

	render() {
		return (
			<Provider store={store}>
				<PersistGate loading={null} persistor={persister}>
					<MainRouter />
				</PersistGate>
			</Provider>
		);
	}
}

export default App;
