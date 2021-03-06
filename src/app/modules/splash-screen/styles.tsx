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
		width: "100%",
		display: "flex",
		minHeight: "100%",
		flexDirection: "column",
		justifyContent: "center",
	},
	topContainer: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
});
