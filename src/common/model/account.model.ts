export interface IAccountModel {
	balance: number;
	bearer: string;
	bearerExp: string;
	email: string;
	emailVerified: boolean;
	id: string;
	kyc: string;
	logoutMins: number;
	name: string;
	password: string;
	role: string;
	wallet: string;
}
