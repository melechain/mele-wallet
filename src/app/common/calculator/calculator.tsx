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
import RBSheet from "react-native-raw-bottom-sheet";
import { LanguageState } from "@mele-wallet/redux/reducers/language-reducer";
import Ripple from "react-native-material-ripple";

interface CalculatorProps extends ViewProps {
	centsAmount: string;
	statisticsState: StatisticsState;
	languageState: LanguageState;
}

const languages = {
	en: require("../../translations/en.json"),
	ar: require("../../translations/ar.json"),
};

class CalculatorComponent extends React.Component<CalculatorProps> {
	render() {
		const localeData = languages[this.props.languageState.currentLanguage];
		let meleCoins = "0";
		let meleCoinPrice = "0";
		let melegUSD = MeleCalculator.CentsToUSDMeleGPortionFormatted(
			this.props.centsAmount || "0",
		);
		let melecUSD = MeleCalculator.CentsToUSDMeleCPortionFormatted(
			this.props.centsAmount || "0",
		);
		let meleGold: any = "0";
		let priceOfGoldPerGram = "0";
		let melgPerGramOfGold = "1";

		if (this.props.statisticsState.loaded) {
			meleCoins = "0";
			meleCoinPrice = "0";
			melegUSD = MeleCalculator.CentsToUSDMeleGPortionFormatted(
				this.props.centsAmount,
			);
			meleGold = "0";

			if (this.props.statisticsState.loaded) {
				meleCoinPrice = this.props.statisticsState.staticInfo!.melecPrice;
				meleCoins = MeleCalculator.CentsToMeleCFormatted(
					this.props.centsAmount,
					meleCoinPrice,
				);

				priceOfGoldPerGram = this.props.statisticsState.staticInfo!
					.priceOfGoldPerGram;
				melgPerGramOfGold = this.props.statisticsState.staticInfo!
					.melgPerGramOfGold;
				meleGold = MeleCalculator.CentsToMeleGFormatted(
					this.props.centsAmount,
					melgPerGramOfGold,
					priceOfGoldPerGram,
				);
			}
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
							<Text style={[styles.coinRate]}>
								${MeleCalculator.getMelCPrice(meleCoinPrice)}
							</Text>
						</View>
					</View>
				</View>
				{this.getMelegoldPart(
					meleGold,
					melegUSD,
					melgPerGramOfGold,
					priceOfGoldPerGram,
					localeData,
				)}
			</View>
		);
	}

	getMelegoldPart(
		meleGold: string,
		melegUSD: string,
		melgPerGramOfGold: string,
		priceOfGoldPerGram: string,
		localeData: any,
	) {
		return (
			<View style={[styles.meleDisplay]}>
				<View style={[styles.meleDisplayNumbers]}>
					<View>
						<Text
							style={[styles.coinCount, commonStyles.fontBold]}
							numberOfLines={1}
						>
							{meleGold}
						</Text>
						<Text style={[styles.usdCount]}>${melegUSD}</Text>
					</View>
					<Ripple
						onPress={() => {
							this.RBSheet.open();
						}}
						disableRipple
					>
						<InfoGrayIcon height={15} width={15} style={{ marginLeft: 130 }} />
					</Ripple>
					<RBSheet
						ref={(ref) => {
							this.RBSheet = ref;
						}}
						openDuration={250}
						customStyles={{
							container: {
								borderTopLeftRadius: 20,
								borderTopRightRadius: 20,
								alignContent: "center",
								alignItems: "center",
							},
						}}
					>
						<View style={[styles.explainerContainer]}>
							<Text style={[styles.calculatorText, commonStyles.fontBold]}>
								{localeData.calculator.title}
							</Text>
							<Text style={[styles.calculatorDesc]}>
								{localeData.calculator.description}
							</Text>
						</View>
					</RBSheet>
				</View>
				<View style={[styles.meleDisplayNotions]}>
					{/* <View style={[styles.notificationIcon]}>
						<InfoGrayIcon width={5} height={20} />
					</View> */}
					<View style={[styles.meleNotions]}>
						<Text
							style={[styles.coinName, styles.meleGold, commonStyles.fontBold]}
						>
							MELG
						</Text>
						<Text style={[styles.coinRate]}>
							$
							{MeleCalculator.getMelGPrice(
								melgPerGramOfGold,
								priceOfGoldPerGram,
							)}
						</Text>
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
