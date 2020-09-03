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

interface IMainRouterComponentProps {
	languageState: LanguageState;
	accountState: AccountState;
}
export const ROUTES = {
	nonAuthenticated: {
		registrationOrLogin: "nonAuthenticated.registrationOrLogin",
		createWallet: "nonAuthenticated.createWallet",
	},
	authenticated: {
		home: "nonAuthenticated.home",
		buy: "nonAuthenticated.buy",
		send: "nonAuthenticated.send",
		history: "nonAuthenticated.history",
		more: "nonAuthenticated.more",
	},
};

class MainRouterComponent extends React.Component<IMainRouterComponentProps> {
	// componentDidMount(){
	//     setTimeout(()=>{
	//         console.log("SENDING!")
	//         Actions.jump(ROUTES.nonAuthenticated.createWallet)
	//     }, 2000)

	// }
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
							title="Create a Mele Wallet"
						/>
					</Stack>
					<Scene key="Authenticated">
						<Tabs showLabel={false} tabBarStyle={styles.tabs} hideNavBar>
							<Scene
								hideNavBar
								component={Home}
								title="Home"
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

const mapStateToProps = (state: ApplicationState) => {
	return {
		accountState: state.account,
		languageState: state.language,
	};
};

export const MainRouter = connect(
	mapStateToProps,
	mapDispatchToProps,
)(MainRouterComponent);
