import React from "react";
import { StatusBar, setStatusBarBackgroundColor } from "expo-status-bar";

import { NavigationContainer } from "@react-navigation/native";
import Routes from "@/routes";

const App = () => {
  setStatusBarBackgroundColor('#3361FF',false);
  return (
      <NavigationContainer>
        <StatusBar backgroundColor="#fff"/>
        <Routes/>
      </NavigationContainer>
  );
}
export default App;
