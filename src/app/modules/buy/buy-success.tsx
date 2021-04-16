import { commonStyles } from "@mele-wallet/app/common/styles/common-styles";
import { styles } from "./styles";
import ApplicationState from "@mele-wallet/redux/application-state";
import {
	IActionCreators,
	mapDispatchToProps,
} from "@mele-wallet/redux/methods/map-dispatch-to-props";
import { LanguageState } from "@mele-wallet/redux/reducers/language-reducer";
import React from "react";
import { connect } from "react-redux";
import { BlueButton } from "@mele-wallet/app/common/buttons/blue-button";
import { ScrollView, Image, Text, View, StatusBar } from "react-native";
import { Actions } from "react-native-router-flux";
import { ROUTES } from "@mele-wallet/app/router/routes";
import { TransactionState } from "@mele-wallet/redux/reducers/transaction-reducer";
import ShieldGreenIcon from "@mele-wallet/resources/icons/shield-green.svg";

interface IBuysSuccessProps {
	languageState: LanguageState;
	transactionState: TransactionState;
	actionCreators: IActionCreators;
}

const languages = {
	en: require("../../translations/en.json"),
	ar: require("../../translations/ar.json"),
};

class BuySuccessComponent extends React.Component<IBuysSuccessProps> {
	goToHistory = async () => {
		this.props.actionCreators.transaction.resetPurchaseFlow();
		Actions.jump(ROUTES.authenticated.history);
	};

	componentDidMount() {
		this.props.actionCreators.transaction.searchTransactions({
			page: 1,
			size: 100,
			transactionType: undefined,
			transactionStatus: undefined,
			transactionListKeyword: "HISTORY_PURCHASES",
		});
	}

	componentWillUnmount() {
		this.props.actionCreators.transaction.searchTransactions({
			page: 1,
			size: 50,
			transactionType: undefined,
			transactionStatus: undefined,
			transactionListKeyword: "HOME_RECENT_TRANSACTIONS",
		});
	}

	render() {
		const localeData = languages[this.props.languageState.currentLanguage];
		StatusBar.setBarStyle("dark-content", true);
		return (
			<ScrollView
				style={[styles.scrollView]}
				contentContainerStyle={styles.content}
			>
				<View style={[styles.successIconContainer]}>
					<ShieldGreenIcon width={90} height={90} />
				</View>
				<Text style={[styles.initTitle, commonStyles.blackHeader]}>
					{localeData.buyCoins.successTitle}
				</Text>
				<Text style={[styles.initContainer]}>
					{localeData.buyCoins.succcessDescription}
				</Text>

				<BlueButton
					text={localeData.buyCoins.succcessButton}
					onPress={() => {
						this.goToHistory();
					}}
					style={styles.purchaseCoins}
					textStyle={styles.noTransactionsContainerButtonText}
				/>
			</ScrollView>
		);
	}
}

const mapStateToProps = (state: ApplicationState) => {
	return {
		languageState: state.language,
		transactionState: state.transaction,
	};
};
export const BuySuccess = connect(
	mapStateToProps,
	mapDispatchToProps,
)(BuySuccessComponent);
