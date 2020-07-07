import React, { Component } from "react";
import { Button } from "react-native";
import { connect } from "react-redux";
import ApplicationState from "mele-wallet/src/redux/application-state";
import {
	mapDispatchToProps,
	IActionCreators,
} from "mele-wallet/src/redux/methods/map-dispatch-to-props";
import { AccountState } from "mele-wallet/src/redux/reducers/account-reducer";
interface ITestComponentProps {
	actionCreators: IActionCreators;
	accountState: AccountState;
}

class TestComponent extends Component<ITestComponentProps> {
	render() {
		console.log(console.log(this.props.accountState.account), "Account!");
		return (
			<Button
				title="hello"
				onPress={() => {
					this.props.actionCreators.account.login(
						"levan@mailinator.com",
						"test",
					);
				}}
			/>
		);
	}
}

const mapStateToProps = (state: ApplicationState) => {
	return {
		accountState: state.account,
	};
};

export const Test = connect(mapStateToProps, mapDispatchToProps)(TestComponent);
