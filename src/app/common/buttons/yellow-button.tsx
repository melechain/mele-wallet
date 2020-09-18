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
import { commonStyles } from "@mele-wallet/app/common/styles/common-styles";
import { IButtonComponentProps } from "./button-props";
import { BaseButton } from "./base-button";

class YellowButtonComponent extends Component<IButtonComponentProps> {
	render() {
		const newProps = {
			...this.props,
			style: [styles.button, styles.yellowButton, this.props.style],
		};
		return (
			<BaseButton {...newProps} textStyle={commonStyles.buttonBlackText} />
		);
	}
}

const mapStateToProps = (state: ApplicationState) => {
	return {
		accountState: state.account,
	};
};

export const YellowButton = connect(
	mapStateToProps,
	mapDispatchToProps,
)(YellowButtonComponent);
