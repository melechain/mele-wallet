import MainService from "./main-api-service";
import base64 from "base-64";
export default class AccountService extends MainService {
	login = async (username: string, password: string) => {
		return await this.get({
			path: `/account`,
			headers: {
				Authorization: `Basic ${base64.encode(username + ":" + password)}`,
			},
		});
	};

	checkSession = async () => {
		return await this.get({
			path: `/account`,
		});
	};

	logout = async () => {
		return await this.patch({
			path: `/account`,
		});
	};
}
export const accountService = new AccountService();
