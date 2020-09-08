import "./styles.ts";
import * as React from "react";
import ErrorIcon from "@mele-wallet/resources/icons/error.svg";
import { ViewProps, View, Text } from "react-native";
import { styles } from "./styles";

interface FormErrorProps extends ViewProps {
	message: string | React.ReactNode | undefined;
}

class FormErrorMessageComponent extends React.Component<FormErrorProps> {
	render() {
		const overrideProps = {
			...this.props,
			style: [styles.formMessage, this.props.style],
		};

		if (this.props.message) {
			return (
				<View {...overrideProps}>
					<ErrorIcon width={12} height={12} />
					<Text style={[styles.formMessageText, styles.formMessageError]}>
						{this.props.message}
					</Text>
				</View>
			);
		} else {
			return "";
		}
	}
}

export const FormErrorMessage = FormErrorMessageComponent;
