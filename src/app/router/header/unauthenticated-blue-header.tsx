import React, { Component } from "react";
import { ViewProps, View, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import BackButton from "@mele-wallet/resources/icons/back-arrow-white.svg";
import LockGreen from "@mele-wallet/resources/icons/lock-green.svg";
import { commonStyles } from "@mele-wallet/app/common/styles/common-styles";
import { Actions } from "react-native-router-flux";

export interface HeaderComponentProps extends ViewProps {}

export class UnauthenticatedBlueHeader extends Component<HeaderComponentProps> {
	render() {
		return (
			<View style={[styles.content, commonStyles.blueBackground]}>
				<View style={styles.navigation}>
					<View style={styles.buttonContainer}>
						<TouchableOpacity
							style={styles.backButton}
							onPress={() => {
								Actions.pop();
							}}
						>
							<BackButton height={20} width={20} />
							<Text style={[styles.text, commonStyles.fontBold]}>Back</Text>
						</TouchableOpacity>
					</View>

					<LockGreen height={20} width={20} style={styles.lock_icon} />
				</View>
			</View>
		);
	}
}
