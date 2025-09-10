import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";

const Stack = createNativeStackNavigator();

// Stack navigator cho các màn hình xác thực (đăng nhập, đăng ký, quên mật khẩu)
const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false, // Ẩn header mặc định để tùy chỉnh giao diện
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
