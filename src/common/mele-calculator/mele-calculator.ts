export class MeleCalculator {
	public static CentsToMeleC(cents: number, meleCPrice: number) {
		return (cents * meleCPrice) / 100;
	}
	public static CentsToMeleG(cents: number, meleGPrice: number) {
		return Math.round((cents * meleGPrice) / 100);
	}

	public static CentsToMeleCFormatted(
		cents: number,
		meleCPrice: number,
		decimals: number = 5,
	) {
		return parseFloat(
			MeleCalculator.CentsToMeleC(cents, meleCPrice).toFixed(decimals),
		).toString() as any;
	}
	public static CentsToMeleGFormatted(
		cents: number,
		meleCPrice: number,
		decimals: number = 5,
	) {
		return parseFloat(
			MeleCalculator.CentsToMeleG(cents, meleCPrice).toFixed(decimals),
		).toString() as any;
	}
}
