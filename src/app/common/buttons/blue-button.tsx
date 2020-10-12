import React, { Component } from "react";
import { connect } from "react-redux";
import ApplicationState from "@mele-wallet/redux/application-state";
import { styles } from "./styles";
import { mapDispatchToProps } from "@mele-wallet/redux/methods/map-dispatch-to-props";
import { commonStyles } from "@mele-wallet/app/common/styles/common-styles";
import { IButtonComponentProps } from "@mele-wallet/app/common/buttons/button-props";
import { BaseButton } from "./base-button";

class BlueButtonComponent extends Component<IButtonComponentProps> {
	render() {
		const newProps = {
			...this.props,
			style: [styles.button, styles.blueButton, this.props.style],
		};
		return (
			<BaseButton
				{...newProps}
				textStyle={[commonStyles.buttonWhiteText, this.props.textStyle || {}]}
			/>
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
