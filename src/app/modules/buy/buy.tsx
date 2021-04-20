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
	PurchaseFlowStatus,
	TransactionState,
} from "@mele-wallet/redux/reducers/transaction-reducer";
import { BaseField } from "@mele-wallet/app/common/fields/base-field";
import { commonStyles } from "./../../common/styles/common-styles";
import { Calculator } from "@mele-wallet/app/common/calculator/calculator";
import { BlueButton } from "@mele-wallet/app/common/buttons/blue-button";
import Clipboard from "@react-native-community/clipboard";
import Ripple from "react-native-material-ripple";
import CopyIcon from "@mele-wallet/resources/icons/copy.svg";
import { BuySuccess } from "./buy-success";
import { Actions } from "react-native-router-flux";
import { ROUTES } from "@mele-wallet/app/router/routes";
import { LanguageState } from "@mele-wallet/redux/reducers/language-reducer";

interface IBuyComponentProps {
	actionCreators: IActionCreators;
	accountState: AccountState;
	transactionState: TransactionState;
	languageState: LanguageState;
}

interface IBuyState {
	purchaseAmount: string;
	codeCopied: boolean;
}

const languages = {
	en: require("../../translations/en.json"),
	ar: require("../../translations/ar.json"),
};

class BuyComponent extends Component<IBuyComponentProps, IBuyState> {
	constructor(props: IBuyComponentProps) {
		super(props);
		this.state = {
			purchaseAmount: "",
			codeCopied: false,
		};
	}

	componentDidUpdate(oldProps: IBuyComponentProps) {
		if (
			oldProps.transactionState.generatedPurchaseCode !=
			this.props.transactionState.generatedPurchaseCode
		) {
			this.setState({
				codeCopied: false,
			});
		}
	}
	componentDidMount() {
		this.setState({
			purchaseAmount: "",
			codeCopied: false,
		});
	}

	resetPurchaseFlow() {
		this.setState({
			purchaseAmount: "",
			codeCopied: false,
		});
		this.props.actionCreators.transaction.resetPurchaseFlow();
	}

	getPurchaseNumberButtonDisabled = () => {
		return (
			//parseInt(this.state.purchaseAmount) > 60000000 ||
			parseInt(this.state.purchaseAmount) < 1 ||
			!this.state.purchaseAmount ||
			this.props.transactionState.purchaseFlowStatus ===
				PurchaseFlowStatus.PURCHASE_NUMBER_REQUESTED
		);
	};
	getPurchaseButtonDisabled = () => {
		return (
			!this.state.purchaseAmount ||
			!this.props.transactionState.generatedPurchaseCode ||
			this.props.transactionState.purchaseFlowStatus ===
				PurchaseFlowStatus.PURCHASE_REQUESTED
		);
	};

	purchaseCoins = () => {
		this.props.actionCreators.transaction.processPurchase(
			parseFloat(this.state.purchaseAmount) * 100,
			this.props.transactionState.generatedPurchaseCode,
		);
		this.setState({
			purchaseAmount: "",
		});
	};
	generateNewPurchaseNumber = () => {
		this.props.actionCreators.transaction.generateNewPurchaseNumber();
	};

	render() {
		const localeData = languages[this.props.languageState.currentLanguage];
		StatusBar.setBarStyle("dark-content", true);
		if (
			this.props.transactionState.purchaseFlowStatus ===
				PurchaseFlowStatus.NOT_STARTED ||
			this.props.transactionState.purchaseFlowStatus ===
				PurchaseFlowStatus.PURCHASE_NUMBER_REQUESTED ||
			this.props.transactionState.purchaseFlowStatus ===
				PurchaseFlowStatus.PURCHASE_NUMBER_ERROR
		) {
			return (
				<ScrollView
					style={[styles.scrollView]}
					contentContainerStyle={styles.content}
				>
					<Image source={require("@mele-wallet/resources/images/logo.png")} />
					<Text style={[styles.initTitle, commonStyles.blackHeader]}>
						{localeData.buyCoins.phaseOneTitle}
					</Text>
					<Text style={[styles.initContainer]}>
						{localeData.buyCoins.phaseOneDescription}
					</Text>
					<BaseField
						onChangeText={(e: string) => {
							const value = e;
							if (value.length > 10) {
								return;
							}
							const reg = new RegExp("^[0-9]+$");

							if (reg.test(value) || value === "") {
								this.setState({
									purchaseAmount: e,
								});
							}
						}}
						value={this.state.purchaseAmount || ""}
						placeholder={localeData.buyCoins.enterAmount}
						iconRight={<Text>USD</Text>}
					/>
					<Calculator
						centsAmount={
							this.state.purchaseAmount
								? (parseFloat(this.state.purchaseAmount) * 100).toString()
								: "0"
						}
						style={[styles.calculator]}
					/>
					<BlueButton
						disabled={
							this.state.purchaseAmount === "" ||
							parseFloat(this.state.purchaseAmount) <= 0
						}
						text={
							this.props.accountState.account?.wallet === undefined
								? localeData.buyCoins.connectAccount
								: localeData.buyCoins.placeOrder
						}
						onPress={() => {
							this.props.accountState.account?.wallet === undefined
								? Actions.jump(ROUTES.scanQRCode)
								: this.generateNewPurchaseNumber();
						}}
						style={styles.purchaseCoins}
						textStyle={styles.noTransactionsContainerButtonText}
					/>
				</ScrollView>
			);
		} else if (
			this.props.transactionState.purchaseFlowStatus ===
				PurchaseFlowStatus.PURCHASE_NUMBER_SUCCESS ||
			this.props.transactionState.purchaseFlowStatus ===
				PurchaseFlowStatus.PURCHASE_REQUESTED
		) {
			return (
				<ScrollView
					style={[styles.scrollView]}
					contentContainerStyle={styles.content}
				>
					<Image source={require("@mele-wallet/resources/images/logo.png")} />
					<Text style={[styles.confirmationTitle]}>
						{localeData.buyCoins.phaseTwoTitle}
					</Text>
					<View style={[styles.initContainer]}>
						<Text style={[styles.confirmText]}>
							{localeData.buyCoins.phaseTwoDescription}
						</Text>
					</View>
					<Ripple
						style={[styles.referenceCodeContainer]}
						onPress={() => {
							Clipboard.setString(
								this.props.transactionState.generatedPurchaseCode,
							);
						}}
					>
						<Text
							style={[styles.referenceCodeText, commonStyles.fontBook]}
							adjustsFontSizeToFit={true}
							numberOfLines={1}
						>
							{localeData.buyCoins.referenceCode}
						</Text>
						<Text
							style={[styles.referenceCode, commonStyles.fontBook]}
							adjustsFontSizeToFit={true}
							numberOfLines={1}
						>
							{this.props.transactionState.generatedPurchaseCode}
						</Text>
						<CopyIcon style={[styles.copyIcon]} />
					</Ripple>
					<View style={[styles.initContainer]}>
						<Text style={[styles.confirmText]} numberOfLines={4}>
							{localeData.buyCoins.pleasePay} {this.state.purchaseAmount}
							{" USD "}
							{localeData.buyCoins.pleasePayTwo}
						</Text>
					</View>
					<View style={[styles.initContainer]}>
						<View style={[styles.informationEntry]}>
							<Text style={[styles.informationTitle, commonStyles.fontBold]}>
								{localeData.buyCoins.accountName}
							</Text>
							<Text style={[styles.informationValue]}>
								{localeData.buyCoins.accountNameValue}
							</Text>
						</View>
						<View style={[styles.informationEntry]}>
							<Text style={[styles.informationTitle, commonStyles.fontBold]}>
								{localeData.buyCoins.accountNumber}
							</Text>
							<Text style={[styles.informationValue]}>
								{localeData.buyCoins.accountNumberValue}
							</Text>
						</View>
						<View style={[styles.informationEntry]}>
							<Text style={[styles.informationTitle, commonStyles.fontBold]}>
								{localeData.buyCoins.bankName}
							</Text>
							<Text style={[styles.informationValue]}>
								{localeData.buyCoins.bankNameValue}
							</Text>
						</View>
						<View style={[styles.informationEntry]}>
							<Text style={[styles.informationTitle, commonStyles.fontBold]}>
								{localeData.buyCoins.bankAddress}
							</Text>
							<Text style={[styles.informationValue]}>
								{localeData.buyCoins.bankAddressValue}
							</Text>
						</View>
						<View style={[styles.informationEntry]}>
							<Text style={[styles.informationTitle, commonStyles.fontBold]}>
								{localeData.buyCoins.iban}
							</Text>
							<Text style={[styles.informationValue]}>
								{localeData.buyCoins.ibanValue}
							</Text>
						</View>
						<View style={[styles.informationEntry]}>
							<Text style={[styles.informationTitle, commonStyles.fontBold]}>
								{localeData.buyCoins.swift}
							</Text>
							<Text style={[styles.informationValue]}>
								{localeData.buyCoins.swiftValue}
							</Text>
						</View>
					</View>
					<View style={[styles.buttonsContainer]}>
						<BlueButton
							text={localeData.buyCoins.phaseTwoPlaceOrder}
							onPress={() => {
								this.purchaseCoins();
							}}
							style={styles.purchaseCoinsConfirm}
							textStyle={styles.noTransactionsContainerButtonText}
						/>
						<BlueButton
							text={localeData.buyCoins.phaseTwoCancelOrder}
							onPress={() => {
								this.resetPurchaseFlow();
							}}
							style={styles.cancelPurchaseCoins}
							textStyle={styles.cancelContainerButtonText}
						/>
					</View>
				</ScrollView>
			);
		} else return <BuySuccess />;
	}
}

const mapStateToProps = (state: ApplicationState) => {
	return {
		accountState: state.account,
		transactionState: state.transaction,
		languageState: state.language,
	};
};

export const Buy = connect(mapStateToProps, mapDispatchToProps)(BuyComponent);
