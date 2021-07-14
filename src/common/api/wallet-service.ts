import MainService from "./main-api-service";
import AsyncStorage from "@react-native-community/async-storage";
import base64 from "base-64";
import { Mele, MnemonicSigner } from "mele-sdk";

export interface ISearchWalletParameter {
	mnemonic: string;
	address: string;
}

export default class WalletService extends MainService {
	getWalletAddress = async (p: ISearchWalletParameter) => {
		const signer = new MnemonicSigner(p.mnemonic);
		const address = await signer.getAddress();
		AsyncStorage.setItem("address", base64.encode(address));
		return address;
	};

	getWallet = async (p: ISearchWalletParameter) => {
		const signer = new MnemonicSigner(p.mnemonic);
		const mele = new Mele({
			nodeUrl: "http://3.126.68.149:26657/",
			indexerEndpoint: "http://18.192.179.29:3100/api/v1",
			chainId: "devnet",
			signer: signer,
		});
		const wallet = await mele.query.getAccountInfo(signer.getAddress());
		return wallet;
	};
}
export const walletService = new WalletService();
