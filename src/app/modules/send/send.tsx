import React, { Component } from "react";
import { Button, View, Text } from "react-native";
import { connect } from "react-redux";
import ApplicationState from "@mele-wallet/redux/application-state";
import {
	mapDispatchToProps,
	IActionCreators,
} from "@mele-wallet/redux/methods/map-dispatch-to-props";
import { AccountState } from "@mele-wallet/redux/reducers/account-reducer";
import { styles } from "./styles";
interface ISendComponentProps {
	actionCreators: IActionCreators;
	accountState: AccountState;
}

class SendComponent extends Component<ISendComponentProps> {
	render() {
		return (
			<View style={styles.content}>
				<Text>send</Text>
			</View>
		);
	}
}

const mapStateToProps = (state: ApplicationState) => {
	return {
		accountState: state.account,
	};
};

export const Send = connect(mapStateToProps, mapDispatchToProps)(SendComponent);
