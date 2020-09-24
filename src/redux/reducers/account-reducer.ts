import { IAccountModel } from "@mele-wallet/common/model/account.model";

export enum AccountStateActionTypes {
	WALLET_SYNC_REQUEST = "@@ACCOUNT/WALLET_SYNC_REQUEST",
	WALLET_SYNC_ERROR = "@@ACCOUNT/WALLET_SYNC_ERROR",
	WALLET_SYNC_SUCCESSFUL = "@@ACCOUNT/WALLET_SYNC_SUCCESSFUL",
	ACCOUNT_SYNC_RESET = "@@ACCOUNT/ACCOUNT_SYNC_RESET",
	ACCOUNT_SYNC_REQUEST = "@@ACCOUNT/ACCOUNT_SYNC_REQUEST",
	ACCOUNT_SYNC_ERROR = "@@ACCOUNT/ACCOUNT_SYNC_ERROR",
	ACCOUNT_SYNC_SUCCESSFUL = "@@ACCOUNT/ACCOUNT_SYNC_SUCCESSFUL",
}

export enum WalletSyncStatus {
	NOT_STARTED,
	REQUESTED,
	ERROR,
	SUCCESS,
}

export enum AccountSyncStatus {
	NOT_STARTED,
	REQUESTED,
	ERROR,
	SUCCESS,
}

export interface IAccountReducerAction {
	type: AccountStateActionTypes;
	wallet?: string;
	accountId?: string;
	account?: IAccountModel;
}

export class AccountState {
	walletSyncStatus: WalletSyncStatus = WalletSyncStatus.NOT_STARTED;
	accountSyncStatus: AccountSyncStatus = AccountSyncStatus.NOT_STARTED;
	sessionChecked: boolean = false;
	account?: IAccountModel;
}

export const initialState: AccountState = new AccountState();

const accountReducer = (
	state: AccountState = initialState,
	action: IAccountReducerAction,
): AccountState => {
	switch (action.type) {
		case AccountStateActionTypes.WALLET_SYNC_REQUEST:
			return {
				...state,
				walletSyncStatus: WalletSyncStatus.REQUESTED,
			};
		case AccountStateActionTypes.WALLET_SYNC_SUCCESSFUL:
			return {
				...state,
				walletSyncStatus: WalletSyncStatus.SUCCESS,
			};
		case AccountStateActionTypes.WALLET_SYNC_ERROR:
			return {
				...state,
				walletSyncStatus: WalletSyncStatus.ERROR,
			};
		case AccountStateActionTypes.ACCOUNT_SYNC_REQUEST:
			return {
				...state,
				accountSyncStatus: AccountSyncStatus.REQUESTED,
			};
		case AccountStateActionTypes.ACCOUNT_SYNC_SUCCESSFUL:
			return {
				...state,
				accountSyncStatus: AccountSyncStatus.SUCCESS,
				account: action.account,
			};
		case AccountStateActionTypes.ACCOUNT_SYNC_ERROR:
			return {
				...state,
				accountSyncStatus: AccountSyncStatus.ERROR,
			};
		case AccountStateActionTypes.ACCOUNT_SYNC_RESET:
			return {
				...state,
				accountSyncStatus: AccountSyncStatus.NOT_STARTED,
			};
		default:
			return {
				...state,
			};
	}
};

export default accountReducer;
