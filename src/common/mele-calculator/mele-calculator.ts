export class MeleCalculator {
	public static USDToMeleC(usd: number) {
		return usd * 0.67 * 50;
	}
	public static USDToMeleG(usd: number) {
		const priceOfGold = 65;
		return (usd * 0.33) / priceOfGold / 10;
	}
}
