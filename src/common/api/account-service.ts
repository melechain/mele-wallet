import MainService from "./main-api-service";
import base64 from "base-64";
import Cookies from "universal-cookie";
export default class AccountService extends MainService {
	walletSync = async (accountId: string, wallet: string) => {
		return await this.patch({
			path: `/account/${accountId}`,
			data: {
				wallet: wallet,
			},
		});
	};

	login = async (username: string, password: string) => {
		return await this.get({
			path: "/account",
			headers: {
				Authorization: `Basic ${base64.encode(username + ":" + password)}`,
			},
		});
	};

	checkSession = async () => {
		return await this.get({
			path: "/account",
		});
	};

	logout = async () => {
		return await this.post({
			path: "/account/logout",
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
		language: string,
	) => {
		return await this.put({
			path: "/account",
			data: {
				name: name,
				email: username,
				password: password,
				currentLanguage: language,
			},
		});
	};
	inviteAccount = async (username: string, name: string, uri: string) => {
		return await this.put({
			path: "/account",
			data: {
				name: name,
				email: username,
				uri: uri,
			},
		});
	};
	updateAccount = async (name: string, phone: string) => {
		return await this.patch({
			path: "/account",
			data: {
				name: name,
				phone: phone,
			},
		});
	};
	updatePassword = async (current: string, password: string) => {
		return await this.patch({
			path: "/account",
			data: {
				current: current,
				password: password,
			},
		});
	};
	checkUsername = async (username: string) => {
		return await this.get({
			path: `/account/${username}`,
		});
	};

	passwordResetInitiate = async (username: string, language: string) => {
		const cookies = new Cookies();
		if (cookies.get("resetPassword")) {
			return "Can't reset yet";
		} else {
			const expireDate = new Date();
			expireDate.setMinutes(expireDate.getMinutes() + 30);
			cookies.set("resetPassword", username, { expires: expireDate });
			return await this.put({
				path: "/reset",
				data: {
					email: username,
					currentLanguage: language,
				},
			});
		}
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
