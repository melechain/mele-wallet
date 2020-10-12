import { StyleSheet } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";

export const styles = StyleSheet.create({
	scrollView: {
		display: "flex",
		flexDirection: "column",
	},
	content: {
		flexDirection: "column",
		alignItems: "center",
		width: "100%",
		display: "flex",
	},
	header: {
		paddingLeft: 20,
		paddingRight: 20,
		paddingTop: getStatusBarHeight(true) + 30,
		paddingBottom: 30,
		width: "100%",
	},
	title: {
		fontSize: 16,
		color: "#ffffff",
	},
	tabs: {
		display: "flex",
		flexDirection: "row",
	},
	tabPlaceHolder: {
		height: 44,
		width: 20,
		borderBottomColor: "#ECF0F5",
		borderBottomWidth: 1,
	},
	tab: {
		flex: 1,
		height: 44,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		borderBottomColor: "#ECF0F5",

		borderBottomWidth: 1,
	},
	activeTab: {
		borderBottomColor: "#013EC4",

		borderBottomWidth: 1,
	},
	tabText: {
		fontSize: 14,
		color: "#878AA6",
	},
	activeTabText: {
		color: "#013EC4",
	},
	noRecentTransactionsText: {
		color: "#101654",
		fontSize: 14,
	},
});
