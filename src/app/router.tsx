import React from "react";
import { Router, Stack, Scene, Tabs } from "react-native-router-flux";
import { Provider } from "react-redux";
import { getApplicationStateStore } from "../redux/application-state-store";
import { Test } from "./test-component/test";

export const RouterComponent = () => {
	return (
		// <Router>
		//     <Stack key="root">
		//         {/* <Scene key="register" component={Register} title="Register" />
		//         <Scene key="home" component={Home} /> */}
		//     </Stack>
		// </Router>

		<Router>
			<Tabs></Tabs>
		</Router>
	);
};
