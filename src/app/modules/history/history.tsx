import React, { Component } from "react";
import { Button, View } from "react-native";
import { connect } from "react-redux";
import ApplicationState from "@mele-wallet/redux/application-state";
import {
	mapDispatchToProps,
	IActionCreators,
} from "@mele-wallet/redux/methods/map-dispatch-to-props";
import { AccountState } from "@mele-wallet/redux/reducers/account-reducer";
interface IHistoryComponentProps {
	actionCreators: IActionCreators;
	accountState: AccountState;
}
import { styles } from "./styles";
class HistoryComponent extends Component<IHistoryComponentProps> {
	render() {
		return <View style={styles.content}></View>;
	}
}

const mapStateToProps = (state: ApplicationState) => {
	return {
		accountState: state.account,
	};
};

export const History = connect(
	mapStateToProps,
	mapDispatchToProps,
)(HistoryComponent);
