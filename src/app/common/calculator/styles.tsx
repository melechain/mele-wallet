import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	meleCalculator: {
		display: "flex",
		flexDirection: "column",
		width: "100%",
	},
	meleDisplay: {
		width: "100%",
		flex: 1,
		backgroundColor: "#0F2BA9",
		borderRadius: 6,
		marginTop: 1,
		marginBottom: 1,
		display: "flex",
		flexDirection: "row",
		padding: 12,
	},
	meleDisplayNumbers: {
		display: "flex",
		flexDirection: "row",
		flex: 2,
		borderRightWidth: 1,
		borderStyle: "solid",
		borderColor: "#0D299F",
	},
	coinCount: {
		fontSize: 20,
		color: "#FFFFFF",
		//textOverflow: "ellipsis",
		overflow: "hidden",
		marginTop: "2%",
	},
	usdCount: {
		fontSize: 10,
		color: "#FFFFFF",
		//textOverflow: "ellipsis",
		overflow: "hidden",
	},

	meleDisplayNotions: {
		flex: 1,
		display: "flex",
		flexDirection: "row",
		justifyContent: "flex-end",
	},
	notificationIcon: {
		height: 10,
		width: 10,
		marginTop: 4,
		marginLeft: 10,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	meleNotions: {
		flex: 1,
		flexDirection: "column",
	},
	coinName: {
		fontSize: 14,
		textAlign: "right",
	},
	coinRate: {
		fontSize: 10,
		textAlign: "right",
		color: "#8495D4",
	},
	meleCoin: {
		color: "#FFFFFF",
	},
	meleGold: {
		color: "#F4BD00",
	},
	calculatorText: {
		fontSize: 20,
		color: "#101654",
		marginBottom: 20,
	},
	explainerContainer: {
		paddingTop: 20,
		width: "80%",
		textAlign: "center",
	},
	calculatorDesc: {
		fontSize: 14,
		color: "#101654",
	},
	explainerDescription: {
		width: "80%",
		textAlign: "center",
	},
	blueIcon: {
		position: "absolute",
		right: "2%",
		top: "55%",
	},
});
