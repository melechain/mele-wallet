import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	scrollView: {
		display: "flex",
		flexDirection: "column",
	},
	content: {
		flexDirection: "column",
		backgroundColor: "#ffffff",
		width: "100%",
		alignItems: "center",
		marginLeft: "auto",
		marginRight: "auto",
		display: "flex",
	},
	actionTitleContainer: {
		height: 40,
		display: "flex",
		width: "100%",
		justifyContent: "center",
		paddingLeft: 20,
		paddingRight: 20,
		borderBottomColor: "#00000029",
		borderBottomWidth: 0.5,
	},
	actionTitle: {
		fontSize: 14,
		color: "#101654",
	},
	actionArea: {
		width: "100%",
		display: "flex",
		paddingLeft: 20,
		paddingRight: 20,
		marginBottom: 40,
	},
	eachAction: {
		width: "100%",
		height: 40,
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		borderBottomColor: "#00000029",
		borderBottomWidth: 0.5,
	},
	Icon: {
		width: 24,
		height: 24,
		borderRadius: 12,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	actionIconGreen: {
		width: 24,
		height: 24,
		backgroundColor: "#ECFAF5",
		borderRadius: 12,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	actionLogo: {
		width: 11,
		height: 13,
	},

	actionText: {
		flex: 1,
		paddingLeft: 10,
		color: "#101654",
		fontSize: 12,
	},
	actionButton: {
		height: 31,
		backgroundColor: "#EEEFF8",
		borderRadius: 16,
		paddingLeft: 10,
		paddingRight: 10,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	transparentButton: {
		height: 31,
		backgroundColor: "rgba(52, 52, 52, 0)",
		borderRadius: 16,
		paddingLeft: 10,
		paddingRight: 10,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	transparentButtonPIN: {
		height: 31,
		backgroundColor: "rgba(52, 52, 52, 0)",
		borderRadius: 16,
		paddingLeft: 10,
		paddingRight: 10,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
	},
	transparentButtonTitle: {
		color: "#101654",
		opacity: 0.4,
	},
	transparentButtonTitlePIN: {
		color: "#101654",
		opacity: 0.4,
		paddingLeft: 175,
	},
	actionTextPIN: {
		flex: 1,
		paddingLeft: 20,
		color: "black",
		fontSize: 12,
	},
	buttonTitle: {
		fontSize: 12,
		color: "#101654",
	},
	pinText: {
		paddingLeft: 15,
		color: "#101654",
		fontSize: 12,
	},
});
