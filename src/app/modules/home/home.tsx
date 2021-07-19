import React, { Component } from "react";
import {
	View,
	Text,
	ScrollView,
	StatusBar,
	RefreshControl,
	ActivityIndicator,
} from "react-native";
import Clipboard from "@react-native-community/clipboard";
import { connect } from "react-redux";
import ApplicationState from "@mele-wallet/redux/application-state";
import {
	mapDispatchToProps,
	IActionCreators,
} from "@mele-wallet/redux/methods/map-dispatch-to-props";
import { AccountState } from "@mele-wallet/redux/reducers/account-reducer";
import { styles } from "./styles";
import { commonStyles } from "@mele-wallet/app/common/styles/common-styles";
import CopyIcon from "@mele-wallet/resources/icons/copy.svg";
import Ripple from "react-native-material-ripple";
import { Calculator } from "@mele-wallet/app/common/calculator/calculator";
import { StaticState } from "@mele-wallet/redux/reducers/static-reducer";
import { IAccountModel } from "@mele-wallet/common/model/account.model";
import { Transactions } from "@mele-wallet/app/common/transactions/transactions";
import { LanguageState } from "@mele-wallet/redux/reducers/language-reducer";
import AsyncStorage from "@react-native-community/async-storage";
import { WalletState } from "./../../../redux/reducers/wallet-reducer";
import { Utils } from "mele-sdk";
import base64 from "base-64";

interface IHomeComponentProps {
	actionCreators: IActionCreators;
	accountState: AccountState;
	staticState: StaticState;
	languageState: LanguageState;
	walletState: WalletState;
}

interface IHomeComponentState {
	refreshing: boolean;
	fromStorage: boolean;
	account: IAccountModel | undefined;
	transactions: boolean;
}

const languages = {
	en: require("../../translations/en.json"),
	ar: require("../../translations/ar.json"),
};

class HomeComponent extends Component<
	IHomeComponentProps,
	IHomeComponentState
> {
	constructor(props: IHomeComponentProps) {
		super(props);
		this.state = {
			refreshing: false,
			fromStorage: true,
			account: undefined,
			transactions: false,
		};
		this._refresh = this._refresh.bind(this);
	}

	componentDidMount() {
		this.getData();
	}

	getTransactions = async () => {
		const based = await AsyncStorage.getItem("address");
		if (based && !this.state.transactions) {
			await this.props.actionCreators.transaction.searchTransactions(
				base64.decode(based),
			);
			this.setState({ transactions: true });
		}
	};

	componentDidUpdate() {
		this.getTransactions();
	}

	_refresh = async () => {
		this.setState({ refreshing: true });
		this.getData();
		this.setState({ refreshing: false });
	};

	getData = async () => {
		const based = await AsyncStorage.getItem("mnemonic");
		if (based) {
			this.props.actionCreators.wallet.getWalletAddress(base64.decode(based));
			this.props.actionCreators.wallet.getWallet(base64.decode(based));
		}
	};

	render() {
		const localeData = languages[this.props.languageState.currentLanguage];
		const wallet = this.props.walletState.loadedWallet;
		//console.log(wallet)

		return (
			<ScrollView
				style={[styles.scrollView]}
				contentContainerStyle={styles.content}
				refreshControl={
					<RefreshControl
						refreshing={this.state.refreshing}
						onRefresh={() => this._refresh()}
					/>
				}
			>
				<StatusBar barStyle="light-content" />
				<View style={[styles.header, commonStyles.blueBackground]}>
					<View style={[styles.balanceHeader]}>
						<View style={[styles.titleContainer]}>
							<Text style={[styles.title, commonStyles.fontBold]}>
								{localeData.home.balance}
							</Text>
							<View style={[styles.balanceContainer]}>
								<Ripple
									onPress={() => {
										this.RBSheet.open();
									}}
									rippleOpacity={0}
									style={[styles.balanceContainer]}
								/>
							</View>
						</View>
					</View>
					{wallet === undefined ? (
						<ActivityIndicator
							size="large"
							color="#ffffff"
							style={{ marginBottom: "5%" }}
						/>
					) : (
						<Calculator
							melc={
								wallet !== undefined &&
								wallet !== [] &&
								wallet.value !== undefined &&
								wallet.value.coins[0] !== undefined &&
								wallet.value.coins[0].denom === "umelc"
									? Utils.fromUmelc(wallet.value.coins[0].amount, "melc")
									: wallet !== undefined &&
									  wallet.value !== undefined &&
									  wallet.value.coins[1] !== undefined &&
									  wallet.value.coins[1].denom === "umelc"
									? Utils.fromUmelc(wallet.value.coins[1].amount, "melc")
									: "0"
							}
							melg={
								wallet !== undefined &&
								wallet !== [] &&
								wallet.value !== undefined &&
								wallet.value.coins[0] !== undefined &&
								wallet.value.coins[0].denom === "umelg"
									? Utils.fromUmelg(wallet.value.coins[0].amount, "melg")
									: wallet !== undefined &&
									  wallet.value !== undefined &&
									  wallet.value.coins[1] !== undefined &&
									  wallet.value.coins[1].denom === "umelg"
									? Utils.fromUmelg(wallet.value.coins[1].amount, "melg")
									: "0"
							}
							style={[styles.calculator]}
						/>
					)}

					<Ripple
						style={[styles.walletAddressContainer]}
						onPress={() => {
							Clipboard.setString(this.props.walletState.loadedWalletAddress);
						}}
					>
						<Text
							style={[styles.walletAddress, commonStyles.fontBook]}
							adjustsFontSizeToFit={true}
							numberOfLines={1}
						>
							{this.props.walletState.loadedWalletAddress}
						</Text>
						<CopyIcon style={[styles.walletCopy]} />
					</Ripple>
				</View>
				{/* <View style={[styles.actions]}>
					<UserActions />
				</View> */}
				<View style={[styles.transactions]}>
					<Transactions />
				</View>
			</ScrollView>
		);
	}
}

const mapStateToProps = (state: ApplicationState) => {
	return {
		accountState: state.account,
		staticState: state.static,
		languageState: state.language,
		walletState: state.wallet,
	};
};

export const Home = connect(mapStateToProps, mapDispatchToProps)(HomeComponent);
