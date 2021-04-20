import React, { Component } from "react";
import { View, Text, Switch, ScrollView } from "react-native";
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
import { Utils } from "mele-sdk";
import { Actions } from "react-native-router-flux";
import { ROUTES } from "@mele-wallet/app/router/routes";
import { LanguageState } from "@mele-wallet/redux/reducers/language-reducer";

interface ICreateWalletComponentProps {
	actionCreators: IActionCreators;
	accountState: AccountState;
	languageState: LanguageState;
}
interface ICreateWalletComponentState {
	agreeConditions: boolean;
	mnemonic: string[];
}

const languages = {
	en: require("../../translations/en.json"),
	ar: require("../../translations/ar.json"),
};

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
		const localeData = languages[this.props.languageState.currentLanguage];
		return (
			<ScrollView
				style={[commonStyles.whiteBackground, styles.scrollView]}
				contentContainerStyle={styles.content}
			>
				<WalletLogo style={styles.walletLogo} />
				<Text style={[commonStyles.blackSubHeader, styles.headerText]}>
					{localeData.wallet.createWalletTitle}
				</Text>
				<Text style={[commonStyles.blackSubHeader, styles.description]}>
					{localeData.wallet.createWalletDescription}
				</Text>

				<View style={styles.wordsContainer}>
					{this.state.mnemonic.map((word: string, index: number) => {
						return (
							<View style={styles.word} key={index}>
								<Text style={[styles.wordNumber, commonStyles.fontBold]}>
									{index + 1}
								</Text>
								<Text
									numberOfLines={1}
									adjustsFontSizeToFit={true}
									style={[styles.wordText, commonStyles.fontBook]}
								>
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
								{localeData.wallet.copy}
							</Text>
						</View>
					</Ripple>
				</View>
				<View style={styles.agreeConditionsContainer}>
					<View style={styles.agreeConditionsTextContainer}>
						<Text
							style={[commonStyles.blackSmallText, styles.agreeConditionsText]}
							numberOfLines={2}
						>
							{localeData.wallet.responsibility}
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
					text={localeData.wallet.createWalletButton}
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
		languageState: state.language,
	};
};

export const CreateWallet = connect(
	mapStateToProps,
	mapDispatchToProps,
)(CreateWalletComponent);
