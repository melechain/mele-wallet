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
import { TextField } from "@mele-wallet/app/common/fields/text-field";
import { Random } from "@mele-wallet/app/common/utils/random";
//import BackButton from "@mele-wallet/resources/icons/back-arrow.png";

interface ICreatePinComponentProps {
	actionCreators: IActionCreators;
	accountState: AccountState;
	mnemonic: string[];
}
interface ICreatePinComponentState {
	enteredNumbers: boolean;
}

class CreatePinComponent extends Component<
	ICreatePinComponentProps,
	ICreatePinComponentState
> {
	constructor(props: ICreatePinComponentProps) {
		super(props);
		this.state = {
			enteredNumbers: false,
		};
	}

	render() {
		return (
			<ScrollView
				style={[commonStyles.blueBackground, styles.scrollView]}
				contentContainerStyle={styles.content}
			>
				<Text>HELLO WORLD1!</Text>
			</ScrollView>
		);
	}
}

const mapStateToProps = (state: ApplicationState) => {
	return {
		accountState: state.account,
	};
};

export const CreatePin = connect(
	mapStateToProps,
	mapDispatchToProps,
)(CreatePinComponent);
