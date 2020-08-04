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
import { getApplicationStateStore } from "../redux/application-state-store";
import { Home } from "./home/home";
import { RouterComponent } from "@mele-wallet/app/router-component";

const App = () => {
	return (
		<Provider store={getApplicationStateStore()}>
			<StatusBar barStyle="dark-content" />
			<SafeAreaView>
				<View>
					<RouterComponent />
				</View>
			</SafeAreaView>
		</Provider>
	);
};

export default App;
