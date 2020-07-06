import { AccountState } from "./reducers/account-reducer";

export default class ApplicationState {
	account: AccountState = new AccountState();
}
