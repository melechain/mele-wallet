import React, { Component } from "react";
import {
	Button,
	View,
	Text,
	ScrollView,
	StatusBar,
	RefreshControl,
} from "react-native";
import { connect } from "react-redux";
import ApplicationState from "@mele-wallet/redux/application-state";
import {
	mapDispatchToProps,
	IActionCreators,
} from "@mele-wallet/redux/methods/map-dispatch-to-props";
import { AccountState } from "@mele-wallet/redux/reducers/account-reducer";
import { styles } from "./styles";
import { commonStyles } from "@mele-wallet/app/common/styles/common-styles";

import Ripple from "react-native-material-ripple";
import { Transactions } from "@mele-wallet/app/common/transactions/transactions";
import { LanguageState } from "@mele-wallet/redux/reducers/language-reducer";
import { WalletState } from "@mele-wallet/redux/reducers/wallet-reducer";

interface IHistoryComponentProps {
	actionCreators: IActionCreators;
	accountState: AccountState;
	languageState: LanguageState;
	walletState: WalletState;
}
interface IHistoryComponentState {
	activeTab: number;
	refreshing: boolean;
}

interface ITabConfig {
	title: string;
	transactionListKeyword: string;
	customEmptyScreen?: React.ReactNode;
	filter: {
		transactionType?: string;
		transactionStatus?: string;
	};
}

const languages = {
	en: require("../../translations/en.json"),
	ar: require("../../translations/ar.json"),
};

class HistoryComponent extends Component<
	IHistoryComponentProps,
	IHistoryComponentState
> {
	constructor(props: IHistoryComponentProps) {
		super(props);
		this.state = {
			activeTab: 0,
			refreshing: false,
		};
		this._refresh = this._refresh.bind(this);
	}

	_refresh = async () => {
		this.setState({ refreshing: true });
		this.props.actionCreators.transaction.searchTransactions(
			this.props.walletState.loadedWalletAddress,
		);
		this.setState({ refreshing: false });
	};

	componentDidMount() {
		if (this.props.walletState.loadedWalletAddress)
			this.props.actionCreators.transaction.searchTransactions(
				this.props.walletState.loadedWalletAddress,
			);
	}

	render() {
		const localeData = languages[this.props.languageState.currentLanguage];

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
				<StatusBar barStyle="light-content" animated={true} />
				<View style={[styles.header, commonStyles.blueBackground]}>
					<Text style={[styles.title, commonStyles.fontBold]}>
						{localeData.transactions.title}
					</Text>
				</View>
				<View style={[styles.tabs]}>
					<View style={[styles.tabPlaceHolder]} />
					<View style={[styles.tabPlaceHolder]} />
				</View>
				<Transactions />
			</ScrollView>
		);
	}

	getTab = (tabConfig: ITabConfig, index: number) => {
		const tabStyle: any = [styles.tab];
		const tabTextStyle: any = [styles.tabText, commonStyles.fontBold];
		if (this.state.activeTab === index) {
			tabStyle.push(styles.activeTab);
			tabTextStyle.push(styles.activeTabText);
		}

		return (
			<Ripple
				style={tabStyle}
				key={index}
				onPress={() => {
					this.setState({
						activeTab: index,
					});
				}}
			>
				<Text style={tabTextStyle}>{tabConfig.title}</Text>
			</Ripple>
		);
	};
}

const mapStateToProps = (state: ApplicationState) => {
	return {
		accountState: state.account,
		languageState: state.language,
		walletState: state.wallet,
	};
};

export const History = connect(
	mapStateToProps,
	mapDispatchToProps,
)(HistoryComponent);
