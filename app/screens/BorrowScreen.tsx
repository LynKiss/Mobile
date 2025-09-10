import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
  Image,
} from "react-native";
import { useBooks } from "../navigation/BookContext";
import { useTheme } from "../contexts/ThemeContext";

const BorrowScreen = ({ navigation }: any) => {
  const [activeTab, setActiveTab] = useState("current"); // "current" hoặc "history"
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedBook, setSelectedBook] = useState<any>(null);
  const { borrowedBooks, extendBook, returnBook } = useBooks();
  const { theme } = useTheme();

  // Lọc sách đang mượn và lịch sử
  const currentBorrowedBooks = borrowedBooks.filter(
    (book) => book.status === "active"
  );
  const borrowHistory = borrowedBooks.filter(
    (book) => book.status !== "active"
  );

  // Hàm tính số ngày còn lại
  const calculateDaysLeft = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Hàm format ngày
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN");
  };

  const handleRenew = async (borrowId: string, bookTitle: string) => {
    const borrowedBook = borrowedBooks.find((b) => b.id === borrowId);
    if (borrowedBook && borrowedBook.extended) {
      Alert.alert("Thông báo", "Sách này đã được gia hạn một lần rồi!");
      return;
    }

    Alert.alert(
      "Xác nhận gia hạn",
      `Bạn có muốn gia hạn sách "${bookTitle}" không?`,
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Gia hạn",
          onPress: async () => {
            try {
              const success = await extendBook(borrowId);
              if (success) {
                Alert.alert("Thành công", "Đã gia hạn sách thành công!");
              } else {
                Alert.alert("Lỗi", "Không thể gia hạn sách. Vui lòng thử lại.");
              }
            } catch (error) {
              Alert.alert("Lỗi", "Đã xảy ra lỗi khi gia hạn sách.");
            }
          },
        },
      ]
    );
  };

  const handleReturn = async (borrowId: string, bookTitle: string) => {
    Alert.alert(
      "Xác nhận trả sách",
      `Bạn có muốn trả sách "${bookTitle}" không?`,
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Trả sách",
          onPress: async () => {
            try {
              const success = await returnBook(borrowId);
              if (success) {
                Alert.alert("Thành công", "Đã trả sách thành công!");
              } else {
                Alert.alert("Lỗi", "Không thể trả sách. Vui lòng thử lại.");
              }
            } catch (error) {
              Alert.alert("Lỗi", "Đã xảy ra lỗi khi trả sách.");
            }
          },
        },
      ]
    );
  };

  const openBookModal = (book: any) => {
    setSelectedBook(book);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedBook(null);
  };

  const renderCurrentBook = ({ item }: any) => {
    const daysLeft = calculateDaysLeft(item.dueDate);
    const isOverdue = daysLeft < 0;
    const canRenew = !item.extended && !isOverdue;

    return (
      <TouchableOpacity
        style={[
          styles.bookCard,
          { backgroundColor: theme.colors.surface },
          isOverdue && styles.overdueCard,
        ]}
        onPress={() => openBookModal(item)}
      >
        <View style={styles.bookContent}>
          <Image source={item.book.image} style={styles.bookImage} />
          <View style={styles.bookInfo}>
            <Text style={[styles.bookTitle, { color: theme.colors.text }]}>
              {item.book.title}
            </Text>
            <Text
              style={[styles.bookAuthor, { color: theme.colors.textSecondary }]}
            >
              {item.book.author}
            </Text>
            <Text
              style={[
                styles.bookDetailsText,
                { color: theme.colors.textSecondary },
              ]}
            >
              {item.book.publisher} • {item.book.year}
            </Text>
            <View
              style={[styles.statusBadge, isOverdue && styles.overdueBadge]}
            >
              <Text
                style={[styles.statusText, isOverdue && styles.overdueText]}
              >
                {isOverdue ? "Quá hạn" : "Đang mượn"}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.bookDetails}>
          <Text
            style={[styles.detailText, { color: theme.colors.textSecondary }]}
          >
            Ngày mượn: {formatDate(item.borrowDate)}
          </Text>
          <Text
            style={[
              styles.detailText,
              isOverdue && styles.overdueDetail,
              { color: theme.colors.textSecondary },
            ]}
          >
            Hạn trả: {formatDate(item.dueDate)}
            {isOverdue
              ? ` (Quá hạn ${Math.abs(daysLeft)} ngày)`
              : ` (Còn ${daysLeft} ngày)`}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderHistoryBook = ({ item }: any) => {
    const isOverdue = item.status === "overdue_returned";

    return (
      <TouchableOpacity
        style={[styles.historyCard, { backgroundColor: theme.colors.surface }]}
        onPress={() => openBookModal(item)}
      >
        <View style={styles.bookContent}>
          <Image source={item.book.image} style={styles.bookImage} />
          <View style={styles.bookInfo}>
            <Text style={[styles.bookTitle, { color: theme.colors.text }]}>
              {item.book.title}
            </Text>
            <Text
              style={[styles.bookAuthor, { color: theme.colors.textSecondary }]}
            >
              {item.book.author}
            </Text>
            <Text
              style={[
                styles.bookDetailsText,
                { color: theme.colors.textSecondary },
              ]}
            >
              {item.book.publisher} • {item.book.year}
            </Text>
            <View
              style={[styles.statusBadge, isOverdue && styles.overdueBadge]}
            >
              <Text
                style={[styles.statusText, isOverdue && styles.overdueText]}
              >
                {isOverdue ? "Trả muộn" : "Đã trả"}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.bookDetails}>
          <Text
            style={[styles.detailText, { color: theme.colors.textSecondary }]}
          >
            Ngày mượn: {formatDate(item.borrowDate)}
          </Text>
          <Text
            style={[styles.detailText, { color: theme.colors.textSecondary }]}
          >
            Ngày trả: {formatDate(item.returnDate)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      {/* Tab selector */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === "current" && [
              styles.activeTab,
              { borderBottomColor: theme.colors.primary },
            ],
          ]}
          onPress={() => setActiveTab("current")}
        >
          <Text
            style={[
              styles.tabText,
              { color: theme.colors.textSecondary },
              activeTab === "current" && [
                styles.activeTabText,
                { color: theme.colors.primary },
              ],
            ]}
          >
            Đang mượn ({currentBorrowedBooks.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === "history" && [
              styles.activeTab,
              { borderBottomColor: theme.colors.primary },
            ],
          ]}
          onPress={() => setActiveTab("history")}
        >
          <Text
            style={[
              styles.tabText,
              { color: theme.colors.textSecondary },
              activeTab === "history" && [
                styles.activeTabText,
                { color: theme.colors.primary },
              ],
            ]}
          >
            Lịch sử
          </Text>
        </TouchableOpacity>
      </View>

      {/* Modal for book details */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalContent,
              { backgroundColor: theme.colors.background },
            ]}
          >
            {selectedBook && (
              <>
                <Image
                  source={selectedBook.book.image}
                  style={styles.modalImage}
                />
                <Text style={[styles.modalTitle, { color: theme.colors.text }]}>
                  {selectedBook.book.title}
                </Text>
                <Text
                  style={[
                    styles.modalAuthor,
                    { color: theme.colors.textSecondary },
                  ]}
                >
                  {selectedBook.book.author}
                </Text>
                <Text
                  style={[
                    styles.modalDetails,
                    { color: theme.colors.textSecondary },
                  ]}
                >
                  Nhà xuất bản: {selectedBook.book.publisher}
                </Text>
                <Text
                  style={[
                    styles.modalDetails,
                    { color: theme.colors.textSecondary },
                  ]}
                >
                  Năm xuất bản: {selectedBook.book.year}
                </Text>
                <Text
                  style={[
                    styles.modalDetails,
                    { color: theme.colors.textSecondary },
                  ]}
                >
                  Ngày mượn: {formatDate(selectedBook.borrowDate)}
                </Text>
                <Text
                  style={[
                    styles.modalDetails,
                    { color: theme.colors.textSecondary },
                  ]}
                >
                  Hạn trả: {formatDate(selectedBook.dueDate)}
                </Text>
                {selectedBook.status === "active" && (
                  <View style={styles.modalButtons}>
                    <TouchableOpacity
                      style={[
                        styles.modalButton,
                        { backgroundColor: theme.colors.primary },
                      ]}
                      onPress={() => {
                        handleRenew(selectedBook.id, selectedBook.book.title);
                        closeModal();
                      }}
                    >
                      <Text
                        style={[
                          styles.modalButtonText,
                          { color: theme.colors.surface },
                        ]}
                      >
                        Gia hạn sách
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.modalButton,
                        { backgroundColor: "#dc3545" },
                      ]}
                      onPress={() => {
                        handleReturn(selectedBook.id, selectedBook.book.title);
                        closeModal();
                      }}
                    >
                      <Text style={[styles.modalButtonText, { color: "#fff" }]}>
                        Trả sách
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={closeModal}
                >
                  <Text
                    style={[
                      styles.closeButtonText,
                      { color: theme.colors.text },
                    ]}
                  >
                    Đóng
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* Content */}
      {activeTab === "current" ? (
        <FlatList
          data={currentBorrowedBooks}
          keyExtractor={(item) => item.id}
          renderItem={renderCurrentBook}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={[styles.emptyText, { color: theme.colors.text }]}>
                Bạn chưa mượn sách nào
              </Text>
              <TouchableOpacity
                style={[
                  styles.browseButton,
                  { backgroundColor: theme.colors.primary },
                ]}
                onPress={() => navigation.navigate("Search")}
              >
                <Text
                  style={[
                    styles.browseButtonText,
                    { color: theme.colors.surface },
                  ]}
                >
                  Tìm sách để mượn
                </Text>
              </TouchableOpacity>
            </View>
          }
        />
      ) : (
        <FlatList
          data={borrowHistory}
          keyExtractor={(item) => item.id}
          renderItem={renderHistoryBook}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={[styles.emptyText, { color: theme.colors.text }]}>
                Chưa có lịch sử mượn trả
              </Text>
            </View>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#fff",
  },
  tabContainer: {
    flexDirection: "row",
    marginBottom: 15,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderBottomColor: "#ddd",
    alignItems: "center",
  },
  activeTab: {
    borderBottomColor: "#007bff",
  },
  tabText: {
    fontSize: 16,
    color: "#666",
  },
  activeTabText: {
    color: "#007bff",
    fontWeight: "bold",
  },
  bookCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bookContent: {
    flexDirection: "row",
    marginBottom: 10,
  },
  bookImage: {
    width: 60,
    height: 80,
    borderRadius: 4,
    marginRight: 15,
  },
  bookDetailsText: {
    fontSize: 12,
    color: "#888",
    marginBottom: 4,
  },
  overdueCard: {
    borderColor: "#dc3545",
    backgroundColor: "#ffeaea",
  },
  bookHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  bookInfo: {
    flex: 1,
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  bookAuthor: {
    fontSize: 14,
    color: "#666",
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    backgroundColor: "#28a745",
    alignSelf: "flex-start",
  },
  overdueBadge: {
    backgroundColor: "#dc3545",
  },
  statusText: {
    color: "#fff",
    fontWeight: "bold",
  },
  overdueText: {
    color: "#fff",
  },
  bookDetails: {
    marginBottom: 10,
  },
  detailText: {
    fontSize: 14,
    color: "#666",
  },
  overdueDetail: {
    color: "#dc3545",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 50,
  },
  emptyText: {
    fontSize: 18,
    color: "#666",
    marginBottom: 15,
  },
  browseButton: {
    backgroundColor: "#007bff",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  browseButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    maxHeight: "80%",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalImage: {
    width: 120,
    height: 160,
    borderRadius: 8,
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  modalAuthor: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 15,
  },
  modalDetails: {
    fontSize: 14,
    marginBottom: 5,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
    marginBottom: 15,
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 5,
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  closeButton: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#6c757d",
    alignItems: "center",
    width: "100%",
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  historyCard: {
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
  },
});

export default BorrowScreen;
