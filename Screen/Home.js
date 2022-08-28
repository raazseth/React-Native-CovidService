import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  Linking,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome5";
import Icon2 from "react-native-vector-icons/Fontisto";
import NumberFormat from "react-number-format";
import IconIonic from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { getIpAddress } from "../Actions/covidStatsAction";

const Home = ({ navigation }) => {
  const [data, setdata] = useState({});
  const [WholeData, setWholeData] = useState([]);
  const [Vaccination, setVaccination] = useState([]);
  const auth = useSelector((state) => state.auth);
  const covid = useSelector((state) => state.covid);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch("https://api.covid19india.org/data.json")
      .then((res) => res.json())
      .then((data) => setWholeData(data))
      .catch((error) => console.log(error));

    dispatch(getIpAddress());
  }, []);

  useEffect(() => {
    fetch(
      "https://cdn-api.co-vin.in/api/v1/reports/v2/getPublicReports?state_id=&district_id=&date=",
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Host: "cdn-api.co-vin.in",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => setVaccination(data))
      .catch((error) => console.log(error));
  }, []);

  const IndiaData =
    WholeData.cases_time_series === undefined
      ? "null"
      : WholeData.cases_time_series.slice(-1);

  const filterLocalCovid = () => {
    if (WholeData.statewise) {
      return WholeData.statewise.filter(
        (fil) => fil.statecode === covid.ip.region
      );
    } else {
      return "null";
    }
  };
  const filterLocalVaccination = () => {
    if (Vaccination.getBeneficiariesGroupBy !== undefined) {
      return Vaccination.getBeneficiariesGroupBy.filter(
        (fil) => fil.state_name === covid.ip.regionName
      );
    }
  };

  return (
    <View>
      <ImageBackground
        source={require("../Assets/wallpaper.jpg")}
        style={{
          height: "100%",
        }}
      >
        <View style={{ display: "flex", flexDirection: "row", padding: 10 }}>
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
        <ScrollView
          vertical={true}
          keyboardShouldPersistTaps="always"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.mainHome}>
            <Text style={styles.headTxt1}>Coronavirus</Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                height: 155,
                borderRadius: 10,
                marginBottom: 10,
                backgroundColor: "#fdbc00",
                padding: 6,
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "45%",
                  marginTop: "auto",
                  marginBottom: "auto",
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    color: "white",
                    fontWeight: "bold",
                    fontFamily: "RobotoBold",
                    marginLeft: 5,
                  }}
                >
                  Vaccination Is Important{" "}
                </Text>
                <Text
                  style={styles.headBtn}
                  onPress={() =>
                    Linking.openURL("https://www.cowin.gov.in/home")
                  }
                >
                  Book Now
                </Text>
              </View>
              <Image
                source={require("../Assets/Vaccine2.png")}
                style={{
                  width: "56%",
                  height: 100,
                  marginTop: "auto",
                  marginBottom: "auto",
                }}
              />
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                marginBottom: 10,
              }}
            >
              <Text style={{ color: "white", padding: 4 }}>Total Recovered & Vaccination In India</Text>
              <Text
                style={{ color: "white", marginLeft: "auto", padding: 4 }}
                onPress={() => navigation.navigate("CovidStats")}
              >
                View All
              </Text>
            </View>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <View style={styles.cardHead}>
                {WholeData.cases_time_series
                  ? WholeData.cases_time_series.slice(-1).map((le, i) => (
                      <View
                        key={i}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <Text style={{ fontSize: 10, marginLeft: "auto" }}>
                          Last Updated :{" "}
                          {le.dateymd.substring(0, 10).toUpperCase()}
                        </Text>
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            marginTop: 6,
                          }}
                        >
                          <Image
                            source={require("../Assets/firstAid.png")}
                            style={{ width: 50, height: 50, marginTop: "auto" }}
                          />
                          <View style={{ marginLeft: 0 }}>
                            <Text
                              style={{
                                color: "black",
                                fontSize: 10,
                                marginTop: 5,
                              }}
                            >
                              Total Recovered
                            </Text>

                            <NumberFormat
                              renderText={(text) => (
                                <Text
                                  style={{
                                    color: "#28b010",
                                    fontSize: 18,
                                    fontWeight: "bold",
                                    fontFamily: "RobotoBold",
                                  }}
                                >
                                  {text}
                                </Text>
                              )}
                              value={le.totalrecovered}
                              displayType={"text"}
                              thousandSeparator={true}
                              thousandsGroupStyle="lakh"
                            />
                          </View>
                        </View>
                      </View>
                    ))
                  : null}
              </View>
              <View style={styles.cardHead}>
                {WholeData.tested
                  ? WholeData.tested.slice(-1).map((le, i) => (
                      <View
                        key={i}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <Text style={{ fontSize: 10, marginLeft: "auto" }}>
                          Last Updated :{" "}
                          {le.updatetimestamp.substring(0, 10).toUpperCase()}
                        </Text>
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            marginTop: 6,
                          }}
                        >
                          <Image
                            source={require("../Assets/injection.png")}
                            style={{ width: 50, height: 50, marginTop: "auto" }}
                          />
                          <View style={{ marginLeft: 0 }}>
                            <Text
                              style={{
                                color: "black",
                                fontSize: 10,
                                marginTop: 7,
                              }}
                            >
                              Total Vaccination
                            </Text>

                            <NumberFormat
                              renderText={(text) => (
                                <Text
                                  style={{
                                    color: "#28b010",
                                    fontSize: 18,
                                    fontWeight: "bold",
                                    fontFamily: "RobotoBold",
                                  }}
                                >
                                  {text}
                                </Text>
                              )}
                              value={le.totaldosesadministered}
                              displayType={"text"}
                              thousandSeparator={true}
                              thousandsGroupStyle="lakh"
                            />
                          </View>
                        </View>
                      </View>
                    ))
                  : null}
              </View>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Text
                style={[
                  styles.headTxt2,
                  {
                    color: "white",
                    fontSize: 12,
                    paddingTop: 2,
                  },
                ]}
              >
                Last Updated At{" "}
                {filterLocalCovid() !== undefined
                  ? filterLocalCovid()[0].lastupdatedtime.substring(0, 10)
                  : null}
              </Text>
              <Text
                style={[
                  styles.headTxt2,
                  {
                    color: "white",
                    marginLeft: "auto",
                    fontSize: 12,
                    paddingTop: 2,
                  },
                ]}
                onPress={() => navigation.navigate("CovidStats")}
              >
               View All
              </Text>
            </View>
            <View style={styles.mainCovid}>
              <View style={{ display: "flex", flexDirection: "row" }}>
                <Image
                  source={require("../Assets/city.png")}
                  style={{ width: 30, height: 30 }}
                />
                <Text
                  style={{
                    color: "azure",
                    marginLeft: 10,
                    fontSize: 18,
                    paddingTop: 5,
                  }}
                >
                  {covid.ip.regionName}
                </Text>
              </View>
              <View
                style={{
                  borderBottomColor: "#B1B5C6",
                  borderBottomWidth: 0.5,
                  marginTop: 10,
                  marginBottom: 10,
                }}
              />
              <View
                style={{
                  backgroundColor: "#3b3b3b",
                  height: 40,
                  borderRadius: 4,
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    marginTop: 4,
                  }}
                >
                  <View style={{ marginLeft: "auto", marginRight: "auto" }}>
                    <Text style={{ color: "#e59f30", fontSize: 12 }}>
                      Active Cases
                    </Text>
                    <NumberFormat
                      renderText={(text) => (
                        <Text style={{ color: "azure", textAlign: "center" }}>
                          {text}
                        </Text>
                      )}
                      value={filterLocalCovid()[0].active}
                      displayType={"text"}
                      thousandSeparator={true}
                      thousandsGroupStyle="lakh"
                    />
                  </View>
                  <View style={{ marginLeft: "auto", marginRight: "auto" }}>
                    <Text style={{ color: "#13c089", fontSize: 12 }}>
                      Total Recovered
                    </Text>

                    <NumberFormat
                      renderText={(text) => (
                        <Text style={{ color: "azure", textAlign: "center" }}>
                          {text}
                        </Text>
                      )}
                      value={filterLocalCovid()[0].recovered}
                      displayType={"text"}
                      thousandSeparator={true}
                      thousandsGroupStyle="lakh"
                    />
                  </View>
                  <View style={{ marginLeft: "auto", marginRight: "auto" }}>
                    <Text style={{ color: "#c45251", fontSize: 12 }}>
                      Total Deaths
                    </Text>
                    <NumberFormat
                      renderText={(text) => (
                        <Text style={{ color: "azure", textAlign: "center" }}>
                          {text}
                        </Text>
                      )}
                      value={filterLocalCovid()[0].deaths}
                      displayType={"text"}
                      thousandSeparator={true}
                      thousandsGroupStyle="lakh"
                    />
                  </View>
                </View>
              </View>
            </View>
            <Text style={styles.headTxt2}>Trending & Helpful</Text>
            <View
              style={{ display: "flex", flexDirection: "row", marginTop: 5 }}
            >
              <ScrollView
                horizontal={true}
                keyboardShouldPersistTaps="always"
                showsHorizontalScrollIndicator={false}
              >
                <TouchableOpacity
                  style={[styles.cardMainBody, { backgroundColor: "#4858f2" }]}
                  onPress={() => navigation.navigate("News")}
                >
                  <Icon name="newspaper" size={30} color="azure" />
                  <Text style={styles.cardMainBodyTxt}>Health News</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Fungus")}
                  style={[styles.cardMainBody, { backgroundColor: "#d48969" }]}
                >
                  <Icon name="virus" size={30} color="azure" />
                  <Text style={styles.cardMainBodyTxt}>Black Fungus</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.cardMainBody, { backgroundColor: "#20aaa0" }]}
                  onPress={() => navigation.navigate("Patients")}
                >
                  <Icon2 name="bed-patient" size={30} color="azure" />
                  <Text style={styles.cardMainBodyTxt}>Patients</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Donors")}
                  style={[styles.cardMainBody, { backgroundColor: "#f8c19c" }]}
                >
                  <Icon2 name="blood-drop" size={30} color="azure" />
                  <Text style={styles.cardMainBodyTxt}>Donors</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Oxygens")}
                  style={[styles.cardMainBody, { backgroundColor: "#fbac3f" }]}
                >
                  <Icon name="hand-holding-water" size={30} color="azure" />
                  <Text style={styles.cardMainBodyTxt}>Oxygens</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>

            <Text style={styles.headTxt2}>About Covid-19</Text>
            <View style={{ display: "flex", flexDirection: "column" }}>
              <View style={styles.cardBody}>
                <Icon name="info-circle" size={40} color="white" />
                <Text style={styles.cardBodyTxt}>Basic Information</Text>
              </View>
              <View style={styles.cardBody}>
                <Icon2 name="blood-test" size={40} color="white" />
                <Text style={styles.cardBodyTxt}>Testing</Text>
              </View>
              <View style={styles.cardBody}>
                <Icon name="heartbeat" size={40} color="white" />
                <Text style={styles.cardBodyTxt}>How To Prevent</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  mainHome: {
    paddingTop: 25,
    paddingLeft: 14,
    paddingRight: 14,
    backgroundColor: "transparent",
  },
  menuIcon: {
    paddingBottom: 5,
    paddingLeft: 15,
    paddingRight: 8,
    fontSize: 34,
  },
  headTxt1: {
    fontSize: 30,
    textAlign: "left",
    fontWeight: "bold",
    fontFamily: "RobotoBold",
    color: "azure",
    marginBottom: 10,
  },
  headTxt2: {
    fontSize: 18,
    textAlign: "left",
    fontWeight: "normal",
    fontFamily: "RobotoRegular",
    color: "azure",
    marginTop: 15,
    marginBottom: 7,
  },
  cardBodyTxt: {
    fontSize: 22,
    textAlign: "center",
    fontWeight: "normal",
    fontFamily: "RobotoRegular",
    color: "azure",
    marginTop: 8,
    marginLeft: 15,
    marginRight: "auto",
  },

  cardStateTxt: {
    fontSize: 22,
    textAlign: "left",
    fontWeight: "normal",
    fontFamily: "RobotoRegular",
    color: "black",
    marginTop: 8,
  },
  cardMainBodyTxt: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: "normal",
    fontFamily: "RobotoRegular",
    color: "azure",
    marginTop: 4,
    marginLeft: "auto",
    marginRight: "auto",
  },

  cardHead: {
    backgroundColor: "whitesmoke",
    width: 160,
    height: 130,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 10,
    padding: 10,
  },
  mainCovid: {
    padding: 10,
    backgroundColor: "#050710",
    borderRadius: 10,
    width:"100%"
  },
  cardMainBody: {
    backgroundColor: "#f4f4f4",
    width: 140,
    height: 130,
    marginLeft: "auto",
    marginRight: 5,
    borderRadius: 10,
    padding: 10,
    display: "flex",
    flexDirection: "column",
    color: "azure",
    justifyContent: "center",
    alignItems: "center",
  },
  cardState: {
    backgroundColor: "#f4f4f4",
    width: 150,
    height: 60,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  maincardState: {
    display: "flex",
    flexDirection: "row",
    marginTop: "auto",
    marginBottom: "auto",
  },
  cardBody: {
    backgroundColor: "#3b3b3b",
    width: "100%",
    height: 80,
    marginTop: 10,
    borderRadius: 10,
    padding: 19,
    display: "flex",
    flexDirection: "row",
  },

  headBtn: {
    marginTop: 12,
    width: "80%",
    marginLeft: "5%",
    color: "azure",
    backgroundColor: "transparent",
    padding: 5,
    borderWidth: 1,
    borderRadius: 4,
    fontSize: 18,
    color: "#002060",
    borderColor: "#fff",
    fontWeight: "500",
    textAlign: "center",
  },
});
