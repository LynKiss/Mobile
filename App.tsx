import { NavigationContainer } from "@react-navigation/native";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { OPENSAN_REGULAR } from "./untils/const";
import "react-native-gesture-handler";
import AppNavigation from "./app/navigation/app.navigation";
import { ThemeProvider } from "./app/contexts/ThemeContext";
import { NotificationProvider } from "./app/contexts/NotificationContext";
import AppWrapper from "./app/components/AppWrapper";

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
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <ThemeProvider>
          <NotificationProvider>
            <NavigationContainer>
              <AppWrapper>
                <AppNavigation />
              </AppWrapper>
            </NavigationContainer>
          </NotificationProvider>
        </ThemeProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default App;
