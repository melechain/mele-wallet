import { MnemonicSigner } from "mele-sdk";

export class Wallet {
	static wallet?: Wallet;
	static getWallet = (mnemonic: string) => {
		if (!Wallet.wallet || Wallet.wallet.mnemonic != mnemonic) {
			Wallet.wallet = new Wallet(mnemonic);
		}
		return Wallet.wallet;
	};
	private mnemonicSigner: MnemonicSigner;

	constructor(public mnemonic: string) {
		this.mnemonicSigner = new MnemonicSigner(this.mnemonic);
	}
	getMnemonicSigner = () => {
		return this.mnemonicSigner;
	};
	getAddress = () => {
		return this.getMnemonicSigner().getAddress();
	};
}
