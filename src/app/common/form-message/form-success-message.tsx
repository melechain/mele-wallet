import "./styles.ts";
import * as React from "react";
import { ViewProps, View, Text } from "react-native";
import { styles } from "./styles";

interface FormSuccessProps extends ViewProps {
	message: string | React.ReactNode | undefined;
}
class FormSuccessMessageComponent extends React.Component<FormSuccessProps> {
	render() {
		const overrideProps = {
			...this.props,
			style: [styles.formMessage, this.props.style],
		};

		if (this.props.message) {
			return (
				<View {...overrideProps}>
					<Text style={[styles.formMessageText, styles.formMessageSuccess]}>
						{this.props.message}
					</Text>
				</View>
			);
		} else {
			return "";
		}
	}
}

export const FormSuccessMessage = FormSuccessMessageComponent;
