import React, { Component } from "react";
import { Button, View, ActivityIndicator, Text } from "react-native";
import { connect } from "react-redux";
import ApplicationState from "@mele-wallet/redux/application-state";
import {
	mapDispatchToProps,
	IActionCreators,
} from "@mele-wallet/redux/methods/map-dispatch-to-props";
import { styles } from "./styles";
import { commonStyles } from "@mele-wallet/app/common/styles/common-styles";
import { StaticState } from "@mele-wallet/redux/reducers/static-reducer";
import { Actions } from "react-native-router-flux";
import { Wallet } from "@mele-wallet/common/utils/wallet";
import { ROUTES } from "@mele-wallet/app/router/routes";
import {
	AccountState,
	AccountSyncStatus,
	WalletSyncStatus,
} from "@mele-wallet/redux/reducers/account-reducer";

interface IWalletSyncComponentProps {
	actionCreators: IActionCreators;
	staticState: StaticState;
	accountState: AccountState;
	accountId: string;
}

class WalletSyncComponent extends Component<IWalletSyncComponentProps> {
	componentDidMount() {
		setTimeout(() => {
			if (!this.props.accountId) {
				Actions.replace(ROUTES.authenticated.home);
			}
			const wallet = new Wallet(this.props.staticState.mnemonic);
			this.props.actionCreators.account.walletSync(
				this.props.accountId,
				wallet.getAddress(),
			);
			// if (this.props.accountState.account) {
			//     Actions.replace(ROUTES.authenticated.home);
			// }
		}, 1);
	}

	componentDidUpdate(prevProps: IWalletSyncComponentProps) {
		if (this.props.accountState.walletSyncStatus === WalletSyncStatus.ERROR) {
			Actions.replace(ROUTES.scanQRCodeError);
		}
		if (this.props.accountState.walletSyncStatus === WalletSyncStatus.SUCCESS) {
			Actions.replace(ROUTES.scanQRCodeSuccess);
		}
	}

	render() {
		return (
			<View style={[styles.content, commonStyles.blueBackground]}>
				<ActivityIndicator size="large" color="#F4BD00" />
				<Text style={[styles.displayText, commonStyles.fontBook]}>
					Tickling the backend...
				</Text>
				<Text style={[styles.displayText, commonStyles.fontBook]}></Text>
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

export const WalletSync = connect(
	mapStateToProps,
	mapDispatchToProps,
)(WalletSyncComponent);
