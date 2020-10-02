import React from "react";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { getApplicationStateStore } from "@mele-wallet/redux/application-state-store";
import { MainRouter } from "@mele-wallet/app/router/main-router";
import { AppState, AppStateStatus } from "react-native";
import { Actions } from "react-native-router-flux";
import { ROUTES } from "@mele-wallet/app/router/routes";

const { store, persister } = getApplicationStateStore();

interface IAppProps {}
interface IAppStore {}

class App extends React.PureComponent<IAppProps, IAppStore> {
	constructor(props: IAppProps) {
		super(props);
		this.state = {};
	}
	private wentToBackgroundTimestamp: number = 0;

	componentDidMount() {
		AppState.addEventListener("change", this.handleAppStateChange);

		return () => {
			AppState.removeEventListener("change", this.handleAppStateChange);
		};
	}

	handleAppStateChange = (appStateStatus: AppStateStatus) => {
		console.log(appStateStatus, this.wentToBackgroundTimestamp);
		if (appStateStatus === "active") {
			if (
				this.wentToBackgroundTimestamp != 0 &&
				this.wentToBackgroundTimestamp + 30000 < Date.now()
			) {
				this.wentToBackgroundTimestamp = 0;
				Actions.replace(ROUTES.nonAuthenticated.loginPin);
			} else {
				this.wentToBackgroundTimestamp = 0;
			}
		} else if (
			appStateStatus === "background" &&
			this.wentToBackgroundTimestamp == 0
		) {
			this.wentToBackgroundTimestamp = Date.now();
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
