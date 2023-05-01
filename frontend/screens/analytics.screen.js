import { StyleSheet, View, Text, SafeAreaView, FlatList } from "react-native";
import React, { useState } from "react";

import AnalyticsItem from "../component/analytics.component";

const devices = [
    {
        id: "1",
        name: "Temperature",
        image: require('./../assets/images/temp.png'),
    },
    {
        id: "2",
        name: "Light",
        image: require("./../assets/images/light.png"),
    },
    {
        id: "3",
        name: "Moisture",
        image: require("./../assets/images/water.png"),
    }
]

const Analytics = ({navigation}) => {

    const renderDevice = ({item}) => {
        return (
            <AnalyticsItem name={item.name} image={item.image} />
        )
    }

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
                    DASHBOARD
                </Text>
            </View>

            <SafeAreaView style={style.container}>
                <FlatList
                    data={devices}
                    renderItem={renderDevice}
                    keyExtractor={(device) => device.id}
                    numColumns={2}
                >
                </FlatList>
            </SafeAreaView>
        </View>
    );
};

const style = StyleSheet.create({
    container: {
        flex: 1,
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
        marginBottom: 0,
    },
    grid: {
        flex: 1,
        width: '100%',
    },
    room: {

    },
});

export default Analytics;
