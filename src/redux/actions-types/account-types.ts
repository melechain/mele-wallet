import { Action } from "redux";

export enum AccountStateActionTypes {
	LOG_IN_REQUEST = "@@ACCOUNT/LOG_IN_REQUEST",
	LOG_IN_ERROR = "@@ACCOUNT/LOG_IN_ERROR",
	LOG_IN_SUCCESSFUL = "@@ACCOUNT/LOG_IN_SUCCESSFUL",
	LOG_OUT_REQUEST = "@@ACCOUNT/LOG_OUT_REQUEST",
	LOG_OUT_SUCCESSFUL = "@@ACCOUNT/LOG_OUT_SUCCESSFUL",
	LOG_OUT_ERROR = "@@ACCOUNT/LOG_OUT_ERROR",
	UPDATE_SESSION = "@@ACCOUNT/UPDATE_SESSION",
}

export interface IAccountReducerAction extends Action {
	type: AccountStateActionTypes;
	data?: any;
	loginError?: string;
	logoutError?: string;
}
