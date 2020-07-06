import React, { Component } from "react";
import { Button } from "react-native";
import { connect } from "react-redux";
import ApplicationState from "meme-wallet/src/redux/application-state";
import {
	mapDispatchToProps,
	IActionCreators,
} from "meme-wallet/src/redux/methods/map-dispatch-to-props";
interface ITestComponentProps {
	actionCreators: IActionCreators;
}

class TestComponent extends Component<ITestComponentProps> {
	render() {
		return (
			<Button
				title="hello"
				onPress={() => {
					console.log(this.props);
					this.props.actionCreators.account.login("testUser", "testPass");
				}}
			/>
		);
	}
}

const mapStateToProps = (state: ApplicationState) => {
	return {
		account: state.account,
	};
};

export const Test = connect(mapStateToProps, mapDispatchToProps)(TestComponent);
