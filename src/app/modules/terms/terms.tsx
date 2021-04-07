import React, { Component } from "react";
import { View, ScrollView, Text } from "react-native";
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
import { Actions as FluxActions } from "react-native-router-flux";
import { ROUTES } from "@mele-wallet/app/router/routes";
import { LanguageState } from "./../../../redux/reducers/language-reducer";
import { CurrencyState } from "@mele-wallet/redux/reducers/currency-reducer";
import { CurrencyPicker } from "@mele-wallet/app/common/pickers/currency-picker";
import { LanguagePicker } from "@mele-wallet/app/common/pickers/language-picker";
import { Picker } from "@react-native-picker/picker";
import { Utils } from "mele-sdk";

interface ITermsComponentProps {
	staticState: StaticState;
	languageState: LanguageState;
	currencyState: CurrencyState;
}

class TermsComponent extends Component<ITermsComponentProps> {
	render() {
		return (
			<ScrollView
				style={[styles.scrollView]}
				contentContainerStyle={styles.content}
			>
				<View style={[styles.termsTitleContainer]}>
					<Text style={[styles.termsTitle, commonStyles.fontBold]}>
						Terms &amp; Conditions
					</Text>
				</View>
				<View style={[styles.termsArea]}>
					<Text>Terms</Text>
				</View>
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

export const Terms = connect(
	mapStateToProps,
	mapDispatchToProps,
)(TermsComponent);
