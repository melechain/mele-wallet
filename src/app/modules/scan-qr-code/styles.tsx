import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	content: {
		height: "100%",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	qrLogo: {
		width: 127,
		height: 127,
		backgroundColor: "#ECFAF5",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 50,
	},
	successMessage: {
		textAlign: "center",
		height: 56,
		marginTop: 15,
	},
	subSuccessMessageDescription: {
		textAlign: "center",
		height: 40,
		marginTop: -15,
		marginBottom: 10,
	},
	font: {
		fontFamily: "Circular std",
		fontSize: 22,
		textAlign: "center",
		color: "#091841",
	},
	subSuccessMessage: {
		width: 320,
		height: 20,
		marginTop: 10,
	},
	subFont: {
		fontFamily: "Circular std",
		fontSize: 14,
		textAlign: "center",
		color: "#101654",
	},
	button: {
		width: 163,
		height: 56,
		marginTop: 20,
		paddingBottom: 5,
	},
	errorQRLogo: {
		width: 127,
		height: 127,
		backgroundColor: "#FBEFEF",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 50,
	},
	errorMessage: {
		width: 300,
		height: 25,
		marginTop: 15,
	},
	subErrorMessage: {
		width: 320,
		height: 42,
		marginTop: 15,
	},
	subErrorFont: {
		fontFamily: "Circular std",
		fontSize: 14,
		textAlign: "center",
		color: "#101654",
	},
	errorText: {
		textAlign: "center",
	},
	containerStyle: { height: "100%" },
	topViewStyle: { height: 0, flex: 0 },
	bottomViewStyle: { display: "none", height: 0, flex: 0 },
});
