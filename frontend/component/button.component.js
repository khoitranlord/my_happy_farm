import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

const Button = (props) => {
    const {
        onPress,
        title = "Button",
        bgColor = "#607FF2",
        tColor = "#fff",
        bColor = "#607FF2"
    } = props;

    return (
        <TouchableOpacity
            style={{
                alignItems: "center",
                justifyContent: "center",
                width: 300,
                height: 50,
                borderRadius: 10,
                borderWidth: 2,
                borderColor: bColor,
                backgroundColor: bgColor,
                marginBottom: 10,
            }}
            onPress={onPress}
        >
            <Text
                style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    letterSpacing: 1,
                    color: tColor,
                }}
            >
                {title}
            </Text>
        </TouchableOpacity>
    );
};

export default Button;
