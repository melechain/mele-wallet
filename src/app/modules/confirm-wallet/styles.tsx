import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	scrollView: {
		display: "flex",
		flexDirection: "column",
		paddingLeft: 20,
		paddingRight: 20,
	},
	content: {
		alignItems: "center",
		paddingBottom: 30,
	},
	walletLogo: {
		marginTop: 35,
		width: 81,
		height: 71,
	},
	headerText: {
		marginTop: 28,
		width: 244,
		textAlign: "center",
	},
	description: {
		marginTop: 13,
		color: "#878AA6",
		textAlign: "center",
		fontSize: 12,
	},
	confirmButton: {
		width: "100%",
		marginTop: 30,
	},
	textInputs: {
		paddingTop: 24,
		width: "100%",
	},
	textInput: {
		marginTop: 11,
	},
});
