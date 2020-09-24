export class Random {
	public static getRandomIntegerInRange(min: number, max: number) {
		return Math.floor(Math.random() * (max - min) + min);
	}
	public static getRandomIntegersSetInRange(
		min: number,
		max: number,
		n: number,
	) {
		const generatedNumbers: number[] = [];
		while (generatedNumbers.length < n) {
			const minState = generatedNumbers[generatedNumbers.length - 1] + 1 || 0;
			const maxState = max - (n - generatedNumbers.length) + 1;
			const newNumber = Random.getRandomIntegerInRange(minState, maxState);
			generatedNumbers.push(newNumber);
		}
		return generatedNumbers;
	}
}
