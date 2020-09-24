import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	content: {
		height: "100%",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	containerStyle: { height: "100%" },
	topViewStyle: { height: 0, flex: 0 },
	bottomViewStyle: { display: "none", height: 0, flex: 0 },
});
