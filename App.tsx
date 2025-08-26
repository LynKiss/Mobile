import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import HomeScreen from "./app/home";
import DetailScreen from "./app/detail";
import AboutScreen from "./app/about";
import { OPENSAN_REGULAR } from "./untils/const";

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

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
  const Stack = createNativeStackNavigator<RootStackParamList>();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Trang chủ" }}
        />
        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={{ title: "Chi tiết" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
