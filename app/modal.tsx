import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
  Alert,
  TextInput,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useState } from "react";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 50,
  },
  header: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 15,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  groupInput: {
    marginBottom: 15,
  },
  text: {
    fontSize: 20,
    fontWeight: "400",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    marginVertical: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});
interface IProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  addNew: any;
}
const CreateModal = (props: IProps) => {
  const { modalVisible, setModalVisible, addNew } = props;
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState(0);
  function randomInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  const handleSubmit = () => {
    if (!title || !rating) {
      Alert.alert("Error", "Thông tin không được để trống");
      return;
    }
    console.log("Title:", title);
    addNew({ id: randomInteger(1, 1000), title, start: rating });
    setModalVisible(false);
    setTitle("");
    setRating(0);
  };
  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          {/* {Header} */}
          <View style={styles.header}>
            <Text style={{ fontSize: 25 }}>Create a review</Text>
            <AntDesign
              onPress={() => {
                setModalVisible(false);
                setTitle("");
                setRating(0);
              }}
              name="close"
              size={24}
              color="black"
            />
          </View>
          {/* {Form} */}
          <View>
            <View style={styles.groupInput}>
              <Text style={styles.text}>Nội dung</Text>
              <TextInput
                value={title}
                onChangeText={(v) => setTitle(v)}
                style={styles.input}
              />

              <Text style={styles.text}>Rating</Text>
              <TextInput
                keyboardType="numeric"
                value={rating.toString()}
                onChangeText={(text) => setRating(Number(text))}
                style={styles.input}
              />
            </View>
          </View>
          {/* {Footer} */}
          <View style={{ marginTop: 20 }}>
            <Button title="Add" onPress={handleSubmit} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
export default CreateModal;
