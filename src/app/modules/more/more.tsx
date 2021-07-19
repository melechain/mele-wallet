import React, { Component } from "react";
import { View, ScrollView, Text, StatusBar } from "react-native";
import Clipboard from "@react-native-community/clipboard";
import { connect } from "react-redux";
import ApplicationState from "@mele-wallet/redux/application-state";
import {
	mapDispatchToProps,
	IActionCreators,
} from "@mele-wallet/redux/methods/map-dispatch-to-props";
import { AccountState } from "@mele-wallet/redux/reducers/account-reducer";
import { styles } from "./styles";
import { commonStyles } from "@mele-wallet/app/common/styles/common-styles";
import CurrencyIcon from "@mele-wallet/resources/icons/currency.svg";
import RateAppIcon from "@mele-wallet/resources/icons/rate.svg";
import WalletIcon from "@mele-wallet/resources/icons/wallet.svg";
import KYCIcon from "@mele-wallet/resources/icons/kycver.svg";
import LockGreenIcon from "@mele-wallet/resources/icons/lock-green.svg";
import InfoIcon from "@mele-wallet/resources/icons/info.svg";
import ShieldBlueIcon from "@mele-wallet/resources/icons/shield-blue.svg";
import LanguageIcon from "@mele-wallet/resources/icons/language.svg";
import Ripple from "react-native-material-ripple";
import { Calculator } from "@mele-wallet/app/common/calculator/calculator";
import { Wallet } from "@mele-wallet/common/utils/wallet";
import { StaticState } from "@mele-wallet/redux/reducers/static-reducer";
import { Actions, Actions as FluxActions } from "react-native-router-flux";
import { ROUTES } from "@mele-wallet/app/router/routes";
import { LanguageState } from "./../../../redux/reducers/language-reducer";
import { CurrencyState } from "@mele-wallet/redux/reducers/currency-reducer";
import { CurrencyPicker } from "@mele-wallet/app/common/pickers/currency-picker";
import { LanguagePicker } from "@mele-wallet/app/common/pickers/language-picker";
import { Picker } from "@react-native-picker/picker";
import { Utils } from "mele-sdk";
import AsyncStorage from "@react-native-community/async-storage";

interface IMoreComponentProps {
	staticState: StaticState;
	languageState: LanguageState;
	currencyState: CurrencyState;
	actionCreators: IActionCreators;
	accountState: AccountState;
}

const languages = {
	en: require("../../translations/en.json"),
	ar: require("../../translations/ar.json"),
};

class MoreComponent extends Component<IMoreComponentProps> {
	componentDidMount() {
		this.props.actionCreators.transaction.resetPurchaseFlow;
	}

	generateMnemonic = () => {
		return Utils.generateMnemonic().split(" ").slice(0, 12);
	};

	logout = async () => {
		await AsyncStorage.clear();
		await this.props.actionCreators.wallet.logout();
		await this.props.actionCreators.transaction.logout();
		FluxActions.jump(ROUTES.nonAuthenticated.registrationOrLogin);
	};

	render() {
		const localeData = languages[this.props.languageState.currentLanguage];
		StatusBar.setBarStyle("dark-content", true);
		return (
			<ScrollView
				style={[styles.scrollView]}
				contentContainerStyle={styles.content}
			>
				{/* <View style={[styles.actionTitleContainer, { marginTop: 40 }]}>
					<Text style={[styles.actionTitle, commonStyles.fontBold]}>
						{localeData.more.title}
					</Text>
				</View> */}
				<View style={[styles.actionArea]}>
					{/* <View style={[styles.eachAction]}>
						<View style={[styles.Icon]}>
							<KYCIcon style={[styles.actionLogo]} />
						</View>
						<Text style={[styles.actionText, commonStyles.fontBook]}>
							KYC Verification
						</Text>
						<Ripple
							rippleContainerBorderRadius={16}
							style={[styles.actionButton]}
						>
							<Text style={[styles.buttonTitle, commonStyles.fontBold]}>
								Verify
							</Text>
						</Ripple>
					</View> */}
				</View>
				<View style={[styles.actionTitleContainer]}>
					<Text style={[styles.actionTitle, commonStyles.fontBold]}>
						{localeData.more.security}
					</Text>
				</View>
				<View style={[styles.actionArea]}>
					<View style={[styles.eachAction]}>
						<Ripple
							style={[styles.transparentButtonPIN]}
							onPress={() => {
								FluxActions.jump(ROUTES.authenticated.changePin, {
									mnemonic: this.generateMnemonic().join(" "),
								});
							}}
						>
							<LockGreenIcon style={[styles.actionLogo]} />
							<Text style={[styles.pinText, commonStyles.fontBook]}>
								{localeData.more.pin}
							</Text>
							<Text
								style={[
									styles.transparentButtonTitlePIN,
									commonStyles.fontBook,
								]}
							>
								{localeData.more.changePIN} &gt;
							</Text>
						</Ripple>
					</View>
					<View style={[styles.eachAction]}>
						<Ripple
							style={[styles.transparentButtonPIN]}
							onPress={() => this.logout()}
						>
							<WalletIcon style={[styles.walletLogo]} />
							<Text style={[styles.pinText, commonStyles.fontBook]}>
								{localeData.more.wallet}
							</Text>
							<Text
								style={[
									styles.transparentButtonTitlePIN,
									commonStyles.fontBook,
								]}
							>
								{localeData.more.logout} &gt;
							</Text>
						</Ripple>
					</View>
				</View>
				{/* <View style={[styles.actionTitleContainer]}>
					<Text style={[styles.actionTitle, commonStyles.fontBold]}>
						General
					</Text>
				</View>
				<View style={[styles.actionArea]}>
					<View style={[styles.eachAction]}>
						<View style={[styles.Icon]}>
							<LanguageIcon style={[styles.actionLogo]} />
						</View>
						<Text style={[styles.actionText, commonStyles.fontBook]}>
							Language
						</Text>
						<LanguagePicker />
					</View>
					<View style={[styles.eachAction]}>
						<View style={[styles.Icon]}>
							<CurrencyIcon style={[styles.actionLogo]} />
						</View>
						<Text style={[styles.actionText, commonStyles.fontBook]}>
							Currency
						</Text>
						<CurrencyPicker />
					</View>
					<View style={[styles.eachAction]}>
						<View style={[styles.Icon]}>
							<ShieldBlueIcon style={[styles.actionLogo]} />
						</View>
						<Text style={[styles.actionText, commonStyles.fontBook]}>
							Terms &amp; Conditions
						</Text>
						<Ripple style={[styles.transparentButton]}
							onPress={() => {
								FluxActions.jump(ROUTES.terms);
							}}
						>
							<Text
								style={[styles.transparentButtonTitle, commonStyles.fontBook]}
							>
								&gt;
							</Text>
						</Ripple>
					</View>
					<View style={[styles.eachAction]}>
						<View style={[styles.Icon]}>
							<InfoIcon style={[styles.actionLogo]} />
						</View>
						<Text style={[styles.actionText, commonStyles.fontBook]}>
							About MELC
						</Text>
						<Ripple style={[styles.transparentButton]}
							onPress={() => {
								FluxActions.jump(ROUTES.about);
							}}
						>
							<Text
								style={[styles.transparentButtonTitle, commonStyles.fontBook]}
							>
								&gt;
							</Text>
						</Ripple>
					</View>
					<View style={[styles.eachAction]}>
						<View style={[styles.Icon]}>
							<RateAppIcon style={[styles.actionLogo]} />
						</View>
						<Text style={[styles.actionText, commonStyles.fontBook]}>
							Rate the app
						</Text>
						<Ripple
							rippleContainerBorderRadius={16}
							style={[styles.transparentButton]}
						>
							<Text style={[styles.transparentButtonTitle, commonStyles.fontBold]}>
								&gt;
							</Text>
						</Ripple>
					</View>
				</View> */}
			</ScrollView>
		);
	}
}

const mapStateToProps = (state: ApplicationState) => {
	return {
		accountState: state.account,
		staticState: state.static,
		languageState: state.language,
		currencyState: state.currency,
	};
};

export const More = connect(mapStateToProps, mapDispatchToProps)(MoreComponent);
