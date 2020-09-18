import React, { Component } from "react";
import { connect } from "react-redux";
import ApplicationState from "@mele-wallet/redux/application-state";
import { mapDispatchToProps } from "@mele-wallet/redux/methods/map-dispatch-to-props";

import { BaseField } from "./base-field";
import { IFieldComponentProps } from "./field-props";

class TextFieldComponent extends Component<IFieldComponentProps> {
	render() {
		const newProps = {
			...this.props,
			style: [this.props.style],
		};
		return <BaseField {...newProps} />;
	}
}

const mapStateToProps = (state: ApplicationState) => {
	return {
		accountState: state.account,
	};
};

export const TextField = connect(
	mapStateToProps,
	mapDispatchToProps,
)(TextFieldComponent);
