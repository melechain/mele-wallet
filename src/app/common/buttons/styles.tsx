import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	button: {
		height: 56,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 4,
	},
	yellowButton: {
		backgroundColor: "#F4BD00",
	},
	blueButton: {
		backgroundColor: "#013EC4",
		borderWidth: 1,
		borderStyle: "solid",
		borderColor: "#FFFFFF",
		height: 56,
		fontSize: 14,
	},
	baseButtonDisabled: {
		position: "absolute",
		height: "100%",
		width: "100%",
		backgroundColor: "#cccccc",
		opacity: 0.5,
	},
});
