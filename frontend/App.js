import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import BBC_LIGHT from "../mockup_data/BBC_LIGHT.csv"
import BBC_MOISTURE from "../mockup_data/BBC_MOISTURE.csv"
import BBC_TEMP from "../mockup_data/BBC_TEMP.csv"
import Login from "./screens/login.screen";
import CreateAccount from "./screens/create_account.screen";
import TabNavigation from "./screens/tabnavigation";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Profile from "./screens/profile.screen";
import { store } from "./store";
import { Provider } from "react-redux";
import LightDetail from "./screens/light_detail.screen";
import MoistureDetail from "./screens/moisture_detail.screen";
import TemperatureDetail from "./screens/temperature_detail.screen";
const Stack = createNativeStackNavigator();

const headerConfig = (bg, show = true) => {
    return {
        headerStyle: {
            backgroundColor: bg,
        },
        headerTintColor: "#4C51C6",
        headerTitleStyle: {
            fontWeight: "bold",
        },
        headerShown: show,
    };
};

export default function App() {
    return (
        <Provider store={store}>
            <View
                style={{
                    marginTop: 30,
                    flex: 1,
                }}
            >
                <NavigationContainer>
                    <Stack.Navigator initialRouteName="SIGN IN">
                        {/* <Stack.Screen
                            options={headerConfig("#dfdfdf", false)}
                            name="SIGN IN"
                            component={Login}
                        /> */}
                        {/* <Stack.Screen
                            options={headerConfig("#dfdfdf", false)}
                            name="CREATE ACCOUNT"
                            component={CreateAccount}
                        /> */}
                        <Stack.Screen
                            options={headerConfig("#dfdfdf", false)}
                            name="HOME"
                            component={TabNavigation}
                        />
                        <Stack.Screen
                            options={headerConfig("#dfdfdf", false)}
                            name="UPDATE PROFILES"
                            component={Profile}
                        />
                        <Stack.Screen
                            options={headerConfig("#dfdfdf", false)}
                            name="LIGHT DETAIL"
                            component={LightDetail}
                        />
                        <Stack.Screen
                            options={headerConfig("#dfdfdf", false)}
                            name="MOISTURE DETAIL"
                            component={MoistureDetail}
                        />
                        <Stack.Screen
                            options={headerConfig("#dfdfdf", false)}
                            name="TEMPERATURE DETAIL"
                            component={TemperatureDetail}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </View>
        </Provider>
    );
}
