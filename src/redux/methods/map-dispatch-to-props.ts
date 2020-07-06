import { Dispatch } from "redux";
import AccountActionCreator from "./account-action-creator";

export interface IActionCreators {
	account: AccountActionCreator;
}

export const mapDispatchToProps = (
	dispatch: Dispatch,
): { actionCreators: IActionCreators } => {
	return {
		actionCreators: {
			account: new AccountActionCreator(dispatch),
		},
	};
};
