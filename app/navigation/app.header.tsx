import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { globalStyles } from "../../untils/const";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../types/route";

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    paddingTop: 50,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
  },
  menuButton: {
    padding: 8,
  },
  headerText: {
    flex: 1,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  cartButton: {
    padding: 8,
  },
});

const AppHeader = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.cartButton}
        onPress={() => navigation.navigate("Cart")}
      >
        <AntDesign name="shoppingcart" size={24} color="#333" />
      </TouchableOpacity>
      <Text style={[styles.headerText, globalStyles.globalFont]}>Lyn Shop</Text>
      <View style={styles.cartButton} />
    </View>
  );
};

export default AppHeader;
