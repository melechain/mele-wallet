import React, { Component } from "react";
import { View, Dimensions, Linking } from "react-native";
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
import Dialog from "react-native-dialog";
import { LanguageState } from "@mele-wallet/redux/reducers/language-reducer";

interface IScanQRCodeComponentProps {
	actionCreators: IActionCreators;
	accountState: AccountState;
	languageState: LanguageState;
}
interface IScanQRCodeComponentState {
	accountId: string;
}

const languages = {
	en: require("../../translations/en.json"),
	ar: require("../../translations/ar.json"),
};

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
		const localeData =
			this.props.languageState !== undefined
				? languages[this.props.languageState.currentLanguage]
				: languages["en"];
		const QRScanner: any = QRCodeScanner;
		return (
			<View style={[styles.content, commonStyles.blueBackground]}>
				<QRScanner
					fadeIn={false}
					containerStyle={[styles.containerStyle]}
					cameraStyle={{
						height: Dimensions.get("window").height,
					}}
					topViewStyle={styles.topViewStyle}
					bottomViewStyle={styles.bottomViewStyle}
					onRead={this.onSuccess}
					flashMode={RNCamera.Constants.FlashMode.off}
					permissionDialogTitle={localeData.qrCode.title}
					permissionDialogMessage={localeData.qrCode.description}
					notAuthorizedView={
						<View>
							<Dialog.Container visible={true}>
								<Dialog.Title>{localeData.qrCode.title}</Dialog.Title>
								<Dialog.Description>
									{localeData.qrCode.description}
								</Dialog.Description>
								<Dialog.Button
									onPress={() => {
										Linking.openSettings();
									}}
									label={localeData.qrCode.settings}
								/>
								<Dialog.Button
									onPress={() => {
										Actions.pop();
									}}
									label={localeData.qrCode.back}
								/>
							</Dialog.Container>
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
		languageState: state.language,
	};
};

export const ScanQRCode = connect(
	mapStateToProps,
	mapDispatchToProps,
)(ScanQRCodeComponent);
