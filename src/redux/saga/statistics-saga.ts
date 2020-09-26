import { put, call, takeEvery, takeLatest, select } from "redux-saga/effects";

import { statisticsService } from "@mele-wallet/common/api/statistics-service";
import { SagaIterator } from "redux-saga";
import {
	StatisticsStateActionTypes,
	IStatisticsReducerAction,
} from "@mele-wallet/redux/reducers/statistics-reducer";

export const statisticsSaga = function* handleMessage(
	params: any,
): SagaIterator {
	yield takeLatest(
		StatisticsStateActionTypes.LOAD_STATISTICS_REQUEST,
		loadStatistics,
	);
	yield takeLatest(
		StatisticsStateActionTypes.LOAD_STATIC_INFO_REQUEST,
		loadStaticInfo,
	);
	yield takeLatest(
		StatisticsStateActionTypes.LOAD_DAILY_TRANSACTIONS_REQUEST,
		searchDailyTransactions,
	);
};

function* loadStatistics(action: IStatisticsReducerAction): SagaIterator {
	try {
		const staticInfo = yield call(statisticsService.getStaticInfo);
		const statisticsInfo = yield call(statisticsService.getStatisticsNumbers);

		staticInfo.melecPrice = "370370000";
		staticInfo.priceOfGoldPerGram = "61570000000";
		staticInfo.melgPerGramOfGold = "10";

		return yield put({
			type: StatisticsStateActionTypes.LOAD_STATISTICS_SUCCESS,
			statisticsInfo: statisticsInfo,
			staticInfo: staticInfo,
		});
	} catch (e) {
		return yield put({
			type: StatisticsStateActionTypes.LOAD_STATISTICS_ERROR,
		});
	}
}
function* loadStaticInfo(action: IStatisticsReducerAction): SagaIterator {
	try {
		const staticInfo = yield call(statisticsService.getStaticInfo);

		staticInfo.melecPrice = "370370000";
		staticInfo.priceOfGoldPerGram = "61570000000";
		staticInfo.melgPerGramOfGold = "10";

		return yield put({
			type: StatisticsStateActionTypes.LOAD_STATIC_INFO_SUCCESS,
			staticInfo: staticInfo,
		});
	} catch (e) {
		return yield put({
			type: StatisticsStateActionTypes.LOAD_STATIC_INFO_ERROR,
		});
	}
}

function* searchDailyTransactions(
	action: IStatisticsReducerAction,
): SagaIterator {
	try {
		const response = yield call(
			statisticsService.searchDailyTransactions,
			action.dailyTransactionsStartDate,
			action.dailyTransactionsEndDate,
		);

		const allAllDates = getDaysArray(
			new Date(action.dailyTransactionsStartDate),
			new Date(action.dailyTransactionsEndDate),
		).map((date: string) => {
			const dateAmount = response.find((d: any) => {
				return d.date == date;
			});
			return {
				amount: dateAmount ? dateAmount.amount : 0,
				date: date,
			};
		});

		return yield put({
			type: StatisticsStateActionTypes.LOAD_DAILY_TRANSACTIONS_SUCCESS,
			dailyTransactions: allAllDates,
		});
	} catch (e) {
		return yield put({
			type: StatisticsStateActionTypes.LOAD_DAILY_TRANSACTIONS_ERROR,
		});
	}
}

const getDaysArray = (s: any, e: any) => {
	for (var arr = [], d = new Date(s); d < e; d.setDate(d.getDate() + 1)) {
		arr.push(new Date(d));
	}
	return arr.map((v) => v.toISOString().slice(0, 10));
};
