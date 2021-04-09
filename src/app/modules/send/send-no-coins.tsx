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
import ShieldRedIcon from "@mele-wallet/resources/icons/shielded-error.svg";

interface ISendNoCoinsProps {
	languageState: LanguageState;
	transactionState: TransactionState;
	actionCreators: IActionCreators;
}

class SendNoCoinsComponent extends React.Component<ISendNoCoinsProps> {
	buyCoins = () => {
		this.props.actionCreators.transaction.resetSendFlow();
		Actions.jump(ROUTES.authenticated.buy);
	};
	render() {
		StatusBar.setBarStyle("dark-content", true);
		return (
			<ScrollView
				style={[styles.scrollView]}
				contentContainerStyle={styles.content}
			>
				<View style={[styles.errorIconContainer]}>
					<ShieldRedIcon width={90} height={90} />
				</View>
				<Text style={[styles.initErrorTitle, commonStyles.blackHeader]}>
					You don't have enough coins!
				</Text>
				<Text style={[styles.initContainer]}>
					You don't have enough coins to make this transaction.
				</Text>

				<BlueButton
					text="Purchase Coins"
					onPress={() => {
						this.buyCoins();
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
export const SendNoCoins = connect(
	mapStateToProps,
	mapDispatchToProps,
)(SendNoCoinsComponent);
