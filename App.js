import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Home from "./Screen/Home";
import Intro from "./Screen/Intro";
import Register from "./Screen/Register";
import Login from "./Screen/Login";
import Oxygens from "./Screen/Oxygens";
import Patients from "./Screen/Patients";
import Donors from "./Screen/Donors";
import CovidStats from "./Screen/CovidStats";
import News from "./Screen/News";
import { useEffect } from "react";
import { isuserLoggedIn } from "./Actions/userActions";
import Fungus from "./Screen/Fungus";
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.authenticate) {
      dispatch(isuserLoggedIn());
    }
  }, [auth.authenticate]);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          {auth.authenticate ? (
            <>
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="CovidStats" component={CovidStats} />
              <Stack.Screen name="News" component={News} />
              <Stack.Screen name="Fungus" component={Fungus} />
              <Stack.Screen name="Oxygens" component={Oxygens} />
              <Stack.Screen name="Patients" component={Patients} />
              <Stack.Screen name="Donors" component={Donors} />
            </>
          ) : (
            <>
              <Stack.Screen name="Intro" component={Intro} />
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="News" component={News} />
              <Stack.Screen name="Register" component={Register} />
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Oxygens" component={Oxygens} />
              <Stack.Screen name="Patients" component={Patients} />
              <Stack.Screen name="Donors" component={Donors} />
              <Stack.Screen name="CovidStats" component={CovidStats} />
              <Stack.Screen name="Fungus" component={Fungus} />
            </>
          )}
        </Stack.Navigator>
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="News" component={News} />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
