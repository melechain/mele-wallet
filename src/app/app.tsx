import React from "react";
import {
	SafeAreaView,
	StyleSheet,
	View,
	Text,
	StatusBar,
	Button,
} from "react-native";
import { Provider } from "react-redux";
import { getApplicationStateStore } from "@mele-wallet/redux/application-state-store";
import { MainRouter } from "@mele-wallet/app/router/main-router";

const App = () => {
	return (
		<Provider store={getApplicationStateStore()}>
			<MainRouter />
		</Provider>
	);
};

export default App;
