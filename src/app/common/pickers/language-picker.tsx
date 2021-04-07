import ApplicationState from "@mele-wallet/redux/application-state";
import {
	IActionCreators,
	mapDispatchToProps,
} from "@mele-wallet/redux/methods/map-dispatch-to-props";
import React, { Component, useState } from "react";
import { View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { connect } from "react-redux";
import { styles } from "./styles";
import { LanguageState } from "@mele-wallet/redux/reducers/language-reducer";

interface ILanguagePickerComponentProps {
	languageState: LanguageState;
}

class LanguagePickerComponent extends Component<ILanguagePickerComponentProps> {
	setSelectedLanguage = (lang) => {
		console.log(lang);
	};
	render() {
		return (
			<Picker
				selectedValue={this.props.languageState.currentLanguage}
				onValueChange={(itemValue) => this.setSelectedLanguage(itemValue)}
				style={{ height: 50, width: 111 }}
			>
				{this.props.languageState.languages.map((lang: any) => {
					return <Picker.Item label={lang.label} value={lang.value} />;
				})}
			</Picker>
		);
	}
}

const mapStateToProps = (state: ApplicationState) => {
	return {
		accountState: state.account,
		staticState: state.static,
		languageState: state.language,
	};
};

export const LanguagePicker = connect(
	mapStateToProps,
	mapDispatchToProps,
)(LanguagePickerComponent);
