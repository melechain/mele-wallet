import React, { Component } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import ApplicationState from "@mele-wallet/redux/application-state";
import {
	mapDispatchToProps,
	IActionCreators,
} from "@mele-wallet/redux/methods/map-dispatch-to-props";
import { AccountState } from "@mele-wallet/redux/reducers/account-reducer";
import QRCodeScanner from "react-native-qrcode-scanner";
import { styles } from "./styles";
import { Actions } from "react-native-router-flux";
import { ROUTES } from "@mele-wallet/app/router/routes";
import { commonStyles } from "@mele-wallet/app/common/styles/common-styles";
import ShieldedError from "@mele-wallet/resources/icons/shielded-error.svg";
import { BlueButton } from "@mele-wallet/app/common/buttons/blue-button";

interface IScanQRCodeErrorComponentProps {
	actionCreators: IActionCreators;
	accountState: AccountState;
}
interface IScanQRCodeErrorComponentState {
	accountId: string;
}

const languages = {
	en: require("../../translations/en.json"),
	ar: require("../../translations/ar.json"),
};

class ScanQRCodeErrorComponent extends Component<
	IScanQRCodeErrorComponentProps,
	IScanQRCodeErrorComponentState
> {
	constructor(props: IScanQRCodeErrorComponentProps) {
		super(props);
		this.state = {
			accountId: "",
		};
	}
	onSuccess = (e: any) => {
		Actions.jump(ROUTES.walletSync, {
			accountId: e.data,
		});
	};

	render() {
		const localeData =
			this.props.languageState !== undefined
				? languages[this.props.languageState.currentLanguage]
				: languages["en"];

		return (
			<View style={[styles.content, commonStyles.whiteBackground]}>
				<View style={[styles.errorQRLogo]}>
					<ShieldedError style={{ height: 55, width: 55 }} />
				</View>
				<View style={[styles.errorMessage]}>
					<Text style={[styles.font, commonStyles.fontBold]}>
						{localeData.qrCode.errorTitle}
					</Text>
				</View>
				<View style={[styles.subErrorMessage]}>
					<Text style={[styles.subFont]}>
						{localeData.qrCode.errorDescription}
					</Text>
				</View>
				<BlueButton
					text={localeData.qrCode.dashboard}
					style={[styles.button]}
					onPress={() => {
						Actions.replace(ROUTES.checkAuthentication);
					}}
				/>
			</View>
		);
	}
}

const mapStateToProps = (state: ApplicationState) => {
	return {
		accountState: state.account,
	};
};

export const ScanQRCodeError = connect(
	mapStateToProps,
	mapDispatchToProps,
)(ScanQRCodeErrorComponent);
