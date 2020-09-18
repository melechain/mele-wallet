import "./styles.tsx";
import * as React from "react";
import { connect } from "react-redux";
import { MeleCalculator } from "@mele-wallet/common/mele-calculator/mele-calculator";
import { StatisticsState } from "@mele-wallet/redux/reducers/statistics-reducer";
import { mapDispatchToProps } from "@mele-wallet/redux/methods/map-dispatch-to-props";
import ApplicationState from "@mele-wallet/redux/application-state";
import { View, Text, ViewProps } from "react-native";
import { styles } from "./styles";
import InfoGrayIcon from "@mele-wallet/resources/icons/info-grey.svg";
import { commonStyles } from "@mele-wallet/app/common/styles/common-styles";

interface CalculatorProps extends ViewProps {
	centsAmount: number;
	statisticsState: StatisticsState;
}

class CalculatorComponent extends React.Component<CalculatorProps> {
	render() {
		let melecUSD = MeleCalculator.centsToUSDFormatted(
			Math.ceil((this.props.centsAmount / 3) * 2),
		);
		let meleCoins = 0;
		let meleCoinPrice = 0;
		let melegUSD = MeleCalculator.centsToUSDFormatted(
			Math.floor(this.props.centsAmount / 3),
		);
		let meleGold: any = 0;
		let meleGoldPrice = 0;

		if (this.props.statisticsState.loaded) {
			meleCoinPrice = this.props.statisticsState.staticInfo!.melecPrice;
			meleCoins = MeleCalculator.CentsToMeleCFormatted(
				this.props.centsAmount,
				meleCoinPrice,
			);

			meleGoldPrice = this.props.statisticsState.staticInfo!.melegPrice;
			meleGold = MeleCalculator.CentsToMeleGFormatted(
				this.props.centsAmount,
				meleGoldPrice,
			);
		}

		return (
			<View {...this.props} style={[styles.meleCalculator, this.props.style]}>
				<View style={[styles.meleDisplay]}>
					<View style={[styles.meleDisplayNumbers]}>
						<View>
							<Text
								style={[styles.coinCount, commonStyles.fontBold]}
								numberOfLines={1}
							>
								{meleCoins}
							</Text>
							<Text style={[styles.usdCount]}>${melecUSD}</Text>
						</View>
					</View>
					<View style={[styles.meleDisplayNotions]}>
						<View style={[styles.meleNotions]}>
							<Text
								style={[
									styles.coinName,
									styles.meleCoin,
									commonStyles.fontBold,
								]}
							>
								MELC
							</Text>
							<Text style={[styles.coinRate]}>${meleCoinPrice / 100}</Text>
						</View>
					</View>
				</View>
				{this.getMelegoldPart(meleGold, melegUSD, meleGoldPrice)}
			</View>
		);
	}

	getMelegoldPart(meleGold: string, melegUSD: string, meleGoldPrice: number) {
		return (
			<View style={[styles.meleDisplay, styles.rightDisplay]}>
				<View style={[styles.meleDisplayNumbers]}>
					<View>
						<Text style={[styles.coinCount, commonStyles.fontBold]}>
							{meleGold}
						</Text>
						<Text style={[styles.usdCount]}>${melegUSD}</Text>
					</View>
				</View>
				<View style={[styles.meleDisplayNotions]}>
					<View style={[styles.notificationIcon]}>
						<InfoGrayIcon width={5} height={20} />
					</View>
					<View style={[styles.meleNotions]}>
						<Text
							style={[styles.coinName, styles.meleGold, commonStyles.fontBold]}
						>
							MELG
						</Text>
						<Text style={[styles.coinRate]}>${meleGoldPrice / 100}</Text>
					</View>
				</View>
			</View>
		);
	}
}

const mapStateToProps = (state: ApplicationState) => {
	return {
		languageState: state.language,
		statisticsState: state.statistics,
	};
};

export const Calculator = connect(
	mapStateToProps,
	mapDispatchToProps,
)(CalculatorComponent);
