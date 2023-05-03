import { View, Text, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { setAnnounceInfo } from "../redux/announce";
import React from "react";

const Message = ({ Description, Time }) => {
    return (
        <View style={style.container}>
            <Text style={style.text}>Action: {Description}</Text>
            <Text style={style.text}>Timestamp: {Time}</Text>
        </View>
    );
};

const style = StyleSheet.create({
    container: {
        backgroundColor: '#FAF3DD',
        minHeight: 50,
        width: '100%',
        marginBottom: 20,
        borderRadius: 10,
        borderColor: "#4C51C6",
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
    },
    text: {
        color: '#4C51C6',
        fontSize: 14,
        fontWeight: 'bold',
    }
})

export default Message;