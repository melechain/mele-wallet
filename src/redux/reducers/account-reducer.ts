import { Reducer, Action } from "redux";
import {
	AccountStateActionTypes,
	IAccountReducerAction,
} from "../actions-types/account-types";
import { IAccountModel } from "mele-wallet/common/model/account.model";

export class AccountState {
	isLoggingIn: boolean = false;
	isLoggedIn: boolean = false;
	isLoggingOut: boolean = false;
	loginError: string = "";
	logoutError: string = "";
	sessionChecked: boolean = false;
	account?: IAccountModel;
}

export const initialState: AccountState = new AccountState();

const accountReducer = (
	state: AccountState = initialState,
	action: IAccountReducerAction,
): AccountState => {
	switch (action.type) {
		case AccountStateActionTypes.LOG_IN_REQUEST:
			return {
				...state,
				isLoggingIn: true,
				loginError: "",
			};
		case AccountStateActionTypes.LOG_IN_SUCCESSFUL:
			return {
				...state,
				isLoggingIn: false,
				isLoggedIn: true,
				loginError: "",
			};
		case AccountStateActionTypes.LOG_IN_ERROR:
			return {
				...state,
				isLoggingIn: false,
				isLoggedIn: false,
				loginError: action.loginError || "",
			};
		case AccountStateActionTypes.LOG_OUT_REQUEST:
			return {
				...state,
				isLoggingOut: true,
			};
		case AccountStateActionTypes.LOG_OUT_SUCCESSFUL:
			return {
				...state,
				isLoggingOut: false,
				isLoggedIn: false,
				account: undefined,
			};
		case AccountStateActionTypes.LOG_OUT_ERROR:
			return {
				...state,
				isLoggingOut: false,
				logoutError: action.logoutError || "",
			};
		default:
			return {
				...state,
			};
	}
};

export default accountReducer;
