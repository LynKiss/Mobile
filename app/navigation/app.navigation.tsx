import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../home";
import AboutScreen from "../about";
import DetailScreen from "../detail";
import AppHeader from "./app.header";
const HomeLayout = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ header: () => <AppHeader /> }}
      />
      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        options={{ title: "Chi tiết" }}
      />
    </Stack.Navigator>
  );
};

const AppNavigation = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="HomeLayout"
        component={HomeLayout}
        options={{ title: "Trang chủ", header: () => <></> }}
      />

      <Drawer.Screen
        name="About"
        component={AboutScreen}
        options={{ title: "Giới thiệu", header: () => <AppHeader /> }}
      />
    </Drawer.Navigator>
  );
};
export default AppNavigation;
