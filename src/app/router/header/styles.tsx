import { StyleSheet } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";

export const styles = StyleSheet.create({
	content: {
		height: getStatusBarHeight(true) + 43,
		display: "flex",
		flexDirection: "column",
		justifyContent: "flex-end",
		borderBottomWidth: 0.5,
		borderStyle: "solid",
		borderEndColor: "#BEBEC0",
	},
	navigation: {
		height: 40,
		width: "100%",
		display: "flex",
		bottom: 0,
		alignItems: "center",
		flexDirection: "row",
	},
	buttonContainer: {
		flex: 1,
		width: 40,
		display: "flex",
		flexDirection: "row",
		alignItems: "flex-start",
	},
	backButton: {
		marginLeft: 4,
		width: 100,
		display: "flex",
		flexDirection: "row",
		alignItems: "flex-start",
	},
	text: {
		marginLeft: 5,
		fontSize: 16,
		color: "#FFFFFF",
	},
	textBlack: {
		marginLeft: 5,
		fontSize: 16,
		color: "#111551",
	},
	lock_icon: {
		width: 40,
		marginRight: 20,
	},
});
