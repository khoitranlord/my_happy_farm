import {
    StyleSheet,
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import loginImg from "./../assets/images/loginImg.png";
import Icon from "react-native-vector-icons/MaterialIcons";
import Button from "../component/button.component";
import { authenticateUser, logOut, retrieveSession } from "../../backend/controllers/authenticate";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import axios from 'axios';

import { storeItem, getItem } from './../storage/index';
import serverLink from './../link';

const Login = ({ navigation }) => {

    const [user, setUser] = useState();
    const [loginEmail, setloginEmail] = useState();
    const [loginPass, setloginPass] = useState();

    // const getAsyncStorage = async () => {
    //     const value = await getItem('user');
    //     if (value === null) {
    //         navigation.navigate('SIGN IN');
    //     } else {
    //         navigation.navigate('HOME');
    //     }
    // }

    // useEffect(() => {
    //     getAsyncStorage();
    // }, [])
    const testEmail = 'admin@mail.vn';
    const testPass = 'admin123';
    const handleLogin = async (email, password) => {
        if (!email || !password) {
            Alert.alert(' Loginerr', 'You need to provide both email and password',
            [ //button list:
                {
                text: 'Dismiss',
                onPress: () => navigation.navigate('HOME'),
                style: 'cancel',
                }
            ]);
        }
        var loginStatus = await authenticateUser(email, password);
        if (loginStatus[0] == 1) {
            setUser(loginStatus[1]);
            setloginEmail();
            setloginPass();
        }
        else {
            setUser();
            Alert.alert('Login err', `${loginStatus[1]}`,
            [ //button list:
                {
                text: 'OK',
                onPress: () => navigation.navigate('HOME'),
                }
            ]);
        }
    }

    const getSession = async () => {
        var restoredSession = await retrieveSession();
        // restoredSession = {"email":"admin@mail.vn","password":"admin123","timestamp":1681791003793}
        if (restoredSession != null){
        console.log("login with session: " + restoredSession["email"] + ' - ' + restoredSession["password"])
        handleLogin(restoredSession['email'], restoredSession['password']);
        }
    }

    useEffect(() => {
        getSession();
    }, []);
    if (!user)
    return (
        <View style={style.container}>
            <Image source={loginImg} style={style.image} />

            <View style={style.inputcontainer}>
                <TextInput
                    style={style.input}
                    placeholderTextColor="#fff"
                    placeholder="Email ID"
                    textContentType="emailAddress"
                    name="email"
                    onChange={() => setloginEmail(testEmail)}
                />
                <View style={style.iconcontainer}>
                    <Icon name="email" size={16} color="#fff" />
                </View>
            </View>

            <View style={style.inputcontainer}>
                <TextInput
                    style={style.input}
                    placeholderTextColor="#fff"
                    placeholder="Enter Password"
                    secureTextEntry={true}
                    textContentType="password"
                    name="password"
                    onChange={() => setloginPass(testPass)}
                />
                <View style={style.iconcontainer}>
                    <Icon name="lock" size={16} color="#fff" />
                </View>
            </View>
            <Button
                title='Login'
                onPress = {() => handleLogin(loginEmail, loginPass)}
            />
            <Text
                style={{
                    color: "#fff",
                    fontSize: 14,
                    marginTop: 20,
                }}
            >
                Don't have an account yet?
            </Text>

            <TouchableOpacity
                onPress={() => navigation.navigate("CREATE ACCOUNT")}
            >
                <Text
                    style={{
                        color: "#FDA43C",
                        fontSize: 14,
                        marginTop: 10,
                        fontWeight: '700',
                        letterSpacing: 1,
                        textDecorationLine: "underline",
                    }}
                >
                    Create an account
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#4C51C6",
        height: "100%",
        width: "100%",
        padding: 10,
    },
    image: {
        width: 300,
        height: 200,
        marginBottom: 20,
    },
    inputcontainer: {
        borderColor: "#fff",
        borderStyle: "solid",
        borderWidth: 2,
        height: 50,
        width: 320,
        borderRadius: 10,
        paddingLeft: 20,
        marginBottom: 20,
        flexDirection: "row",
        flexWrap: "wrap",
    },
    buttoncontainer: {
        height: 50,
        width: 300,
    },
    iconcontainer: {
        width: 30,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
    },
    input: {
        height: 50,
        width: 260,
        fontSize: 14,
        color: "#fff",
        fontWeight: "500",
    },
    button: {
        height: 50,
        width: 300,
        borderRadius: 20,
    },
});

export default Login;
