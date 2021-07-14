import React, { Component } from "react";
import { View, Text, ScrollView, Animated } from "react-native";
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

const languages = {
	en: require("../../translations/en.json"),
	ar: require("../../translations/ar.json"),
};

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
		const localeData =
			this.props.languageState !== undefined
				? languages[this.props.languageState.currentLanguage]
				: languages["en"];
		return (
			<ScrollView
				style={[commonStyles.blueBackground, styles.scrollView]}
				contentContainerStyle={styles.content}
			>
				<View style={styles.topContainer}>
					<Text style={[commonStyles.whiteSubHeader, styles.headerText]}>
						{localeData.pin.verify}
					</Text>
					<Text style={[commonStyles.fontBook, styles.subHeaderText]}>
						{localeData.pin.verifyDescription}
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
							if (pin == this.props.pin) {
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
		languageState: state.language,
	};
};

export const ConfirmPin = connect(
	mapStateToProps,
	mapDispatchToProps,
)(ConfirmPinComponent);
