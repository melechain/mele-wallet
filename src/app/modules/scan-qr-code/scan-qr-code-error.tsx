import React, { Component } from "react";
import { View, Text, Alert, Dimensions } from "react-native";
import { connect } from "react-redux";
import ApplicationState from "@mele-wallet/redux/application-state";
import {
	mapDispatchToProps,
	IActionCreators,
} from "@mele-wallet/redux/methods/map-dispatch-to-props";
import { AccountState } from "@mele-wallet/redux/reducers/account-reducer";
import QRCodeScanner from "react-native-qrcode-scanner";
import { RNCamera } from "react-native-camera";
import { styles } from "./styles";
import { Actions } from "react-native-router-flux";
import { ROUTES } from "@mele-wallet/app/router/routes";
import { commonStyles } from "@mele-wallet/app/common/styles/common-styles";
import ShieldedError from "@mele-wallet/resources/icons/shielded-error.svg";
import Ripple from "react-native-material-ripple";
import { BlueButton } from "@mele-wallet/app/common/buttons/blue-button";

interface IScanQRCodeErrorComponentProps {
	actionCreators: IActionCreators;
	accountState: AccountState;
}
interface IScanQRCodeErrorComponentState {
	accountId: string;
}

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
		const QRScanner: any = QRCodeScanner;

		return (
			<View style={[styles.content, commonStyles.whiteBackground]}>
				<View style={[styles.errorQRLogo]}>
					<ShieldedError style={{ height: 55, width: 55 }} />
				</View>
				<View style={[styles.errorMessage]}>
					<Text style={[styles.font, commonStyles.fontBold]}>
						Error encountered!
					</Text>
				</View>
				<View style={[styles.subErrorMessage]}>
					<Text style={[styles.subFont]}>
						Your wallet couldn't not be synced with the account!
					</Text>
				</View>
				<BlueButton
					text="Dashboard"
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
