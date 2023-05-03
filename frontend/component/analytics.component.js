import { View, Text, StyleSheet, Image, Alert, Pressable } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import ModuleDetail from "../screens/room_detail.screen";
import axios from "axios";
import Moment from "moment";
const AnalyticsItem = (props) => {
    const { name, image } = props;
    const navigation = useNavigation();
    const [status, setStatus] = useState("F")
    const [doorStatus, setDoorStatus] = useState("0");
    const [doorTimestamp, setDoorTimestamp] = useState("0");
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
    const getModuleValue = async () => {
        const result = await axios.get(
          `https://io.adafruit.com/api/v2/khoitran1422/feeds/bbc-moisture`
        );
        // console.log(result.data);
        setDoorStatus(result.data.last_value);
        setDoorTimestamp(result.data.updated_at);
    }
    useEffect(() => {
        const isMounted = true;
        const intervalid = setInterval(() => {
            getModuleValue();
        }, 1000);
        return () => {
            clearInterval(intervalid);
            isMounted = false;
        };
      }, []);
    return (
        <Pressable style={style.container} onPress={() => navigation.navigate("ROOM DETAIL")}>
            <View
                style={{
                    paddingHorizontal: 30,
                    width: "100%",
                    marginTop: 10,
                }}
            >
                <View style={style.profileItem}>
                    <View style={style.infoItem}>
                        <Text style={style.titleItem}>Module Name</Text>
                        <Text style={style.desItem}>
                        {name}
                        </Text>
                    </View>
                    <View style={style.infoItem}>
                        <Text style={style.titleItem}>Module Status</Text>
                        <Text style={style.desItem}>{doorStatus} at {Moment(doorTimestamp).format('HH:mm DD/MM/YYYY')}</Text>
                    </View>
                </View>
            </View>
        </Pressable>
    );
};

const style = StyleSheet.create({
    container: {
        alignItems: "center",
        backgroundColor: "#E9F4FF",
        width: "35%",
        height: 200,
        marginHorizontal: "7.5%",
        marginVertical: 20,
        borderRadius: 10,
        paddingHorizontal: 10,
    },
    name: {
        color: "#4C51C6",
        fontWeight: "700",
        fontSize: 14,
    },
    infoItem: {
        // height: 80,
        marginTop: 15,
        marginLeft: 10,
        marginRight: 10,
    },
    titleItem: {
        fontSize: 24,
        fontWeight: "600",
        letterSpacing: 1,
        color: "#444",
    },
    desItem: {
        fontSize: 20,
        fontWeight: "600",
        color: "#666",
        marginTop: 10,
    },
    profileItem: {
        height: 80,
        flexDirection: "column",
        marginBottom: 0,
    },
});

export default AnalyticsItem;
