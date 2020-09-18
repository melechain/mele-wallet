import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	fieldContainer: {
		display: "flex",
		flexDirection: "column",

		width: "100%",
	},
	field: {
		height: 56,
		flex: 1,
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 4,
		backgroundColor: "#ECF0F5",
	},
	fieldError: {
		backgroundColor: "#FBE6E5",
		borderColor: "#FF0000",
		borderWidth: 1,
		borderStyle: "solid",
	},
	fieldSuccess: {
		backgroundColor: "#ECFBF4",
		borderColor: "#1EDF92",
		borderWidth: 1,
		borderStyle: "solid",
	},
	textInput: {
		flex: 1,
		fontSize: 14,
		borderStartColor: "#C4D2D6",
		borderStartWidth: 2,
		paddingStart: 10,
	},
	baseFieldDisabled: {
		position: "absolute",
		height: "100%",
		width: "100%",
		backgroundColor: "#cccccc",
		opacity: 0.5,
		borderRadius: 4,
	},

	iconRightStyle: {
		width: 56,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	iconLeftStyle: {
		width: 56,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
});
