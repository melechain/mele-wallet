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
import ScanGreen from "@mele-wallet/resources/icons/scan-green.svg";
import { BlueButton } from "@mele-wallet/app/common/buttons/blue-button";

interface IScanQRCodeSuccessComponentProps {
	actionCreators: IActionCreators;
	accountState: AccountState;
}
interface IScanQRCodeSuccessComponentState {
	accountId: string;
}

const languages = {
	en: require("../../translations/en.json"),
	ar: require("../../translations/ar.json"),
};

class ScanQRCodeSuccessComponent extends Component<
	IScanQRCodeSuccessComponentProps,
	IScanQRCodeSuccessComponentState
> {
	constructor(props: IScanQRCodeSuccessComponentProps) {
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
				<View style={[styles.qrLogo]}>
					<ScanGreen style={{ height: 55, width: 55 }} />
				</View>
				<View style={[styles.successMessage]}>
					<Text style={[styles.font, commonStyles.fontBold]}>
						{localeData.qrCode.successTitle}
					</Text>
				</View>
				<View style={[styles.subSuccessMessage]}>
					<Text style={[styles.subFont]}>
						{localeData.qrCode.successDescription}
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

export const ScanQRCodeSuccess = connect(
	mapStateToProps,
	mapDispatchToProps,
)(ScanQRCodeSuccessComponent);
