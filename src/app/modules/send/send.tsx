import React, { Component } from "react";
import {
	Text,
	ScrollView,
	Image,
	StatusBar,
	ActivityIndicator,
} from "react-native";
import { connect } from "react-redux";
import ApplicationState from "@mele-wallet/redux/application-state";
import {
	mapDispatchToProps,
	IActionCreators,
} from "@mele-wallet/redux/methods/map-dispatch-to-props";
import { AccountState } from "@mele-wallet/redux/reducers/account-reducer";
import { styles } from "./styles";
import {
	LoadTransactionsStatus,
	TransactionsState,
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
import { WalletState } from "@mele-wallet/redux/reducers/wallet-reducer";
import { Utils } from "mele-sdk";
import { StaticState } from "@mele-wallet/redux/reducers/static-reducer";
import SelectDropdown from "react-native-select-dropdown";

interface ISendComponentProps {
	actionCreators: IActionCreators;
	accountState: AccountState;
	transactionState: TransactionsState;
	languageState: LanguageState;
	walletState: WalletState;
	staticState: StaticState;
}

interface ISendState {
	recipient: string;
	amount: string;
	denom: string;
	state: number;
	sending: boolean;
}

const languages = {
	en: require("../../translations/en.json"),
	ar: require("../../translations/ar.json"),
};

class SendComponent extends Component<ISendComponentProps, ISendState> {
	constructor(props: ISendComponentProps) {
		super(props);
		this.state = {
			recipient: "",
			amount: "",
			denom: "melc",
			state: 0,
			sending: false,
		};
	}

	componentDidMount() {
		this.state = {
			recipient: "",
			amount: "",
			denom: "melc",
			state: 0,
			sending: false,
		};
	}

	sendCoins = () => {
		if (this.state.amount !== "" && this.state.recipient !== "") {
			const amount =
				this.state.denom === "melc"
					? parseFloat(Utils.toUmelc(this.state.amount, this.state.denom))
					: parseFloat(Utils.toUmelg(this.state.amount, this.state.denom));
			const wallet = this.props.walletState.loadedWallet;
			if (amount <= 0) {
				return;
			} else if (
				this.props.walletState.loadedWalletAddress === this.state.recipient
			) {
				return;
			} else if (wallet === undefined) {
				this.setState({ state: 2, amount: "", recipient: "" });
			} else if (
				(wallet.value.coins[0] !== undefined &&
					`u${this.state.denom}` === wallet.value.coins[0].denom &&
					amount > parseFloat(wallet.value.coins[0].amount)) ||
				(wallet.value.coins[1] !== undefined &&
					`u${this.state.denom}` === wallet.value.coins[1].denom &&
					amount > parseFloat(wallet.value.coins[1].amount))
			) {
				this.setState({ state: 2, amount: "", recipient: "" });
			} else {
				this.setState({ sending: true });
				this.props.actionCreators.transaction.sendTransaction(
					this.state.recipient,
					`u${this.state.denom}`,
					amount.toString(),
				);
			}
		}
	};

	componentDidUpdate(prevProps: any, prevState: any) {
		if (
			this.props.transactionState.loadTransactionsStatus ===
			LoadTransactionsStatus.RESET
		) {
			this.setState({ state: 0, sending: false });
			this.props.actionCreators.transaction.startSendFlow();
		}
		if (
			prevProps.transactionState.loadTransactionsStatus !==
				this.props.transactionState.loadTransactionsStatus &&
			this.props.transactionState.loadTransactionsStatus ===
				LoadTransactionsStatus.SEND_SUCCESS
		) {
			this.props.actionCreators.wallet.getWallet(
				this.props.staticState.mnemonic ? this.props.staticState.mnemonic : "",
			);
			this.props.actionCreators.transaction.searchTransactions(
				this.props.walletState.loadedWalletAddress,
			);
			this.setState({ amount: "", recipient: "", state: 1 });
		} else if (
			prevProps.transactionState.loadTransactionsStatus !==
				this.props.transactionState.loadTransactionsStatus &&
			this.props.transactionState.loadTransactionsStatus ===
				LoadTransactionsStatus.SEND_ERROR_NO_FUNDS
		) {
			this.setState({ amount: "", recipient: "", state: 2 });
		} else if (
			prevProps.transactionState.loadTransactionsStatus !==
				this.props.transactionState.loadTransactionsStatus &&
			this.props.transactionState.loadTransactionsStatus ===
				LoadTransactionsStatus.SEND_ERROR
		) {
			this.setState({ state: 3 });
		}
	}

	handleChange = (e: any) =>
		this.setState({ denom: e.target.innerText.toString().toLowerCase() });

	render() {
		const localeData = languages[this.props.languageState.currentLanguage];
		const wallet = this.props.walletState.loadedWalletAddress;
		const coins: { key: string; text: string; value: string }[] = [
			{ key: "melc", text: "MELC", value: "melc" },
			{ key: "melg", text: "MELG", value: "melg" },
		];
		StatusBar.setBarStyle("dark-content", true);
		if (this.state.state === 3) {
			return <SendError />;
		} else if (this.state.state === 2) {
			return <SendNoCoins />;
		}
		// else if (
		// 	this.props.accountState.account?.balance === undefined ||
		// 	parseFloat(this.props.accountState.account?.balance) === 0
		// )
		// 	return <NoCoinsAvailable />;
		else if (this.state.state === 0) {
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
							if (
								e === "" ||
								(e.includes(".") && e.substr(e.indexOf(".")).length < 11) ||
								!e.includes(".")
							) {
								const regExp = /[a-zA-Z]/g;
								const format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?]+/;
								if (!regExp.test(e) && !format.test(e)) {
									this.setState({ amount: e });
								}
							}
						}}
						value={this.state.amount || ""}
						placeholder={localeData.send.amount}
						iconRight={
							<SelectDropdown
								data={coins}
								onSelect={(itemValue: any) =>
									this.setState({ denom: itemValue.value })
								}
								buttonTextAfterSelection={(selectedItem: any) => {
									// text represented after item is selected
									// if data array is an array of objects then return selectedItem.property to render after item is selected
									return selectedItem.text;
								}}
								rowTextForSelection={(item: any) => {
									// text represented for each item in dropdown
									// if data array is an array of objects then return item.property to represent item in dropdown
									return item.text;
								}}
								defaultValue={this.state.denom}
								defaultButtonText={this.state.denom.toUpperCase()}
								buttonTextStyle={{ marginRight: 50 }}
								dropdownIconPosition="left"
							/>
						}
					/>
					<BaseField
						onChangeText={(e: string) => {
							this.setState({
								recipient: e,
							});
						}}
						value={this.state.recipient || ""}
						style={[styles.sendFields, { paddingTop: 10 }]}
						placeholder={localeData.send.recepient}
					/>
					{/* <Calculator
						centsAmount={
							this.state.formatted ? this.state.formatted.toString() : '0'
						}
					/> */}
					{this.state.sending ? (
						<ActivityIndicator size="small" color="#013EC4" />
					) : (
						<BlueButton
							text={localeData.send.sendButton}
							onPress={() => {
								this.sendCoins();
							}}
							disabled={
								this.state.recipient === "" ||
								this.state.recipient.length < 43 ||
								this.state.amount === "" ||
								parseFloat(this.state.amount) < 0.000000001
							}
							style={styles.purchaseCoins}
							textStyle={styles.noTransactionsContainerButtonText}
						/>
					)}
				</ScrollView>
			);
		} else if (this.state.state === 1) {
			return <SendSuccess />;
		}
	}
}

const mapStateToProps = (state: ApplicationState) => {
	return {
		accountState: state.account,
		transactionState: state.transaction,
		languageState: state.language,
		walletState: state.wallet,
		staticState: state.static,
	};
};

export const Send = connect(mapStateToProps, mapDispatchToProps)(SendComponent);
