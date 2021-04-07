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
import { ScrollView, Image, Text, View } from "react-native";
import { Actions } from "react-native-router-flux";
import { ROUTES } from "@mele-wallet/app/router/routes";
import { TransactionState } from "@mele-wallet/redux/reducers/transaction-reducer";
import NoCoins from "@mele-wallet/resources/images/no-coins-image.svg";

interface INoCoinsAvailableProps {
	languageState: LanguageState;
	transactionState: TransactionState;
	actionCreators: IActionCreators;
}

class NoCoinsAvailableComponent extends React.Component<
	INoCoinsAvailableProps
> {
	buyCoins = () => {
		this.props.actionCreators.transaction.resetSendFlow();
		Actions.jump(ROUTES.authenticated.buy);
	};
	render() {
		return (
			<ScrollView
				style={[styles.scrollView]}
				contentContainerStyle={styles.noCoinsContent}
			>
				<View style={[styles.content]}>
					<Text style={[styles.initErrorTitle, commonStyles.blackHeader]}>
						You have no coins yet! Purchase MELC to get started.
					</Text>
					<Text style={[styles.initContainer]}>
						You need to have some coins in order to make a transfer!
					</Text>

					<BlueButton
						text="Purchase Coins"
						onPress={() => {
							this.buyCoins();
						}}
						style={styles.purchaseCoins}
						textStyle={styles.noTransactionsContainerButtonText}
					/>
				</View>
				<View style={[styles.noCoinsContainer]}>
					<NoCoins width={700} height={600} style={{ marginLeft: 120 }} />
				</View>
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
export const NoCoinsAvailable = connect(
	mapStateToProps,
	mapDispatchToProps,
)(NoCoinsAvailableComponent);
