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
import { Test } from "./test-component/test";

const App = () => {
	return (
		<Provider store={getApplicationStateStore()}>
			<StatusBar barStyle="dark-content" />
			<SafeAreaView>
				<View>
					<Test />
				</View>
			</SafeAreaView>
		</Provider>
	);
};

export default App;
