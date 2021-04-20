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

interface IHistoryComponentProps {
	actionCreators: IActionCreators;
	accountState: AccountState;
	languageState: LanguageState;
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
		await this.props.actionCreators.account.accountSync();
		this.props.actionCreators.transaction.searchTransactions({
			page: 1,
			size: 100,
			transactionType: undefined,
			transactionStatus: undefined,
			transactionListKeyword: "HISTORY_PURCHASES",
		});
		this.setState({ refreshing: false });
	};

	componentDidMount() {
		this.props.actionCreators.transaction.resetPurchaseFlow;
		this.setState({
			activeTab: 0,
		});
	}

	render() {
		const localeData = languages[this.props.languageState.currentLanguage];
		const TAB_CONFIG: ITabConfig[] = [
			{
				title: localeData.transactions.purchase,
				transactionListKeyword: "HISTORY_PURCHASES",
				filter: {
					transactionType: "purchase",
				},
			},
			{
				title: localeData.transactions.transfer,
				transactionListKeyword: "HISTORY_TRANSFERS",
				filter: {
					transactionType: "transfer",
				},
				customEmptyScreen: <Text>{localeData.transactions.noTransfer}</Text>,
			},
		];

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
					{TAB_CONFIG.map(this.getTab)}
					<View style={[styles.tabPlaceHolder]} />
				</View>
				<Transactions
					{...TAB_CONFIG[this.state.activeTab].filter}
					{...TAB_CONFIG[this.state.activeTab]}
				/>
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
	};
};

export const History = connect(
	mapStateToProps,
	mapDispatchToProps,
)(HistoryComponent);
