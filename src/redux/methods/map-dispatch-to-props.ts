import { Dispatch } from "redux";
import AccountActionCreator from "./account-action-creator";
import StaticActionCreator from "@mele-wallet/redux/methods/static-action-creator";
import StatisticsActionCreator from "@mele-wallet/redux/methods/statistics-action-creator";

export interface IActionCreators {
	account: AccountActionCreator;
	static: StaticActionCreator;
	statistics: StatisticsActionCreator;
}

export const mapDispatchToProps = (
	dispatch: Dispatch,
): { actionCreators: IActionCreators } => {
	return {
		actionCreators: {
			account: new AccountActionCreator(dispatch),
			static: new StaticActionCreator(dispatch),
			statistics: new StatisticsActionCreator(dispatch),
		},
	};
};
