export const ROUTES = {
	checkAuthentication: "checkAuthentication",
	scanQRCode: "scanQRCode",
	scanQRCodeSuccess: "scanQRCodeSuccess",
	scanQRCodeError: "scanQRCodeError",
	walletSync: "walletSync",
	nonAuthenticated: {
		registrationOrLogin: "nonAuthenticated.registrationOrLogin",
		createWallet: "nonAuthenticated.createWallet",
		confirmWallet: "nonAuthenticated.confirmWallet",
		createPin: "nonAuthenticated.createPin",
		confirmPin: "nonAuthenticated.confirmPin",
		loginPin: "nonAuthenticated.loginPin",
	},
	authenticated: {
		home: "nonAuthenticated.home",
		buy: "nonAuthenticated.buy",
		send: "nonAuthenticated.send",
		history: "nonAuthenticated.history",
		more: "nonAuthenticated.more",
	},
};
