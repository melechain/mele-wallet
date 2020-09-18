import React, { Component } from "react";
import { ViewProps, TextInputProps, StyleProp, ViewStyle } from "react-native";
import { AccountState } from "@mele-wallet/redux/reducers/account-reducer";
import { IActionCreators } from "@mele-wallet/redux/methods/map-dispatch-to-props";

export interface IFieldComponentProps extends TextInputProps {
	actionCreators: IActionCreators;
	accountState: AccountState;
	children?: React.ReactNode;
	text?: string;
	disabled?: boolean;
	onPress?: () => void;
	iconLeft?: React.ReactNode;
	iconLeftStyle?: StyleProp<ViewStyle>;
	iconRight?: React.ReactNode;
	iconRightStyle?: StyleProp<ViewStyle>;
	errors?: string[];
	success?: boolean;
}
