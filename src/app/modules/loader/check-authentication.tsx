import React, { Component } from "react";
import { Button, View, ActivityIndicator, Text } from "react-native";
import { connect } from "react-redux";
import ApplicationState from "@mele-wallet/redux/application-state";
import {
	mapDispatchToProps,
	IActionCreators,
} from "@mele-wallet/redux/methods/map-dispatch-to-props";
import { styles } from "./styles";
import { commonStyles } from "@mele-wallet/app/common/styles/common-styles";
import { StaticState } from "@mele-wallet/redux/reducers/static-reducer";
import { Actions } from "react-native-router-flux";

interface ICheckAuthenticationComponentProps {
	actionCreators: IActionCreators;
	staticState: StaticState;
}

class CheckAuthenticationComponent extends Component<
	ICheckAuthenticationComponentProps
> {
	componentDidMount() {
		this.checkWallet();
	}
	componentDidUpdate() {
		this.checkWallet();
	}

	checkWallet = () => {
		if (this.props.staticState.mnemonic && this.props.staticState.pin) {
			Actions.reset("authenticated");
		}
	};

	render() {
		return (
			<View style={[styles.content, commonStyles.blueBackground]}>
				<ActivityIndicator size="large" color="#F4BD00" />
				<Text style={[styles.displayText, commonStyles.fontBook]}>
					Tickling the backend...
				</Text>
			</View>
		);
	}
}

const mapStateToProps = (state: ApplicationState) => {
	return {
		accountState: state.account,
		staticState: state.static,
	};
};

export const CheckAuthentication = connect(
	mapStateToProps,
	mapDispatchToProps,
)(CheckAuthenticationComponent);
