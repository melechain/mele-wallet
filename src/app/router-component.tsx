import React from "react";
import { Router, Scene } from "react-native-router-flux";
import { Home } from "@mele-wallet/app/home/home";
import { Buy } from "@mele-wallet/app/buy/buy";

export class RouterComponent extends React.Component {
	render() {
		return (
			<Router>
				<Scene key="root">
					<Scene component={Home} title="Home" key="Home" />
					<Scene component={Buy} title="Buy" key="Buy" />
				</Scene>
			</Router>
		);
	}
}
