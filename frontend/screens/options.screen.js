import { View, Text, StyleSheet, FlatList, SafeAreaView } from "react-native";
import React from "react";
import OptionItem from "../component/option.component";

const devices = [
    {
        id: "1",
        name: "Light",
    },
    {
        id: "2",
        name: "Fan",
    },
    {
        id: "3",
        name: "PumpIn",
    },
    {
        id: "4",
        name: "PumpOut",
    }
]

const Options = () => {
    const renderDevice = ({item}) => {
        return (
            <OptionItem name={item.name} />
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
                    OPTIONS
                </Text>
            </View>
            <SafeAreaView style={style.grid}>
                <FlatList
                    data={devices}
                    renderItem={renderDevice}
                    keyExtractor={(device) => device.id}
                >

                </FlatList>
            </SafeAreaView>
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
    grid: {
        width: '100%',
        padding: 30,
    },
});

export default Options;
