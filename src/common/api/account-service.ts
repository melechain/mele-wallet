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
			data: {
				bearer: null,
			},
		});
	};
	confirmEmail = async (token: string) => {
		return await this.post({
			path: `/account/${token}`,
		});
	};
	confirmEmailWithPassword = async (token: string, password: string) => {
		return await this.post({
			path: `/account/${token}`,
			data: {
				password: password,
			},
		});
	};

	createAccount = async (
		username: string,
		name: string,
		password: string,
		uri: string,
	) => {
		return await this.put({
			path: `/account`,
			data: {
				name: name,
				email: username,
				password: password,
				uri: uri,
			},
		});
	};
	checkUsername = async (username: string) => {
		return await this.get({
			path: `/account/${username}`,
		});
	};

	passwordResetInitiate = async (username: string, uri: string) => {
		return await this.put({
			path: `/reset`,
			data: {
				email: username,
				uri: uri,
			},
		});
	};

	passwordResetCheckToken = async (token: string) => {
		return await this.get({
			path: `/reset/${token}`,
		});
	};

	passwordResetConfirm = async (token: string, password: string) => {
		return await this.post({
			path: `/reset/${token}`,
			data: {
				password: password,
			},
		});
	};
}
export const accountService = new AccountService();
