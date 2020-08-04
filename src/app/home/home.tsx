import React, { Component } from "react";
import { Button, View } from "react-native";
import { connect } from "react-redux";
import ApplicationState from "@mele-wallet/redux/application-state";
import {
	mapDispatchToProps,
	IActionCreators,
} from "@mele-wallet/redux/methods/map-dispatch-to-props";
import { AccountState } from "@mele-wallet/redux/reducers/account-reducer";
interface IHomeComponentProps {
	actionCreators: IActionCreators;
	accountState: AccountState;
}
import styles from "./home.scss";

class HomeComponent extends Component<IHomeComponentProps> {
	render() {
		return (
			<View style={styles.content}>
				<Button
					title="hello1"
					onPress={() => {
						this.props.actionCreators.account.login(
							"levan@mailinator.com",
							"test",
						);
					}}
				/>
			</View>
		);
	}
}

const mapStateToProps = (state: ApplicationState) => {
	return {
		accountState: state.account,
	};
};

export const Home = connect(mapStateToProps, mapDispatchToProps)(HomeComponent);
