import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	formMessage: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
	},
	formMessageText: {
		flex: 1,
		fontSize: 12,
		letterSpacing: 0,
		marginLeft: 5,
	},
	formMessageError: {
		color: "#F63434",
	},
	formMessageSuccess: {
		color: "#009900",
	},
});
