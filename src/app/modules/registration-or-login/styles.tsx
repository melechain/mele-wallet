import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	content: {
		height: "100%",
		display: "flex",
		flexDirection: "column",
	},
	topContainer: {
		flex: 1,
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
	headerText: {
		marginTop: 28,
		width: 135,
		textAlign: "center",
	},
	buttonContainer: {
		paddingLeft: 27,
		paddingRight: 27,
		paddingBottom: 36,
		display: "flex",
		justifyContent: "center",
	},
	createWalletButton: {
		marginTop: 8,
	},
});
