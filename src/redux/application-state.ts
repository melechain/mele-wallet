import { AccountState } from "./reducers/account-reducer";
import { LanguageState } from "@mele-wallet/redux/reducers/language-reducer";

export default class ApplicationState {
	account: AccountState = new AccountState();
	language: LanguageState = new LanguageState();
}
