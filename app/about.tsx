import { globalStyles } from "../untils/const";
import { StyleSheet, Text, View } from "react-native";
const styles = StyleSheet.create({
  about: {
    fontSize: 30,
  },
});
const AboutScreen = () => {
  return (
    <View>
      <Text style={[styles.about, globalStyles.globalFont]}>About Screen</Text>
    </View>
  );
};

export default AboutScreen;
