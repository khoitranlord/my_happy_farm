import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    TextInput,
} from "react-native";
import React from "react";
import Avt from "./../assets/images/avt.png";
import Icon from "react-native-vector-icons/MaterialIcons";
import IconM from "react-native-vector-icons/MaterialIcons";
import Button from "../component/button.component";

const Profile = ({ navigation }) => {
    return (
        <View style={style.container}>
            <TouchableOpacity
                onPress={() => navigation.navigate("HOME")}
                style={{
                    flexDirection: "row",
                    backgroundColor: "#607FF2",
                    width: 40,
                    height: 40,
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                    borderRadius: 30,
                    marginHorizontal: 30,
                    marginBottom: 10,
                }}
            >
                <IconM name="arrow-back-ios" size={20} color="#fff" />
                <Text
                    style={{
                        color: "white",
                        fontSize: 16,
                    }}
                ></Text>
            </TouchableOpacity>
            <View style={style.title}>
                <Text
                    style={{
                        color: "#fff",
                        fontSize: 20,
                        fontWeight: "bold",
                        letterSpacing: 1,
                    }}
                >
                    UPDATE PROFILES
                </Text>
            </View>

            <Text
                style={{
                    color: "white",
                    fontSize: 20,
                    textAlign: "center",
                }}
            >
                Bio-Data
            </Text>

            <View
                style={{
                    marginTop: 10,
                }}
            >
                <View
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Image
                        style={{
                            height: 80,
                            width: 80,
                            borderColor: "white",
                            borderWidth: 2,
                            borderRadius: 40,
                        }}
                        source={Avt}
                    />
                </View>
            </View>

            <Text
                style={{
                    color: "white",
                    fontSize: 16,
                    fontWeight: "700",
                    textAlign: "center",
                    marginTop: 10,
                }}
            >
                Thanh Luan
            </Text>

            <Text
                style={{
                    color: "#aaa",
                    fontSize: 14,
                    textAlign: "center",
                    marginBottom: 20,
                }}
            >
                @thanhluan02
            </Text>

            <View
                style={{
                    width: "100%",
                    paddingHorizontal: 30,
                }}
            >
                <View style={style.inputcontainer}>
                    <TextInput
                        style={style.input}
                        placeholderTextColor="#fff"
                        placeholder="What is your first name ?"
                        textContentType="name"
                    />
                </View>

                <View style={style.inputcontainer}>
                    <TextInput
                        style={style.input}
                        placeholderTextColor="#fff"
                        placeholder="And your last name ?"
                        textContentType="name"
                    />
                </View>

                <View style={style.inputcontainer}>
                    <TextInput
                        style={style.input}
                        placeholderTextColor="#fff"
                        placeholder="Gender - male or female"
                        textContentType="name"
                    />
                </View>

                <View style={style.inputcontainer}>
                    <TextInput
                        style={style.input}
                        placeholderTextColor="#fff"
                        placeholder="Phone number"
                        textContentType="telephoneNumber"
                    />
                    <View style={style.iconcontainer}>
                        <Icon name="phone" size={16} color="#fff" />
                    </View>
                </View>

                <View style={style.inputcontainer}>
                    <TextInput
                        style={style.input}
                        placeholderTextColor="#fff"
                        placeholder="What is your date of birth ?"
                        textContentType="emailAddress"
                    />
                </View>
            </View>

            <View
                style={{
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 10,
                }}
            >
                <Button title="Update" />
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
    title: {
        height: 35,
        borderColor: "#fff",
        borderBottomWidth: 2,
        marginHorizontal: 30,
        marginBottom: 10,
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
        backgroundColor: "#ffffff40",
        width: "100%",
    },
    input: {
        height: 50,
        width: 280,
        fontSize: 14,
        color: "#fff",
        fontWeight: "500",
    },
    iconcontainer: {
        flex: 1,
        width: 30,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
    },
});

export default Profile;
