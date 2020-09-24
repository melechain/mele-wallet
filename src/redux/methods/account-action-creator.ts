import BaseActionCreator from "./base-action-creator";
import {
	AccountStateActionTypes,
	IAccountReducerAction,
} from "@mele-wallet/redux/reducers/account-reducer";

export default class AccountActionCreator extends BaseActionCreator<
	AccountStateActionTypes,
	IAccountReducerAction
> {
	walletSync = async (accountId: string, wallet: string) => {
		this.dispatch({
			type: AccountStateActionTypes.WALLET_SYNC_REQUEST,
			accountId: accountId,
			wallet: wallet,
		});
	};

	accountSync = async () => {
		this.dispatch({
			type: AccountStateActionTypes.ACCOUNT_SYNC_REQUEST,
		});
	};
	accountSyncReset = async () => {
		this.dispatch({
			type: AccountStateActionTypes.ACCOUNT_SYNC_RESET,
		});
	};
}
