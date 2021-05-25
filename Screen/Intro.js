import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  Linking,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { isuserLoggedIn, login, logout } from "../Actions/userActions";
import Icon from "react-native-vector-icons/FontAwesome5";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Intro = ({ navigation }) => {
  const auth = useSelector((state) => state.auth);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [Error, setError] = useState({ emailError: "", passwordError: "" });
  const [Greeting, setGreeting] = useState({ Fail: "", Success: "" });
  const [ShowPass, setShowPass] = useState(false);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (!auth.authenticate) {
  //     dispatch(isuserLoggedIn());
  //   }
  // }, []);

  const userLogin = (e) => {
    const user = {
      email,
      password,
    };
    if (email === "") {
      setError({ ...Error, emailError: "Enter Your Registered Email" });
    } else if (password === "") {
      setError({ ...Error, passwordError: "Enter Your Registered Passowrd" });
    } else {
      dispatch(login(user))
        .then((res) => {
          setGreeting({ ...Greeting, Success: "Logged In Sucessfully" }),
            console.log(res);
        })
        .catch((error) =>
          // setGreeting({
          //   ...Greeting,
          //   Fail: error.response.data.message,
          // })
          console.log(error)
        );
    }
  };

  if (auth.authenticate) {
    navigation.navigate("Home");
  }

  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("user");
      if (value !== null) {
        return value;
      }
    } catch (error) {
    }
  };

  console.log(retrieveData())
  console.log(auth.user)
  console.log(auth.token)

  function LogoutUser() {
    dispatch(logout());
  }
  return (
    <View style={{ backgroundColor: "white", height: "100%" }}>
      <ScrollView
        vertical={true}
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.mainHome}>
          <Text
            onPress={() => navigation.navigate("Home")}
            style={{
              textAlign: "right",
              marginRight: 10,
              marginTop: -10,
              fontSize: 20,
              backgroundColor: "white",
            }}
          >
            Skip
          </Text>
          <Image
            source={require("../Assets/Figth.png")}
            style={{
              height: 320,
              width: 350,
              marginTop: 5,
              alignItems: "center",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          />
          <Text
            style={styles.headTxt1}
            onPress={()=>LogoutUser()}
          >
            Wear Mask, Save Lives
          </Text>
          <Text style={{ textAlign: "center" }}>
            Check your nearest vaccination center and slots availability{" "}
            <Text
              style={{ color: "blue" }}
              onPress={() => Linking.openURL("https://www.cowin.gov.in/home")}
            >
              www.COWIN.GOV.in
            </Text>
          </Text>
          <TextInput
            style={
              Error.emailError
                ? [styles.inputMobile, { borderColor: "red" }]
                : styles.inputMobile
            }
            onChangeText={(text) => setemail(text)}
            value={email}
            placeholder="Enter Your Email"
            textContentType="emailAddress"
          />
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <TextInput
              style={
                Error.passwordError
                  ? [styles.inputMobile, { borderColor: "red" }]
                  : styles.inputMobile
              }
              onChangeText={(text) => setpassword(text)}
              value={password}
              placeholder="Enter Your Password"
              secureTextEntry={ShowPass ? false : true}
              underlineColorAndroid="transparent"
            />
            {!ShowPass ? (
              <Icon
                style={styles.searchIcon}
                name="eye"
                style={{
                  marginTop: "6%",
                  marginRight: "5%",
                  position: "absolute",
                  right: 0,
                }}
                size={20}
                color="#000"
                onPress={() => setShowPass(!ShowPass)}
              />
            ) : (
              <Icon
                style={styles.searchIcon}
                name="eye-slash"
                style={{
                  marginTop: "8%",
                  marginRight: "5%",
                  position: "absolute",
                  right: 0,
                }}
                size={20}
                color="#000"
                onPress={() => setShowPass(!ShowPass)}
              />
            )}
          </View>
          <View>
            <TouchableOpacity>
              <Text
                style={styles.forgetPassword}
                onPress={() => navigation.navigate("ForgetPassword")}
              >
                Forget Password?
              </Text>
            </TouchableOpacity>
          </View>
          {Greeting.Fail ? (
            <Text style={{ marginLeft: 17, color: "red" }}>
              {Greeting.Fail}
            </Text>
          ) : null}
          <TouchableOpacity>
            <Text style={styles.LoginBtn} onPress={() => userLogin()}>
              Login
            </Text>
          </TouchableOpacity>
          <View>
            <TouchableOpacity>
              <Text
                style={styles.RegisterBtn}
                onPress={() => navigation.navigate("Register")}
              >
                New user?{" "}
                <Text style={{ color: "#536DFE" }}>Create an account</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Intro;

const styles = StyleSheet.create({
  mainHome: {
    paddingTop: 25,
    paddingBottom: 40,
    paddingLeft: 8,
    paddingRight: 8,
    backgroundColor: "white",
  },
  menuIcon: {
    paddingBottom: 5,
    paddingLeft: 15,
    paddingRight: 8,
    fontSize: 34,
  },
  headTxt1: {
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "RobotoBold",
  },
  headTxt2: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: "normal",
    fontFamily: "RobotoRegular",
  },
  inputMobile: {
    width: "90%",
    marginLeft: "5%",
    marginRight: "5%",
    padding: 10,
    borderRadius: 8,
    marginTop: "2%",
    fontSize: 20,
    marginBottom: 5,
    backgroundColor: "white",
    flex: 1,
    borderWidth: 0.5,
    borderColor: "#b2b4b4",
  },
  LoginBtn: {
    marginTop: 10,
    width: "90%",
    marginLeft: "5%",
    marginRight: "5%",
    color: "azure",
    backgroundColor: "#544cf3",
    padding: 13,
    borderWidth: 1,
    borderRadius: 8,
    fontSize: 18,
    borderColor: "#6B81FF",
    fontWeight: "500",
    textAlign: "center",
  },
  forgetPassword: {
    color: "#434343",
    width: "95%",
    marginLeft: "auto",
  },
  RegisterBtn: {
    marginTop: 15,
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    color: "#4F4F4F",
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
    flexDirection: "column",
    display: "flex",
  },
});
