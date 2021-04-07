import ApplicationState from "@mele-wallet/redux/application-state";
import {
	IActionCreators,
	mapDispatchToProps,
} from "@mele-wallet/redux/methods/map-dispatch-to-props";
import { CurrencyState } from "@mele-wallet/redux/reducers/currency-reducer";
import React, { Component, useState } from "react";
import { View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { connect } from "react-redux";
import { styles } from "./styles";

interface ICurrencyPickerComponentProps {
	currencyState: CurrencyState;
}

class CurrencyPickerComponent extends Component<ICurrencyPickerComponentProps> {
	setSelectedCurrency = (curr) => {
		console.log(curr);
	};
	render() {
		return (
			<Picker
				selectedValue={this.props.currencyState.currentCurrency}
				onValueChange={(itemValue) => this.setSelectedCurrency(itemValue)}
				style={{ height: 50, width: 111, textAlign: "right" }}
				itemStyle={{ textAlign: "right" }}
			>
				{this.props.currencyState.currencies.map((curr: any, index: any) => {
					return (
						<Picker.Item label={curr.label} value={curr.value} key={index} />
					);
				})}
			</Picker>
		);
	}
}

const mapStateToProps = (state: ApplicationState) => {
	return {
		accountState: state.account,
		staticState: state.static,
		currencyState: state.currency,
	};
};

export const CurrencyPicker = connect(
	mapStateToProps,
	mapDispatchToProps,
)(CurrencyPickerComponent);
