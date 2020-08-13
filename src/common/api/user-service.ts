import MainService from "./main-api-service";

// used by admin to manipulate user data
export default class UserService extends MainService {
	searchUsers = async (page: number, size: number) => {
		return await this.get({
			path: `/accounts?page=${page || 1}&size=${size || 20}`,
		});
	};
}
export const userService = new UserService();
