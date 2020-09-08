import React, { Component } from "react";
import { ViewProps } from "react-native";
import { connect } from "react-redux";
import ApplicationState from "@mele-wallet/redux/application-state";
import { AccountState } from "@mele-wallet/redux/reducers/account-reducer";
import { styles } from "./styles";
import {
	IActionCreators,
	mapDispatchToProps,
} from "@mele-wallet/redux/methods/map-dispatch-to-props";
import Ripple from "react-native-material-ripple";
import { commonStyles } from "@mele-wallet/app/common/styles/common-styles";
import { Text } from "react-native";

export interface IButtonComponentProps extends ViewProps {
	actionCreators: IActionCreators;
	accountState: AccountState;
	children?: React.ReactNode;
	text?: string;
	disabled?: boolean;
	onPress?: () => void;
}
