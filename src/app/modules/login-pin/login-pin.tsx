import React, { Component } from "react";
import {
	Button,
	View,
	Text,
	Image,
	Switch,
	ScrollView,
	Alert,
	Animated,
} from "react-native";

import { connect } from "react-redux";
import ApplicationState from "@mele-wallet/redux/application-state";
import {
	mapDispatchToProps,
	IActionCreators,
} from "@mele-wallet/redux/methods/map-dispatch-to-props";
import { commonStyles } from "@mele-wallet/app/common/styles/common-styles";
import { styles } from "./styles";
import { Pin } from "@mele-wallet/app/common/pin-component/pin-component";
import { StaticState } from "@mele-wallet/redux/reducers/static-reducer";
import { ROUTES } from "@mele-wallet/app/router/routes";
import { Actions } from "react-native-router-flux";

interface ILoginPinComponentProps {
	actionCreators: IActionCreators;
	staticState: StaticState;
}
interface ILoginPinComponentState {
	pinConfirmation: string;
}

class LoginPinComponent extends Component<
	ILoginPinComponentProps,
	ILoginPinComponentState
> {
	constructor(props: ILoginPinComponentProps) {
		super(props);
		this.state = {
			pinConfirmation: "",
		};
		this.shakeAnimation = new Animated.Value(0);
	}
	shakeAnimation: any;

	startShake = () => {
		Animated.sequence([
			Animated.timing(this.shakeAnimation, {
				toValue: 10,
				duration: 30,
				useNativeDriver: true,
			}),
			Animated.timing(this.shakeAnimation, {
				toValue: -10,
				duration: 30,
				useNativeDriver: true,
			}),
			Animated.timing(this.shakeAnimation, {
				toValue: 10,
				duration: 30,
				useNativeDriver: true,
			}),
			Animated.timing(this.shakeAnimation, {
				toValue: -10,
				duration: 30,
				useNativeDriver: true,
			}),
			Animated.timing(this.shakeAnimation, {
				toValue: 10,
				duration: 30,
				useNativeDriver: true,
			}),
			Animated.timing(this.shakeAnimation, {
				toValue: -10,
				duration: 30,
				useNativeDriver: true,
			}),
			Animated.timing(this.shakeAnimation, {
				toValue: 10,
				duration: 30,
				useNativeDriver: true,
			}),
			Animated.timing(this.shakeAnimation, {
				toValue: 0,
				duration: 30,
				useNativeDriver: true,
			}),
		]).start();
	};
	render() {
		return (
			<ScrollView
				style={[commonStyles.blueBackground, styles.scrollView]}
				contentContainerStyle={styles.content}
			>
				<View style={styles.topContainer}>
					<Image source={require("@mele-wallet/resources/images/logo.png")} />

					<Text style={[commonStyles.whiteSubHeader, styles.headerText]}>
						Enter your PIN
					</Text>
				</View>
				<Animated.View
					style={{ transform: [{ translateX: this.shakeAnimation }] }}
				>
					<Pin
						pin={this.state.pinConfirmation}
						onPinChange={(pin: string) => {
							this.setState({
								pinConfirmation: pin,
							});
						}}
						onPinReady={(pin: string) => {
							if (pin == this.props.staticState.pin) {
								Actions.jump(ROUTES.checkAuthentication);
							} else {
								this.startShake();
								this.setState({
									pinConfirmation: "",
								});
							}
						}}
						style={styles.pinContainer}
					/>
				</Animated.View>
			</ScrollView>
		);
	}
}

const mapStateToProps = (state: ApplicationState) => {
	return {
		staticState: state.static,
	};
};

export const LoginPin = connect(
	mapStateToProps,
	mapDispatchToProps,
)(LoginPinComponent);
