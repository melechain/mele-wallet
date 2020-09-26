import BaseActionCreator from "./base-action-creator";
import {
	StatisticsStateActionTypes,
	IStatisticsReducerAction,
} from "@mele-wallet/redux/reducers/statistics-reducer";

export default class StatisticsActionCreator extends BaseActionCreator<
	StatisticsStateActionTypes,
	IStatisticsReducerAction
> {
	searchStatistics = async () => {
		this.dispatch({
			type: StatisticsStateActionTypes.LOAD_STATISTICS_REQUEST,
		});
	};
	searchStaticInfo = async () => {
		this.dispatch({
			type: StatisticsStateActionTypes.LOAD_STATIC_INFO_REQUEST,
		});
	};
}
