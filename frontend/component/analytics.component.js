import { View, Text, StyleSheet, Image, Alert, Pressable } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import ModuleDetail from "../screens/room_detail.screen";
const AnalyticsItem = (props) => {
    const { name, image } = props;
    const navigation = useNavigation();

    const renderIcon = () => {
        return (
            <View
                style={{
                    flex: 1,
                    flexDirection: "row",
                    flexWrap: "wrap",
                    marginTop: 10,
                }}
            >
                <Image
                    source={image}
                    style={{
                        width: 35,
                        height: 35,
                        resizeMode: 'contain',
                        aspectRatio: 1,
                    }}
                />
            </View>
        );
    };

    return (
        <Pressable style={style.container} onPress={() => navigation.navigate("ROOM DETAIL")}>
            <View>{renderIcon()}</View>
            <Text style={style.name}>{name}</Text>
        </Pressable>
    );
};

const style = StyleSheet.create({
    container: {
        alignItems: "center",
        backgroundColor: "#E9F4FF",
        width: "35%",
        height: 100,
        marginHorizontal: "7.5%",
        marginVertical: 20,
        borderRadius: 10,
        paddingVertical: 25,
        paddingHorizontal: 10,
    },
    name: {
        color: "#4C51C6",
        fontWeight: "700",
        fontSize: 14,
    },
});

export default AnalyticsItem;
