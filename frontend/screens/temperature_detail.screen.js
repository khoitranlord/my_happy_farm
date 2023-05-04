import { StyleSheet, View, Text, SafeAreaView, FlatList, Pressable, TouchableOpacity, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import IconM from "react-native-vector-icons/MaterialIcons";
import Button from "../component/button.component";
// import LineGraph from "../component/line.component";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import BBC_TEMP from "../../mockup_data/BBC_TEMP.csv";
const screenWidth = Dimensions.get("window").width;

const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false // optional
};
const data = {
  labels: ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"],
  datasets: [
    {
      data: [25, 25, 26, 27, 28, 29, 30, 32, 33, 33, 34, 35, 36, 36, 34, 32, 31, 31, 30, 29, 28, 27, 27, 26],
      color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
      strokeWidth: 2 // optional
    }
  ] // optional
};

const TemperatureDetail = ({navigation}) => {
  const Book = () => {}
  
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date + ' ' + time;
  return (
    <View style={style.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("HOME")}
        style={{
            flexDirection: "row",
            backgroundColor: "#607FF2",
            width: 40,
            height: 40,
            paddingHorizontal: 15,
            paddingVertical: 10,
            borderRadius: 30,
            marginHorizontal: 30,
            marginBottom: 10,
        }}
      >
        <IconM name="arrow-back-ios" size={20} color="#fff" />
        <Text
            style={{
                color: "white",
                fontSize: 16,
            }}
        />
      </TouchableOpacity>
      <View style={style.title}>
        <Text
          style={{
              color: "#fff",
              fontSize: 20,
              fontWeight: "bold",
              letterSpacing: 1,
          }}
        >
          TEMPERATURE MODULE DETAIL
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
        <View
          style={{
            paddingHorizontal: 12,
            width: "100%",
            marginTop: 30,
          }}
        >
          <LineChart
            data={data}
            width={screenWidth}
            height={220}
            chartConfig={chartConfig}
          />
        </View>
        <View
          style={{
            height: 100,
            width: "100%",
            marginTop: 30,
            borderRadius: 50,
            alignItems: "center",
          }}
        >
          <Button
            onPress={Book}
            title="Update"
          />
        </View>
        <View style={style.personTitleContainer}>
          <Text style={style.personTitle}>Last Updated: {dateTime}</Text>
        </View>
      </ScrollView>
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
    personContainer: {
      justifyContent: 'center',
      marginLeft: 24,
      marginRight: 24,
    },
    personBox: {
      backgroundColor: "#fff",
      marginBottom: 8,
      borderRadius: 8,
    },
    personName: {
      fontSize: 18,
      fontWeight: "600",
      letterSpacing: 1,
      color: "#444",
      marginTop: 8,
      marginBottom: 8,
      marginLeft: 10,
    },
    personTitle: {
      fontSize: 20,
      fontWeight: "700",
      letterSpacing: 1,
      color: "#fff",
    },
    personTitleContainer: {
      marginTop: 0,
      marginBottom: 12,
      marginLeft: 24,
    }
});

export default TemperatureDetail;
