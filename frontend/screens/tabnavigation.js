import {
    View,
    Modal,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    FlatList,
} from "react-native";
import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Analytics from "./analytics.screen";
import Options from "./options.screen";
import Account from "./account.screen";
import Icon from "react-native-vector-icons/Ionicons";
import IconF from "react-native-vector-icons/FontAwesome";
import IconM from "react-native-vector-icons/MaterialCommunityIcons";
import IconA from "react-native-vector-icons/AntDesign";
import Message from "../component/message.component";
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from "../firebase";
import { collection } from "firebase/firestore";
const Tab = createBottomTabNavigator();

const optionsDesign = {
    headerStyle: {
        backgroundColor: "#4C51C6",
    },
    headerTintColor: "#4C51C6",
    headerTitleStyle: {
        fontWeight: "bold",
    },
    headerShown: false,
};

const renderModal = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedRing, setSelectedRing] = useState(false);
    
    // const messages = useSelector((state) => state.Announce.announce);
    const [ActivityLog] = useCollection(collection(db, "ActivityLog"));
    
    return (
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={style.centeredView}>
                    <View style={style.modalView}>
                        <SafeAreaView style={style.content}>
                            {ActivityLog?.docs.map((doc) => (
                                <Message 
                                    key={doc.id}
                                    Description={doc.data().Description}
                                    Time={doc.data().Time}
                                />
                            ))}
                        </SafeAreaView>
                        <TouchableOpacity
                            onPress={() => {
                                setModalVisible(!modalVisible);
                                setSelectedRing(!selectedRing);
                            }}
                        >
                            <IconA name="closecircle" size={25} color="red" />
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <TouchableOpacity
                onPress={() => {
                    setModalVisible(true);
                    setSelectedRing(true);
                }}
                style={style.ring}
            >
                <IconM
                    name="bell-ring"
                    size={25}
                    color="#fff"
                />
            </TouchableOpacity>
        </View>
    );
};

const TabNavigation = ({ navigation }) => {
    return (
        <View
            style={{
                backgroundColor: "#4C51C6",
                flex: 1,
            }}
        >
            {renderModal()}
            <Tab.Navigator
                initialRouteName="ANALYTICS"
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color }) => {
                        let iconName;

                        if (route.name === "ANALYTICS") {
                            iconName = focused
                                ? "analytics"
                                : "analytics-outline";
                            return (
                                <Icon name={iconName} size={25} color={color} />
                            );
                        } else if (route.name === "ACCOUNT") {
                            iconName = focused
                                ? "user-circle-o"
                                : "user-circle";
                            return (
                                <IconF
                                    name={iconName}
                                    size={25}
                                    color={color}
                                />
                            );
                        } else if (route.name === "OPTIONS") {
                            iconName = focused
                                ? "settings"
                                : "settings-outline";
                            return (
                                <Icon name={iconName} size={25} color={color} />
                            );
                        }
                    },
                    tabBarActiveTintColor: "#FDA43C",
                    tabBarInactiveTintColor: "#fff",
                    tabBarStyle: {
                        backgroundColor: "#607FF2",
                        height: 60,
                        borderRadius: 30,
                        marginBottom: 30,
                        width: "80%",
                        marginHorizontal: "10%",
                        borderTopWidth: 0,
                    },
                    tabBarLabel: () => {
                        return null;
                    },
                })}
            >
                <Tab.Screen
                    options={optionsDesign}
                    name="ACCOUNT"
                    component={Account}
                />
                <Tab.Screen
                    options={optionsDesign}
                    name="ANALYTICS"
                    component={Analytics}
                />
                <Tab.Screen
                    options={optionsDesign}
                    name="OPTIONS"
                    component={Options}
                />
            </Tab.Navigator>
        </View>
    );
};

const style = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
    },
    ring: {
        alignItems: "flex-end",
        paddingHorizontal: 30,
        marginTop: 20,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingVertical: 60,
        paddingHorizontal: 160,
        opacity: 0.9,
        width: "100%",
        height: "100%",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    content: {
        width: "100%",
        marginHorizontal: 20,
        height: 700,
    },
});

export default TabNavigation;
