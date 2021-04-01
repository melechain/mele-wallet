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
	header: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 30,
	},

	title: {
		flex: 1,
		display: "flex",
		flexDirection: "column",
		alignItems: "flex-start",
		justifyContent: "center",
	},
	titleText: {
		fontSize: 22,
		color: "#091841",
	},
	balance: {
		flex: 1,
		display: "flex",
		flexDirection: "column",
		alignItems: "flex-end",
		justifyContent: "center",
	},
	balanceAmount: {
		fontSize: 25,
		color: "#013EC4",
	},
	balanceDescription: {
		fontSize: 14,
		color: "#013EC4",
	},
	infoList: {
		marginTop: 15,
		width: "100%",
		borderTopColor: "#101654",
		borderTopWidth: 1,
	},
	infoContainer: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		height: 50,
		borderBottomColor: "#101654",
		borderBottomWidth: 1,
	},
	infoContainerTitle: {
		flex: 1,
		display: "flex",
		alignItems: "flex-start",
	},
	infoContainerValue: {
		flex: 1,
		display: "flex",
		alignItems: "flex-end",
	},
	infoContainerText: {
		fontSize: 14,
		color: "#101654",
	},
	capitalizedText: {
		textTransform: "capitalize",
	},
	backButtonStyle: {
		backgroundColor: "#FFFFFF",
		borderColor: "#101654",
		borderWidth: 1,
		borderRadius: 4,
		marginTop: 17,
		width: "100%",
	},
	backButtonText: {
		color: "#101654",
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
		fontSize: 12,
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
});