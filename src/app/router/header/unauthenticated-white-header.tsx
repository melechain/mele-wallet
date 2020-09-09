import React, { Component } from "react";
import { ViewProps, View, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import BackButton from "@mele-wallet/resources/icons/back-arrow.svg";
import LockGreen from "@mele-wallet/resources/icons/lock-green.svg";
import { commonStyles } from "@mele-wallet/app/common/styles/common-styles";
import { Actions } from "react-native-router-flux";

export interface HeaderComponentProps extends ViewProps {
	title?: string;
	refreshOnBack?: boolean;
}

export class UnauthenticatedWhiteHeader extends Component<
	HeaderComponentProps
> {
	render() {
		return (
			<View style={[styles.content, commonStyles.whiteBackground]}>
				<View style={styles.navigation}>
					<View style={styles.buttonContainer}>
						<TouchableOpacity
							style={styles.backButton}
							onPress={() => {
								//Actions.popAndPush(ROUTES.nonAuthenticated.createWallet, { key: Math.random() })
								Actions.pop();
								if (this.props.refreshOnBack) {
									setTimeout(() => {
										Actions.refresh({ key: Math.random() });
									}, 1);
								}
							}}
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
