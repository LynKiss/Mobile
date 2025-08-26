import { useState } from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import App from "../App";
import AppHeader from "./navigation/app.header";
import CreateModal from "./modal";
import AntDesign from "@expo/vector-icons/AntDesign";

interface IReview {
  id: number;
  title: string;
  start: number;
}
const styles = StyleSheet.create({
  reviewItem: {
    padding: 15,
    backgroundColor: "#ccc",
    margin: 15,
  },
});
const HomeScreen = (props: any) => {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  const [reviews, setReviews] = useState<IReview[]>([
    {
      id: 1,
      title: "Review 1",
      start: 5,
    },
    {
      id: 2,
      title: "Review 2",
      start: 2,
    },
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const addNew = (item: IReview) => {
    setReviews([...reviews, item]); // review đang có và item mới
  };
  return (
    <View>
      <Text style={{ fontSize: 30 }}>Review List</Text>
      <View style={{ alignItems: "center" }}>
        <AntDesign
          onPress={() => {
            setModalVisible(true);
          }}
          name="plussquareo"
          size={40}
          color="black"
        />
      </View>

      <View>
        <FlatList
          data={reviews}
          keyExtractor={(item) => item.id + ""}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate("Detail", item)}
              >
                <View style={styles.reviewItem}>
                  <Text style={{ fontWeight: "bold" }}>{item.title}</Text>
                  <Text>{item.start}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <CreateModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        addNew={addNew}
      />
    </View>
  );
};

export default HomeScreen;
