import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  LogBox,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { isuserLoggedIn } from "../Actions/userActions";
import DropDownPicker from "react-native-dropdown-picker";
import Icon from "react-native-vector-icons/FontAwesome5";

const Register = ({ navigation }) => {
  const auth = useSelector((state) => state.auth);
  const [email, setemail] = useState("");
  const [name, setname] = useState("");
  const [password, setpassword] = useState("");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "I am Looking for Plasma", value: "patient" },
    { label: "I want to donate Plasma", value: "donor" },
    {
      label: "We are Organizaton & We want to list as blood bank",
      value: "donororganizaton",
    },
    { label: "I am just a user", value: "User" },
  ]);
  const [role, setrole] = useState("");
  const [ShowPass, setShowPass] = useState(false);
  const [Loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [Greeting, setGreeting] = useState({ Fail: "", Success: "" });
  const [Error, setError] = useState({
    emailError: "",
    nameError: "",
    passwordError: "",
    roleError: "",
  });

  LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);

  const handleChange = (event) => {
    setrole(event.target.value);
  };

  const registerNow = () => {
    const user = {
      name: name,
      email: email,
      password: password,
      role: value,
    };

    if (role === "") {
      setError({ ...Error, roleError: "Role is required" });
    } else if (email === "") {
      setError({ ...Error, emailError: "Email is required" });
    } else if (name === "") {
      setError({ ...Error, nameError: "Name is required" });
    } else if (password === "") {
      setError({ ...Error, passwordError: "Password is required" });
    } else if (password.length < 6) {
      setError({
        ...Error,
        passwordLengthError: "Password must be longer than 6 characters",
      });
    } else {
      setLoading(true);
      setTimeout(() => {
        dispatch(signup(user))
          .then((res) =>
            setGreeting({ ...Greeting, Success: "Logged In Sucessfully" })
          )
          .catch((error) =>
            setGreeting({
              ...Greeting,
              Fail: error.response.data.message,
            })
          );
        setLoading(false);
      }, 1000);
    }
  };

  //   //   const CheckingUser = () => {
  //   //     if (auth.authenticate && role === "donor") {
  //   //       navigation.navigate("/postasdonor");
  //   //     } else if (auth.authenticate && role === "patient") {
  //   //       navigation.navigate("/postaspatient");
  //   //     } else if (auth.authenticate && role === "donororganizaton") {
  //   //       navigation.navigate("/postasdonor");
  //   //     } else if (auth.authenticate) {
  //   //       navigation.navigate("/");
  //   //     }
  //   //   };
  //   //   CheckingUser();

  return (
    <View style={{ backgroundColor: "#1c334e", height: "100%" }}>
      <ScrollView
        vertical={true}
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.mainHome}>
          <Text style={styles.headTxt1}>Create Account</Text>
          <Text style={styles.headTxt2}>Wear Mask, Save Lives</Text>
          <View>
            <TextInput
              style={styles.inputMobile}
              onChangeText={(text) => setname(text)}
              value={name}
              placeholder="Enter Your Name"
              textContentType="name"
            />
            <TextInput
              style={styles.inputMobile}
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
                style={styles.inputMobile}
                onChangeText={(text) => setpassword(text)}
                value={password}
                placeholder="Enter Your Password"
                secureTextEntry={ShowPass?false:true}
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
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              style={styles.inputMobile}
              setValue={setValue}
              setItems={setItems}
              dropDownDirection="TOP"
              dropDownContainerStyle={{
                backgroundColor: "#eeecef",
                width: "90%",
                marginLeft: "5%",
                marginRight: "5%",
                marginBottom: 10,
                borderWidth: 0,
              }}
            />
          </View>
          <TouchableOpacity>
            <Text style={styles.LoginBtn} onPress={() => registerNow()}>
              Register
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text
              style={styles.RegisterBtn}
              onPress={() => navigation.navigate("Login")}
            >
              Already A User?{" "}
              <Text style={{ color: "#536DFE" }}>Login Now</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Register;

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
    marginTop: "15%",
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
