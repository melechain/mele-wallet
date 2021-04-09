import React, { Component } from "react";
import { Button, View, Text, Image } from "react-native";
import { connect } from "react-redux";
import ApplicationState from "@mele-wallet/redux/application-state";
import {
	mapDispatchToProps,
	IActionCreators,
} from "@mele-wallet/redux/methods/map-dispatch-to-props";
import { AccountState } from "@mele-wallet/redux/reducers/account-reducer";
import { styles } from "./styles";
import { commonStyles } from "@mele-wallet/app/common/styles/common-styles";
import { YellowButton } from "@mele-wallet/app/common/buttons/yellow-button";
import { BlueButton } from "@mele-wallet/app/common/buttons/blue-button";
import { Actions } from "react-native-router-flux";
import { ROUTES } from "@mele-wallet/app/router/routes";

interface IRegistrationOrLoginComponentProps {
	actionCreators: IActionCreators;
	accountState: AccountState;
}

class RegistrationOrLoginComponent extends Component<
	IRegistrationOrLoginComponentProps
> {
	render() {
		return (
			<View style={[commonStyles.blueBackground, styles.content]}>
				<View style={styles.topContainer}>
					<Image source={require("@mele-wallet/resources/images/logo.png")} />
					<Text style={[commonStyles.whiteHeader, styles.headerText]}>
						Your Secure Mele Wallet
					</Text>
				</View>
				<View style={styles.buttonContainer}>
					{/* <YellowButton
						text="Have a wallet?"
						onPress={() => {
							Actions.jump(ROUTES.nonAuthenticated.loginPinFirstTime);
						}}
					/> */}
					<BlueButton
						onPress={() => {
							Actions.jump(ROUTES.nonAuthenticated.createWallet);
						}}
						style={styles.createWalletButton}
						text="Create a New Wallet"
					/>
				</View>
			</View>
		);
	}
}

const mapStateToProps = (state: ApplicationState) => {
	return {
		accountState: state.account,
	};
};

export const RegistrationOrLogin = connect(
	mapStateToProps,
	mapDispatchToProps,
)(RegistrationOrLoginComponent);
