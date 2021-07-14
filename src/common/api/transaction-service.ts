import MainService from "./main-api-service";
import AsyncStorage from "@react-native-community/async-storage";
import { Mele, MnemonicSigner, Utils } from "mele-sdk";
import base64 from "base-64";

const sdk = new Mele({
	nodeUrl: "http://3.126.68.149:26657/",
	chainId: "devnet",
	indexerEndpoint: "http://18.192.179.29:3100/api/v1",
});

export interface ISearchTransactionsParameter {
	page: number;
	size: number;
	address: string;
}

export default class TransactionsService extends MainService {
	getTransactions = async (p: ISearchTransactionsParameter) => {
		const txs = await sdk.indexer.transactions({
			address: p.address,
		});

		return txs;
	};
	getTransactionsCount = async () => {
		const txCount = await sdk.indexer.transactionCount();
		return txCount.count;
	};

	getTransaction = async (hash: string) => {
		const tx = await sdk.indexer.transaction(hash);
		return tx;
	};

	sendTransaction = async (address: string, denom: string, amount: string) => {
		const based = await AsyncStorage.getItem("mnemonic");
		if (based !== null) {
			const mnemonic = base64.decode(based);
			const mele = new Mele({
				nodeUrl: "http://3.126.68.149:26657/",
				indexerEndpoint: "http://18.192.179.29:3100/api/v1",
				chainId: "devnet",
				signer: new MnemonicSigner(mnemonic),
			});

			const response = Utils.promisify(
				await mele.bank
					.transfer(address, [{ denom: denom, amount: amount }])
					.sendTransaction(),
			);

			return response;
		}
	};
}
export const transactionsService = new TransactionsService();
