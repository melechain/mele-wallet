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
import Ripple from "react-native-material-ripple";
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
		const QRScanner: any = QRCodeScanner;

		return (
			<View style={[styles.content, commonStyles.whiteBackground]}>
				<View style={[styles.qrLogo]}>
					<ScanGreen style={{ height: 55, width: 55 }} />
				</View>
				<View style={[styles.successMessage]}>
					<Text style={[styles.font, commonStyles.fontBold]}>
						Your account has
					</Text>
					<Text style={[styles.font, commonStyles.fontBold]}>been synced!</Text>
				</View>
				<View style={[styles.subSuccessMessage]}>
					<Text style={[styles.subFont]}>
						Your account has been successfully synced!
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

export const ScanQRCodeSuccess = connect(
	mapStateToProps,
	mapDispatchToProps,
)(ScanQRCodeSuccessComponent);
