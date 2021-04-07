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
import Clipboard from "@react-native-community/clipboard";
import { connect } from "react-redux";
import ApplicationState from "@mele-wallet/redux/application-state";
import {
	mapDispatchToProps,
	IActionCreators,
} from "@mele-wallet/redux/methods/map-dispatch-to-props";
import { AccountState } from "@mele-wallet/redux/reducers/account-reducer";
import { commonStyles } from "@mele-wallet/app/common/styles/common-styles";
import { styles } from "./styles";
import { Pin } from "@mele-wallet/app/common/pin-component/pin-component";
import { Actions } from "react-native-router-flux";
import { ROUTES } from "@mele-wallet/app/router/routes";

interface IConfirmPinComponentProps {
	actionCreators: IActionCreators;
	accountState: AccountState;
	mnemonic: string;
	pin: string;
	accountId?: string;
}
interface IConfirmPinComponentState {
	pinConfirmation: string;
}

class ConfirmPinComponent extends Component<
	IConfirmPinComponentProps,
	IConfirmPinComponentState
> {
	constructor(props: IConfirmPinComponentProps) {
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
					<Text style={[commonStyles.whiteSubHeader, styles.headerText]}>
						Verify PIN
					</Text>
					<Text style={[commonStyles.fontBook, styles.subHeaderText]}>
						Re-enter your PIN please.
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
							if (
								pin === this.props.pin &&
								this.props.accountId !== undefined
							) {
								console.log("update!");
								this.props.actionCreators.static.updatePin(pin);
								Actions.jump(ROUTES.authenticated.home);
							} else if (pin == this.props.pin) {
								this.props.actionCreators.static.setMnemonicAndPin(
									this.props.mnemonic,
									pin,
								);
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
		accountState: state.account,
	};
};

export const ConfirmPin = connect(
	mapStateToProps,
	mapDispatchToProps,
)(ConfirmPinComponent);
