import React, { Component } from "react";
import { View, Text, ScrollView, BackHandler } from "react-native";
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
import { LanguageState } from "@mele-wallet/redux/reducers/language-reducer";

interface IChangePinComponentProps {
	actionCreators: IActionCreators;
	accountState: AccountState;
	staticState: StaticState;
	languageState: LanguageState;
	mnemonic: string;
	from: string;
}

const languages = {
	en: require("../../translations/en.json"),
	ar: require("../../translations/ar.json"),
};

class ChangePinComponent extends Component<IChangePinComponentProps> {
	constructor(props: IChangePinComponentProps) {
		super(props);
	}

	render() {
		const localeData =
			this.props.languageState !== undefined
				? languages[this.props.languageState.currentLanguage]
				: languages["en"];
		return (
			<ScrollView
				style={[commonStyles.blueBackground, styles.scrollView]}
				contentContainerStyle={styles.content}
			>
				<View style={styles.topContainer}>
					<Text style={[commonStyles.whiteSubHeader, styles.headerText]}>
						{localeData.pin.edit}
					</Text>
					<Text style={[commonStyles.fontBook, styles.subHeaderText]}>
						{localeData.pin.chooseDescription}
					</Text>
				</View>
				<Pin
					onPinReady={(pin: string) => {
						Actions.jump(ROUTES.nonAuthenticated.confirmPin, {
							mnemonic: this.props.mnemonic,
							pin: pin,
							accountId: this.props.staticState.accountId,
						});
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
		languageState: state.language,
	};
};

export const ChangePin = connect(
	mapStateToProps,
	mapDispatchToProps,
)(ChangePinComponent);
