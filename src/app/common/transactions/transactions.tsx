import React, { Component } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import ApplicationState from "@mele-wallet/redux/application-state";
import {
	mapDispatchToProps,
	IActionCreators,
} from "@mele-wallet/redux/methods/map-dispatch-to-props";
import { styles } from "./styles";
import { commonStyles } from "@mele-wallet/app/common/styles/common-styles";
import ShieldBlue from "@mele-wallet/resources/icons/shield-blue.svg";
import Ripple from "react-native-material-ripple";
import { Actions } from "react-native-router-flux";
import { ROUTES } from "@mele-wallet/app/router/routes";
import base64 from "base-64";
import moment from "moment";
import { StaticState } from "@mele-wallet/redux/reducers/static-reducer";
import { ScrollView } from "react-native-gesture-handler";
import { LanguageState } from "@mele-wallet/redux/reducers/language-reducer";
import AsyncStorage from "@react-native-community/async-storage";
import { WalletState } from "@mele-wallet/redux/reducers/wallet-reducer";
import {
	LoadTransactionsStatus,
	TransactionsState,
} from "@mele-wallet/redux/reducers/transaction-reducer";
import { Utils } from "mele-sdk";

interface ITransactionComponentProps {
	transactionState: TransactionsState;
	staticState: StaticState;
	actionCreators: IActionCreators;
	customEmptyScreen?: React.ReactNode;
	languageState: LanguageState;
	walletState: WalletState;
}

interface ITransactionComponentState {
	wait: boolean;
}

const languages = {
	en: require("../../translations/en.json"),
	ar: require("../../translations/ar.json"),
};

class TransactionComponent extends Component<
	ITransactionComponentProps,
	ITransactionComponentState
> {
	constructor(props: ITransactionComponentProps) {
		super(props);
		this.state = {
			wait: false,
		};
	}

	componentDidMount() {
		if (this.props.transactionState.totalCount === -1) {
			this.getData();
		}
	}

	componentDidUpdate() {
		if (this.props.transactionState.totalCount === -1 && !this.state.wait) {
			this.getDataFromUpdate();
		}
	}

	getDataFromUpdate = async () => {
		this.setState({ wait: true });
		this.getData();
		this.setState({ wait: false });
	};

	getData = async () => {
		const based = await AsyncStorage.getItem("address");
		if (based) {
			await this.props.actionCreators.transaction.searchTransactions(
				base64.decode(based),
			);
		}
	};

	render() {
		const localeData = languages[this.props.languageState.currentLanguage];
		return (
			<ScrollView
				style={[styles.scroll]}
				contentContainerStyle={[styles.content]}
			>
				<View style={[styles.transactionsTitleContainer]}>
					<ShieldBlue />
					<Text style={[styles.transactionsTitle, commonStyles.fontBook]}>
						{localeData.transactions.title}
					</Text>
					{/* <TouchableOpacity onPress={()=>{
                        Actions.jump(ROUTES.authenticated.history)
                    }}>
                        <Text style={[transactionsStyles.viewAll, commonStyles.fontBold]}>VIEW ALL</Text>
                    </TouchableOpacity> */}
				</View>
				<View style={[styles.transactionsList]}>
					{this.getTransactionList(localeData)}
				</View>
			</ScrollView>
		);
	}

	getTransactionList = (localeData: any) => {
		const transactions = this.props.transactionState.loadedTransactions;
		const transactionsCount = this.props.transactionState.totalCount;

		if (transactionsCount === -1) {
			return (
				<View style={[styles.noTransactionsContainer]}>
					<ActivityIndicator size="large" color="#013EC4" />
				</View>
			);
		}

		if (transactionsCount == 0 && this.props.customEmptyScreen) {
			return (
				<View style={[styles.noTransactionsContainer]}>
					{this.props.customEmptyScreen}
				</View>
			);
		} else if (transactionsCount == 0) {
			return (
				<View style={[styles.noTransactionsContainer]}>
					<Text
						style={[styles.noTransactionsContainerText, commonStyles.fontBook]}
					>
						{localeData.transactions.noTransactionsOne}
					</Text>
					<Text
						style={[styles.noTransactionsContainerText, commonStyles.fontBook]}
					>
						{localeData.transactions.noTransactionsThree}
					</Text>
				</View>
			);
		}
		return transactions.map((transaction: any, id: any) => {
			const denom = transaction.msgs[0].data.amount.substr(
				transaction.msgs[0].data.amount.length - 5,
			);

			const statusStyle =
				transaction.msgs[0].data.recipient ===
				this.props.walletState.loadedWalletAddress
					? styles.transactionStatusContainerGreen
					: styles.transactionStatusContainerYellow;
			const statusTextStyle =
				transaction.msgs[0].data.recipient ===
				this.props.walletState.loadedWalletAddress
					? styles.transactionStatusGreen
					: styles.transactionStatusYellow;

			let transactionTitle = transaction.refCode;

			if (!transactionTitle) {
				if (
					transaction.msgs[0].data.recipient ===
					this.props.walletState.loadedWalletAddress
				) {
					transactionTitle = `From: ${transaction.msgs[0].data.sender}`;
				} else {
					transactionTitle = `To: ${transaction.msgs[0].data.recipient}`;
				}
			}
			return (
				<Ripple
					style={[styles.transactionContainer]}
					key={id}
					onPress={() => {
						Actions.jump(ROUTES.authenticated.transaction, {
							transaction: transaction,
						});
					}}
				>
					<View style={[styles.transactionContainerRow]}>
						<Text
							adjustsFontSizeToFit={true}
							numberOfLines={2}
							style={[
								styles.transactionContainerAddress,
								commonStyles.fontBold,
							]}
						>
							{transactionTitle}
						</Text>
						<View style={[styles.transactionContainerAmountContainer]}>
							<Text
								style={[
									styles.transactionContainerAmount,
									commonStyles.fontBold,
								]}
							>
								{denom === "umelc"
									? `${Utils.fromUmelc(
											transaction.msgs[0].data.amount.substring(
												0,
												transaction.msgs[0].data.amount.length - 5,
											),
											"melc",
									  )} MELC`
									: `${Utils.fromUmelg(
											transaction.msgs[0].data.amount.substring(
												0,
												transaction.msgs[0].data.amount.length - 5,
											),
											"melg",
									  )} MELG`}
							</Text>
						</View>
					</View>
					<View style={[styles.transactionContainerRow]}>
						{/* <View style={[styles.transactionTypeContainer]}>
							<Text style={[styles.transactionType, commonStyles.fontBook]}>
								{transaction.type}
							</Text>
						</View> */}
						<View style={[styles.transactionStatusContainer, statusStyle]}>
							<Text
								style={[
									styles.transactionStatus,
									statusTextStyle,
									commonStyles.fontBook,
								]}
							>
								{transaction.msgs[0].data.recipient ===
								this.props.walletState.loadedWalletAddress
									? localeData.transactions.receive
									: localeData.transactions.send}
							</Text>
						</View>
						<Text style={[styles.transactionDate, commonStyles.fontBook]}>
							{moment(transaction.timestamp).format("D MMM yyyy")}
						</Text>
					</View>
				</Ripple>
			);
		});
	};
}

const mapStateToProps = (state: ApplicationState) => {
	return {
		transactionState: state.transaction,
		staticState: state.static,
		languageState: state.language,
		walletState: state.wallet,
	};
};

export const Transactions = connect(
	mapStateToProps,
	mapDispatchToProps,
)(TransactionComponent);
