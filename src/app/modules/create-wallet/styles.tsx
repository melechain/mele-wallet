import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	content: {
		height: "100%",
		display: "flex",
		flexDirection: "column",
		paddingLeft: 20,
		paddingRight: 20,
		alignItems: "center",
	},
	headerText: {
		marginTop: 28,
		width: 178,
		textAlign: "center",
	},
	description: {
		marginTop: 13,
		color: "#878AA6",
		textAlign: "center",
		fontSize: 12,
	},
	wordsContainer: {
		marginTop: 22,
		display: "flex",
		flexWrap: "wrap",
		flexDirection: "row",
		borderWidth: 1,
		borderStyle: "solid",
		borderColor: "#1016541F",
		borderRadius: 4,
		width: "100%",
		paddingTop: 8,
	},
	word: {
		width: "33.33%",
		paddingTop: 15,
		paddingBottom: 15,
		paddingLeft: 30,
		paddingRight: 30,
		display: "flex",
		flexDirection: "row",
	},
	wordNumber: {
		color: "#013EC4",
		fontSize: 14,
	},
	wordText: {
		paddingLeft: 14,
		color: "#101654",
		fontSize: 14,
	},
	createWalletButton: {
		marginTop: 8,
	},
	copyButtonContainer: {
		paddingLeft: 30,
		paddingRight: 30,
		marginTop: 25,
		width: "100%",
	},
	copyButton: {
		height: 72,
		width: "100%",
		borderTopWidth: 1,
		borderStyle: "solid",
		borderColor: "#1016541F",
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	copyIcon: {
		height: 16,
		width: 16,
	},
	copyText: {
		fontSize: 14,
		color: "#013EC4",
		marginLeft: 10,
	},
	agreeConditionsContainer: {
		display: "flex",
		flexDirection: "row",
		paddingTop: 20,
	},
	agreeConditionsTextContainer: {
		flex: 1,
	},
	agreeConditionsText: {
		textAlign: "left",
	},
	confirmButton: {
		width: "100%",
		marginTop: 30,
	},
});
