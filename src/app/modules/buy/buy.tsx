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

interface IBuyComponentProps {
	actionCreators: IActionCreators;
	accountState: AccountState;
	transactionState: TransactionState;
}

interface IBuyState {
	purchaseAmount: string;
	codeCopied: boolean;
}

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
						Purchase coins
					</Text>
					<Text style={[styles.initContainer]}>
						To get coins please make a payment. You can send payment directly to
						our address and we'll reimburse the coins upon payment received.
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
						placeholder="Amount"
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
								? "Please connect your account first"
								: "Place Order"
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
						Confirmation of Your Payment
					</Text>
					<View style={[styles.initContainer]}>
						<Text style={[styles.confirmText]}>
							Please use this reference code when you make the payment.
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
							Reference Code
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
						<Text style={[styles.confirmText]}>
							Please make your payment of {this.state.purchaseAmount} USD
							through bank to the below bank address. The token balance will
							appear in your account only after your transaction gets approved
							by our team.
						</Text>
					</View>
					<View style={[styles.initContainer]}>
						<View style={[styles.informationEntry]}>
							<Text style={[styles.informationTitle, commonStyles.fontBold]}>
								Account Name
							</Text>
							<Text style={[styles.informationValue]}>
								شركة ملي كوين للاستثمار ش.ذ.م.م
							</Text>
						</View>
						<View style={[styles.informationEntry]}>
							<Text style={[styles.informationTitle, commonStyles.fontBold]}>
								Account Number
							</Text>
							<Text style={[styles.informationValue]}>0156000100510271</Text>
						</View>
						<View style={[styles.informationEntry]}>
							<Text style={[styles.informationTitle, commonStyles.fontBold]}>
								Bank Name
							</Text>
							<Text style={[styles.informationValue]}>EL Nilein Bank</Text>
						</View>
						<View style={[styles.informationEntry]}>
							<Text style={[styles.informationTitle, commonStyles.fontBold]}>
								Bank Address
							</Text>
							<Text style={[styles.informationValue]}>
								hereby - Abu Dhabi - UAE
							</Text>
						</View>
						<View style={[styles.informationEntry]}>
							<Text style={[styles.informationTitle, commonStyles.fontBold]}>
								IBAN
							</Text>
							<Text style={[styles.informationValue]}>
								AE320250156000100510271
							</Text>
						</View>
						<View style={[styles.informationEntry]}>
							<Text style={[styles.informationTitle, commonStyles.fontBold]}>
								Swift/BIC
							</Text>
							<Text style={[styles.informationValue]}>NILBAEAA</Text>
						</View>
					</View>
					<View style={[styles.buttonsContainer]}>
						<BlueButton
							text="Place Order"
							onPress={() => {
								this.purchaseCoins();
							}}
							style={styles.purchaseCoinsConfirm}
							textStyle={styles.noTransactionsContainerButtonText}
						/>
						<BlueButton
							text="Cancel Order"
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
	};
};

export const Buy = connect(mapStateToProps, mapDispatchToProps)(BuyComponent);
