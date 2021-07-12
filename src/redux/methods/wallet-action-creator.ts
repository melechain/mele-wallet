import {
	WalletStateActionTypes,
	IWalletReducerAction,
} from "../reducers/wallet-reducer";
import BaseActionCreator from "./base-action-creator";

export default class WalletActionCreator extends BaseActionCreator<
	WalletStateActionTypes,
	IWalletReducerAction
> {
	getWalletAddress = async (mnemonic: string) => {
		this.dispatch({
			type: WalletStateActionTypes.GET_WALLET_ADDRESS_REQUEST,
			mnemonic: mnemonic,
		});
	};
	getWallet = async (mnemonic: string) => {
		this.dispatch({
			type: WalletStateActionTypes.GET_WALLET_REQUEST,
			mnemonic: mnemonic,
		});
	};
	logout = async () => {
		this.dispatch({
			type: WalletStateActionTypes.WALLET_LOGOUT,
		});
	};
}
