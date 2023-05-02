import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import BBC_LIGHT from "../mockup_data/BBC_LIGHT.csv"
import BBC_MOISTURE from "../mockup_data/BBC_MOISTURE.csv"
import BBC_TEMP from "../mockup_data/BBC_TEMP.csv"
import Login from "./screens/login.screen";
import CreateAccount from "./screens/create_account.screen";
import Analytics from "./screens/analytics.screen";
import TabNavigation from "./screens/tabnavigation";
import Booking from "./screens/booking.screen";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Profile from "./screens/profile.screen";
import { store } from "./store";
import { Provider } from "react-redux";
import drawGraph from "./screens/room_detail.screen1";
import ModuleDetail from "./screens/room_detail.screen";

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
                        />
                        <Stack.Screen
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
                            name="ROOM DETAIL"
                            component={ModuleDetail}
                        />
                        {/* <Stack.Screen
                            options={headerConfig("#dfdfdf", false)}
                            name="BOOKING"
                            component={Booking}
                        /> */}
                    </Stack.Navigator>
                </NavigationContainer>
            </View>
        </Provider>
    );
}
