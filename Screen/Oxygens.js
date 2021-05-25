import React, { useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Linking,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import IconIonic from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { LinearProgress } from "react-native-elements";
import moment from "moment";
import { getOxygen } from "../Actions/oxygenAction";

const Oxygens = ({ navigation }) => {
  const oxygen = useSelector((state) => state.oxygen);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOxygen());
  }, []);
  return (
    <View>
      <ImageBackground
        source={require("../Assets/wallpaper.jpg")}
        style={{
          height: 180,
          backgroundColor: "red",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            paddingTop: 10,
            paddingBottom: 10,
            paddingRight: 10,
            paddingLeft: 10,
          }}
        >
          <IconIonic
            name="menu-outline"
            size={30}
            color="azure"
            onPress={() => navigation.toggleDrawer()}
          />
          <Icon
            name="user"
            size={24}
            color="azure"
            style={{ marginLeft: "auto", marginRight: 5 }}
          />
        </View>
        <Text style={styles.headTxt1}>Stay Home, Stay Safe</Text>
        <Text style={styles.headTxt2}>
          Donate or Sell Your Oxygen Containers To Needy People
        </Text>
      </ImageBackground>
      <ScrollView
        vertical={true}
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}
      >
        <View style={{ padding: 14 }}>
          {oxygen.oxygen ? (
            oxygen.oxygen.map((oxygen, i) => (
              <View key={i} style={styles.listCard}>
                <Text
                  style={{ fontSize: 10, color: "gray", marginLeft: "auto" }}
                >
                  Posted at {moment(oxygen.createdAt).fromNow(true)} ago
                </Text>
                <Text
                  style={{
                    fontWeight: "bold",
                    color: "black",
                    fontSize: 18,
                    marginTop: -10,
                  }}
                >
                  {oxygen.name}
                  {"  "}
                  {oxygen.createdBy.role === "oxygenorganizaton" && (
                    <Icon name="award" size={18} color="Black" />
                  )}
                </Text>
                {oxygen.pricing && (
                  <Text>
                    {" "}
                    <Icon name="rupee-sign" style={styles.oxyIcon} size={12} />
                    {oxygen.pricing}
                  </Text>
                )}

                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginTop: 3,
                  }}
                >
                  <Icon name="map-marker-alt" size={18} />
                  <Text
                    style={{
                      marginTop: 2,
                      marginLeft: 4,
                      color: "black",
                      fontSize: 14,
                    }}
                  >
                    {oxygen.city},
                  </Text>
                  <Text
                    style={{
                      marginLeft: 1,
                      color: "black",
                      marginTop: 2,
                      fontSize: 14,
                    }}
                  >
                    {oxygen.state}
                  </Text>
                </View>

                <Text style={{ marginTop: 2.5 }}>
                  <Text style={{ color: "red" }}>Note ~ </Text>
                  {oxygen.note}
                </Text>
                <TouchableOpacity>
                  <Text
                    onPress={() =>
                      Linking.openURL(`tel:${oxygen.contactnumber}`)
                    }
                    style={styles.cntBtn}
                  >
                    Contact Now
                  </Text>
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <LinearProgress
              color="primary"
              style={{ marginTop: "40%", marginBottom: "auto" }}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Oxygens;

const styles = StyleSheet.create({
  mainList: {
    padding: 14,
  },
  headTxt1: {
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "RobotoBold",
    color: "whitesmoke",
    marginBottom: 10,
  },
  headTxt2: {
    fontSize: 14,
    textAlign: "center",
    fontWeight: "normal",
    fontFamily: "RobotoRegular",
    color: "whitesmoke",
  },
  oxyIcon: {
    marginRight: 5,
  },
  listCard: {
    width: "98%",
    display: "flex",
    flexDirection: "column",
    padding: 10,
    borderWidth: 2,
    borderColor: "#e0dede",
    borderRadius: 8,
    marginBottom: 8,
    marginLeft: "auto",
    marginRight: "auto",
  },
  cntBtn: {
    marginTop: 8,
    width: "100%",
    color: "azure",
    backgroundColor: "#00ac09",
    padding: 12,
    borderWidth: 1,
    borderRadius: 30,
    fontSize: 18,
    borderColor: "#00ac09",
    fontWeight: "500",
    textAlign: "center",
  },
});
