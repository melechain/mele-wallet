import React, { Component } from "react";
import { Button, View, Text, ScrollView, Image } from "react-native";
import { connect } from "react-redux";
import ApplicationState from "@mele-wallet/redux/application-state";
import {
	mapDispatchToProps,
	IActionCreators,
} from "@mele-wallet/redux/methods/map-dispatch-to-props";
import {
	AccountState,
	WalletSyncStatus,
} from "@mele-wallet/redux/reducers/account-reducer";
import { styles } from "./styles";
import {
	TransactionState,
	TransactionStatus,
} from "@mele-wallet/redux/reducers/transaction-reducer";
import { BaseField } from "@mele-wallet/app/common/fields/base-field";
import { commonStyles } from "./../../common/styles/common-styles";
import { BlueButton } from "@mele-wallet/app/common/buttons/blue-button";
import { SendSuccess } from "./send-success";
import { SendNoCoins } from "./send-no-coins";
import { SendError } from "./send-error";
import ShieldGreenIcon from "@mele-wallet/resources/icons/shield-green.svg";
import { NoCoinsAvailable } from "./no-coins-available";
import { Actions } from "react-native-router-flux";
import { ROUTES } from "@mele-wallet/app/router/routes";

interface ISendComponentProps {
	actionCreators: IActionCreators;
	accountState: AccountState;
	transactionState: TransactionState;
}

interface ISendState {
	sendAmount: string;
	toAddress: string;
	notEnoughCoins: boolean;
}

class SendComponent extends Component<ISendComponentProps, ISendState> {
	constructor(props: ISendComponentProps) {
		super(props);
		this.state = {
			sendAmount: "",
			toAddress: "",
			notEnoughCoins: false,
		};
	}

	componentDidMount() {
		this.setState({
			sendAmount: "",
			toAddress: "",
		});
	}

	sendCoins = () => {
		if (
			this.props.accountState.account?.balance === undefined ||
			parseFloat(this.props.accountState.account?.balance) <
				parseFloat(this.state.sendAmount)
		) {
			this.props.actionCreators.transaction.notEnoughCoins();
		} else {
			this.props.actionCreators.transaction.transactionSend(
				this.state.toAddress,
				parseFloat(this.state.sendAmount),
			);
		}
		this.setState({
			sendAmount: "",
			toAddress: "",
		});
	};

	render() {
		if (
			this.props.transactionState.transactionStatus === TransactionStatus.ERROR
		) {
			return <SendError />;
		} else if (
			this.props.transactionState.transactionStatus ===
			TransactionStatus.NOT_ENOUGH_COINS_SEND
		) {
			return <SendNoCoins />;
		} else if (
			this.props.accountState.account?.balance === undefined ||
			parseFloat(this.props.accountState.account?.balance) === 0
		)
			return <NoCoinsAvailable />;
		else if (
			this.props.transactionState.transactionStatus !==
			TransactionStatus.SUCCESS
		) {
			return (
				<ScrollView
					style={[styles.scrollView]}
					contentContainerStyle={styles.content}
				>
					<View style={[styles.recepientContainer]}>
						<View style={[styles.successSmallIconContainer]}>
							<ShieldGreenIcon width={10} height={10} />
						</View>
						<Text style={[styles.initSendTitle]}>PASTE RECEPIENT ADDRESS</Text>
					</View>
					<BaseField
						onChangeText={(e: string) => {
							this.setState({
								toAddress: e,
							});
						}}
						value={this.state.toAddress || ""}
						style={[styles.sendFields]}
					/>
					<BaseField
						onChangeText={(e: string) => {
							const value = e;
							if (value.length > 10) {
								return;
							}
							const reg = new RegExp("^[0-9]+$");

							if (reg.test(value) || value === "") {
								this.setState({
									sendAmount: e,
								});
							}
						}}
						value={this.state.sendAmount || ""}
						placeholder="Amount"
						iconRight={<Text>MELC</Text>}
					/>
					<BlueButton
						text="Send Allocated Coins"
						onPress={() => {
							this.sendCoins();
						}}
						disabled={
							this.state.toAddress === "" ||
							this.state.toAddress.length < 43 ||
							this.state.sendAmount === "" ||
							parseFloat(this.state.sendAmount) <= 0
						}
						style={styles.purchaseCoins}
						textStyle={styles.noTransactionsContainerButtonText}
					/>
				</ScrollView>
			);
		} else if (
			this.props.transactionState.transactionStatus ===
			TransactionStatus.SUCCESS
		) {
			return <SendSuccess />;
		}
	}
}

const mapStateToProps = (state: ApplicationState) => {
	return {
		accountState: state.account,
		transactionState: state.transaction,
	};
};

export const Send = connect(mapStateToProps, mapDispatchToProps)(SendComponent);
