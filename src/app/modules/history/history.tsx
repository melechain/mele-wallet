import React, { Component } from "react";
import { Button, View, Text, ScrollView, StatusBar } from "react-native";
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

interface IHistoryComponentProps {
	actionCreators: IActionCreators;
	accountState: AccountState;
}
interface IHistoryComponentState {
	activeTab: number;
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
const TAB_CONFIG: ITabConfig[] = [
	{
		title: "Purchase",
		transactionListKeyword: "HISTORY_PURCHASES",
		filter: {
			transactionType: "purchase",
		},
	},
	{
		title: "Transfer",
		transactionListKeyword: "HISTORY_TRANSFERS",
		filter: {
			transactionType: "transfer",
		},
		customEmptyScreen: <Text>No recent Transfers!</Text>,
	},
];

class HistoryComponent extends Component<
	IHistoryComponentProps,
	IHistoryComponentState
> {
	constructor(props: IHistoryComponentProps) {
		super(props);
		this.state = {
			activeTab: 0,
		};
	}

	render() {
		return (
			<ScrollView
				style={[styles.scrollView]}
				contentContainerStyle={styles.content}
			>
				<StatusBar barStyle="light-content" animated={true} />
				<View style={[styles.header, commonStyles.blueBackground]}>
					<Text style={[styles.title, commonStyles.fontBold]}>
						Transactions History
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
	};
};

export const History = connect(
	mapStateToProps,
	mapDispatchToProps,
)(HistoryComponent);
