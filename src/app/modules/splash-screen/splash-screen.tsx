import React, { Component } from "react";
import { View, Text, Image, ScrollView, Animated } from "react-native";

import { connect } from "react-redux";
import ApplicationState from "@mele-wallet/redux/application-state";
import {
	mapDispatchToProps,
	IActionCreators,
} from "@mele-wallet/redux/methods/map-dispatch-to-props";
import { commonStyles } from "@mele-wallet/app/common/styles/common-styles";
import { styles } from "./styles";
import { StaticState } from "@mele-wallet/redux/reducers/static-reducer";
import { Actions } from "react-native-router-flux";
import { ROUTES } from "@mele-wallet/app/router/routes";

interface ISplashScreenComponentProps {
	actionCreators: IActionCreators;
	staticState: StaticState;
}
interface ISplashScreenComponentState {}

class SplashScreenComponent extends Component<
	ISplashScreenComponentProps,
	ISplashScreenComponentState
> {
	constructor(props: ISplashScreenComponentProps) {
		super(props);
	}
	componentDidMount() {
		setTimeout(() => {
			if (this.props.staticState.mnemonic) {
				Actions.replace(ROUTES.nonAuthenticated.loginPin);
			} else {
				Actions.replace("nonAuthenticated");
			}
		}, 1);
	}
	render() {
		return (
			<ScrollView
				style={[commonStyles.blueBackground, styles.scrollView]}
				contentContainerStyle={styles.content}
			>
				<View style={styles.topContainer}>
					<Image source={require("@mele-wallet/resources/images/logo.png")} />
				</View>
			</ScrollView>
		);
	}
}

const mapStateToProps = (state: ApplicationState) => {
	return {
		staticState: state.static,
	};
};

export const SplashScreen = connect(
	mapStateToProps,
	mapDispatchToProps,
)(SplashScreenComponent);
