import { NavigationContainer } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import "react-native-gesture-handler";
import AppNavigation from "./app/navigation/app.navigation";
import { navigationRef } from "./app/contexts/AuthContext";
import { ThemeProvider } from "./app/contexts/ThemeContext";
import { NotificationProvider } from "./app/contexts/NotificationContext";
import AppWrapper from "./app/components/AppWrapper";

function App() {
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    // Simple app initialization without font loading
    setAppReady(true);
  }, []);

  if (!appReady) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <ThemeProvider>
          <NotificationProvider>
            <NavigationContainer ref={navigationRef}>
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
