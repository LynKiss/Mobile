import { NavigationContainer } from "@react-navigation/native";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { OPENSAN_REGULAR } from "./untils/const";
import "react-native-gesture-handler";
import AppNavigation from "./app/navigation/app.navigation";

SplashScreen.preventAutoHideAsync();

function App() {
  const [loaded, error] = useFonts({
    [OPENSAN_REGULAR]: require("./assets/fonts/OpenSans-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default App;
