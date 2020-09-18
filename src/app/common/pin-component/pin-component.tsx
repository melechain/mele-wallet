import React, { Component } from "react";
import {
	Button,
	View,
	Text,
	Image,
	Switch,
	ScrollView,
	Alert,
	ViewProps,
} from "react-native";
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
import Delete from "@mele-wallet/resources/icons/delete.svg";

interface IPinComponentProps extends ViewProps {
	onPinReady: (pin: string) => void;
	pin?: string;
	onPinChange?: (pin: string) => void;
}
interface IPinComponentState {
	pin: string;
}

class PinComponent extends Component<IPinComponentProps, IPinComponentState> {
	constructor(props: IPinComponentProps) {
		super(props);
		this.state = {
			pin: "",
		};
	}

	enterPinDigit = (pinNumber: string) => {
		if (this.getPin().length >= 6) {
			return;
		}
		const currentPin = this.getPin() + pinNumber;
		this.setPin(currentPin);
	};

	setPin(pin: string) {
		if (this.props.pin != undefined) {
			if (this.props.onPinChange) {
				this.props.onPinChange(pin);
			}

			if (pin.length >= 6) {
				this.props.onPinReady(pin);
			}
		} else {
			this.setState({ pin: pin }, () => {
				if (this.props.onPinChange) {
					this.props.onPinChange(pin);
				}
				if (pin.length >= 6) {
					this.props.onPinReady(pin);
				}
			});
		}
	}

	getPin() {
		if (this.props.pin != undefined) {
			return this.props.pin;
		}
		return this.state.pin;
	}
	removePin = () => {
		const currentPin = this.getPin().slice(0, -1);
		this.setPin(currentPin);
	};
	render() {
		return (
			<View {...this.props}>
				<View style={styles.pinInputArea}>
					{[0, 1, 2, 3, 4, 5].map((numberIndex: number) => {
						return (
							<View style={styles.pin} key={numberIndex}>
								<View style={styles.pinInput}>
									<Text style={styles.pinInputText}>
										{this.getPin()[numberIndex] || ""}
									</Text>
								</View>
								<View
									style={
										this.getPin().length == numberIndex
											? styles.currentPinLine
											: styles.pinLine
									}
								></View>
							</View>
						);
					})}
				</View>

				<View style={styles.numbersInputArea}>
					<Ripple
						style={styles.inputPin}
						onPress={() => {
							this.enterPinDigit("1");
						}}
					>
						<Text style={styles.inputPinNumber}>1</Text>
					</Ripple>
					<Ripple
						style={styles.inputPin}
						onPress={() => {
							this.enterPinDigit("2");
						}}
					>
						<Text style={styles.inputPinNumber}>2</Text>
					</Ripple>
					<Ripple
						style={styles.inputPin}
						onPress={() => {
							this.enterPinDigit("3");
						}}
					>
						<Text style={styles.inputPinNumber}>3</Text>
					</Ripple>
					<Ripple
						style={styles.inputPin}
						onPress={() => {
							this.enterPinDigit("4");
						}}
					>
						<Text style={styles.inputPinNumber}>4</Text>
					</Ripple>
					<Ripple
						style={styles.inputPin}
						onPress={() => {
							this.enterPinDigit("5");
						}}
					>
						<Text style={styles.inputPinNumber}>5</Text>
					</Ripple>
					<Ripple
						style={styles.inputPin}
						onPress={() => {
							this.enterPinDigit("6");
						}}
					>
						<Text style={styles.inputPinNumber}>6</Text>
					</Ripple>
					<Ripple
						style={styles.inputPin}
						onPress={() => {
							this.enterPinDigit("7");
						}}
					>
						<Text style={styles.inputPinNumber}>7</Text>
					</Ripple>
					<Ripple
						style={styles.inputPin}
						onPress={() => {
							this.enterPinDigit("8");
						}}
					>
						<Text style={styles.inputPinNumber}>8</Text>
					</Ripple>
					<Ripple
						style={styles.inputPin}
						onPress={() => {
							this.enterPinDigit("9");
						}}
					>
						<Text style={styles.inputPinNumber}>9</Text>
					</Ripple>
					<Ripple
						style={styles.inputPin}
						onPress={() => {
							this.removePin();
						}}
					>
						<Delete width={30} height={30} />
					</Ripple>
					<Ripple
						style={styles.inputPin}
						onPress={() => {
							this.enterPinDigit("0");
						}}
					>
						<Text style={styles.inputPinNumber}>0</Text>
					</Ripple>
				</View>
			</View>
		);
	}
}

const mapStateToProps = (state: ApplicationState) => {
	return {
		accountState: state.account,
	};
};

export const Pin = connect(mapStateToProps, mapDispatchToProps)(PinComponent);
