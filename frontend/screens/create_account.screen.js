import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import IconC from "react-native-vector-icons/MaterialCommunityIcons";
import Button from "../component/button.component";
import createImg from './../assets/images/create.png'

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import serverLink from './../link';

import axios from "axios";

const CreateAccount = ({ navigation }) => {
    const [isSelected, setSelection] = useState(false);

    const [userInput, setUserInput] = useState({
        email: "",
        password: "",
        confirmPass: "",
    })

    const handleChange = (e, name) => {
        setUserInput({...userInput, [name]: e.nativeEvent.text});
    }

    const changeSelected = () => {
        setSelection(!isSelected);
    };

    const Register = async () => {
        try {
            const data = {
                email: userInput.email,
                password: userInput.password
            }
            console.log(data);
            const result = await axios.post(
                `${serverLink}/api/v1/user/register`,
                data
            )
            if (result.data) {
                Alert.alert("Đăng ký thành công");
            }
            else {
                Alert.alert("Đăng ký không thành công");
            }
        } catch (error) {

        }
    }

    const handleRegister = () => {
        if (!isSelected) {
            Alert.alert("Bạn chưa đồng ý điều khoản");
        } else if (userInput.password !== userInput.confirmPass) {
            Alert.alert("Mật khẩu không khớp");
        } else {
            Register();
        }
    }

    return (
        <View style={style.container}>
            <Image source={createImg} style={style.createImg} />
            
            <Text style={style.text}>Email</Text>
            <View style={style.inputcontainer}>
                <TextInput
                    style={style.input}
                    placeholderTextColor="#fff"
                    placeholder="e.g.example@gmail.com"
                    textContentType="emailAddress"
                    name="email"
                    onChange={(e) => handleChange(e, 'email')}
                />
                <View style={style.iconcontainer}>
                    <Icon name="email" size={14} color="#fff" />
                </View>
            </View>

            <Text style={style.text}>Password</Text>
            <View style={style.inputcontainer}>
                <TextInput
                    style={style.input}
                    placeholderTextColor="#fff"
                    placeholder="e.g.Examp!e98"
                    secureTextEntry={true}
                    textContentType="password"
                    name="password"
                    onChange={(e) => handleChange(e, 'password')}
                />
                <View style={style.iconcontainer}>
                    <Icon name="visibility-off" size={14} color="#fff" />
                </View>
            </View>

            <Text style={style.text}>Confirm Password</Text>
            <View style={style.inputcontainer}>
                <TextInput
                    style={style.input}
                    placeholderTextColor="#fff"
                    placeholder="Confirm password"
                    secureTextEntry={true}
                    textContentType="password"
                    name="confirmPass"
                    onChange={(e) => handleChange(e, 'confirmPass')}
                />
                <View style={style.iconcontainer}>
                    <Icon name="visibility-off" size={14} color="#fff" />
                </View>
            </View>

            <View style={style.checkboxcontainer}>
                <View style={style.checkbox}>
                    {isSelected ? (
                        <IconC
                            onPress={changeSelected}
                            name="checkbox-intermediate"
                            size={20}
                            color="#FDA43C"
                        />
                    ) : (
                        <IconC
                            onPress={changeSelected}
                            name="checkbox-blank-outline"
                            size={20}
                            color="#fff"
                        />
                    )}
                </View>
                <Text
                    style={{
                        color: "#ddd",
                        fontSize: 14,
                        height: 20,
                    }}
                >
                    I agree to the Terms and Privacy Policy
                </Text>
            </View>

            <Button
                title="Create Account"
                bgColor="#FAF3DD"
                tColor="#5E6472"
                bColor="#FAF3DD"
                onPress={() => navigation.navigate("HOME")}
            />
            <Button
                title="Sign Up with Google"
                bgColor="transparent"
                tColor="#fff"
                bColor="#FAF3DD"
            />

            <View style={style.footer}>
                <Text
                    style={{
                        color: "#ddd",
                        fontSize: 14,
                        height: 20,
                        marginTop: 10,
                        marginRight: 10,
                    }}
                >
                    Already have an account?
                </Text>

                <TouchableOpacity
                    onPress={() => navigation.navigate("SIGN IN")}
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
                        Sign In
                    </Text>
                </TouchableOpacity>
            </View>
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
        padding: 0,
    },
    createImg: {
        width: 320,
        height: 250,
        marginBottom: 10,
    },
    text: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "bold",
        letterSpacing: 1,
        marginBottom: 10,
        width: 320,
    },
    inputcontainer: {
        borderColor: "#fff",
        borderStyle: "solid",
        borderWidth: 2,
        height: 50,
        width: 320,
        borderRadius: 10,
        paddingLeft: 20,
        marginBottom: 10,
        flexDirection: "row",
        flexWrap: "wrap",
        backgroundColor: "#ffffff40",
    },
    checkboxcontainer: {
        height: 30,
        width: 320,
        marginBottom: 10,
        flexDirection: "row",
        flexWrap: "wrap",
    },
    footer: {
        flexDirection: "row",
        flexWrap: "wrap",
    },  
    checkbox: {
        width: 30,
    },
    iconcontainer: {
        flex: 1,
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
    image: {
        width: 190,
        height: 100,
        marginBottom: 20,
    },
});

export default CreateAccount;
