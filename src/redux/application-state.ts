import { AccountState } from "./reducers/account-reducer";
import { LanguageState } from "@mele-wallet/redux/reducers/language-reducer";
import { StaticState } from "@mele-wallet/redux/reducers/static-reducer";
import { StatisticsState } from "@mele-wallet/redux/reducers/statistics-reducer";
import { TransactionsState } from "@mele-wallet/redux/reducers/transaction-reducer";
import { CurrencyState } from "@mele-wallet/redux/reducers/currency-reducer";
import { WalletState } from "./reducers/wallet-reducer";

export default class ApplicationState {
	account: AccountState = new AccountState();
	language: LanguageState = new LanguageState();
	static: StaticState = new StaticState();
	statistics: StatisticsState = new StatisticsState();
	transaction: TransactionsState = new TransactionsState();
	currency: CurrencyState = new CurrencyState();
	wallet: WalletState = new WalletState();
}
