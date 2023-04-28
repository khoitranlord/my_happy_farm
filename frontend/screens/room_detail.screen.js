import { StyleSheet, View, Text, SafeAreaView, FlatList, Pressable, TouchableOpacity, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import IconM from "react-native-vector-icons/MaterialIcons";
import Button from "../component/button.component";
import axios from "axios";
import Moment from 'moment';
import AnalyticsItem from "../component/analytics.component";

const name = "Room 101";

const PERSONLIST = [
  {
    id: "9486880",
    name: "Nguyễn Tuấn Minh",
  },
  {
    id: "261046",
    name: "Đặng Tiến Mạnh",
  },
  {
    id: "12634322",
    name: "Phạm Ngọc Quang",
  },
]

const RoomDetail = ({route, navigation}) => {

  const [status, setStatus] = useState(0)
  const [start, setStart] = useState(new Date())
  const [end, setEnd] = useState(new Date())

  const Book = () => {
    navigation.navigate("BOOKING", { roomStatus: status, setStatus, setStart, setEnd })
  }

  const [doorStatus, setDoorStatus] = useState("0");
  const [doorTimestamp, setDoorTimestamp] = useState("0");

  const [personList, setPersonList] = useState([]);
  const [noPeople, setNoPeople] = useState(0);
  const [personData, setPersonData] = useState()

  const [lastUpdate, setLastUpdate] = useState(0);
  const [timeFlag, setTimeFlag] = useState(new Date());

  const removePeople = (e) => {
    var array = [...personList]; // make a separate copy of the array
    var array1 = array.filter(item => item.id == e.id)[0]
    var index = array.indexOf(array1)
    if (index !== -1) {
      array.splice(index, 1);
      setPersonList(array);
    }
  }

  const handleBuzzer = async (value) => {
    const data = {
      "value": value
    }
    const result = await axios.post(
      `https://io.adafruit.com/api/v2/HungNguyenHung/feeds/bbc-buzzer/data`,
      data,
      {
          headers: {
              "X-AIO-Key": "aio_YsCI15HL1s95QqYrT2WZtWMtv7ki"
          }
      }
  )
  }

  useEffect(() => {
    if(lastUpdate.valueOf() > timeFlag.valueOf()){
      if(personList.some(item => personData.id == item.id)){
        removePeople(personData)
        setNoPeople(noPeople - 1)
      }
      else {
        if(lastUpdate.valueOf() < start.valueOf() || lastUpdate.valueOf() > end.valueOf()){
          handleBuzzer(1)
          setTimeout(function(){
            handleBuzzer(0)
        }, 10000);
        }
        personData && setPersonList(list => [...list, personData])
        setNoPeople(noPeople + 1)
      }
      
      setTimeFlag(new Date())
    }
    
  }, [lastUpdate])

  useEffect(() => {

  }, [timeFlag])

  const postPersonList = async () => {
    const result = await axios.get(
      `https://io.adafruit.com/api/v2/HungNguyenHung/feeds/bbc-card`
    );
    const dataId = result.data.last_value
    const dataName = PERSONLIST.filter(e => e.id == dataId)[0].name
    const data = {
      id: dataId,
      name: dataName,
    }
    setPersonData(data)
    setLastUpdate(new Date(result.data.updated_at))
    }
  

  const getValue = async () => {
    const result = await axios.get(
    `https://io.adafruit.com/api/v2/HungNguyenHung/feeds/bbc-magnetic`
    );
    setDoorStatus(result.data.last_value);
    setDoorTimestamp(result.data.updated_at);
  }
  useEffect(() => {
    const isMounted = true;
    const intervalid = setInterval(() => {
        getValue();
        postPersonList();
    }, 1000);
    return () => {
        clearInterval(intervalid);
        isMounted = false;
    };
}, []);
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
              ROOM DETAIL
            </Text>
          </View>
          <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
            <View
              style={{
                paddingHorizontal: 30,
                width: "100%",
                marginTop: 30,
              }}
            >
              <View
                style={{
                  backgroundColor: "#FFFFFFfe",
                  height: 280,
                  width: "100%",
                  borderRadius: 10,
                  paddingHorizontal: 0,
                }}
              >
                <View style={style.profileItem}>
                  <View style={style.infoItem}>
                    <Text style={style.titleItem}>Room Name</Text>
                    <Text style={style.desItem}>
                      {name}
                    </Text>
                  </View>
                  <View style={style.infoItem}>
                    <Text style={style.titleItem}>Door Status</Text>
                      {doorStatus == 0 && <Text style={style.desItem}>Close at {Moment(doorTimestamp).format('HH:mm DD/MM/YYYY')}</Text>
                      || <Text style={style.desItem}>Open at {Moment(doorTimestamp).format('HH:mm DD/MM/YYYY')}</Text>}
                  </View>
                  <View style={style.infoItem}>
                    <Text style={style.titleItem}>Room Status</Text>
                      {status == 0 && <Text style={style.desItem}>Ready to book</Text>
                      || <Text style={style.desItem}>In use</Text>}
                  </View>
                </View>
              </View>
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
            <View style={style.personTitleContainer}>
              <Text style={style.personTitle}>Số lượng người trong phòng là: {noPeople}</Text>
            </View>
            <View style={style.personContainer}>
              {personList.map(person => (
                <View style={style.personBox}>
                  <Text style={style.personName}>{person.name}</Text>
                </View>
              ))}
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

export default RoomDetail;
