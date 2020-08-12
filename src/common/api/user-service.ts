import MainService from "./main-api-service";

// used by admin to manipulate user data
export default class UserService extends MainService {
	searchUsers = async () => {
		return await this.get({
			path: `/accounts`,
		});
	};
}
export const userService = new UserService();
