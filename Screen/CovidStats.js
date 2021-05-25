import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import IconIonic from "react-native-vector-icons/Ionicons";
import NumberFormat from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import { getIpAddress } from "../Actions/covidStatsAction";
import WHOAdvice from "../Data/WHOAdvice";

const CovidStats = () => {
  const covid = useSelector((state) => state.covid);
  const [WholeData, setWholeData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch("https://api.covid19india.org/data.json")
      .then((res) => res.json())
      .then((data) => setWholeData(data))
      .catch((error) => console.log(error));

    dispatch(getIpAddress());
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
        <View>
          <View style={styles.mainCovid}>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <Image
                source={require("../Assets/india.png")}
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
                India
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
                height: 76,
                borderRadius: 8,
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
                    New Cases
                  </Text>
                  <NumberFormat
                    renderText={(text) => (
                      <Text style={{ color: "azure", textAlign: "center" }}>
                        {text}
                      </Text>
                    )}
                    value={IndiaData[0].dailyconfirmed}
                    displayType={"text"}
                    thousandSeparator={true}
                    thousandsGroupStyle="lakh"
                  />
                </View>
                <View style={{ marginLeft: "auto", marginRight: "auto" }}>
                  <Text style={{ color: "#13c089", fontSize: 12 }}>
                    New Recovered
                  </Text>
                  <NumberFormat
                    renderText={(text) => (
                      <Text style={{ color: "azure", textAlign: "center" }}>
                        {text}
                      </Text>
                    )}
                    value={IndiaData[0].dailyrecovered}
                    displayType={"text"}
                    thousandSeparator={true}
                    thousandsGroupStyle="lakh"
                  />
                </View>
                <View style={{ marginLeft: "auto", marginRight: "auto" }}>
                  <Text style={{ color: "#c45251", fontSize: 12 }}>
                    New Deaths
                  </Text>
                  <Text style={{ color: "azure", textAlign: "center" }}>
                    <NumberFormat
                      renderText={(text) => (
                        <Text style={{ color: "azure", textAlign: "center" }}>
                          {text}
                        </Text>
                      )}
                      value={IndiaData[0].dailydeceased}
                      displayType={"text"}
                      thousandSeparator={true}
                      thousandsGroupStyle="lakh"
                    />
                  </Text>
                </View>
              </View>
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
                    Total Confirmed
                  </Text>
                  <NumberFormat
                    renderText={(text) => (
                      <Text style={{ color: "azure", textAlign: "center" }}>
                        {text}
                      </Text>
                    )}
                    value={IndiaData[0].totalconfirmed}
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
                    value={IndiaData[0].totalrecovered}
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
                    value={IndiaData[0].totaldeceased}
                    displayType={"text"}
                    thousandSeparator={true}
                    thousandsGroupStyle="lakh"
                  />
                </View>
              </View>
            </View>
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
                borderRadius: 8,
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
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: 5,
              marginBottom: 15,
              width: "100%",
              backgroundColor: "#ededed",
              padding: 8,
              borderRadius: 8,
            }}
          >
            <View
              style={{ display: "flex", flexDirection: "column", width: "40%" }}
            >
              <Text style={styles.headTxt2}>State/UT</Text>

              {WholeData && WholeData.statewise !== undefined
                ? WholeData.statewise.map((state, i) => (
                    <Text key={i} style={{ fontWeight: "bold", paddingTop: 4 }}>
                      {state.state.length > 20
                        ? state.state.substring(0, 20)
                        : state.state}
                    </Text>
                  ))
                : null}
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: "auto",
                width: "20%",
              }}
            >
              <Text style={[styles.headTxt2, { color: "#13c089" }]}>R</Text>
              {WholeData && WholeData.statewise !== undefined
                ? WholeData.statewise.map((state, i) => (
                    <View style={{ paddingTop: 4 }} key={i}>
                      <NumberFormat
                        renderText={(text) => <Text>{text}</Text>}
                        value={state.recovered}
                        displayType={"text"}
                        thousandSeparator={true}
                        thousandsGroupStyle="lakh"
                      />
                    </View>
                  ))
                : null}
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: "auto",
                width: "20%",
              }}
            >
              <Text style={[styles.headTxt2, { color: "#e59f30" }]}>A</Text>
              {WholeData && WholeData.statewise !== undefined
                ? WholeData.statewise.map((state, i) => (
                    <View style={{ paddingTop: 4 }} key={i}>
                      <NumberFormat
                        renderText={(text) => <Text>{text}</Text>}
                        value={state.active}
                        displayType={"text"}
                        thousandSeparator={true}
                        thousandsGroupStyle="lakh"
                      />
                    </View>
                  ))
                : null}
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: "auto",
                width: "15%",
              }}
            >
              <Text style={[styles.headTxt2, { color: "#c45251" }]}>D</Text>
              {WholeData && WholeData.statewise !== undefined
                ? WholeData.statewise.map((state, i) => (
                    <View style={{ paddingTop: 4 }} key={i}>
                      <NumberFormat
                        renderText={(text) => <Text>{text}</Text>}
                        value={state.deaths}
                        displayType={"text"}
                        thousandSeparator={true}
                        thousandsGroupStyle="lakh"
                      />
                    </View>
                  ))
                : null}
            </View>
          </View>
          <View style={{ marginBottom: "20%" }}>
            <Text style={styles.headTxt2}>Advice From WHO</Text>
            {WHOAdvice.map((advice, i) => (
              <View
                key={i}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
              >
                <Image
                  source={advice.img}
                  style={{
                    width: 325,
                    height: 330,
                    margin: 5,
                    borderRadius: 6,
                  }}
                />
              </View>
            ))}
            <TouchableOpacity>
              <Text
                onPress={() =>
                  Linking.openURL(
                    "https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public"
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

export default CovidStats;

const styles = StyleSheet.create({
  mainNews: {
    padding: 14,
  },
  mainCovid: {
    padding: 14,
    backgroundColor: "#050710",
    borderRadius: 8,
    marginBottom: 10,
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
    fontSize: 16,
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
    width: "98.5%",
    color: "azure",
    backgroundColor: "#2596be",
    padding: 10,
    borderWidth: 1,
    borderRadius: 4,
    fontSize: 18,
    borderColor: "#2596be",
    fontWeight: "500",
    textAlign: "center",
    marginLeft: "auto",
    marginRight: "auto",
  },
});
