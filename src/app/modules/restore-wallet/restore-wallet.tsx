import React, { Component } from "react";
import { View, Text, ScrollView, Image } from "react-native";
import { connect } from "react-redux";
import ApplicationState from "@mele-wallet/redux/application-state";
import {
	mapDispatchToProps,
	IActionCreators,
} from "@mele-wallet/redux/methods/map-dispatch-to-props";
import { AccountState } from "@mele-wallet/redux/reducers/account-reducer";
import { commonStyles } from "@mele-wallet/app/common/styles/common-styles";
import { styles } from "./styles";
import WalletLogo from "@mele-wallet/resources/images/wallet-logo.svg";
import { BlueButton } from "@mele-wallet/app/common/buttons/blue-button";
import { TextField } from "@mele-wallet/app/common/fields/text-field";
import { Random } from "@mele-wallet/common/utils/random";
import { Actions } from "react-native-router-flux";
import { ROUTES } from "@mele-wallet/app/router/routes";
import { LanguageState } from "@mele-wallet/redux/reducers/language-reducer";

interface IRestoreWalletComponentProps {
	actionCreators: IActionCreators;
	accountState: AccountState;
	languageState: LanguageState;
}
interface IRestoreWalletComponentState {
	mnemonic: string;
}

const languages = {
	en: require("../../translations/en.json"),
	ar: require("../../translations/ar.json"),
};

class RestoreWalletComponent extends Component<
	IRestoreWalletComponentProps,
	IRestoreWalletComponentState
> {
	constructor(props: IRestoreWalletComponentProps) {
		super(props);
		this.state = {
			mnemonic: "",
		};
	}

	render() {
		const localeData = languages[this.props.languageState.currentLanguage];
		return (
			<ScrollView
				style={[commonStyles.whiteBackground, styles.scrollView]}
				contentContainerStyle={styles.content}
			>
				<Image
					style={{ marginTop: 70 }}
					source={require("@mele-wallet/resources/images/logo.png")}
				/>
				<Text style={[commonStyles.blackSubHeader, styles.headerText]}>
					{localeData.wallet.restoreWallet}
				</Text>
				{/* <Text style={[styles.passphrase]}>{localeData.wallet.passphrase}</Text> */}
				<View style={styles.textInputs}>
					<TextField
						autoCapitalize="none"
						key={1}
						style={styles.textInput}
						placeholder={localeData.wallet.enterPassphrase}
						onChangeText={(text: string) => {
							this.setState({
								mnemonic: text,
							});
						}}
						value={this.state.mnemonic}
					/>
				</View>
				<BlueButton
					style={styles.confirmButton}
					text={localeData.wallet.restoreWallet}
					onPress={() => {
						Actions.jump(ROUTES.nonAuthenticated.createPin, {
							mnemonic: this.state.mnemonic
								.replace(/[\[\]']+/g, "")
								.replace(/['"]+/g, "")
								.replace(/,/g, " "),
						});
					}}
				/>
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

export const RestoreWallet = connect(
	mapStateToProps,
	mapDispatchToProps,
)(RestoreWalletComponent);
