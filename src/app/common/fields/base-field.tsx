import React, { Component } from "react";
import { View, TextInput } from "react-native";
import { connect } from "react-redux";
import ApplicationState from "@mele-wallet/redux/application-state";
import { styles } from "./styles";
import { mapDispatchToProps } from "@mele-wallet/redux/methods/map-dispatch-to-props";
import Ripple from "react-native-material-ripple";
import { Text } from "react-native";
import { IFieldComponentProps } from "./field-props";
import { commonStyles } from "@mele-wallet/app/common/styles/common-styles";
import { FormErrorMessage } from "@mele-wallet/app/common/form-message/form-error-message";
import ShieldGreenIcon from "@mele-wallet/resources/icons/shield-green.svg";

interface IBaseFieldProps extends IFieldComponentProps {}

class BaseFieldComponent extends Component<IBaseFieldProps> {
	getDisabledOverlay = () => {
		if (this.props.editable === false || this.props.disabled) {
			return <View style={styles.baseFieldDisabled} />;
		}
		return null;
	};
	render() {
		const newProps = {
			...this.props,
			editable: this.props.editable || !this.props.disabled,
		};

		const fieldStyles = [styles.field];
		if (this.props.errors && this.props.errors.length > 0) {
			fieldStyles.push(styles.fieldError as any);
		}
		if (this.props.success) {
			fieldStyles.push(styles.fieldSuccess as any);
		}

		return (
			<View style={[this.props.style, styles.fieldContainer]}>
				<View style={fieldStyles}>
					{this.getIconLeft()}
					<TextInput
						{...newProps}
						style={[styles.textInput, commonStyles.fontBold]}
					/>
					{this.getIconRight()}
					{this.getDisabledOverlay()}
				</View>
				{this.getErrors()}
			</View>
		);
	}
	getErrors = () => {
		if (!this.props.errors) {
			return null;
		}
		return this.props.errors.map((error: string, index: number) => {
			return (
				<FormErrorMessage
					key={index}
					message={error}
					style={{
						marginTop: 5,
					}}
				/>
			);
		});
	};

	getIconLeft = () => {
		if (!this.props.iconLeft) {
			return null;
		}
		return (
			<View style={[styles.iconLeftStyle, this.props.iconLeftStyle]}>
				{this.props.iconLeft}
			</View>
		);
	};

	getIconRight = () => {
		if (this.props.iconRight) {
			return (
				<View style={[styles.iconRightStyle, this.props.iconRightStyle]}>
					{this.props.iconRight}
				</View>
			);
		}

		if (this.props.success) {
			return (
				<View style={[styles.iconRightStyle, this.props.iconRightStyle]}>
					<ShieldGreenIcon width={14} height={16} />
				</View>
			);
		}
		return null;
	};
}

const mapStateToProps = (state: ApplicationState) => {
	return {
		accountState: state.account,
	};
};

export const BaseField = connect(
	mapStateToProps,
	mapDispatchToProps,
)(BaseFieldComponent);
