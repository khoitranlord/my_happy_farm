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

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import axios from 'axios';

import { storeItem, getItem } from './../storage/index';
import serverLink from './../link';

const Login = ({ navigation }) => {

    const [loginInfo, setLoginInfo] = useState({
        email: "",
        password: ""
    })

    const getAsyncStorage = async () => {
        const value = await getItem('user');
        if (value === null) {
            navigation.navigate('SIGN IN');
        } else {
            navigation.navigate('HOME');
        }
    }

    useEffect(() => {
        getAsyncStorage();
    }, [])

    const handleLogin = async (e) => {
        
        // navigation.navigate('HOME');
        try {
            const result = await axios.post(
                `${serverLink}/api/v1/user/login`,
                loginInfo
            )
            if (result.data) {
                navigation.navigate('HOME');
                storeItem('user', result.data);
                Alert.alert("Đăng nhập thành công");
            }
            else {
                Alert.alert('Sai tài khoản hoặc mật khẩu');
            }
        } catch (error) {
            Alert.alert('Sai tài khoản hoặc mật khẩu');
        }
    }

    const handleChange = (e, name) => {
        setLoginInfo({...loginInfo, [name]: e.nativeEvent.text});
    }

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
                    onChange={(e) => handleChange(e, 'email')}
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
                    onChange={(e) => handleChange(e, 'password')}
                />
                <View style={style.iconcontainer}>
                    <Icon name="lock" size={16} color="#fff" />
                </View>
            </View>
            <Button onPress={handleLogin} title="Login" />
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
