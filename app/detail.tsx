import { globalStyles } from "../untils/const";
import { Button, StyleSheet, Text, View } from "react-native";
import {
  NavigationProp,
  RouteProp,
  useNavigation,
} from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { use } from "react";

const styles = StyleSheet.create({
  review: {
    fontSize: 20,
    fontFamily: globalStyles.globalFont.fontFamily,
  },
  reviewText: {
    fontSize: 25,
    fontFamily: globalStyles.globalFont.fontFamily,
    padding: 15,
  },
});

const DetailScreen = () => {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  const route: RouteProp<RootStackParamList, "Detail"> = useRoute();
  const { id, title, start } = route.params;

  return (
    <View>
      <Text style={styles.review}>Detail Screen</Text>
      <Text style={styles.reviewText}>ID :{route.params?.id}</Text>
      <Text style={styles.reviewText}> Title :{route.params?.title}</Text>
      <Text style={styles.reviewText}>Start :{route.params?.start}</Text>

      <Button
        title="Go Home"
        onPress={() => {
          navigation.navigate("Home");
        }}
      />
    </View>
  );
};

export default DetailScreen;
