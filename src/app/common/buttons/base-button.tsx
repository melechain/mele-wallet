import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import ApplicationState from "@mele-wallet/redux/application-state";
import { styles } from "./styles";
import { mapDispatchToProps } from "@mele-wallet/redux/methods/map-dispatch-to-props";
import Ripple from "react-native-material-ripple";
import { Text } from "react-native";
import { IButtonComponentProps } from "@mele-wallet/app/common/buttons/button-props";
interface IBaseButtonProps extends IButtonComponentProps {}

class BaseButtonComponent extends Component<IBaseButtonProps> {
	getDisabledOverlay = () => {
		if (this.props.disabled) {
			return <View style={styles.baseButtonDisabled} />;
		}
		return null;
	};
	render() {
		const text = this.props.text ? (
			<Text style={this.props.textStyle}>{this.props.text}</Text>
		) : null;

		return (
			<Ripple {...this.props}>
				{text || this.props.children}
				{this.getDisabledOverlay()}
			</Ripple>
		);
	}
}

const mapStateToProps = (state: ApplicationState) => {
	return {
		accountState: state.account,
	};
};

export const BaseButton = connect(
	mapStateToProps,
	mapDispatchToProps,
)(BaseButtonComponent);
