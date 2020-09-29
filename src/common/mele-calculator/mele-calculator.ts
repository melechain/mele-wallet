import BN from "bn.js";
import { Utils } from "mele-sdk";

const ONE_CENT = new BN("10000000");
const ONE_USD = new BN("1000000000");
const MELC_PART = new BN("666666667");
const MELG_PART = new BN("333333333");

// const ONE_MELC = ONE_USD

// const MELC_PRICE = new BN('370370000') // $0.37037 padded to 9 places

// const PRICE_OF_GOLD_PER_GRAM = new BN('61570000000') // $61.57 padded to 9 places
// const MELG_PER_GRAM_OF_GOLD = new BN('10')

export class MeleCalculator {
	public static getMelGPrice(
		p_melgPerGramOfGold: string,
		p_priceOfGoldPerGram: string,
	) {
		return Utils.fromUmelg(
			new BN(p_priceOfGoldPerGram).div(new BN(p_melgPerGramOfGold)),
		);
	}
	public static getMelCPrice(melcPrice: string) {
		return Utils.fromUmelc(melcPrice);
	}

	public static CentsToUSDMeleCPortionFormatted(cents: string) {
		let centsBN = new BN(cents); // convert cents to BN
		let centsExtended = centsBN.mul(ONE_CENT); // pad cents to 9 places
		let melcUsd = centsExtended.mul(MELC_PART);
		let mecUsdDisplay = melcUsd.div(ONE_USD);
		const usd = Utils.fromUmelc(mecUsdDisplay);
		const fixedUSD = parseFloat(usd).toFixed(2);
		return MeleCalculator.formatNumber(fixedUSD);
	}

	public static CentsToUSDMeleGPortionFormatted(cents: string) {
		let centsBN = new BN(cents); // convert cents to BN
		let centsExtended = centsBN.mul(ONE_CENT); // pad cents to 9 places
		let melcUsd = centsExtended.mul(MELG_PART);
		let mecUsdDisplay = melcUsd.div(ONE_USD);
		const usd = Utils.fromUmelc(mecUsdDisplay);
		const fixedUSD = parseFloat(usd).toFixed(2);
		return MeleCalculator.formatNumber(fixedUSD);
	}

	public static CentsToMeleC(cents: string, melcPrice: string): string {
		if (cents.length >= 13) {
			// We don't support amounts greater than 100B$
			return "0";
		}
		let centsBN = new BN(cents); // convert cents to BN
		let centsExtended = centsBN.mul(ONE_CENT); // pad cents to 9 places
		let melcUsd = centsExtended.mul(MELC_PART);
		return Utils.fromUmelc(melcUsd.div(new BN(melcPrice))).toString();
	}
	public static CentsToMeleG(
		cents: string,
		p_melgPerGramOfGold: string,
		p_priceOfGoldPerGram: string,
	): string {
		if (cents.length >= 13) {
			// We don't support amounts greater than 100B$
			return "0";
		}
		const centsBN = new BN(cents); // convert cents to BN
		const centsExtended = centsBN.mul(ONE_CENT);
		const melgCents = centsExtended.mul(MELG_PART);
		const gramsOfGold = melgCents
			.mul(new BN(p_melgPerGramOfGold))
			.div(new BN(p_priceOfGoldPerGram || "1"));
		return Utils.fromUmelg(gramsOfGold).toString();
	}

	public static CentsToMeleCFormatted(
		cents: string,
		meleCPrice: string,
		decimals: number = 9,
	) {
		return MeleCalculator.formatNumber(
			MeleCalculator.CentsToMeleC(cents, meleCPrice),
			decimals,
		);
	}
	public static CentsToMeleGFormatted(
		cents: string,
		p_melgPerGramOfGold: string,
		p_priceOfGoldPerGram: string,
		decimals: number = 9,
	) {
		return MeleCalculator.formatNumber(
			MeleCalculator.CentsToMeleG(
				cents,
				p_melgPerGramOfGold,
				p_priceOfGoldPerGram,
			),
			decimals,
		);
	}

	public static centsToUSD = (cents: string) => {
		return (parseInt(cents) / 100).toString();
	};

	public static centsToUSDFormatted = (cents: string, decimals: number = 2) => {
		return MeleCalculator.USDFormatted(MeleCalculator.centsToUSD(cents));
	};
	public static USDFormatted = (USD: string) => {
		return MeleCalculator.formatNumber(USD);
	};

	public static formatNumber = (numb: string, decimals: number = 20) => {
		// let [round, decimal] = parseFloat(numb.toFixed(decimals))
		// 	.toString()
		// 	.split(".");

		if (numb === "0") {
			return "0";
		}
		let [round, decimal] = numb.split(".");

		round = round.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
		if (decimal) {
			return [round, decimal].join(".");
		}
		return round;
	};
}
