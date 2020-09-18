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
		paddingTop: getStatusBarHeight(true) + 15,
		paddingBottom: 30,
	},
	balanceHeader: {
		width: "100%",
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
	},
	titleContainer: {
		display: "flex",
		flexDirection: "column",
	},
	balanceContainer: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
	},
	balance: {
		fontSize: 30,
	},
	title: {
		fontSize: 13,
		color: "#FFFFFF",
	},
	infoIcon: {
		marginLeft: 10,
	},
	barcodeIconContainer: {
		flex: 1,
		display: "flex",
		justifyContent: "flex-end",
		flexDirection: "row",
	},
	barcodeIcon: {
		width: 60,
		height: 60,
		borderRadius: 30,
		backgroundColor: "#013EC4",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	calculator: {
		marginTop: 18,
	},
	walletAddressContainer: {
		height: 50,
		marginTop: 10,
		backgroundColor: "#0F2BA9",
		borderRadius: 6,
		display: "flex",
		flexDirection: "row",
		padding: 12,
		alignItems: "center",
	},
	walletAddress: {
		flex: 1,
		color: "#FFFFFF",
	},
	walletCopy: {
		marginLeft: 20,
	},
	actions: {
		paddingLeft: 20,
		paddingRight: 20,
		paddingTop: 20,
		width: "100%",
	},
});
