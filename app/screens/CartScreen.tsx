import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
} from "react-native";
import { useBooks } from "../navigation/BookContext";
import styles from "./CartScreen.styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CartScreen = ({ navigation }: any) => {
  const { cartItems, removeFromCart, updateCartItemQuantity, clearCart } =
    useBooks();

  // 👉 Hàm riêng để gọi API
  const doBorrowBooks = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      console.log("Token lấy từ AsyncStorage:", token);

      if (!token) {
        Alert.alert("Lỗi", "Bạn chưa đăng nhập!");
        return;
      }

      const payload = {
        ngay_du_kien_muon: new Date().toISOString().split("T")[0],
        ghi_chu: "", // sau này có thể nhập thêm
        chi_tiet: cartItems.map((item) => ({
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
        navigation.goBack();
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

    if (cartItems.length === 0) {
      Alert.alert("Thông báo", "Giỏ hàng trống!");
      return;
    }

    if (
      window.confirm(
        `Bạn muốn mượn ${
          cartItems.length
        } cuốn sách với tổng ${cartItems.reduce(
          (total, item) => total + item.quantity,
          0
        )} quyển?`
      )
    ) {
      console.log("==> Đã ấn nút mượn");
      doBorrowBooks(); // gọi hàm mượn sách thật sự
    }
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
    const confirmed = window.confirm("Bạn muốn xóa sách này khỏi giỏ hàng?");
    if (confirmed) {
      console.log("Removing cartItem:", cartItemId);
      await removeFromCart(cartItemId);
    }
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalBooks = () => {
    return cartItems.length;
  };

  if (cartItems.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyEmoji}>🛒</Text>
        <Text style={styles.emptyTitle}>Giỏ hàng trống</Text>
        <Text style={styles.emptySubtitle}>
          Hãy thêm sách vào giỏ để mượn nhiều cuốn cùng lúc
        </Text>
        <TouchableOpacity
          style={styles.browseButton}
          onPress={() => navigation.navigate("Search")}
        >
          <Text style={styles.browseButtonText}>Tìm sách</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Giỏ hàng</Text>
        <Text style={styles.headerSubtitle}>
          {getTotalBooks()} cuốn sách • {getTotalItems()} quyển
        </Text>
      </View>

      {/* Cart Items */}
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {cartItems.map((item) => (
          <View key={item.book.ma_sach} style={styles.cartItem}>
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
                  item.quantity >= item.book.so_luong && styles.disabledButton,
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
          <Text style={styles.clearButtonText}>Xóa tất cả</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.borrowButton} onPress={handleBorrowAll}>
          <Text style={styles.borrowButtonText}>
            Mượn {getTotalItems()} quyển
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartScreen;
