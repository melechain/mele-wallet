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
import ShieldGreenIcon from "@mele-wallet/resources/icons/shield-green.svg";
import { MeleCalculator } from "@mele-wallet/common/mele-calculator/mele-calculator";

interface ISendSuccessProps {
	languageState: LanguageState;
	transactionState: TransactionState;
	actionCreators: IActionCreators;
}

class SendSuccessComponent extends React.Component<ISendSuccessProps> {
	goToTransactionDetails = () => {
		this.props.actionCreators.account.accountSync();
		this.props.actionCreators.transaction.resetSendFlow();
		Actions.jump(ROUTES.authenticated.transaction, {
			transaction: this.props.transactionState.loadedTransaction,
		});
	};

	goBack = () => {
		this.props.actionCreators.transaction.resetSendFlow();
		Actions.jump(ROUTES.authenticated.send);
	};

	render() {
		return (
			<ScrollView
				style={[styles.scrollView]}
				contentContainerStyle={styles.content}
			>
				<View style={[styles.successIconContainer]}>
					<ShieldGreenIcon width={90} height={90} />
				</View>
				<Text style={[styles.initTitle, commonStyles.blackHeader]}>
					Transaction Successfull!
				</Text>
				<Text style={[styles.initContainer]}>
					<Text style={[commonStyles.fontBold]}>
						{MeleCalculator.centsToUSDFormatted(
							this.props.transactionState.loadedTransaction.amount,
						)}{" "}
						&nbsp;
					</Text>
					USD were successfully transfered to{" "}
					<Text style={[commonStyles.fontBold]}>
						{this.props.transactionState.loadedTransaction?.to.wallet}
					</Text>
				</Text>
				<View style={[styles.buttonsContainer]}>
					<BlueButton
						text="Transaction Details"
						onPress={() => {
							this.goToTransactionDetails();
						}}
						style={styles.successConfirm}
						textStyle={styles.succesContainerButtonText}
					/>
					<BlueButton
						text="Go Back"
						onPress={() => {
							this.goBack();
						}}
						style={styles.successGoBack}
						textStyle={styles.successGoBackButtonText}
					/>
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
export const SendSuccess = connect(
	mapStateToProps,
	mapDispatchToProps,
)(SendSuccessComponent);
