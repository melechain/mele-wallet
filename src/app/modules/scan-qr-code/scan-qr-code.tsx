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

interface IScanQRCodeComponentProps {
	actionCreators: IActionCreators;
	accountState: AccountState;
}
interface IScanQRCodeComponentState {
	accountId: string;
}

class ScanQRCodeComponent extends Component<
	IScanQRCodeComponentProps,
	IScanQRCodeComponentState
> {
	constructor(props: IScanQRCodeComponentProps) {
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
			<View style={[styles.content, commonStyles.blueBackground]}>
				<QRScanner
					containerStyle={styles.containerStyle}
					cameraStyle={{
						height: Dimensions.get("window").height,
					}}
					topViewStyle={styles.topViewStyle}
					bottomViewStyle={styles.bottomViewStyle}
					onRead={this.onSuccess}
					flashMode={RNCamera.Constants.FlashMode.off}
					notAuthorizedView={
						<View>
							<Text>Please allow Camera!</Text>
						</View>
					}
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

export const ScanQRCode = connect(
	mapStateToProps,
	mapDispatchToProps,
)(ScanQRCodeComponent);
