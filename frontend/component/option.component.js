import { View, Text, StyleSheet, Switch } from "react-native";
import React, { useState, useEffect } from "react";
import axios from 'axios'

const OptionItem = (props) => {
    const { name } = props;
    const [isEnabled, setIsEnabled] = useState(false);

    const bbc_name = name.toLowerCase()

    const changeValue = async () => {
        try {
            const value = (bbc_name == "light-on") ? ((isEnabled === true) ? "B" : "A")
                        : (bbc_name == "pump") ? ((isEnabled === true) ? "D" : "C")
                        : ((isEnabled === true) ? "F" : "E")

            const data = {
                "datum": {
                    "value": value
                }
            }

            const result = await axios.post(
                `https://io.adafruit.com/api/v2/khoitran1422/feeds/bbc-${bbc_name}/data`,
                data,
                {
                    headers: {
                        "X-AIO-Key": "aio_cWCW015bVob0s3toQqk4OetenNYe"
                    }
                }
            )
            setIsEnabled((previousState) => !previousState);
        } catch (error) {

        }
    }

    const getValue = async () => {
        try {
            const result = await axios.get(
                `https://io.adafruit.com/api/v2/khoitran1422/feeds/bbc-${bbc_name}`
            )
            const trueVal = (bbc_name == "light-on") ? "A"
                        : (bbc_name == "pump") ? "C"
                        : "E";
            setIsEnabled(result.data.last_value == trueVal)
        } catch (error) {

        }
    }

    useEffect(() => {
        const isMounted = true
        const intervalid = setInterval(() => {
            getValue()
        }, 1000)
        return () => {
            clearInterval(intervalid)
            isMounted = false
        }
    }, [])

    return (
        <View style={style.container}>
            <Text
                style={{
                    color: "#4C51C6",
                    fontSize: 20,
                    fontWeight: "bold",
                    width: 200,
                }}
            >
                {name}
            </Text>

            <Switch
                trackColor={{ false: "#ddd", true: "#FD830D" }}
                thumbColor={isEnabled ? "#fff" : "#f4f3f4"}
                onValueChange={changeValue}
                value={isEnabled}
                style={{
                    transform: [{ scaleX: 3 }, { scaleY: 3 }],
                }}
            />
        </View>
    );
};

const style = StyleSheet.create({
    container: {
        width: "100%",
        height: 100,
        backgroundColor: "#E9F4FF",
        borderRadius: 10,
        marginBottom: 20,
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-around",
        paddingTop: 25,
        paddingRight: 40,
    },
});

export default OptionItem;