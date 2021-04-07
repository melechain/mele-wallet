import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	scrollView: {
		display: "flex",
		flexDirection: "column",
	},
	content: {
		flexDirection: "column",
		backgroundColor: "#ffffff",
		width: "80%",
		alignItems: "center",
		justifyContent: "center",
		marginLeft: "auto",
		marginRight: "auto",
		display: "flex",
		paddingTop: "20%",
	},
	initTitle: {
		paddingTop: 10,
	},
	initContainer: {
		paddingTop: 10,
		paddingBottom: 10,
		display: "flex",
		width: "90%",
		justifyContent: "center",
		textAlign: "center",
	},
	calculator: {
		paddingTop: 20,
	},
	purchaseCoins: {
		marginTop: 22,
		marginBottom: 10,
		width: "100%",
	},
	buttonsContainer: {
		display: "flex",
		flexDirection: "row",
	},
	purchaseCoinsConfirm: {
		marginTop: 22,
		marginBottom: 10,
		width: "45%",
		marginRight: 5,
	},
	cancelPurchaseCoins: {
		marginTop: 22,
		marginBottom: 10,
		width: "45%",
		backgroundColor: "white",
		borderColor: "#1016541F",
		borderWidth: 1,
	},
	cancelContainerButtonText: {
		fontSize: 14,
		color: "#091841",
	},
	noTransactionsContainerButtonText: {
		fontSize: 14,
	},
	confirmationTitle: {
		paddingTop: 10,
		fontSize: 20,
		fontFamily: "CircularStd-Bold",
		color: "#091841",
	},
	confirmText: {
		textAlign: "center",
	},
	referenceCodeContainer: {
		height: 50,
		marginTop: 1,
		backgroundColor: "#0F2BA9",
		borderRadius: 6,
		display: "flex",
		flexDirection: "row",
		padding: 12,
		alignItems: "center",
	},
	referenceCodeText: {
		flex: 1,
		color: "#FFFFFF",
	},
	referenceCode: {
		flex: 1,
		color: "#FFFFFF",
		marginLeft: 30,
	},
	copyIcon: {
		marginLeft: 15,
	},
	informationEntry: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
	},
	informationTitle: {
		fontSize: 14,
		color: "#101654",
		display: "flex",
		alignItems: "center",
	},
	informationValue: {
		flex: 1,
		fontSize: 12,
		color: "#101654",
		textAlign: "right",
	},
	successIcon: {
		height: 100,
		width: 100,
	},
	successIconContainer: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "rgba(218, 248, 238, 0.6)",
		height: 120,
		width: 120,
		borderRadius: 40,
	},
});
