import MainService from "./main-api-service";

// used by admin to manipulate user data
export default class StatisticsService extends MainService {
	getStaticInfo = async () => {
		return await this.get({
			path: `/meta`,
		});
	};
	getStatisticsNumbers = async () => {
		return await this.get({
			path: `/transaction?statistics`,
		});
	};
}
export const statisticsService = new StatisticsService();
