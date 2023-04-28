import { View, Text, StyleSheet, Image, Alert, Pressable } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import axios from "axios";
import { addAnnounce, removeAnnounce } from "../redux/announce";
import { useDispatch, useSelector } from "react-redux";

const AnalyticsItem = (props) => {
    const { name, image } = props;
    const navigation = useNavigation();

    // const [value, setValue] = useState("0");

    // const bbc_name = name.split(" ")[0].toLowerCase();

    // const announce = useSelector((state) => state.Announce.announce);

    // const changeValue = async (name, value) => {
    //     try {
    //         const data = {
    //             "datum": {
    //                 "value": value
    //             }
    //         }

    //         const result = await axios.post(
    //             `https://io.adafruit.com/api/v2/nvmhai0205/feeds/bbc-${name}/data`,
    //             data,
    //             {
    //                 headers: {
    //                     "X-AIO-Key": "aio_elDy24Jp8pJXA5K0wp5B52L1mCHc"
    //                 }
    //             }
    //         )
    //     } catch (error) {

    //     }
    // }

    // const dispatch = useDispatch();

    // const getValue = async () => {
    //     try {
    //         const result = await axios.get(
    //             `https://io.adafruit.com/api/v2/nvmhai0205/feeds/bbc-${bbc_name}`
    //         );
            
    //         const newValue = result.data.last_value;
            
    //         if (newValue >= 35 && bbc_name == "temperature") {
    //             if (announce.length >= 0) {
    //                 dispatch(removeAnnounce())
    //             }
    //             dispatch(addAnnounce({id: announce.length, message: "High temperature, please turn on the fan"}))
    //         }
            
    //             if (announce.length >= 0) {
    //                 dispatch(removeAnnounce())
    //             }
    //         }

    //         setValue(result.data.last_value);
    //     } catch (error) {

    //     }
    // };

    // useEffect(() => {
    //     const isMounted = true;
    //     const intervalid = setInterval(() => {
    //         getValue();
    //     }, 1000);
    //     return () => {
    //         clearInterval(intervalid);
    //         isMounted = false;
    //     };
    // }, []);

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
                {/* <Text
                    style={{
                        fontSize: 16,
                        height: 30,
                        fontWeight: "bold",
                        color: "#4C51C6",
                        marginLeft: 20,
                        marginTop: 10,
                    }}
                >
                    {value} {(bbc_name === "temperature") ? <Icon name="temperature-celsius" size={16} color="#4C51C6"/> : (bbc_name === "ph") ? "" : "%"}
                </Text> */}
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
