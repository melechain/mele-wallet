import React, { Component } from "react";
import {
	View,
	Text,
	ScrollView,
	StatusBar,
	RefreshControl,
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
import WiteInfoIcon from "@mele-wallet/resources/icons/info-white.svg";
import BlueInfoIcon from "@mele-wallet/resources/icons/info-blue.svg";
import ScanBarcodeIcon from "@mele-wallet/resources/icons/scan-barcode.svg";
import CopyIcon from "@mele-wallet/resources/icons/copy.svg";
import Ripple from "react-native-material-ripple";
import { Calculator } from "@mele-wallet/app/common/calculator/calculator";
import { Wallet } from "@mele-wallet/common/utils/wallet";
import { StaticState } from "@mele-wallet/redux/reducers/static-reducer";
import { Actions as UserActions } from "@mele-wallet/app/modules/home/actions";
import { Actions } from "react-native-router-flux";
import { ROUTES } from "@mele-wallet/app/router/routes";
import { MeleCalculator } from "@mele-wallet/common/mele-calculator/mele-calculator";
import { IAccountModel } from "@mele-wallet/common/model/account.model";
import { Transactions } from "@mele-wallet/app/common/transactions/transactions";
import { LanguageState } from "@mele-wallet/redux/reducers/language-reducer";
import RBSheet from "react-native-raw-bottom-sheet";
import AsyncStorage from "@react-native-community/async-storage";

interface IHomeComponentProps {
	actionCreators: IActionCreators;
	accountState: AccountState;
	staticState: StaticState;
	languageState: LanguageState;
}

interface IHomeComponentState {
	refreshing: boolean;
	fromStorage: boolean;
	account: IAccountModel | undefined;
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
		};
		this._refresh = this._refresh.bind(this);
	}

	componentDidMount() {
		this.props.actionCreators.transaction.resetPurchaseFlow;
		this.getData();
	}

	_refresh = async () => {
		this.setState({ refreshing: true });
		await this.props.actionCreators.account.accountSync();
		await this.props.actionCreators.transaction.searchTransactions({
			page: 1,
			size: 100,
			transactionType: undefined,
			transactionStatus: undefined,
			transactionListKeyword: "HOME_RECENT_TRANSACTIONS",
		});
		this.setState({ refreshing: false });
	};

	getData = async () => {
		const value = await AsyncStorage.getItem("account");
		if (value !== null) this.setState({ account: JSON.parse(value) });
		else
			this.setState({
				account: this.props.accountState.account,
			});
	};

	componentDidUpdate() {
		if (this.state.account !== undefined && this.state.fromStorage) {
			this.setState({ fromStorage: false });
			this.setData();
		}
	}

	setData = async () => {
		try {
			await AsyncStorage.setItem(
				"account",
				JSON.stringify(this.props.accountState.account),
			);
		} catch (e) {
			console.log(e);
		}
	};

	render() {
		const localeData = languages[this.props.languageState.currentLanguage];
		const account: IAccountModel =
			this.state.account !== undefined && this.state.fromStorage
				? this.state.account
				: this.props.accountState.account || ({} as any);
		const wallet = Wallet.getWallet(this.props.staticState.mnemonic);
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
								>
									<Text style={[commonStyles.whiteHeader, styles.balance]}>
										$
										{MeleCalculator.centsToUSDFormatted(account.balance || "0")}
									</Text>

									<WiteInfoIcon style={styles.infoIcon} />
								</Ripple>

								<RBSheet
									ref={(ref) => {
										this.RBSheet = ref;
									}}
									openDuration={250}
									height={350}
									customStyles={{
										container: {
											borderTopLeftRadius: 20,
											borderTopRightRadius: 20,
											alignContent: "center",
											alignItems: "center",
										},
									}}
								>
									<View style={[styles.explainerContainer]}>
										<Text
											style={[styles.calculatorText, commonStyles.fontBold]}
										>
											{localeData.home.balancetitle}
										</Text>
										<BlueInfoIcon style={[styles.blueIcon]} />
									</View>
									<View style={[styles.explainerDescription]}>
										<Text style={[styles.calculatorDesc]}>
											{localeData.home.balanceDesc}
										</Text>
									</View>
								</RBSheet>
							</View>
						</View>
						<View style={[styles.barcodeIconContainer]}>
							{!this.props.staticState.accountId ? (
								<Ripple
									onPress={() => {
										Actions.jump(ROUTES.scanQRCode);
									}}
									style={[styles.barcodeIcon]}
									rippleContainerBorderRadius={30}
								>
									<ScanBarcodeIcon />
								</Ripple>
							) : null}
						</View>
					</View>
					<Calculator
						centsAmount={account.balance || "0"}
						style={[styles.calculator]}
					/>

					<Ripple
						style={[styles.walletAddressContainer]}
						onPress={() => {
							Clipboard.setString(wallet.getAddress());
						}}
					>
						<Text
							style={[styles.walletAddress, commonStyles.fontBook]}
							adjustsFontSizeToFit={true}
							numberOfLines={1}
						>
							{this.props.accountState.account?.wallet
								? this.props.accountState.account?.wallet
								: ""}
						</Text>
						<CopyIcon style={[styles.walletCopy]} />
					</Ripple>
				</View>
				<View style={[styles.actions]}>
					<UserActions />
				</View>
				<View style={[styles.transactions]}>
					<Transactions transactionListKeyword="HOME_RECENT_TRANSACTIONS" />
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
	};
};

export const Home = connect(mapStateToProps, mapDispatchToProps)(HomeComponent);
