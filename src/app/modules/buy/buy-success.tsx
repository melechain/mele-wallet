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

class BuySuccessComponent extends React.Component<IBuysSuccessProps> {
	goToHistory = async () => {
		this.props.actionCreators.transaction.resetPurchaseFlow();
		Actions.jump(ROUTES.authenticated.history);
	};

	componentDidMount() {
		this.props.actionCreators.transaction.searchTransactions({
			page: 1,
			size: 100,
			transactionType: "purchase",
			transactionStatus: undefined,
			transactionListKeyword: "HISTORY_PURCHASES",
		});
	}

	render() {
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
					Thank you!
				</Text>
				<Text style={[styles.initContainer]}>
					Your order is placed and can be viewed under transactions page as
					pending until the admin approves that you have made the payment.
				</Text>

				<BlueButton
					text="Transactions"
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
