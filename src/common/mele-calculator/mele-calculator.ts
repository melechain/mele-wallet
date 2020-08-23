export class MeleCalculator {
	public static CentsToMeleC(cents: number, meleCPrice: number) {
		return cents / meleCPrice;
	}
	public static CentsToMeleG(cents: number, meleGPrice: number) {
		return cents / meleGPrice;
	}

	public static CentsToMeleCFormatted(
		cents: number,
		meleCPrice: number,
		decimals: number = 5,
	) {
		return MeleCalculator.formatNumber(
			MeleCalculator.CentsToMeleC(cents, meleCPrice),
			decimals,
		);
	}
	public static CentsToMeleGFormatted(
		cents: number,
		meleCPrice: number,
		decimals: number = 5,
	) {
		return MeleCalculator.formatNumber(
			MeleCalculator.CentsToMeleG(cents, meleCPrice),
			decimals,
		);
	}

	public static centsToUSD = (cents: number) => {
		return cents / 100;
	};

	public static centsToUSDFormatted = (cents: number, decimals: number = 2) => {
		return MeleCalculator.USDFormatted(
			MeleCalculator.centsToUSD(cents),
			decimals,
		);
	};
	public static USDFormatted = (USD: number, decimals: number = 2) => {
		return MeleCalculator.formatNumber(USD, decimals);
	};

	public static formatNumber = (numb: number, decimals: number = 2) => {
		let [round, decimal] = parseFloat(numb.toFixed(decimals))
			.toString()
			.split(".");
		round = round.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");

		if (decimal) {
			return [round.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"), decimal].join(
				".",
			) as any;
		}
		return round as any;
	};
}
