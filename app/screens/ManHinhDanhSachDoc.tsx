import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  Modal,
} from "react-native";

interface ReadingList {
  id: string;
  name: string;
  description: string;
  bookCount: number;
  createdDate: string;
}

const ManHinhDanhSachDoc = ({ navigation }: any) => {
  const [readingLists, setReadingLists] = useState<ReadingList[]>([
    {
      id: "1",
      name: "Sách ôn thi đại học",
      description: "Tập hợp sách để ôn thi các môn học",
      bookCount: 15,
      createdDate: "2024-04-01",
    },
    {
      id: "2",
      name: "Sách kỹ năng sống",
      description: "Những cuốn sách giúp phát triển bản thân",
      bookCount: 8,
      createdDate: "2024-03-15",
    },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [newListName, setNewListName] = useState("");
  const [newListDescription, setNewListDescription] = useState("");

  // Hàm tạo danh sách đọc mới
  const createNewList = () => {
    if (newListName.trim() === "") {
      Alert.alert("Lỗi", "Vui lòng nhập tên danh sách");
      return;
    }

    const newList: ReadingList = {
      id: Date.now().toString(),
      name: newListName.trim(),
      description: newListDescription.trim(),
      bookCount: 0,
      createdDate: new Date().toISOString().split("T")[0],
    };

    setReadingLists((prev) => [...prev, newList]);
    setNewListName("");
    setNewListDescription("");
    setModalVisible(false);
    Alert.alert("Thành công", "Đã tạo danh sách đọc mới!");
  };

  // Hàm xóa danh sách đọc
  const deleteList = (listId: string, listName: string) => {
    Alert.alert(
      "Xác nhận xóa",
      `Bạn có chắc chắn muốn xóa danh sách "${listName}"?`,
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Xóa",
          style: "destructive",
          onPress: () => {
            setReadingLists((prev) =>
              prev.filter((list) => list.id !== listId)
            );
            Alert.alert("Thông báo", "Đã xóa danh sách thành công");
          },
        },
      ]
    );
  };

  // Render từng danh sách đọc
  const renderReadingList = ({ item }: { item: ReadingList }) => (
    <View style={styles.listContainer}>
      <TouchableOpacity
        style={styles.listContent}
        onPress={() => {
          // Chuyển đến chi tiết danh sách
          Alert.alert("Thông báo", "Chức năng xem chi tiết sẽ được triển khai");
        }}
      >
        <View style={styles.listHeader}>
          <Text style={styles.listName}>{item.name}</Text>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => deleteList(item.id, item.name)}
          >
            <Text style={styles.deleteButtonText}>🗑️</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.listDescription}>{item.description}</Text>

        <View style={styles.listFooter}>
          <Text style={styles.bookCount}>{item.bookCount} cuốn sách</Text>
          <Text style={styles.createdDate}>Tạo: {item.createdDate}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Danh Sách Đọc</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.addButtonText}>+ Tạo mới</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={readingLists}
        renderItem={renderReadingList}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainerStyle}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Tạo Danh Sách Đọc Mới</Text>

            <TextInput
              style={styles.input}
              placeholder="Tên danh sách"
              value={newListName}
              onChangeText={setNewListName}
            />

            <TextInput
              style={styles.input}
              placeholder="Mô tả (tùy chọn)"
              value={newListDescription}
              onChangeText={setNewListDescription}
              multiline
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Hủy</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.createButton}
                onPress={createNewList}
              >
                <Text style={styles.createButtonText}>Tạo</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  addButton: {
    backgroundColor: "#007bff",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  listContainerStyle: {
    paddingBottom: 20,
  },
  listContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 10,
    overflow: "hidden",
  },
  listContent: {
    padding: 15,
  },
  listHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  listName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
  },
  deleteButton: {
    padding: 5,
  },
  deleteButtonText: {
    fontSize: 18,
  },
  listDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
    lineHeight: 20,
  },
  listFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bookCount: {
    fontSize: 14,
    color: "#007bff",
    fontWeight: "bold",
  },
  createdDate: {
    fontSize: 12,
    color: "#999",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
    width: "90%",
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 15,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancelButton: {
    backgroundColor: "#6c757d",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  createButton: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
    marginLeft: 10,
    alignItems: "center",
  },
  createButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default ManHinhDanhSachDoc;
