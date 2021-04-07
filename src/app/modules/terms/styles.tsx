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
		borderRadius: 5,
		borderWidth: 1,
		borderColor: "#00000029",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.23,
		shadowRadius: 2.62,
		elevation: 4,
	},
	termsTitleContainer: {
		height: 40,
		display: "flex",
		width: "100%",
		justifyContent: "center",
		paddingLeft: 20,
		paddingRight: 20,
		borderBottomColor: "#00000029",
		borderBottomWidth: 0.5,
	},
	termsTitle: {
		fontSize: 14,
		color: "#101654",
	},
	termsArea: {
		width: "100%",
		display: "flex",
		paddingLeft: 20,
		paddingRight: 20,
		marginBottom: 40,
	},
});
