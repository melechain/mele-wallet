import React, { Component } from "react";
import {
	Button,
	View,
	Text,
	Image,
	Switch,
	ScrollView,
	BackHandler,
} from "react-native";
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
import { TextField } from "@mele-wallet/app/common/fields/text-field";
import { Random } from "@mele-wallet/app/common/utils/random";
import { Actions } from "react-native-router-flux";
import { ROUTES } from "@mele-wallet/app/router/routes";

interface IConfirmWalletComponentProps {
	actionCreators: IActionCreators;
	accountState: AccountState;
	mnemonic: string[];
}
interface IConfirmWalletComponentState {
	agreeConditions: boolean;
	mnemonicConfirmFields: number[];
	enteredWords: string[];
}

class ConfirmWalletComponent extends Component<
	IConfirmWalletComponentProps,
	IConfirmWalletComponentState
> {
	constructor(props: IConfirmWalletComponentProps) {
		super(props);
		this.state = {
			agreeConditions: false,
			mnemonicConfirmFields: [],
			enteredWords: [],
		};
	}

	componentDidMount() {
		this.setState({
			mnemonicConfirmFields: Random.getRandomIntegersSetInRange(0, 11, 2),
		});
	}

	render() {
		return (
			<ScrollView
				style={[commonStyles.whiteBackground, styles.scrollView]}
				contentContainerStyle={styles.content}
			>
				<WalletLogo style={styles.walletLogo} />
				<Text style={[commonStyles.blackSubHeader, styles.headerText]}>
					Please enter these two words from your passphrase
				</Text>
				<Text style={[commonStyles.blackSubHeader, styles.description]}>
					and ensure you have kept a record!
				</Text>
				<View style={styles.textInputs}>
					{this.state.mnemonicConfirmFields.map((index: number) => {
						const currentIndex = index + 1;

						const errors: string[] = [];
						let success = false;
						if (
							this.state.enteredWords[index] &&
							this.state.enteredWords[index] != this.props.mnemonic[index]
						) {
							errors.push("Invalid word!");
						} else if (
							this.state.enteredWords[index] == this.props.mnemonic[index]
						) {
							success = true;
						}

						return (
							<TextField
								autoCapitalize="none"
								key={index}
								style={styles.textInput}
								iconLeft={
									<Text style={[commonStyles.fontBold]}>#{currentIndex}</Text>
								}
								placeholder={`Enter Word #${currentIndex}`}
								onChangeText={(text: string) => {
									const enteredWords = this.state.enteredWords;
									enteredWords[index] = text;
									this.setState({
										enteredWords: enteredWords,
									});
								}}
								value={this.state.enteredWords[index] || ""}
								errors={errors}
								success={success}
							/>
						);
					})}
				</View>
				<BlueButton
					style={styles.confirmButton}
					disabled={this.buttonDisabled()}
					text="Confirm"
					onPress={() => {
						Actions.jump(ROUTES.nonAuthenticated.createPin, {
							mnemonic: this.props.mnemonic,
						});
					}}
				/>
			</ScrollView>
		);
	}
	buttonDisabled = () => {
		// if find returns nothing, it means that all the words match
		// TODO -remove this!!!
		return false;
		return !!this.state.mnemonicConfirmFields.find((index: number) => {
			return this.props.mnemonic[index] != this.state.enteredWords[index];
		});
	};
}

const mapStateToProps = (state: ApplicationState) => {
	return {
		accountState: state.account,
	};
};

export const ConfirmWallet = connect(
	mapStateToProps,
	mapDispatchToProps,
)(ConfirmWalletComponent);
