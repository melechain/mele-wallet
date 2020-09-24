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
import Ripple from "react-native-material-ripple";
import { Calculator } from "@mele-wallet/app/common/calculator/calculator";
import { Wallet } from "@mele-wallet/common/utils/wallet";
import { StaticState } from "@mele-wallet/redux/reducers/static-reducer";

interface IActionComponentProps {}

class ActionComponent extends Component<IActionComponentProps> {
	render() {
		return (
			<View style={[actionStyles.content]}>
				<View style={[actionStyles.actionTitleContainer]}>
					<Text style={[actionStyles.actionTitle, commonStyles.fontBook]}>
						Actions Needed
					</Text>
				</View>
				<View style={[actionStyles.actionArea]}>
					<View style={[actionStyles.eachAction]}>
						<View style={[actionStyles.actionIcon]}>
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
					</View>
					<View style={[actionStyles.eachAction]}>
						<View style={[actionStyles.actionIcon]}>
							<ShieldRed />
						</View>

						<Text style={[actionStyles.actionText, commonStyles.fontBook]}>
							Wallet Not Connected
						</Text>

						<Ripple
							rippleContainerBorderRadius={16}
							style={[actionStyles.actionButton]}
						>
							<Text style={[actionStyles.buttonTitle, commonStyles.fontBold]}>
								Scan QR
							</Text>
						</Ripple>
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

export const Action = connect(
	mapStateToProps,
	mapDispatchToProps,
)(ActionComponent);
