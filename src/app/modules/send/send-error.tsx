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
import { ScrollView, StatusBar, Text, View } from "react-native";
import { TransactionState } from "@mele-wallet/redux/reducers/transaction-reducer";
import ShieldRedIcon from "@mele-wallet/resources/icons/shielded-error.svg";

interface ISendErrorProps {
	languageState: LanguageState;
	transactionState: TransactionState;
	actionCreators: IActionCreators;
}

class SendErrorComponent extends React.Component<ISendErrorProps> {
	tryAgain = () => {
		this.props.actionCreators.transaction.resetSendFlow();
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
					This address doesn't exist!
				</Text>
				<Text style={[styles.initContainer]}>
					Make sure you have entered the address correctly or check back with
					the recepient to confirm the correct address.
				</Text>

				<BlueButton
					text="Try Again"
					onPress={() => {
						this.tryAgain();
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
export const SendError = connect(
	mapStateToProps,
	mapDispatchToProps,
)(SendErrorComponent);
