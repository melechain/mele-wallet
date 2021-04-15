import React, { Component } from "react";
import { Text, ScrollView, Image, StatusBar } from "react-native";
import { connect } from "react-redux";
import ApplicationState from "@mele-wallet/redux/application-state";
import {
	mapDispatchToProps,
	IActionCreators,
} from "@mele-wallet/redux/methods/map-dispatch-to-props";
import { AccountState } from "@mele-wallet/redux/reducers/account-reducer";
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
import { NoCoinsAvailable } from "./no-coins-available";
import { MeleCalculator } from "@mele-wallet/common/mele-calculator/mele-calculator";
import { Calculator } from "@mele-wallet/app/common/calculator/calculator";
import { LanguageState } from "@mele-wallet/redux/reducers/language-reducer";

interface ISendComponentProps {
	actionCreators: IActionCreators;
	accountState: AccountState;
	transactionState: TransactionState;
	languageState: LanguageState;
}

interface ISendState {
	sendAmount: string;
	toAddress: string;
	notEnoughCoins: boolean;
	formatted: number;
}

const languages = {
	en: require("../../translations/en.json"),
	ar: require("../../translations/ar.json"),
};

class SendComponent extends Component<ISendComponentProps, ISendState> {
	constructor(props: ISendComponentProps) {
		super(props);
		this.state = {
			sendAmount: "",
			toAddress: "",
			notEnoughCoins: false,
			formatted: 0,
		};
	}

	componentDidMount() {
		this.setState({
			sendAmount: "",
			toAddress: "",
			formatted: 0,
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
			formatted: 0,
		});
	};

	setFormattedCents = (e: any) => {
		const replaced = parseFloat(e.replace(",", ".").replace(" ", ""));
		this.setState({
			sendAmount: e,
			formatted: parseFloat(
				parseFloat(
					parseFloat((replaced * 100).toFixed(2).toString()).toString(),
				).toFixed(2),
			),
		});
	};

	render() {
		const localeData = languages[this.props.languageState.currentLanguage];
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
						{localeData.send.title}
					</Text>
					<Text style={[styles.initContainer]}>
						{localeData.send.description}
					</Text>
					<BaseField
						onChangeText={(e: string) => {
							const value = e;
							if (value.length > 10) {
								return;
							}
							if (value.includes(".")) {
								const digits = value.split(".");
								if (digits[1].length > 2) return;
							}

							const test = value.replace(/[^.]/g, "").length;
							if (test > 1) return;
							if (value === ".") return;

							const reg = new RegExp("^[0-9.]+$");
							if (reg.test(value) || value === "") {
								if (value === "") {
									this.setState({
										sendAmount: e,
									});
								}
								if ((e.length === 1 && parseFloat(e) > 0) || e.length > 1) {
									this.setFormattedCents(e);
								}
							}
						}}
						value={this.state.sendAmount || ""}
						placeholder={localeData.send.amount}
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
						placeholder={localeData.send.recepient}
					/>
					<Calculator
						centsAmount={
							this.state.formatted ? this.state.formatted.toString() : "0"
						}
					/>
					<BlueButton
						text={localeData.send.sendButton}
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
		languageState: state.language,
	};
};

export const Send = connect(mapStateToProps, mapDispatchToProps)(SendComponent);
