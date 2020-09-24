import React, { Component } from "react";
import { Button, View, ActivityIndicator, Text, Alert } from "react-native";
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
import {
	AccountState,
	AccountSyncStatus,
} from "@mele-wallet/redux/reducers/account-reducer";

interface ICheckAuthenticationComponentProps {
	actionCreators: IActionCreators;
	accountState: AccountState;
	staticState: StaticState;
}
interface ICheckAuthenticationComponentStore {
	authCheckStarted: boolean;
}

class CheckAuthenticationComponent extends Component<
	ICheckAuthenticationComponentProps,
	ICheckAuthenticationComponentStore
> {
	constructor(props: ICheckAuthenticationComponentProps) {
		super(props);
		this.state = {
			authCheckStarted: false,
		};
	}

	componentDidMount() {
		this.props.actionCreators.account.accountSyncReset();
	}
	componentDidUpdate() {
		this.checkWallet();
	}

	checkWallet = () => {
		if (this.props.staticState.mnemonic && this.props.staticState.accountId) {
			// this means that we have already synced the wallet address
			if (
				this.props.accountState.accountSyncStatus ==
				AccountSyncStatus.NOT_STARTED
			) {
				this.props.actionCreators.account.accountSync();
			}
			if (
				this.props.accountState.accountSyncStatus ==
					AccountSyncStatus.SUCCESS ||
				this.props.accountState.accountSyncStatus == AccountSyncStatus.ERROR
			) {
				Actions.reset("authenticated");
			}
		} else if (this.props.staticState.mnemonic && this.props.staticState.pin) {
			Actions.reset("authenticated");
		}
	};

	render() {
		return (
			<View style={[styles.content, commonStyles.blueBackground]}>
				<ActivityIndicator size="large" color="#F4BD00" />
				<Text style={[styles.displayText, commonStyles.fontBook]}>
					Tickling the backend...
				</Text>
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

export const CheckAuthentication = connect(
	mapStateToProps,
	mapDispatchToProps,
)(CheckAuthenticationComponent);
