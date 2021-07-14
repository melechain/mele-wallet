export enum WalletStateActionTypes {
	GET_WALLET_REQUEST = "@@Wallet/GET_WALLET_REQUEST",
	GET_WALLET_SUCCESS = "@@Wallet/GET_WALLET_SUCCESS",
	GET_WALLET_ERROR = "@@Wallet/GET_WALLET_ERROR",
	GET_WALLET_ADDRESS_REQUEST = "@@Wallet/GET_WALLET_ADDRESS_REQUEST",
	GET_WALLET_ADDRESS_SUCCESS = "@@Wallet/GET_WALLET_ADDRESS_SUCCESS",
	GET_WALLET_ADDRESS_ERROR = "@@Wallet/GET_WALLET_ADDRESS_ERROR",
	WALLET_LOGOUT = "@@Wallet/WALLET_LOGOUT",
}

export enum LoadWalletStatus {
	REQUESTED,
	SUCCESS,
	ERROR,
	ADDRESS_REQUEST,
	ADDRESS_SUCCESS,
	ADDRESS_ERROR,
}

export class WalletState {
	loadedWalletAddress: string = "";
	loadedWallet?: any;
	loadWalletStatus?: LoadWalletStatus;
}

export class IWalletReducerAction {
	loadedWalletAddress: string = "";
	loadedWallet: any;
	type?: WalletStateActionTypes;
	mnemonic: string = "";
	address: string = "";
}

export const initialState: WalletState = new WalletState();

const walletReducer = (
	state: WalletState = initialState,
	action: IWalletReducerAction,
): WalletState => {
	switch (action.type) {
		case WalletStateActionTypes.GET_WALLET_ADDRESS_REQUEST:
			return {
				...state,
				loadWalletStatus: LoadWalletStatus.ADDRESS_REQUEST,
			};
		case WalletStateActionTypes.GET_WALLET_ADDRESS_SUCCESS:
			return {
				...state,
				loadedWalletAddress: action.loadedWalletAddress,
			};
		case WalletStateActionTypes.GET_WALLET_ADDRESS_ERROR:
			return {
				...state,
				loadWalletStatus: LoadWalletStatus.ADDRESS_ERROR,
				loadedWalletAddress: "",
			};

		case WalletStateActionTypes.GET_WALLET_REQUEST:
			return {
				...state,
				loadWalletStatus: LoadWalletStatus.REQUESTED,
			};
		case WalletStateActionTypes.GET_WALLET_SUCCESS:
			return {
				...state,
				loadedWallet: action.loadedWallet,
			};
		case WalletStateActionTypes.GET_WALLET_ERROR:
			return {
				...state,
				loadWalletStatus: LoadWalletStatus.ERROR,
				loadedWallet: [],
			};
		case WalletStateActionTypes.WALLET_LOGOUT:
			return {
				...state,
				loadedWallet: undefined,
				loadedWalletAddress: "",
			};

		default:
			return {
				...state,
			};
	}
};

export default walletReducer;
