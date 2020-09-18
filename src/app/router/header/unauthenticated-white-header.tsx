import React, { Component } from "react";
import {
	ViewProps,
	View,
	Text,
	TouchableOpacity,
	BackHandler,
} from "react-native";
import { styles } from "./styles";
import BackButton from "@mele-wallet/resources/icons/back-arrow.svg";
import LockGreen from "@mele-wallet/resources/icons/lock-green.svg";
import { commonStyles } from "@mele-wallet/app/common/styles/common-styles";
import { Actions } from "react-native-router-flux";
import { Action } from "@mele-wallet/app/modules/home/actions";

export interface HeaderComponentProps extends ViewProps {
	title?: string;
	refreshOnBack?: boolean;
	componentKey: string;
}

export class UnauthenticatedWhiteHeader extends Component<
	HeaderComponentProps
> {
	componentDidMount() {
		BackHandler.addEventListener("hardwareBackPress", this.backAction);
		return () => {
			BackHandler.removeEventListener("hardwareBackPress", this.backAction);
		};
	}

	backAction = () => {
		console.log(this.props);
		if (Actions.currentScene !== this.props.componentKey) {
			return false;
		}
		Actions.pop();
		if (this.props.refreshOnBack) {
			setTimeout(() => {
				Actions.refresh({ key: Math.random() });
			}, 1);
		}
		return true;
	};

	render() {
		return (
			<View style={[styles.content, commonStyles.whiteBackground]}>
				<View style={styles.navigation}>
					<View style={styles.buttonContainer}>
						<TouchableOpacity
							style={styles.backButton}
							onPress={this.backAction}
						>
							<BackButton height={22} width={22} />
							{/* <Text style={[styles.text, commonStyles.fontBold]}>
                                Back
                            </Text> */}
						</TouchableOpacity>

						<Text
							style={[
								styles.text,
								commonStyles.fontBold,
								commonStyles.blackSubHeader,
							]}
						>
							{this.props.title}
						</Text>
					</View>
				</View>
			</View>
		);
	}
}
