import React, { Component } from "react";
import { Button, View, Text, Image, Switch } from "react-native";
import { connect } from "react-redux";
import ApplicationState from "@mele-wallet/redux/application-state";
import {
	mapDispatchToProps,
	IActionCreators,
} from "@mele-wallet/redux/methods/map-dispatch-to-props";
import { AccountState } from "@mele-wallet/redux/reducers/account-reducer";
import { commonStyles } from "@mele-wallet/app/common/styles/common-styles";
import { styles } from "./styles";
import WalletLogo from "@mele-wallet/resources/images/wallet-logo.svg";
import CopyIcon from "@mele-wallet/resources/icons/copy.svg";
import Ripple from "react-native-material-ripple";
import { BlueButton } from "@mele-wallet/app/common/bottons/blue-button";

interface ICreateWalletComponentProps {
	actionCreators: IActionCreators;
	accountState: AccountState;
}
interface ICreateWalletComponentState {
	agreeConditions: boolean;
}

class CreateWalletComponent extends Component<
	ICreateWalletComponentProps,
	ICreateWalletComponentState
> {
	constructor(props: ICreateWalletComponentProps) {
		super(props);
		this.state = {
			agreeConditions: false,
		};
	}
	render() {
		return (
			<View style={[commonStyles.whiteBackground, styles.content]}>
				<WalletLogo
					style={{
						marginTop: 35,
						width: 81,
						height: 71,
					}}
				/>
				<Text style={[commonStyles.blackSubHeader, styles.headerText]}>
					Store your passphrase carefully!
				</Text>
				<Text style={[commonStyles.blackSubHeader, styles.description]}>
					You will use you passphrase to restore your wallet.
				</Text>

				<View style={styles.wordsContainer}>
					<View style={styles.word}>
						<Text style={[styles.wordNumber, commonStyles.fontBold]}>1</Text>
						<Text style={[styles.wordText, commonStyles.fontBook]}>hello</Text>
					</View>
					<View style={styles.word}>
						<Text style={[styles.wordNumber, commonStyles.fontBold]}>1</Text>
						<Text style={[styles.wordText, commonStyles.fontBook]}>hello</Text>
					</View>
					<View style={styles.word}>
						<Text style={[styles.wordNumber, commonStyles.fontBold]}>1</Text>
						<Text style={[styles.wordText, commonStyles.fontBook]}>hello</Text>
					</View>

					<View style={styles.word}>
						<Text style={[styles.wordNumber, commonStyles.fontBold]}>1</Text>
						<Text style={[styles.wordText, commonStyles.fontBook]}>hello</Text>
					</View>
					<View style={styles.word}>
						<Text style={[styles.wordNumber, commonStyles.fontBold]}>1</Text>
						<Text style={[styles.wordText, commonStyles.fontBook]}>hello</Text>
					</View>
					<View style={styles.word}>
						<Text style={[styles.wordNumber, commonStyles.fontBold]}>1</Text>
						<Text style={[styles.wordText, commonStyles.fontBook]}>hello</Text>
					</View>

					<View style={styles.word}>
						<Text style={[styles.wordNumber, commonStyles.fontBold]}>1</Text>
						<Text style={[styles.wordText, commonStyles.fontBook]}>hello</Text>
					</View>
					<View style={styles.word}>
						<Text style={[styles.wordNumber, commonStyles.fontBold]}>1</Text>
						<Text style={[styles.wordText, commonStyles.fontBook]}>hello</Text>
					</View>
					<View style={styles.word}>
						<Text style={[styles.wordNumber, commonStyles.fontBold]}>1</Text>
						<Text style={[styles.wordText, commonStyles.fontBook]}>hello</Text>
					</View>
					<Ripple style={[styles.copyButtonContainer]}>
						<View style={[styles.copyButton]}>
							<CopyIcon style={[styles.copyIcon]} />
							<Text style={[styles.copyText, commonStyles.fontBold]}>
								Copy to clipboard
							</Text>
						</View>
					</Ripple>
				</View>
				<View style={styles.agreeConditionsContainer}>
					<View style={styles.agreeConditionsTextContainer}>
						<Text
							style={[commonStyles.blackSmallText, styles.agreeConditionsText]}
						>
							I understand that it is my {`\n`}responsibility to keep my
							passphrase safe.
						</Text>
					</View>
					<Switch
						trackColor={{ false: "#ECF0F5", true: "#ECF0F5" }}
						thumbColor={this.state.agreeConditions ? "#013EC4" : "#ECF0F5"}
						ios_backgroundColor="#ECF0F5"
						onValueChange={() => {
							this.setState({
								agreeConditions: !this.state.agreeConditions,
							});
						}}
						value={this.state.agreeConditions}
					/>
				</View>
				<BlueButton style={styles.confirmButton} text="I wrote it down" />
			</View>
		);
	}
}

const mapStateToProps = (state: ApplicationState) => {
	return {
		accountState: state.account,
	};
};

export const CreateWallet = connect(
	mapStateToProps,
	mapDispatchToProps,
)(CreateWalletComponent);
