import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	pinInputArea: {
		width: "100%",
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		height: 80,
	},
	pin: {
		width: 47,
		marginLeft: 4,
		marginRight: 4,
		height: 67,
		borderRadius: 4,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "column",
		backgroundColor: "#112FAE",
	},
	pinInput: {
		width: 40,
		height: 57,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	pinInputText: {
		marginTop: 5,
		fontSize: 60,
		color: "#FFFFFF",
	},
	currentPinLine: {
		width: 24,
		height: 1,
		backgroundColor: "#F4BD00",
		marginLeft: "auto",
		marginRight: "auto",
	},
	pinLine: {
		width: 24,
		height: 1,
		backgroundColor: "#101654",
		marginLeft: "auto",
		marginRight: "auto",
	},
	numbersInputArea: {
		width: "100%",
		display: "flex",
		flexDirection: "row",
		height: 320,
		flexWrap: "wrap",
	},
	inputPin: {
		width: "33.3%",
		height: 80,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	inputPinNumber: {
		fontSize: 30,
		fontFamily: "Circular Std",
		color: "#FFFFFF",
	},
});
