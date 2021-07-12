import React, { Component } from "react";
import { View, Text, ScrollView, StatusBar } from "react-native";

import { connect } from "react-redux";
import ApplicationState from "@mele-wallet/redux/application-state";
import {
	mapDispatchToProps,
	IActionCreators,
} from "@mele-wallet/redux/methods/map-dispatch-to-props";
import { commonStyles } from "@mele-wallet/app/common/styles/common-styles";
import { styles } from "./styles";
import { StaticState } from "@mele-wallet/redux/reducers/static-reducer";
import { Actions } from "react-native-router-flux";
import { ITransactionModel } from "@mele-wallet/common/model/transaction.model";
import { MeleCalculator } from "@mele-wallet/common/mele-calculator/mele-calculator";
import { Calculator } from "@mele-wallet/app/common/calculator/calculator";
import moment from "moment";
import { BlueButton } from "@mele-wallet/app/common/buttons/blue-button";
import { Wallet } from "@mele-wallet/common/utils/wallet";
import { LanguageState } from "@mele-wallet/redux/reducers/language-reducer";
import { WalletState } from "./../../../redux/reducers/wallet-reducer";
import { Utils } from "mele-sdk";

interface ITransactionComponentProps {
	actionCreators: IActionCreators;
	staticState: StaticState;
	transaction: any;
	languageState: LanguageState;
	walletState: WalletState;
}

const languages = {
	en: require("../../translations/en.json"),
	ar: require("../../translations/ar.json"),
};

class TransactionComponent extends Component<ITransactionComponentProps> {
	render() {
		const localeData = languages[this.props.languageState.currentLanguage];
		const statusStyle =
			this.props.transaction.msgs[0].data.recipient ===
			this.props.walletState.loadedWalletAddress
				? styles.transactionStatusContainerGreen
				: styles.transactionStatusContainerYellow;
		const statusTextStyle =
			this.props.transaction.msgs[0].data.recipient ===
			this.props.walletState.loadedWalletAddress
				? styles.transactionStatusGreen
				: styles.transactionStatusYellow;
		const userWalletAddress = this.props.walletState.loadedWalletAddress;
		const denom = this.props.transaction.msgs[0].data.amount.substr(
			this.props.transaction.msgs[0].data.amount.length - 5,
		);

		return (
			<ScrollView
				style={[commonStyles.whiteBackground, styles.scrollView]}
				contentContainerStyle={styles.content}
			>
				<StatusBar barStyle="dark-content" animated={true} />
				<View style={[styles.header]}>
					<View style={[styles.title]}>
						<Text style={[styles.titleText, commonStyles.fontBold]}>
							{localeData.transactions.transactionTitleOne}
						</Text>
						<Text style={[styles.titleText, commonStyles.fontBold]}>
							{localeData.transactions.transactionTitleTwo}
						</Text>
					</View>

					<View style={[styles.balance]}>
						<Text style={[styles.balanceAmount, commonStyles.fontBold]}>
							{denom === "umelc"
								? Utils.fromUmelc(
										this.props.transaction.msgs[0].data.amount.substring(
											0,
											this.props.transaction.msgs[0].data.amount.length - 5,
										),
										"melc",
								  )
								: Utils.fromUmelg(
										this.props.transaction.msgs[0].data.amount.substring(
											0,
											this.props.transaction.msgs[0].data.amount.length - 5,
										),
										"melg",
								  )}
						</Text>
						<Text style={[styles.balanceDescription, commonStyles.fontBook]}>
							{denom === "umelc" ? "MELC" : "MELG"}
						</Text>
					</View>
				</View>

				<View style={[styles.infoList]}>
					{this.getInfoBlock(
						localeData.transactions.sender,
						this.props.transaction.msgs[0].data.sender,
						{
							show:
								this.props.transaction.msgs[0].data.recipient ===
								userWalletAddress,
							capitalize: false,
						},
					)}
					{this.getInfoBlock(
						localeData.transactions.receiver,
						this.props.transaction.msgs[0].data.recipient,
						{
							show:
								this.props.transaction.msgs[0].data.recipient !==
								userWalletAddress,
							capitalize: false,
						},
					)}
					{/* {this.getInfoBlock(
						localeData.transactions.referenceCode,
						this.props.transaction.refCode,
						{
							show: !!this.props.transaction.refCode,
							capitalize: false,
						},
					)} */}
					{/* {this.getInfoBlock(
						localeData.transactions.type,
						<View style={[styles.transactionTypeContainer]}>
							<Text style={[styles.transactionType, commonStyles.fontBook]}>
								{this.props.transaction.type}
							</Text>
						</View>,
					)} */}
					{this.getInfoBlock(
						localeData.transactions.status,
						<View style={[styles.transactionStatusContainer, statusStyle]}>
							<Text
								style={[
									styles.transactionStatus,
									statusTextStyle,
									commonStyles.fontBook,
								]}
							>
								{this.props.transaction.msgs[0].data.recipient ===
								userWalletAddress
									? localeData.transactions.receive
									: localeData.transactions.send}
							</Text>
						</View>,
					)}
					{this.getInfoBlock(
						localeData.transactions.date,
						moment(this.props.transaction.timestamp).format("D MMM yyyy"),
					)}
					{/* {this.getInfoBlock(
						localeData.transactions.approvedDate,
						moment(this.props.transaction.approvedAt).format("D MMM yyyy"),
						{ show: !!this.props.transaction.approvedAt },
					)} */}
				</View>
				<BlueButton
					onPress={() => {
						Actions.pop();
					}}
					style={[styles.backButtonStyle]}
					textStyle={styles.backButtonText}
					text={localeData.transactions.backToTransactions}
				/>
			</ScrollView>
		);
	}

	getInfoBlock = (
		title: string,
		value: React.ReactNode | string,
		config: {
			show?: boolean;
			capitalize?: boolean;
		} = { show: true, capitalize: true },
	) => {
		if (!config.show) {
			return null;
		}
		let valueToShow = value;
		if (typeof value === "string") {
			const textStyles: any[] = [styles.infoContainerText];
			if (config.capitalize) {
				textStyles.push(styles.capitalizedText);
			}
			valueToShow = (
				<Text adjustsFontSizeToFit={true} numberOfLines={2} style={textStyles}>
					{value}
				</Text>
			);
		}

		return (
			<View style={[styles.infoContainer]}>
				<View style={[styles.infoContainerTitle]}>
					<Text style={[styles.infoContainerText]}>{title}</Text>
				</View>
				<View style={[styles.infoContainerValue]}>{valueToShow}</View>
			</View>
		);
	};
}

const mapStateToProps = (state: ApplicationState) => {
	return {
		staticState: state.static,
		languageState: state.language,
		walletState: state.wallet,
	};
};

export const Transaction = connect(
	mapStateToProps,
	mapDispatchToProps,
)(TransactionComponent);
