/**
 * @format
 */
import "node-libs-react-native/globals";
import "react-native-get-random-values";

import { LogBox } from "react-native";
import { AppRegistry } from "react-native";
import App from "./src/app/app";
import { name as appName } from "./app.json";
// TODO need to remove this line after new version of react-navigation-flux  is released
// "currentlyFocusedField is deprecated and will be removed in a future release. Use currentlyFocusedInput"
LogBox.ignoreLogs(["currentlyFocusedField"]);

AppRegistry.registerComponent(appName, () => App);
