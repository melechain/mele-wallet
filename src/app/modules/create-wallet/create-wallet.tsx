import React, { Component } from "react";
import { Button, View, Text, Image, Switch, ScrollView } from "react-native";
import Clipboard from "@react-native-community/clipboard";

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
import { BlueButton } from "@mele-wallet/app/common/buttons/blue-button";
import { Mele, MnemonicSigner, Utils } from "mele-sdk";
import { Actions } from "react-native-router-flux";
import { ROUTES } from "@mele-wallet/app/router/routes";

interface ICreateWalletComponentProps {
	actionCreators: IActionCreators;
	accountState: AccountState;
}
interface ICreateWalletComponentState {
	agreeConditions: boolean;
	mnemonic: string[];
}

class CreateWalletComponent extends Component<
	ICreateWalletComponentProps,
	ICreateWalletComponentState
> {
	constructor(props: ICreateWalletComponentProps) {
		super(props);
		this.state = {
			agreeConditions: false,
			mnemonic: [],
		};
	}
	componentWillUnmount() {
		this.setState({
			mnemonic: [],
		});
	}
	componentDidMount() {
		this.setNewMnemonic();
	}

	setNewMnemonic = () => {
		this.setState({
			mnemonic: this.generateMnemonic(),
		});
	};

	render() {
		return (
			<ScrollView
				style={[commonStyles.whiteBackground, styles.scrollView]}
				contentContainerStyle={styles.content}
			>
				<WalletLogo style={styles.walletLogo} />
				<Text style={[commonStyles.blackSubHeader, styles.headerText]}>
					Store your passphrase carefully!
				</Text>
				<Text style={[commonStyles.blackSubHeader, styles.description]}>
					You will use you passphrase to restore your wallet.
				</Text>

				<View style={styles.wordsContainer}>
					{this.state.mnemonic.map((word: string, index: number) => {
						return (
							<View style={styles.word} key={index}>
								<Text style={[styles.wordNumber, commonStyles.fontBold]}>
									{index + 1}
								</Text>
								<Text style={[styles.wordText, commonStyles.fontBook]}>
									{word}
								</Text>
							</View>
						);
					})}

					<Ripple
						style={[styles.copyButtonContainer]}
						onPress={() => {
							Clipboard.setString(this.state.mnemonic.join(" "));
						}}
					>
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
				<BlueButton
					disabled={!this.state.agreeConditions}
					onPress={() => {
						Actions.jump(ROUTES.nonAuthenticated.confirmWallet, {
							mnemonic: this.state.mnemonic,
							backHandler: this.setNewMnemonic,
						});
					}}
					style={styles.confirmButton}
					text="I wrote it down"
				/>
			</ScrollView>
		);
	}

	generateMnemonic = () => {
		return Utils.generateMnemonic().split(" ").slice(0, 12);
	};
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
