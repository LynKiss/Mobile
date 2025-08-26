import { StyleSheet, View, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { globalStyles } from "../../untils/const";
import { NavigationProp, useNavigation } from "@react-navigation/native";

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f8f8f8",
    paddingHorizontal: 5,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#eee",
  },
  headerText: {
    marginLeft: 10,
    flex: 1,
    textAlign: "center",
    fontSize: 25,
    fontWeight: "600",
  },
});

const AppHeader = () => {
  const navigation: any = useNavigation();
  return (
    <View style={styles.header}>
      <Ionicons
        name="menu"
        size={40}
        color="black"
        onPress={() => {
          navigation.openDrawer();
        }}
      />
      <Text style={[styles.headerText, globalStyles.globalFont]}>
        App Header
      </Text>
    </View>
  );
};

export default AppHeader;
