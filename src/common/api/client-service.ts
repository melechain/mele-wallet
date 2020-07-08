import MainService from "./main-api-service";
import btoa from "btoa";
export default class AccountService extends MainService {
	login = async (username: string, password: string) => {
		return await this.get({
			path: `/account`,
			headers: {
				Authorization: `Basic ${btoa(username + ":" + password)}`,
			},
		});
	};
}
export const accountService = new AccountService();
