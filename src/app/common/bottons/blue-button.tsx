import React, { Component } from "react";
import { ViewProps } from "react-native";
import { connect } from "react-redux";
import ApplicationState from "@mele-wallet/redux/application-state";
import { AccountState } from "@mele-wallet/redux/reducers/account-reducer";
import { styles } from "./styles";
import {
	IActionCreators,
	mapDispatchToProps,
} from "@mele-wallet/redux/methods/map-dispatch-to-props";
import Ripple from "react-native-material-ripple";
import { commonStyles } from "@mele-wallet/app/common/styles/common-styles";
import { Text } from "react-native";
import { IButtonComponentProps } from "@mele-wallet/app/common/bottons/button-props";

class BlueButtonComponent extends Component<IButtonComponentProps> {
	render() {
		const text = this.props.text ? (
			<Text style={commonStyles.buttonWhiteText}>{this.props.text}</Text>
		) : null;
		const newProps = {
			...this.props,
			style: {
				...styles.button,
				...styles.blueButton,
				...(this.props.style as any),
			},
		};

		return (
			<Ripple onPress={() => {}} {...newProps}>
				{text || this.props.children}
			</Ripple>
		);
	}
}

const mapStateToProps = (state: ApplicationState) => {
	return {
		accountState: state.account,
	};
};

export const BlueButton = connect(
	mapStateToProps,
	mapDispatchToProps,
)(BlueButtonComponent);
