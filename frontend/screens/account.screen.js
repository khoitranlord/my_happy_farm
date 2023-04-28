import {
    View,
    Text,
    StyleSheet,
    Image,
    Pressable,
    TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";

import Avt from "./../assets/images/avt.png";
import IconM from "react-native-vector-icons/MaterialCommunityIcons";
import IconF from "react-native-vector-icons/FontAwesome";
import IconMUI from "react-native-vector-icons/MaterialIcons";
import IconE from "react-native-vector-icons/Entypo";
import Button from "../component/button.component";

import { getItem, deleteItem } from "./../storage/index";
import AsyncStorage from "@react-native-async-storage/async-storage"

const Account = ({ navigation }) => {

    const [userInfo, setUserInfo] = useState({
        email: "",
        password: "",
    })

    const logout = async () => {
        await deleteItem('user');
        setUserInfo({
            email: "",
            password: "",
        });
        navigation.navigate('SIGN IN');
    }

    const getUserInfo = async () => {
        const value = await getItem('user');
        if (value !== null) {
            setUserInfo(value);
        }
    }

    useEffect(() => {
        getUserInfo();
    }, [])

    return (
        <View style={style.container}>
            <View style={style.title}>
                <Text
                    style={{
                        color: "#fff",
                        fontSize: 20,
                        fontWeight: "bold",
                        letterSpacing: 1,
                    }}
                >
                    PROFILES
                </Text>
            </View>

            <View style={style.headercontainer}>
                <View style={style.header}>
                    <View style={style.boxAvt}>
                        <Image
                            style={{
                                height: 60,
                                width: 60,
                                borderColor: "white",
                                borderWidth: 2,
                                borderRadius: 40,
                            }}
                            source={Avt}
                        />
                    </View>

                    <View
                        style={{
                            height: 100,
                            justifyContent: "center",
                            marginLeft: 0,
                            width: "60%",
                        }}
                    >
                        {/* <Text
                            style={{
                                color: "white",
                                fontSize: 16,
                                fontWeight: "bold",
                                letterSpacing: 1,
                            }}
                        >
                            {userInfo.username}
                        </Text> */}
                        <Text
                            style={{
                                color: "#ddd",
                                fontWeight: "400",
                                fontSize: 14,
                                letterSpacing: 1,
                            }}
                        >
                            {userInfo.email}
                        </Text>
                    </View>

                    <TouchableOpacity
                        style={{
                            height: 100,
                            justifyContent: "center",
                            marginLeft: 0,
                            width: "10%",
                            alignItems: "flex-end",
                        }}
                        onPress={() => navigation.navigate("UPDATE PROFILES")}
                    >
                        <IconM name="pencil" size={25} color="#ddd" />
                    </TouchableOpacity>
                </View>
            </View>

            <View
                style={{
                    paddingHorizontal: 30,
                    width: "100%",
                    marginTop: 30,
                }}
            >
                <View
                    style={{
                        backgroundColor: "#FFFFFFfe",
                        height: 350,
                        width: "100%",
                        borderRadius: 10,
                        paddingHorizontal: 0,
                    }}
                >
                    <View style={style.profileItem}>
                        <View style={style.profilesIcon}>
                            <View style={style.icon}>
                                <IconF
                                    name="user-o"
                                    size={25}
                                    color="#4C51C6"
                                />
                            </View>
                        </View>
                        <View style={style.infoItem}>
                            <Text style={style.titleItem}>My Account</Text>
                            <Text style={style.desItem}>
                                Make change to your account
                            </Text>
                        </View>
                        <View style={style.arrItem}>
                            <IconMUI
                                name="arrow-forward-ios"
                                size={25}
                                color="#aaa"
                            />
                        </View>
                    </View>

                    <View style={style.profileItem}>
                        <View style={style.profilesIcon}>
                            <View style={style.icon}>
                                <IconF
                                    name="user-o"
                                    size={25}
                                    color="#4C51C6"
                                />
                            </View>
                        </View>
                        <View style={style.infoItem}>
                            <Text style={style.titleItem}>Announce</Text>
                            <Text style={style.desItem}>
                                Manage your saved account
                            </Text>
                        </View>
                        <View style={style.arrItem}>
                            <IconMUI
                                name="arrow-forward-ios"
                                size={25}
                                color="#aaa"
                            />
                        </View>
                    </View>

                    <View style={style.profileItem}>
                        <View style={style.profilesIcon}>
                            <View style={style.icon}>
                                <IconE name="help" size={25} color="#4C51C6" />
                            </View>
                        </View>
                        <View style={style.infoItem}>
                            <Text style={style.titleItem}>
                                Help and support
                            </Text>
                            <Text style={style.desItem}>
                                Answer your questions
                            </Text>
                        </View>
                        <View style={style.arrItem}>
                            <IconMUI
                                name="arrow-forward-ios"
                                size={25}
                                color="#aaa"
                            />
                        </View>
                    </View>

                    <View style={style.profileItem}>
                        <View style={style.profilesIcon}>
                            <View style={style.icon}>
                                <IconF
                                    name="heart-o"
                                    size={25}
                                    color="#4C51C6"
                                />
                            </View>
                        </View>
                        <View style={style.infoItem}>
                            <Text style={style.titleItem}>About app</Text>
                            <Text style={style.desItem}>
                                Some information about the app
                            </Text>
                        </View>
                        <View style={style.arrItem}>
                            <IconMUI
                                name="arrow-forward-ios"
                                size={25}
                                color="#aaa"
                            />
                        </View>
                    </View>
                </View>

                <View
                    style={{
                        height: 100,
                        width: "100%",
                        marginTop: 30,
                        borderRadius: 50,
                        alignItems: "center",
                    }}
                >
                    <Button
                        onPress={logout}
                        title="Logout"
                    />
                </View>
            </View>
        </View>
    );
};

const style = StyleSheet.create({
    container: {
        backgroundColor: "#4C51C6",
        height: "100%",
        width: "100%",
        paddingVertical: 30,
    },
    profileItem: {
        height: 80,
        flexDirection: "row",
        marginBottom: 0,
    },

    profilesIcon: {
        height: 80,
        width: "25%",
        alignItems: "center",
        justifyContent: "center",
    },

    icon: {
        backgroundColor: "#607FF256",
        height: 60,
        width: 60,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 30,
    },
    infoItem: {
        height: 80,
        marginTop: 15,
        width: "50%",
    },
    titleItem: {
        fontSize: 14,
        fontWeight: "600",
        letterSpacing: 1,
        color: "#444",
    },
    desItem: {
        fontSize: 12,
        fontWeight: "600",
        color: "#666",
        marginTop: 10,
    },
    title: {
        height: 35,
        borderColor: "#fff",
        borderBottomWidth: 2,
        marginHorizontal: 30,
        marginBottom: 0,
    },
    headercontainer: {
        paddingHorizontal: 30,
        width: "100%",
        marginTop: 20,
    },
    arrItem: {
        width: "20%",
        height: 80,
        paddingVertical: 25,
        alignItems: "flex-end",
    },
    header: {
        backgroundColor: "#607FF2",
        height: 100,
        width: "100%",
        borderRadius: 10,
        paddingHorizontal: 10,
        flexDirection: "row",
    },
    boxAvt: {
        height: 100,
        justifyContent: "center",
        width: "25%",
    },
});

export default Account;
