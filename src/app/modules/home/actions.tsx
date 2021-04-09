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
import { actionStyles } from "./actions-styles";
import { commonStyles } from "@mele-wallet/app/common/styles/common-styles";
import WiteInfoIcon from "@mele-wallet/resources/icons/info-white.svg";
import ScanBarcodeIcon from "@mele-wallet/resources/icons/scan-barcode.svg";
import ShieldRed from "@mele-wallet/resources/icons/shield-red.svg";
import ShieldGreen from "@mele-wallet/resources/icons/shield-green.svg";
import Ripple from "react-native-material-ripple";
import { Calculator } from "@mele-wallet/app/common/calculator/calculator";
import { Wallet } from "@mele-wallet/common/utils/wallet";
import { StaticState } from "@mele-wallet/redux/reducers/static-reducer";
import { Actions as FluxActions } from "react-native-router-flux";
import { ROUTES } from "@mele-wallet/app/router/routes";

interface IActionsComponentProps {
	staticState: StaticState;
}

class ActionsComponent extends Component<IActionsComponentProps> {
	render() {
		return (
			<View style={[actionStyles.content]}>
				<View style={[actionStyles.actionTitleContainer]}>
					<Text style={[actionStyles.actionTitle, commonStyles.fontBook]}>
						Actions Needed
					</Text>
				</View>
				<View style={[actionStyles.actionArea]}>
					{/* <View style={[actionStyles.eachAction]}>
						<View style={[actionStyles.actionIconRed]}>
							<ShieldRed style={[actionStyles.actionLogo]} />
						</View>
						<Text style={[actionStyles.actionText, commonStyles.fontBook]}>
							Identity Verification - KYC
						</Text>
						<Ripple
							rippleContainerBorderRadius={16}
							style={[actionStyles.actionButton]}
						>
							<Text style={[actionStyles.buttonTitle, commonStyles.fontBold]}>
								Verify
							</Text>
						</Ripple>
					</View> */}
					<View style={[actionStyles.eachAction]}>
						{this.props.staticState.accountId ? (
							<View style={[actionStyles.actionIconGreen]}>
								<ShieldGreen />
							</View>
						) : (
							<View style={[actionStyles.actionIconRed]}>
								<ShieldRed />
							</View>
						)}

						<Text style={[actionStyles.actionText, commonStyles.fontBook]}>
							{this.props.staticState.accountId
								? "Wallet Connected"
								: "Wallet Not Connected"}
						</Text>
						{!this.props.staticState.accountId ? (
							<Ripple
								onPress={() => {
									FluxActions.jump(ROUTES.scanQRCode);
								}}
								rippleContainerBorderRadius={16}
								style={[actionStyles.actionButton]}
							>
								<Text style={[actionStyles.buttonTitle, commonStyles.fontBold]}>
									Scan QR
								</Text>
							</Ripple>
						) : null}
					</View>
				</View>
			</View>
		);
	}
}

const mapStateToProps = (state: ApplicationState) => {
	return {
		accountState: state.account,
		staticState: state.static,
	};
};

export const Actions = connect(
	mapStateToProps,
	mapDispatchToProps,
)(ActionsComponent);
