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
import { LanguageState } from "@mele-wallet/redux/reducers/language-reducer";

interface IRegistrationOrLoginComponentProps {
	actionCreators: IActionCreators;
	accountState: AccountState;
	languageState: LanguageState;
}

const languages = {
	en: require("../../translations/en.json"),
	ar: require("../../translations/ar.json"),
};

class RegistrationOrLoginComponent extends Component<IRegistrationOrLoginComponentProps> {
	render() {
		const localeData =
			this.props.languageState !== undefined
				? languages[this.props.languageState.currentLanguage]
				: languages["en"];
		return (
			<View style={[commonStyles.blueBackground, styles.content]}>
				<View style={styles.topContainer}>
					<Image source={require("@mele-wallet/resources/images/logo.png")} />
					<Text style={[commonStyles.whiteHeader, styles.headerText]}>
						{localeData.wallet.loginTitle}
					</Text>
				</View>
				<View style={styles.buttonContainer}>
					<YellowButton
						text={localeData.wallet.restoreWallet}
						onPress={() => {
							Actions.jump(ROUTES.nonAuthenticated.restoreWallet);
						}}
					/>
					<BlueButton
						onPress={() => {
							Actions.jump(ROUTES.nonAuthenticated.createWallet);
						}}
						style={styles.createWalletButton}
						text={localeData.wallet.createANewWallet}
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
