import { Dispatch } from "redux";
import AccountActionCreator from "./account-action-creator";
import StaticActionCreator from "@mele-wallet/redux/methods/static-action-creator";

export interface IActionCreators {
	account: AccountActionCreator;
	static: StaticActionCreator;
}

export const mapDispatchToProps = (
	dispatch: Dispatch,
): { actionCreators: IActionCreators } => {
	return {
		actionCreators: {
			account: new AccountActionCreator(dispatch),
			static: new StaticActionCreator(dispatch),
		},
	};
};
