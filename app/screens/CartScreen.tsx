import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useBooks } from "../navigation/BookContext";
import styles from "../styles/CartScreen.styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { height } = Dimensions.get("window");

const CartScreen = ({ navigation }: any) => {
  const { cartItems, removeFromCart, updateCartItemQuantity, clearCart } =
    useBooks();

  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    const currentIds = new Set(cartItems.map((item) => item.id));
    setSelectedItems(
      (prev) => new Set([...prev].filter((id) => currentIds.has(id)))
    );
  }, [cartItems]);

  useEffect(() => {
    setSelectAll(
      selectedItems.size === cartItems.length && cartItems.length > 0
    );
  }, [selectedItems, cartItems]);

  // 👉 Hàm riêng để gọi API
  const doBorrowBooks = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      console.log("Token lấy từ AsyncStorage:", token);

      if (!token) {
        Alert.alert("Lỗi", "Bạn chưa đăng nhập!");
        return;
      }

      const selectedBooks = getSelectedItems();
      const payload = {
        ngay_du_kien_muon: new Date().toISOString().split("T")[0],
        ghi_chu: "", // sau này có thể nhập thêm
        chi_tiet: selectedBooks.map((item) => ({
          ma_sach: item.book.ma_sach,
          so_luong: item.quantity,
        })),
      };

      console.log("Payload gửi API:", payload);

      const response = await fetch("http://localhost:3000/api/dat-muon", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      console.log("Status API:", response.status);

      if (response.ok) {
        Alert.alert("Thành công", "Đã mượn sách thành công!");
        clearCart();
        navigation.goBack(); // Quay lại màn hình trước
      } else {
        const errText = await response.text();
        Alert.alert("Lỗi", `Không thể mượn sách: ${errText}`);
      }
    } catch (error) {
      console.error("Borrow error:", error);
      Alert.alert("Lỗi", "Có lỗi xảy ra khi gọi API!");
    }
  };

  const handleBorrowAll = () => {
    console.log("==> Bắt đầu handleBorrowAll");

    const selectedBooks = getSelectedItems();
    if (selectedBooks.length === 0) {
      Alert.alert("Thông báo", "Vui lòng chọn sách để mượn!");
      return;
    }

    Alert.alert(
      "Xác nhận mượn sách",
      `Bạn muốn mượn ${
        selectedBooks.length
      } cuốn sách với tổng ${getSelectedTotalItems()} quyển?`,
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Xác nhận",
          onPress: () => {
            console.log("==> Đã ấn nút mượn");
            doBorrowBooks(); // gọi hàm mượn sách thật sự
          },
        },
      ]
    );
  };

  const handleQuantityChange = async (maSach: string, newQuantity: number) => {
    const item = cartItems.find((i) => i.book.ma_sach === maSach);
    if (!item) return;

    if (newQuantity > item.book.so_luong) {
      Alert.alert("Không đủ số lượng", `Chỉ còn ${item.book.so_luong} quyển`);
      return;
    }

    await updateCartItemQuantity(maSach, newQuantity);
  };

  const handleRemoveItem = async (cartItemId: string) => {
    Alert.alert("Xác nhận", "Bạn muốn xóa sách này khỏi giỏ hàng?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Xóa",
        style: "destructive",
        onPress: async () => {
          console.log("Removing cartItem:", cartItemId);
          await removeFromCart(cartItemId);
        },
      },
    ]);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalBooks = () => {
    return cartItems.length;
  };

  const toggleSelectItem = (itemId: string) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(itemId)) {
      newSelected.delete(itemId);
    } else {
      newSelected.add(itemId);
    }
    setSelectedItems(newSelected);
    setSelectAll(newSelected.size === cartItems.length);
  };

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedItems(new Set());
      setSelectAll(false);
    } else {
      const allIds = new Set(cartItems.map((item) => item.id));
      setSelectedItems(allIds);
      setSelectAll(true);
    }
  };

  const getSelectedItems = () => {
    return cartItems.filter((item) => selectedItems.has(item.id));
  };

  const getSelectedTotalItems = () => {
    return getSelectedItems().reduce((total, item) => total + item.quantity, 0);
  };

  const getSelectedTotalBooks = () => {
    return getSelectedItems().length;
  };

  if (cartItems.length === 0) {
    return (
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Giỏ mượn</Text>
          <View style={styles.headerRight} />
        </View>

        <View style={styles.emptyContainer}>
          <Text style={styles.emptyEmoji}>🛒</Text>
          <Text style={styles.emptyTitle}>Giỏ hàng trống</Text>
          <Text style={styles.emptySubtitle}>
            Hãy thêm sách vào giỏ để mượn nhiều cuốn cùng lúc
          </Text>
          <TouchableOpacity
            style={styles.browseButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.browseButtonText}>Tìm sách</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Giỏ mượn</Text>
        <View style={styles.headerRight} />
      </View>

      {/* Select All */}
      <View
        style={{
          paddingHorizontal: 24,
          paddingVertical: 12,
          backgroundColor: "#ffffff",
          borderBottomWidth: 1,
          borderBottomColor: "#e9ecef",
        }}
      >
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center" }}
          onPress={toggleSelectAll}
        >
          <Ionicons
            name={selectAll ? "checkbox" : "square-outline"}
            size={24}
            color={selectAll ? "#007bff" : "#666"}
          />
          <Text style={{ marginLeft: 8, fontSize: 16, color: "#333" }}>
            Chọn tất cả ({cartItems.length} sách)
          </Text>
        </TouchableOpacity>
      </View>

      {/* Cart Items */}
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {cartItems.map((item) => (
          <View key={item.book.ma_sach} style={styles.cartItem}>
            <TouchableOpacity
              style={{ marginRight: 12, justifyContent: "center" }}
              onPress={() => toggleSelectItem(item.id)}
            >
              <Ionicons
                name={
                  selectedItems.has(item.id) ? "checkbox" : "square-outline"
                }
                size={24}
                color={selectedItems.has(item.id) ? "#007bff" : "#666"}
              />
            </TouchableOpacity>
            <View style={styles.bookInfo}>
              <View style={styles.bookCover}>
                {item.book.hinh_bia ? (
                  <Image
                    source={{
                      uri: `http://localhost:3000/uploads/${item.book.hinh_bia}`,
                    }}
                    style={styles.bookImage}
                    resizeMode="cover"
                  />
                ) : (
                  <Text style={styles.bookEmoji}>📚</Text>
                )}
              </View>
              <View style={styles.bookDetails}>
                <Text style={styles.bookTitle} numberOfLines={2}>
                  {item.book.tieu_de}
                </Text>
                <Text style={styles.bookAuthor}>{item.book.tac_gia}</Text>
                <Text style={styles.bookAvailable}>
                  Còn {item.book.so_luong} quyển
                </Text>
              </View>
            </View>

            <View style={styles.cartItemActions}>
              <View style={styles.quantityControls}>
                <TouchableOpacity
                  style={[
                    styles.quantityButton,
                    item.quantity <= 1 && styles.disabledButton,
                  ]}
                  onPress={() =>
                    handleQuantityChange(item.book.ma_sach, item.quantity - 1)
                  }
                  disabled={item.quantity <= 1}
                >
                  <Text style={styles.quantityButtonText}>-</Text>
                </TouchableOpacity>

                <Text style={styles.quantityText}>{item.quantity}</Text>

                <TouchableOpacity
                  style={[
                    styles.quantityButton,
                    item.quantity >= item.book.so_luong &&
                      styles.disabledButton,
                  ]}
                  onPress={() =>
                    handleQuantityChange(item.book.ma_sach, item.quantity + 1)
                  }
                  disabled={item.quantity >= item.book.so_luong}
                >
                  <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => handleRemoveItem(item.id)}
              >
                <Text style={styles.removeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.clearButton}
          onPress={() => {
            Alert.alert("Xác nhận", "Xóa toàn bộ giỏ hàng?", [
              { text: "Hủy", style: "cancel" },
              {
                text: "Xóa tất cả",
                style: "destructive",
                onPress: () => {
                  console.log("Clearing cart...");
                  clearCart();
                },
              },
            ]);
          }}
        >
          <Text style={styles.clearButtonText}>Xóa giỏ</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.borrowButton,
            selectedItems.size === 0 && { backgroundColor: "#e9ecef" },
          ]}
          onPress={handleBorrowAll}
          disabled={selectedItems.size === 0}
        >
          <Text
            style={[
              styles.borrowButtonText,
              selectedItems.size === 0 && { color: "#666" },
            ]}
          >
            Xác nhận ({selectedItems.size})
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartScreen;
