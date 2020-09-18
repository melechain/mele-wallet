import React, { Component } from "react";
import { View, Text, ScrollView, StatusBar } from "react-native";
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
import WiteInfoIcon from "@mele-wallet/resources/icons/info-white.svg";
import ScanBarcodeIcon from "@mele-wallet/resources/icons/scan-barcode.svg";
import CopyIcon from "@mele-wallet/resources/icons/copy.svg";
import Ripple from "react-native-material-ripple";
import { Calculator } from "@mele-wallet/app/common/calculator/calculator";
import { Wallet } from "@mele-wallet/app/common/utils/wallet";
import { StaticState } from "@mele-wallet/redux/reducers/static-reducer";
import { Action } from "@mele-wallet/app/modules/home/actions";

interface IHomeComponentProps {
	actionCreators: IActionCreators;
	accountState: AccountState;
	staticState: StaticState;
}

class HomeComponent extends Component<IHomeComponentProps> {
	render() {
		const wallet = new Wallet(this.props.staticState.mnemonic);
		return (
			<ScrollView
				style={[styles.scrollView]}
				contentContainerStyle={styles.content}
			>
				<StatusBar barStyle="light-content" />
				<View style={[styles.header, commonStyles.blueBackground]}>
					<View style={[styles.balanceHeader]}>
						<View style={[styles.titleContainer]}>
							<Text style={[styles.title, commonStyles.fontBold]}>Balance</Text>
							<View style={[styles.balanceContainer]}>
								<Text style={[commonStyles.whiteHeader, styles.balance]}>
									$0,00
								</Text>
								<WiteInfoIcon style={styles.infoIcon} />
							</View>
						</View>
						<View style={[styles.barcodeIconContainer]}>
							<Ripple
								style={[styles.barcodeIcon]}
								rippleContainerBorderRadius={30}
							>
								<ScanBarcodeIcon />
							</Ripple>
						</View>
					</View>
					<Calculator centsAmount={5000} style={[styles.calculator]} />
					<Ripple
						style={[styles.walletAddressContainer]}
						onPress={() => {
							Clipboard.setString(wallet.getAddress());
						}}
					>
						<Text
							style={[styles.walletAddress, commonStyles.fontBook]}
							adjustsFontSizeToFit={true}
							numberOfLines={1}
						>
							{wallet.getAddress()}
						</Text>
						<CopyIcon style={[styles.walletCopy]} />
					</Ripple>
				</View>
				<View style={[styles.actions]}>
					<Action />
				</View>
			</ScrollView>
		);
	}
}

const mapStateToProps = (state: ApplicationState) => {
	return {
		accountState: state.account,
		staticState: state.static,
	};
};

export const Home = connect(mapStateToProps, mapDispatchToProps)(HomeComponent);
