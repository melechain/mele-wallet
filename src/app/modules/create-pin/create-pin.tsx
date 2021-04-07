import React, { Component } from "react";
import {
	Button,
	View,
	Text,
	Image,
	Switch,
	ScrollView,
	Alert,
} from "react-native";
import Clipboard from "@react-native-community/clipboard";
import { connect } from "react-redux";
import ApplicationState from "@mele-wallet/redux/application-state";
import {
	mapDispatchToProps,
	IActionCreators,
} from "@mele-wallet/redux/methods/map-dispatch-to-props";
import { AccountState } from "@mele-wallet/redux/reducers/account-reducer";
import { commonStyles } from "@mele-wallet/app/common/styles/common-styles";
import { styles } from "./styles";
import { Pin } from "@mele-wallet/app/common/pin-component/pin-component";
import { Actions } from "react-native-router-flux";
import { ROUTES } from "@mele-wallet/app/router/routes";
//import BackButton from "@mele-wallet/resources/icons/back-arrow.png";
import { StaticState } from "@mele-wallet/redux/reducers/static-reducer";

interface ICreatePinComponentProps {
	actionCreators: IActionCreators;
	accountState: AccountState;
	staticState: StaticState;
	mnemonic: string;
}

class CreatePinComponent extends Component<ICreatePinComponentProps> {
	constructor(props: ICreatePinComponentProps) {
		super(props);
	}

	render() {
		return (
			<ScrollView
				style={[commonStyles.blueBackground, styles.scrollView]}
				contentContainerStyle={styles.content}
			>
				<View style={styles.topContainer}>
					<Text style={[commonStyles.whiteSubHeader, styles.headerText]}>
						Choose your PIN
					</Text>
					<Text style={[commonStyles.fontBook, styles.subHeaderText]}>
						You will use your PIN to access your wallet.
					</Text>
				</View>
				<Pin
					onPinReady={(pin: string) => {
						if (this.props.staticState.accountId) {
							Actions.jump(ROUTES.nonAuthenticated.confirmPin, {
								mnemonic: this.props.mnemonic,
								pin: pin,
								accountId: this.props.staticState.accountId,
							});
						} else {
							Actions.jump(ROUTES.nonAuthenticated.confirmPin, {
								mnemonic: this.props.mnemonic,
								pin: pin,
							});
						}
					}}
					style={styles.pinContainer}
				/>
			</ScrollView>
		);
	}
}

const mapStateToProps = (state: ApplicationState) => {
	return {
		accountState: state.account,
		staticState: state.static,
	};
};

export const CreatePin = connect(
	mapStateToProps,
	mapDispatchToProps,
)(CreatePinComponent);
