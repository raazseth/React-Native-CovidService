import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  ImageBackground,
  LogBox,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { isuserLoggedIn, login } from "../Actions/userActions";
import Icon from "react-native-vector-icons/FontAwesome5";

const Login = ({ navigation }) => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [Error, setError] = useState({ emailError: "", passwordError: "" });
  const [Greeting, setGreeting] = useState({ Fail: "", Success: "" });
  const [ShowPass, setShowPass] = useState(false);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (auth.authenticate) {
  //     dispatch(isuserLoggedIn());
  //   }
  // }, []);

  const userLogin = () => {
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
          setGreeting({ ...Greeting, Success: "Logged In Sucessfully" });
          console.log(res);
        })
        .catch((error) =>
          setGreeting({
            ...Greeting,
            Fail: error.response.data.message,
          })
        );
    }
  };
  if (auth.authenticate) {
    return navigation.navigate("Home");
  }

  return (
    <View style={{ backgroundColor: "#1c334e", height: "100%" }}>
      <ScrollView
        vertical={true}
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.mainHome}>
          <Text style={styles.headTxt1}>Login Your Account</Text>
          <Text style={styles.headTxt2}>Wear Mask, Save Lives</Text>
          <View>
            <TextInput
              style={styles.inputMobile}
              onChangeText={(text) => setemail(text)}
              value={email}
              placeholder="Enter Your Email"
              textContentType="emailAddress"
            />
            {Error.emailError ? (
              <Text style={{ marginLeft: 20, color: "red" }}>
                {Error.emailError}
              </Text>
            ) : null}
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <TextInput
                style={styles.inputMobile}
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
                    marginTop: "8%",
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
            {Error.passwordError ? (
              <Text style={{ marginLeft: 20, color: "red" }}>
                {Error.passwordError}
              </Text>
            ) : null}
          </View>
          {Greeting.Fail ? (
            <Text style={{ marginLeft: 20, color: "red" }}>
              {Greeting.Fail}
            </Text>
          ) : null}
          <TouchableOpacity>
            <Text style={styles.LoginBtn} onPress={() => userLogin()}>
              Login
            </Text>
          </TouchableOpacity>
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
      </ScrollView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  mainHome: {
    paddingTop: 25,
    paddingBottom: 40,
    paddingLeft: 8,
    paddingRight: 8,
    backgroundColor: "white",
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 12,
    marginTop: "28%",
  },
  headTxt1: {
    fontSize: 28,
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "RobotoBold",
    color: "#333",
  },
  headTxt2: {
    fontSize: 20,
    textAlign: "center",
    fontFamily: "RobotoBold",
    color: "black",
    marginBottom: 5,
  },
  inputMobile: {
    width: "90%",
    marginLeft: "5%",
    marginRight: "5%",
    padding: 10,
    borderRadius: 8,
    marginTop: "2%",
    fontSize: 20,
    borderWidth: 0,
    marginBottom: 5,
    backgroundColor: "white",
    borderBottomWidth: 0.5,
    borderBottomColor: "#b2b4b4",
    flex: 1,
  },
  LoginBtn: {
    marginTop: 15,
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
