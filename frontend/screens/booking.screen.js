import { StyleSheet, View, Text, SafeAreaView, FlatList, Pressable, TouchableOpacity, TextInput } from "react-native";
import React, { useState } from "react";
import IconM from "react-native-vector-icons/MaterialIcons";
import Button from "../component/button.component";
import Icon from "react-native-vector-icons/MaterialIcons";
import axios from "axios";
import DateTimePicker from '@react-native-community/datetimepicker';

const Booking = ({route, navigation}) => {
  const [dateShow, setDateShow] = useState(false)
  const [date, setDate] = useState(new Date())
  const [dateText, setDateText] = useState(new Date())
  const timeChange = (event, selectedDate) => {
    const currentDate = selectedDate || date
    setDateShow(Platform.OS == 'ios')
    setDate(currentDate)

    const tempDate = new Date(currentDate)
    var printDate = tempDate.getHours() + ":" + tempDate.getMinutes() + " " + tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear()
    setDateText(printDate)
    props.output(selectedDate)
  }
  const [dateShow1, setDateShow1] = useState(false)
  const [date1, setDate1] = useState(new Date())
  const [dateText1, setDateText1] = useState(new Date())
  const timeChange1 = (event, selectedDate1) => {
    const currentDate = selectedDate1 || date1
    setDateShow1(Platform.OS == 'ios')
    setDate1(currentDate)

    const tempDate = new Date(currentDate)
    var printDate = tempDate.getHours() + ":" + tempDate.getMinutes() + " " + tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear()
    setDateText1(printDate)
    props.output(selectedDate1)
  }

  const HandleLed = async (value) => {
    const data = {
      "value": value
    }
    const result = await axios.post(
      `https://io.adafruit.com/api/v2/HungNguyenHung/feeds/bbc-iot-led/data`,
      data,
      {
          headers: {
              "X-AIO-Key": "aio_YsCI15HL1s95QqYrT2WZtWMtv7ki"
          }
      }
    )
  }

  const Book = () => {
    date.setHours(date.getHours() + 7)
    date1.setHours(date1.getHours() + 7)
    route.params.setStart(date)
    route.params.setEnd(date1)
    var currentTime = new Date();
    currentTime.setHours(currentTime.getHours() + 7)
    if (date.valueOf() > currentTime.valueOf() || date1.valueOf() < currentTime.valueOf() && route.params.status){
      HandleLed(0)
      route.params.setStatus(0)
    }
      
    else if (date.valueOf() < currentTime.valueOf() && date1.valueOf() > currentTime.valueOf() && !route.params.status){
      HandleLed(1)
      route.params.setStatus(1)
    } 
    navigation.goBack()
  }

    return (
        <View style={style.container}>
          <TouchableOpacity
                onPress={() => navigation.goBack()}
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
                ></Text>
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
              BOOKING
            </Text>
          </View>
          <SafeAreaView>
            <View
              style={{
                paddingHorizontal: 30,
                width: "100%",
                marginTop: 30,
              }}
            >
              <View style={style.inputcontainer}>
                <TextInput
                    style={style.input}
                    placeholderTextColor="#fff"
                    placeholder="Booker's name"
                    textContentType="name"
                    // name="booker"
                    // onChange={(e) => handleChange(e, 'email')}
                />
                <View style={style.iconcontainer}>
                    <Icon name="person" size={16} color="#fff" />
                </View>
              </View>
              <Pressable style={style.inputcontainer} onPress={() => setDateShow(!dateShow)}>
                <TextInput
                  value={dateText}
                  style={style.input}
                  placeholderTextColor="#fff"
                  placeholder="Choose start time"
                  textContentType="name"
                  editable={false}
                  // name="booker"
                  // onChange={(e) => handleChange(e, 'email')}
                />
                {dateShow && <DateTimePicker
                  mode="time"
                  value={date}
                  onChange={timeChange}
                  display={Platform.OS == 'ios' ? 'inline' : 'default'}
                  themeVariant='light'
                />}
                <View style={style.iconcontainer}>
                    <Icon name="access-time" size={16} color="#fff" />
                </View>
              </Pressable>
              <Pressable style={style.inputcontainer} onPress={() => setDateShow1(!dateShow1)}>
                <TextInput
                  value={dateText1}
                  style={style.input}
                  placeholderTextColor="#fff"
                  placeholder="Choose end time"
                  textContentType="name"
                  editable={false}
                  // name="booker"
                  // onChange={(e) => handleChange(e, 'email')}
                />
                {dateShow1 && <DateTimePicker
                  mode="time"
                  value={date1}
                  onChange={timeChange1}
                  display={Platform.OS == 'ios' ? 'inline' : 'default'}
                  themeVariant='light'
                />}
                <View style={style.iconcontainer}>
                    <Icon name="access-time" size={16} color="#fff" />
                </View>
              </Pressable>
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
                title="Book"
              />
            </View>
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
    inputcontainer: {
        borderColor: "#fff",
        borderStyle: "solid",
        borderWidth: 2,
        height: 50,
        width: 320,
        borderRadius: 10,
        paddingLeft: 20,
        marginBottom: 20,
        flexDirection: "row",
        flexWrap: "wrap",
        backgroundColor: "#ffffff40",
        width: "100%",
    },
    input: {
        height: 50,
        width: 280,
        fontSize: 14,
        color: "#fff",
        fontWeight: "500",
    },
    iconcontainer: {
        flex: 1,
        width: 30,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
    },
});

export default Booking;
