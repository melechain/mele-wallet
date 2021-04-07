import React, { Component } from "react";
import {
	View,
	Text,
	Image,
	ScrollView,
	Animated,
	StatusBar,
} from "react-native";

import { connect } from "react-redux";
import ApplicationState from "@mele-wallet/redux/application-state";
import {
	mapDispatchToProps,
	IActionCreators,
} from "@mele-wallet/redux/methods/map-dispatch-to-props";
import { commonStyles } from "@mele-wallet/app/common/styles/common-styles";
import { styles } from "./styles";
import { Pin } from "@mele-wallet/app/common/pin-component/pin-component";
import { StaticState } from "@mele-wallet/redux/reducers/static-reducer";
import { ROUTES } from "@mele-wallet/app/router/routes";
import { Actions } from "react-native-router-flux";
import { ITransactionModel } from "@mele-wallet/common/model/transaction.model";
import { MeleCalculator } from "@mele-wallet/common/mele-calculator/mele-calculator";
import { Calculator } from "@mele-wallet/app/common/calculator/calculator";
import moment from "moment";
import { BlueButton } from "@mele-wallet/app/common/buttons/blue-button";
import { Wallet } from "@mele-wallet/common/utils/wallet";

interface ITransactionComponentProps {
	actionCreators: IActionCreators;
	staticState: StaticState;
	transaction: ITransactionModel;
}

class TransactionComponent extends Component<ITransactionComponentProps> {
	render() {
		const statusStyle =
			this.props.transaction.status === "pending"
				? styles.transactionStatusContainerYellow
				: styles.transactionStatusContainerGreen;
		const statusTextStyle =
			this.props.transaction.status === "pending"
				? styles.transactionStatusYellow
				: styles.transactionStatusGreen;
		const statusText =
			this.props.transaction.status === "pending" ? "Pending" : "Complete";

		return (
			<ScrollView
				style={[commonStyles.whiteBackground, styles.scrollView]}
				contentContainerStyle={styles.content}
			>
				<StatusBar barStyle="dark-content" animated={true} />
				<View style={[styles.header]}>
					<View style={[styles.title]}>
						<Text style={[styles.titleText, commonStyles.fontBold]}>
							Transaction
						</Text>
						<Text style={[styles.titleText, commonStyles.fontBold]}>
							Details
						</Text>
					</View>

					<View style={[styles.balance]}>
						<Text style={[styles.balanceAmount, commonStyles.fontBold]}>
							$
							{MeleCalculator.centsToUSDFormatted(
								this.props.transaction.amount,
							)}
						</Text>
						<Text style={[styles.balanceDescription, commonStyles.fontBook]}>
							Amount in USD
						</Text>
					</View>
				</View>
				<Calculator centsAmount={this.props.transaction.amount} />

				<View style={[styles.infoList]}>
					{/* {this.getInfoBlock("Transaction Id", this.props.transaction.id)} */}

					{this.getInfoBlock("Sender", this.props.transaction.from.wallet, {
						show:
							!this.props.transaction.refCode &&
							this.props.transaction.to.wallet ==
								Wallet.getWallet(this.props.staticState.mnemonic).getAddress(),
						capitalize: false,
					})}
					{this.getInfoBlock("Receiver", this.props.transaction.to.wallet, {
						show:
							!this.props.transaction.refCode &&
							this.props.transaction.to.wallet !=
								Wallet.getWallet(this.props.staticState.mnemonic).getAddress(),
						capitalize: false,
					})}
					{this.getInfoBlock("Reference Code", this.props.transaction.refCode, {
						show: !!this.props.transaction.refCode,
						capitalize: false,
					})}
					{this.getInfoBlock(
						"Transaction type",
						<View style={[styles.transactionTypeContainer]}>
							<Text style={[styles.transactionType, commonStyles.fontBook]}>
								{this.props.transaction.type}
							</Text>
						</View>,
					)}
					{this.getInfoBlock(
						"Status",
						<View style={[styles.transactionStatusContainer, statusStyle]}>
							<Text
								style={[
									styles.transactionStatus,
									statusTextStyle,
									commonStyles.fontBook,
								]}
							>
								{statusText}
							</Text>
						</View>,
					)}
					{this.getInfoBlock(
						"Order Placed",
						moment(this.props.transaction.createdAt).format("D MMM yyyy"),
					)}
					{this.getInfoBlock(
						"Date Approved",
						moment(this.props.transaction.approvedAt).format("D MMM yyyy"),
						{ show: !!this.props.transaction.approvedAt },
					)}
				</View>
				<BlueButton
					onPress={() => {
						Actions.pop();
					}}
					style={[styles.backButtonStyle]}
					textStyle={styles.backButtonText}
					text="Back"
				></BlueButton>
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
		if (typeof value == "string") {
			const textStyles: any[] = [styles.infoContainerText];
			if (config.capitalize) {
				textStyles.push(styles.capitalizedText);
			}
			valueToShow = (
				<Text adjustsFontSizeToFit={true} numberOfLines={1} style={textStyles}>
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
	};
};

export const Transaction = connect(
	mapStateToProps,
	mapDispatchToProps,
)(TransactionComponent);
