import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	scroll: {
		width: "100%",
	},
	content: {
		flexDirection: "column",
		width: "100%",
		alignItems: "center",
		display: "flex",
	},
	transactionsTitleContainer: {
		paddingLeft: 20,
		paddingRight: 20,
		height: 40,
		display: "flex",
		flexDirection: "row",
		width: "100%",
		alignItems: "center",
	},
	transactionsTitle: {
		marginLeft: 10,
		fontSize: 14,
		color: "#101654",
		flex: 1,
	},
	viewAll: {
		marginLeft: 10,
		fontSize: 14,
		color: "#013EC4",
	},
	transactionsList: {
		width: "100%",
		display: "flex",
		paddingLeft: 20,
		paddingRight: 20,
		paddingBottom: 18,
	},
	noTransactionsContainer: {
		minHeight: "100%",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		paddingTop: 30,
		paddingBottom: 30,
		textAlign: "center",
	},
	noTransactionsContainerText: {
		color: "#101654",
		fontSize: 14,
		textAlign: "center",
	},
	noTransactionsContainerButtonText: {
		fontSize: 14,
	},
	purchaseCoins: {
		marginTop: 22,
		width: 165,
	},
	transactionContainer: {
		marginTop: 2,
		marginBottom: 2,
		width: "100%",
		backgroundColor: "#ffffff",
		display: "flex",
		flexDirection: "column",
		padding: 14,
		borderWidth: 1,
		borderStyle: "solid",
		borderRadius: 4,
		borderColor: "#00000029",
	},
	transactionContainerRow: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
	},
	transactionContainerAddress: {
		fontSize: 14,
		color: "#101654",
		flex: 1,
	},
	transactionContainerAmountContainer: {
		width: 48,
		height: 22,
		fontSize: 12,
		backgroundColor: "#E4F9F0",
		marginLeft: 13,
		borderRadius: 4,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	transactionContainerAmount: {
		fontSize: 10,
		color: "#1EDF92",
	},
	transactionTypeContainer: {
		height: 22,
		fontSize: 12,
		backgroundColor: "#EEEFF8",
		paddingLeft: 16,
		paddingRight: 16,
		borderRadius: 16,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	transactionType: {
		fontSize: 10,
		color: "#6A6C92",
		textTransform: "capitalize",
	},
	transactionStatusContainer: {
		marginLeft: 10,
		height: 22,
		fontSize: 12,
		backgroundColor: "#EEEFF8",
		paddingLeft: 16,
		paddingRight: 16,
		borderRadius: 16,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	transactionStatusContainerGreen: {
		backgroundColor: "#E5F8F1",
	},
	transactionStatusContainerYellow: {
		backgroundColor: "#FBF4D7",
	},
	transactionStatusContainerConfirmed: {
		alignItems: "center",
	},
	transactionStatus: {
		fontSize: 10,
		color: "#6A6C92",
		textTransform: "capitalize",
	},
	transactionStatusGreen: {
		color: "#69DC98",
	},
	transactionStatusYellow: {
		color: "#ECBF41",
	},
	transactionDate: {
		marginLeft: 10,
		fontSize: 10,
		color: "#6A6C92",
		textTransform: "capitalize",
	},
});
