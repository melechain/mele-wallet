import {
	AccountStateActionTypes,
	IAccountReducerAction,
} from "../actions-types/account-types";
import BaseActionCreator from "./base-action-creator";

export default class AccountActionCreator extends BaseActionCreator<
	AccountStateActionTypes,
	IAccountReducerAction
> {
	login = async (username: string, password: string) => {
		this.dispatch({
			type: AccountStateActionTypes.LOG_IN_REQUEST,
		});
	};
}
