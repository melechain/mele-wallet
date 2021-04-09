import React, { Component } from "react";
import { Button, View, Text, ScrollView, Image, StatusBar } from "react-native";
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
import { MeleCalculator } from "@mele-wallet/common/mele-calculator/mele-calculator";
import { Calculator } from "@mele-wallet/app/common/calculator/calculator";

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
		const replaced = parseFloat(
			this.state.sendAmount.replace(",", ".").replace(" ", ""),
		);
		if (
			this.props.accountState.account?.balance === undefined ||
			parseFloat(
				MeleCalculator.centsToUSD(this.props.accountState.account?.balance),
			) < parseFloat(this.state.sendAmount)
		) {
			this.props.actionCreators.transaction.notEnoughCoins();
		} else {
			this.props.actionCreators.transaction.transactionSend(
				this.state.toAddress,
				parseFloat(
					parseFloat(
						parseFloat((replaced * 100).toFixed(2).toString()).toString(),
					).toFixed(2),
				),
			);
		}
		this.setState({
			sendAmount: "",
			toAddress: "",
		});
	};

	render() {
		StatusBar.setBarStyle("dark-content", true);
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
					<Image source={require("@mele-wallet/resources/images/logo.png")} />
					<Text style={[styles.initTitle, commonStyles.blackHeader]}>
						Send coins
					</Text>
					<Text style={[styles.initContainer]}>
						Send coins to your friends and family
					</Text>
					<BaseField
						onChangeText={(e: string) => {
							const value = e;
							if (value.length > 10) {
								return;
							}

							const reg = new RegExp("^[0-9.]+$");
							if (reg.test(value) || value === "") {
								if (e.length === 1 && parseFloat(e) > 0) {
									this.setState({
										sendAmount: e,
									});
								} else if (e.length > 1) {
									this.setState({
										sendAmount: e,
									});
								} else if (value === "") {
									this.setState({
										sendAmount: e,
									});
								}
							}
						}}
						value={this.state.sendAmount || ""}
						placeholder="Enter amount"
						iconRight={<Text>USD</Text>}
					/>
					<BaseField
						onChangeText={(e: string) => {
							this.setState({
								toAddress: e,
							});
						}}
						value={this.state.toAddress || ""}
						style={[styles.sendFields, { paddingTop: 10 }]}
						placeholder="Enter Recepient Address"
					/>
					<Calculator
						centsAmount={
							this.state.sendAmount
								? (parseFloat(this.state.sendAmount) * 100).toString()
								: "0"
						}
					/>
					<BlueButton
						text="Send Coins"
						onPress={() => {
							this.sendCoins();
						}}
						disabled={
							this.state.toAddress === "" ||
							this.state.toAddress.length < 43 ||
							this.state.sendAmount === "" ||
							parseFloat(this.state.sendAmount) < 0.000001
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
