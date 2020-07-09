import { Action } from "redux";
import { IAccountModel } from "mele-wallet/common/model/account.model";

export enum AccountStateActionTypes {
	LOG_IN_REQUEST = "@@ACCOUNT/LOG_IN_REQUEST",
	LOG_IN_ERROR = "@@ACCOUNT/LOG_IN_ERROR",
	LOG_IN_SUCCESSFUL = "@@ACCOUNT/LOG_IN_SUCCESSFUL",
	LOG_OUT_REQUEST = "@@ACCOUNT/LOG_OUT_REQUEST",
	LOG_OUT_SUCCESSFUL = "@@ACCOUNT/LOG_OUT_SUCCESSFUL",
	LOG_OUT_ERROR = "@@ACCOUNT/LOG_OUT_ERROR",
	UPDATE_SESSION = "@@ACCOUNT/UPDATE_SESSION",
}

export interface IAccountReducerAction {
	type: AccountStateActionTypes;
	username: string;
	password: string;
	account: IAccountModel;
	loginError: string;
	logoutError: string;
}
