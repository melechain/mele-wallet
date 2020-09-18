import { MnemonicSigner } from "mele-sdk";

export class Wallet {
	constructor(private mnemonic: string) {}
	getMnemonicSigner = () => {
		return new MnemonicSigner(this.mnemonic);
	};
	getAddress = () => {
		return this.getMnemonicSigner().getAddress();
	};
}
