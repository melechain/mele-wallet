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
import { ROUTES } from "@mele-wallet/app/router/routes";
import { ConfirmPin } from "@mele-wallet/app/modules/confirm-pin/confirm-pin";
import { CheckAuthentication } from "@mele-wallet/app/modules/loader/check-authentication";
import { LoginPin } from "@mele-wallet/app/modules/login-pin/login-pin";

interface IMainRouterComponentProps {}

class MainRouterComponent extends React.Component<IMainRouterComponentProps> {
	render() {
		return (
			<Router>
				<Scene>
					<Stack
						key="nonAuthenticated"
						{...{
							headerBackTitleVisible: false,
						}}
						tintColor={"#091841"}
						initial={true}
						hideNavBar={true}
						titleStyle={{
							...commonStyles.buttonBlackText,
						}}
					>
						<Scene
							key={ROUTES.nonAuthenticated.registrationOrLogin}
							component={RegistrationOrLogin}
							initial={true}
							hideNavBar
							showLabel={false}
						/>
						<Scene
							key={ROUTES.nonAuthenticated.createWallet}
							component={CreateWallet}
							hideNavBar={false}
							showLabel={false}
							navBar={() => {
								console.log(ROUTES.nonAuthenticated.createWallet);
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
							key={ROUTES.nonAuthenticated.loginPin}
							component={LoginPin}
							hideNavBar={false}
							showLabel={false}
							navBar={() => {
								return (
									<UnauthenticatedBlueHeader
										componentKey={ROUTES.nonAuthenticated.loginPin}
									/>
								);
							}}
						/>
					</Stack>
					<Scene
						key={ROUTES.checkAuthentication}
						component={CheckAuthentication}
						hideNavBar={true}
					/>
					<Scene key="authenticated" hideNavBar>
						<Tabs showLabel={false} tabBarStyle={styles.tabs} hideNavBar>
							<Scene
								hideNavBar
								showLabel={false}
								component={Home}
								key={ROUTES.authenticated.home}
								initial
								icon={() => {
									return (
										<View style={styles.tabButton}>
											<View style={styles.iconAntText}>
												<HomeIcon />
												<Text style={styles.buttonText}>Home</Text>
											</View>
										</View>
									);
								}}
							/>
							<Scene
								hideNavBar
								component={Buy}
								title="Buy"
								key={ROUTES.authenticated.buy}
								icon={() => {
									return (
										<View style={styles.tabButton}>
											<View style={styles.iconAntText}>
												<BuyIcon />
												<Text style={styles.buttonText}>Buy</Text>
											</View>
										</View>
									);
								}}
							/>
							<Scene
								hideNavBar
								component={Send}
								title="Send"
								key={ROUTES.authenticated.send}
								icon={() => {
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
								icon={() => {
									return (
										<View style={styles.tabButton}>
											<View style={styles.iconAntText}>
												<HistoryIcon />
												<Text style={styles.buttonText}>History</Text>
											</View>
										</View>
									);
								}}
							/>
							<Scene
								hideNavBar
								component={More}
								title="More"
								key={ROUTES.authenticated.more}
								back={false}
								icon={() => {
									return (
										<View style={styles.tabButton}>
											<View style={styles.iconAntText}>
												<MoreIcon />
												<Text style={styles.buttonText}>More</Text>
											</View>
										</View>
									);
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
