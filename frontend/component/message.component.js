import { View, Text, StyleSheet } from "react-native";
import React from "react";

const Message = (props) => {
    const { message } = props
    return (
        <View style={style.container}>
            <Text style={style.text}>{message}</Text>
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
        justifyContent: 'center',
    },
    text: {
        color: '#4C51C6',
        fontSize: 14,
        fontWeight: 'bold',
    }
})

export default Message;