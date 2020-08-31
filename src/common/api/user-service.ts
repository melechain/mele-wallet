import MainService from "./main-api-service";
import buildUrl from "build-url";

export interface ISearchUsersParameter {
	page?: number;
	size?: number;
	status?: string;
}

// used by admin to manipulate user data
export default class UserService extends MainService {
	searchUsers = async (p: ISearchUsersParameter) => {
		// remove this after API uses standard filters
		const tempP: any = {};
		if (p.status == "pending") {
			tempP.pending = "";
		}
		// <==== till this

		const url = buildUrl("/accounts", {
			queryParams: {
				page: p.page || 1,
				size: p.size || 20,
				...(p as any),
				...tempP,
			},
		});
		return await this.get({
			path: url,
		});
	};
	loadUserByEmail = async (email: string) => {
		return await this.get({
			path: `/account/${email}`,
		});
	};
}
export const userService = new UserService();
