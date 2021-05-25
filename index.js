// import { registerRootComponent } from 'expo';

// import App from './App';

// // registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// // It also ensures that whether you load the app in the Expo client or in a native build,
// // the environment is set up appropriately
// registerRootComponent(App);

import { AppRegistry } from "react-native";
import { Provider } from "react-redux";
import React from "react";
import App from "./App";
import { persistor, Store } from "./Store";
import { PersistGate } from "redux-persist/integration/react";

// const store = Store;

const RNRedux = () => (
  <Provider store={Store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);

AppRegistry.registerComponent("main", () => RNRedux);
