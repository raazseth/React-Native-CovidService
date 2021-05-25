import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import IconIonic from "react-native-vector-icons/Ionicons";
import Material from "react-native-vector-icons/MaterialIcons";
import YoutubeCard from "../Components/YoutubeCard";
import FungusData from "../Data/FungusData";

const Fungus = ({ navigation }) => {
  const [YtData, setYtData] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    setisLoading(true);
    fetch(
      "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=blackfungus&key=AIzaSyD8x58bZPyrOKIx5H8HcUkeqNv2vbj89bI"
    )
      .then((res) => res.json())
      .then((data) => {
        setisLoading(false);
        setYtData(data.items);
      })
      .catch((error) => console.log(error));
  }, []);

  const toggle = (index) => {
    if (clicked === index) {
      return setClicked(null);
    }
    setClicked(index);
  };

  return (
    <View style={styles.mainNews}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          paddingTop: 6,
          paddingBottom: 10,
          paddingRight: 10,
          paddingLeft: 10,
        }}
      >
        <IconIonic
          name="menu-outline"
          size={30}
          color="black"
          onPress={() => navigation.toggleDrawer()}
        />
        <Icon
          name="user"
          size={24}
          color="black"
          style={{ marginLeft: "auto", marginRight: 5 }}
        />
      </View>
      <ScrollView
        vertical={true}
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}
      >
        <View style={{ marginBottom: "20%" }}>
          <Text style={styles.BodyTxt}>Black Fungus</Text>
          {FungusData.map((fnf, i) => (
            <View
              key={i}
              style={{
                paddingTop: 5,
                paddingBottom: 5,
                borderWidth: 1,
                padding: 6,
                borderRadius: 8,
                marginBottom: 8,
                borderColor: "#e0dede",
              }}
            >
              <View style={{ display: "flex", flexDirection: "row" }}>
                <Text style={styles.headTxt2} onPress={() => toggle(i)}>
                  {fnf.title}
                </Text>
                <View style={{ marginLeft: "auto" }}>
                  {clicked === i ? (
                    <Material
                      name="arrow-drop-up"
                      size={23}
                      onPress={() => toggle(i)}
                    />
                  ) : (
                    <Material
                      name="arrow-drop-down"
                      size={23}
                      onPress={() => toggle(i)}
                    />
                  )}
                </View>
              </View>
              {clicked === i
                ? fnf.content.map((arr, i) => (
                    <Text key={i} style={styles.headTxt3}>
                      - {arr}
                    </Text>
                  ))
                : null}
            </View>
          ))}
          <Text style={[styles.headTxt1, { fontSize: 15 }]}>
            Popular Videos Related Black Fungus
          </Text>

          <View
            style={{
              padding: 6,
              paddingTop: 5,
              paddingBottom: 10,
              borderRadius: 4,
              backgroundColor: "#3b3b3b",
            }}
          >
            {isLoading ? (
              <ActivityIndicator
                style={{ marginTop: 10 }}
                size="large"
                color="red"
              />
            ) : null}

            {YtData
              ? YtData.map((YT, i) => <YoutubeCard YT={YT} key={i} />)
              : null}
            <TouchableOpacity>
              <Text
                onPress={() =>
                  Linking.openURL(
                    "https://www.youtube.com/results?search_query=black+fungus"
                  )
                }
                style={styles.cntBtn}
              >
                View More
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Fungus;

const styles = StyleSheet.create({
  mainNews: {
    padding: 14,
  },
  NewsAPiImg: {
    width: "55%",
  },
  nullNewsAPiImg: {
    width: "100%",
  },
  NewsApiCard: {
    display: "flex",
    flexDirection: "row",
    padding: 8,
    borderWidth: 1,
    borderColor: "#e0dede",
    borderRadius: 8,
    marginBottom: 8,
  },
  newsApiTitle: {
    marginTop: 5,
    color: "black",
    fontFamily: "RobotoBold",
    fontWeight: "bold",
  },
  newsApiSrc: {
    marginTop: 2,
    color: "#6b6b6b",
    fontWeight: "normal",
    fontFamily: "RobotoRegular",
    fontSize: 11,
  },
  newsApiDesc: {
    marginTop: 3,
    color: "#333",
    fontWeight: "normal",
    fontFamily: "RobotoRegular",
    fontSize: 12,
  },
  BodyTxt: {
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "RobotoBold",
    color: "black",
    marginBottom: 10,
  },
  headTxt1: {
    fontSize: 20,
    textAlign: "left",
    fontWeight: "bold",
    fontFamily: "RobotoBold",
    color: "#333",
    marginBottom: 10,
  },
  headTxt2: {
    fontSize: 18,
    textAlign: "left",
    fontWeight: "bold",
    fontFamily: "RobotoBold",
    color: "#333",
  },
  headTxt3: {
    fontSize: 14,
    textAlign: "left",
    fontWeight: "normal",
    fontFamily: "RobotoRegular",
  },
  cntBtn: {
    marginTop: 8,
    width: "95%",
    color: "azure",
    backgroundColor: "red",
    padding: 10,
    borderWidth: 1,
    borderRadius: 4,
    fontSize: 18,
    borderColor: "red",
    fontWeight: "500",
    textAlign: "center",
    marginLeft: "auto",
    marginRight: "auto",
  },
});
