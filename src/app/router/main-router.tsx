import React from "react";
import { Router, Scene, Actions, Tabs, Stack } from "react-native-router-flux";
import { Home } from "@mele-wallet/app/modules/home/home";
import { Buy } from "@mele-wallet/app/modules/buy/buy";
import { View, Text, Image } from "react-native";
import { Send } from "@mele-wallet/app/modules/send/send";
import { History } from "@mele-wallet/app/modules/history/history";
import { More } from "@mele-wallet/app/modules/more/more";
import BuyIcon from "@mele-wallet/resources/icons/buy.svg";
import HistoryIcon from "@mele-wallet/resources/icons/history.svg";
import SendIcon from "@mele-wallet/resources/icons/send.svg";
import HomeIcon from "@mele-wallet/resources/icons/home.svg";

import DisabledSendIcon from "@mele-wallet/resources/icons/tab-bar-icons/disabled-send.svg";

import InactiveHomeIcon from "@mele-wallet/resources/icons/tab-bar-icons/inactive-home.svg";
import ActiveHomeIcon from "@mele-wallet/resources/icons/tab-bar-icons/active-home.svg";

import InactiveBuyIcon from "@mele-wallet/resources/icons/tab-bar-icons/inactive-buy.svg";
import ActiveBuyIcon from "@mele-wallet/resources/icons/tab-bar-icons/active-buy.svg";
import DisabledBuyIcon from "@mele-wallet/resources/icons/tab-bar-icons/disabled-buy.svg";

import DisabledMoreIcon from "@mele-wallet/resources/icons/tab-bar-icons/disabled-more.svg";
import InactiveMoreIcon from "@mele-wallet/resources/icons/tab-bar-icons/inactive-more.svg";
import ActiveMoreIcon from "@mele-wallet/resources/icons/tab-bar-icons/active-more.svg";

import InactiveHistoryIcon from "@mele-wallet/resources/icons/tab-bar-icons/inactive-history.svg";
import ActiveHistoryIcon from "@mele-wallet/resources/icons/tab-bar-icons/active-history.svg";

import MoreIcon from "@mele-wallet/resources/icons/more.svg";
import { styles } from "@mele-wallet/app/router/styles";
import ApplicationState from "@mele-wallet/redux/application-state";
import { connect } from "react-redux";
import { mapDispatchToProps } from "@mele-wallet/redux/methods/map-dispatch-to-props";
import { LanguageState } from "@mele-wallet/redux/reducers/language-reducer";
import { AccountState } from "@mele-wallet/redux/reducers/account-reducer";
import { RegistrationOrLogin } from "@mele-wallet/app/modules/registration-or-login/registration-or-login";
import { CreateWallet } from "@mele-wallet/app/modules/create-wallet/create-wallet";
import { commonStyles } from "@mele-wallet/app/common/styles/common-styles";
import { ConfirmWallet } from "@mele-wallet/app/modules/confirm-wallet/confirm-wallet";
import { CreatePin } from "@mele-wallet/app/modules/create-pin/create-pin";
import { UnauthenticatedBlueHeader } from "@mele-wallet/app/router/header/unauthenticated-blue-header";
import { UnauthenticatedWhiteHeader } from "@mele-wallet/app/router/header/unauthenticated-white-header";
import { AuthenticatedWhiteHeader } from "@mele-wallet/app/router/header/authenticated-white-header";
import { ROUTES } from "@mele-wallet/app/router/routes";
import { ConfirmPin } from "@mele-wallet/app/modules/confirm-pin/confirm-pin";
import { CheckAuthentication } from "@mele-wallet/app/modules/loader/check-authentication";
import { LoginPin } from "@mele-wallet/app/modules/login-pin/login-pin";
import { ScanQRCode } from "@mele-wallet/app/modules/scan-qr-code/scan-qr-code";
import { AuthenticatedBlueHeader } from "@mele-wallet/app/router/header/authenticated-blue-header";
import { WalletSync } from "@mele-wallet/app/modules/loader/wallet-sync";
import { ScanQRCodeSuccess } from "@mele-wallet/app/modules/scan-qr-code/scan-qr-code-success";
import { ScanQRCodeError } from "@mele-wallet/app/modules/scan-qr-code/scan-qr-code-error";
import { SplashScreen } from "@mele-wallet/app/modules/splash-screen/splash-screen";
import { Transaction } from "@mele-wallet/app/modules/transaction/transaction";
import { Terms } from "../modules/terms/terms";
import { About } from "../modules/about/about";

class MainRouterComponent extends React.Component {
	render() {
		return (
			<Router>
				<Scene key="root">
					<Stack
						key="nonAuthenticated"
						{...{
							headerBackTitleVisible: false,
						}}
						tintColor={"#091841"}
						initial={false}
						hideNavBar={true}
						titleStyle={{
							...commonStyles.buttonBlackText,
						}}
					>
						<Scene
							key={ROUTES.nonAuthenticated.registrationOrLogin}
							component={RegistrationOrLogin}
							//initial={true}
							hideNavBar
							showLabel={false}
						/>
						<Scene
							key={ROUTES.nonAuthenticated.createWallet}
							component={CreateWallet}
							hideNavBar={false}
							showLabel={false}
							navBar={() => {
								return (
									<UnauthenticatedWhiteHeader
										refreshOnBack={true}
										componentKey={ROUTES.nonAuthenticated.createWallet}
										title="Create a Mele Wallet"
									/>
								);
							}}
						/>
						<Scene
							key={ROUTES.nonAuthenticated.confirmWallet}
							component={ConfirmWallet}
							hideNavBar={false}
							showLabel={false}
							gesturesEnabled={false}
							navBar={() => {
								return (
									<UnauthenticatedWhiteHeader
										componentKey={ROUTES.nonAuthenticated.confirmWallet}
										refreshOnBack={true}
										title="Passphrase Verification"
									/>
								);
							}}
						/>
						<Scene
							key={ROUTES.nonAuthenticated.createPin}
							component={CreatePin}
							hideNavBar={false}
							showLabel={false}
							initial={false}
							navBar={() => {
								return (
									<UnauthenticatedBlueHeader
										componentKey={ROUTES.nonAuthenticated.createPin}
									/>
								);
							}}
						/>
						<Scene
							key={ROUTES.authenticated.createPin}
							component={CreatePin}
							navBar={() => {
								return (
									<AuthenticatedBlueHeader
										componentKey={ROUTES.authenticated.createPin}
										title="Change Pin"
									/>
								);
							}}
						/>
						<Scene
							key={ROUTES.nonAuthenticated.createPin}
							component={CreatePin}
							hideNavBar={false}
							showLabel={false}
							initial={false}
							navBar={() => {
								return (
									<UnauthenticatedBlueHeader
										componentKey={ROUTES.nonAuthenticated.createPin}
									/>
								);
							}}
						/>
						<Scene
							key={ROUTES.authenticated.confirmPin}
							component={ConfirmPin}
							navBar={() => {
								return (
									<AuthenticatedBlueHeader
										componentKey={ROUTES.authenticated.confirmPin}
										title="Confirm Pin"
									/>
								);
							}}
						/>
						<Scene
							key={ROUTES.nonAuthenticated.confirmPin}
							component={ConfirmPin}
							hideNavBar={false}
							showLabel={false}
							navBar={() => {
								return (
									<UnauthenticatedBlueHeader
										refreshOnBack={true}
										componentKey={ROUTES.nonAuthenticated.confirmPin}
									/>
								);
							}}
						/>

						<Scene
							key={ROUTES.nonAuthenticated.loginPinFirstTime}
							component={LoginPin}
							hideNavBar={false}
							showLabel={false}
							navBar={() => {
								return (
									<UnauthenticatedBlueHeader
										componentKey={ROUTES.nonAuthenticated.loginPinFirstTime}
									/>
								);
							}}
						/>
					</Stack>
					<Scene
						key={ROUTES.splashScreen}
						component={SplashScreen}
						hideNavBar={true}
						showLabel={false}
						initial={true}
					/>
					<Scene
						key={ROUTES.terms}
						component={Terms}
						hideNavBar={false}
						gesturesEnabled={false}
					/>
					<Scene
						key={ROUTES.about}
						component={About}
						hideNavBar={false}
						gesturesEnabled={false}
					/>
					<Scene
						key={ROUTES.nonAuthenticated.loginPin}
						component={LoginPin}
						hideNavBar={true}
						showLabel={false}
						initial={false}
						// navBar={() => {
						// 	return (
						// 		<UnauthenticatedBlueHeader
						//             disableBackButton={true}
						// 			componentKey={ROUTES.nonAuthenticated.loginPin}
						// 		/>
						// 	);
						// }}
					/>
					<Scene
						key={ROUTES.checkAuthentication}
						component={CheckAuthentication}
						hideNavBar={true}
						gesturesEnabled={false}
					/>
					<Scene
						key={ROUTES.scanQRCode}
						component={ScanQRCode}
						navBar={() => {
							return (
								<AuthenticatedBlueHeader
									componentKey={ROUTES.scanQRCode}
									title="Scan QR Code"
								/>
							);
						}}
					/>
					<Scene
						key={ROUTES.walletSync}
						component={WalletSync}
						hideNavBar={true}
						gesturesEnabled={false}
					/>

					<Scene
						key={ROUTES.scanQRCodeSuccess}
						component={ScanQRCodeSuccess}
						hideNavBar={true}
						gesturesEnabled={false}
					/>
					<Scene
						key={ROUTES.scanQRCodeError}
						component={ScanQRCodeError}
						hideNavBar={true}
						gesturesEnabled={false}
					/>
					<Scene
						key={ROUTES.authenticated.transaction}
						component={Transaction}
						hideNavBar={false}
						showLabel={false}
						navBar={() => {
							return (
								<AuthenticatedWhiteHeader
									componentKey={ROUTES.authenticated.transaction}
								/>
							);
						}}
					/>
					<Scene key="authenticated" hideNavBar>
						<Tabs showLabel={false} tabBarStyle={styles.tabs} hideNavBar>
							<Scene
								hideNavBar
								showLabel={false}
								component={Home}
								key={ROUTES.authenticated.home}
								initial
								icon={(p: any, a: any) => {
									if (p.navigation.isFocused()) {
										return (
											<View style={styles.tabButton}>
												<View style={styles.iconAntText}>
													<View style={styles.icon}>
														<ActiveHomeIcon />
													</View>
													<Text
														style={[
															styles.buttonTextActive,
															commonStyles.fontBold,
														]}
													>
														Home
													</Text>
												</View>
											</View>
										);
									} else {
										return (
											<View style={styles.tabButton}>
												<View style={styles.iconAntText}>
													<View style={styles.icon}>
														<InactiveHomeIcon />
													</View>
													<Text
														style={[
															styles.buttonTextInactive,
															commonStyles.fontBold,
														]}
													>
														Home
													</Text>
												</View>
											</View>
										);
									}
								}}
							/>
							<Scene
								hideNavBar
								component={Buy}
								title="Buy"
								key={ROUTES.authenticated.buy}
								back={false}
								icon={(p: any, a: any) => {
									if (p.navigation.isFocused()) {
										return (
											<View style={styles.tabButton}>
												<View style={styles.iconAntText}>
													<View style={styles.icon}>
														<ActiveBuyIcon />
													</View>
													<Text
														style={[
															styles.buttonTextActive,
															commonStyles.fontBold,
														]}
													>
														Buy
													</Text>
												</View>
											</View>
										);
									} else {
										return (
											<View style={styles.tabButton}>
												<View style={styles.iconAntText}>
													<View style={styles.icon}>
														<InactiveBuyIcon />
													</View>
													<Text
														style={[
															styles.buttonTextInactive,
															commonStyles.fontBold,
														]}
													>
														Buy
													</Text>
												</View>
											</View>
										);
									}
								}}
							/>
							<Scene
								hideNavBar
								component={Send}
								title="Send"
								key={ROUTES.authenticated.send}
								icon={(p: any) => {
									return (
										<View style={styles.tabButton}>
											<View style={styles.sentIconContainer}>
												<SendIcon />
											</View>
										</View>
									);
								}}
							/>
							<Scene
								hideNavBar
								component={History}
								title="History"
								key={ROUTES.authenticated.history}
								back={false}
								icon={(p: any) => {
									if (p.navigation.isFocused()) {
										return (
											<View style={styles.tabButton}>
												<View style={styles.iconAntText}>
													<View style={styles.icon}>
														<ActiveHistoryIcon />
													</View>
													<Text
														style={[
															styles.buttonTextActive,
															commonStyles.fontBold,
														]}
													>
														History
													</Text>
												</View>
											</View>
										);
									} else {
										return (
											<View style={styles.tabButton}>
												<View style={styles.iconAntText}>
													<View style={styles.icon}>
														<InactiveHistoryIcon />
													</View>
													<Text
														style={[
															styles.buttonTextInactive,
															commonStyles.fontBold,
														]}
													>
														History
													</Text>
												</View>
											</View>
										);
									}
								}}
							/>
							<Scene
								hideNavBar
								component={More}
								title="More"
								key={ROUTES.authenticated.more}
								back={false}
								icon={(p: any) => {
									if (p.navigation.isFocused()) {
										return (
											<View style={styles.tabButton}>
												<View style={styles.iconAntText}>
													<View style={styles.icon}>
														<ActiveMoreIcon />
													</View>
													<Text
														style={[
															styles.buttonTextActive,
															commonStyles.fontBold,
														]}
													>
														More
													</Text>
												</View>
											</View>
										);
									} else {
										return (
											<View style={styles.tabButton}>
												<View style={styles.iconAntText}>
													<View style={styles.icon}>
														<InactiveMoreIcon />
													</View>
													<Text
														style={[
															styles.buttonTextInactive,
															commonStyles.fontBold,
														]}
													>
														More
													</Text>
												</View>
											</View>
										);
									}
								}}
							/>
						</Tabs>
					</Scene>
				</Scene>
			</Router>
		);
	}
}

// const mapStateToProps = (state: ApplicationState) => {
// 	return {
// 		languageState: state.language,
// 	};
// };

// export const MainRouter = connect(
// 	mapStateToProps,
// 	mapDispatchToProps,
// )(MainRouterComponent);

export const MainRouter = MainRouterComponent;
