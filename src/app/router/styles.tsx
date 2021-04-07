import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	tabs: {
		height: 69,
	},
	tabButton: {
		display: "flex",
		justifyContent: "center",
	},
	iconAntText: {
		display: "flex",
		alignItems: "center",
		height: 36,
	},
	icon: {
		top: -3,
		height: 30,
		width: 30,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	buttonTextDisabled: {
		color: "#ACAEC1",
		fontSize: 12,
	},
	buttonTextInactive: {
		color: "#101654",
		fontSize: 12,
	},
	buttonTextActive: {
		color: "#013EC4",
		fontSize: 12,
	},
	sentIconContainer: {
		height: 52,
		width: 52,
		borderRadius: 26,
		backgroundColor: "#013EC4",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
});
