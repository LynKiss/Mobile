import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useBooks } from "../navigation/BookContext";
import styles from "../styles/BookDetailScreen.styles";

const { width } = Dimensions.get("window");

const BookDetailScreen = ({ route, navigation }: any) => {
  const { addToCart, isBookInCart } = useBooks();

  const ma_sach = route?.params?.ma_sach;

  const [book, setBook] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [nxbName, setNxbName] = useState<string>("");
  const [vitriName, setVitriName] = useState<string>("");
  const [ngonNguName, setNgonNguName] = useState<string>("");
  const [reviews, setReviews] = useState<any[]>([]);
  const [theLoaiName, setTheLoaiName] = useState<string>("");

  useEffect(() => {
    const fetchBookDetail = async () => {
      try {
        setLoading(true);
        const token = await AsyncStorage.getItem("userToken");
        const response = await fetch(
          `http://localhost:3000/api/sach/${ma_sach}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          console.log("Book detail data received:", data);
          // API trả về mảng, lấy phần tử đầu tiên
          setBook(Array.isArray(data) ? data[0] : data);
        } else {
          Alert.alert("Lỗi", "Không thể tải thông tin sách.");
        }
      } catch (error) {
        Alert.alert("Lỗi", "Đã xảy ra lỗi khi tải thông tin sách.");
      } finally {
        setLoading(false);
      }
    };

    if (ma_sach) {
      fetchBookDetail();
    } else {
      setLoading(false);
    }
  }, [ma_sach]);
  // Khi đã có book thì đi gọi API để lấy tên thay cho mã
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/danh_gia");
        if (res.ok) {
          const data = await res.json();
          const token = await AsyncStorage.getItem("userToken");
          // Lọc đánh giá theo sách hiện tại
          const filtered = data.filter(
            (rv: any) => rv.ma_sach === book?.ma_sach
          );

          // Lặp qua để lấy tên độc giả
          const reviewsWithUser = await Promise.all(
            filtered.map(async (rv: any) => {
              try {
                const userRes = await fetch(
                  `http://localhost:3000/api/nguoi_dung/${rv.ma_doc_gia}`,
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  }
                );
                if (userRes.ok) {
                  const userData = await userRes.json();
                  return {
                    ...rv,
                    ho_ten: Array.isArray(userData)
                      ? userData[0]?.ho_ten
                      : userData?.ho_ten,
                  };
                }
              } catch (err) {
                console.log("Lỗi fetch người dùng:", err);
              }
              return { ...rv, ho_ten: "Ẩn danh" };
            })
          );

          setReviews(reviewsWithUser);
        }
      } catch (e) {
        console.log("Lỗi khi fetch đánh giá:", e);
      }
    };

    if (book) {
      fetchReviews();
    }
  }, [book]);

  useEffect(() => {
    const fetchExtraInfo = async () => {
      try {
        if (book?.ma_nxb) {
          const res = await fetch(
            `http://localhost:3000/api/nha_xuat_ban/${book.ma_nxb}`
          );
          if (res.ok) {
            const data = await res.json();
            if (Array.isArray(data) && data.length > 0) {
              setNxbName(data[0].ten_nxb || "");
            }
          }
        }

        if (book?.ma_khu_vuc) {
          const res = await fetch(
            `http://localhost:3000/api/khu_vuc/${book.ma_khu_vuc}`
          );
          if (res.ok) {
            const data = await res.json();
            if (Array.isArray(data) && data.length > 0) {
              setVitriName(data[0].ten_khu_vuc || "");
            }
          }
        }

        if (book?.ma_ngon_ngu) {
          const res = await fetch(
            `http://localhost:3000/api/ngon_ngu/${book.ma_ngon_ngu}`
          );
          if (res.ok) {
            const data = await res.json();
            if (Array.isArray(data) && data.length > 0) {
              setNgonNguName(data[0].ten_ngon_ngu || "");
            }
          }
        }
        if (book?.ma_the_loai) {
          const res = await fetch(
            `http://localhost:3000/api/the_loai/${book.ma_the_loai}`
          );
          if (res.ok) {
            const data = await res.json();
            if (Array.isArray(data) && data.length > 0) {
              setTheLoaiName(data[0].ten_the_loai || "");
            }
          }
        }
      } catch (e) {
        console.log("Lỗi khi fetch lookup:", e);
      }
    };

    if (book) {
      fetchExtraInfo();
    }
  }, [book]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007aff" />
        <Text>Đang tải thông tin sách...</Text>
      </View>
    );
  }

  if (!book) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Không tìm thấy thông tin sách.</Text>
      </View>
    );
  }

  const handleAddToCart = async () => {
    if (isBookInCart(book.ma_sach)) {
      Alert.alert("Thông báo", "Sách này đã có trong giỏ hàng!");
      return;
    }

    if (book.so_luong <= 0) {
      Alert.alert("Thông báo", "Sách này hiện không có sẵn.");
      return;
    }

    try {
      const success = await addToCart(book);
      if (success) {
        Alert.alert("Thành công", "Đã thêm sách vào giỏ hàng!", [
          {
            text: "Xem giỏ hàng",
            onPress: () => navigation.navigate("Cart"),
          },
          {
            text: "Tiếp tục",
            style: "cancel",
          },
        ]);
      } else {
        Alert.alert("Lỗi", "Không thể thêm vào giỏ hàng. Vui lòng thử lại.");
      }
    } catch (error) {
      Alert.alert("Lỗi", "Đã xảy ra lỗi khi thêm vào giỏ hàng.");
    }
  };

  const handleAddToWishlist = async () => {};

  return (
    <SafeAreaView style={styles.container}>
      {/* Status Bar */}

      {/* Navigation Bar */}
      <View style={styles.navigationBar}>
        <TouchableOpacity
          style={styles.navButtonLeft}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.navButtonText}>← Quay lại</Text>
        </TouchableOpacity>
        <Text style={styles.navTitle}>Chi tiết sách</Text>
      </View>

      <ScrollView
        style={styles.contentArea}
        showsVerticalScrollIndicator={false}
      >
        {/* Book Header */}
        <View style={styles.bookHeader}>
          <View style={styles.bookImageWrapper}>
            <Image
              source={
                book.hinh_bia
                  ? { uri: "http://localhost:3000/uploads/" + book.hinh_bia }
                  : require("../../assets/images/adaptive-icon.png")
              }
              style={styles.bookImage}
            />
          </View>
          <View style={styles.bookInfo}>
            <Text style={styles.bookTitle}>{book.tieu_de}</Text>
            <Text style={styles.bookAuthor}>{book.tac_gia}</Text>
            <View style={styles.ratingRow}>
              <Text style={styles.star}>⭐</Text>
              <Text style={styles.ratingValue}>4.8</Text>
              <Text style={styles.ratingCount}>(124 đánh giá)</Text>
            </View>
            <View style={styles.tagsRow}>
              <Text style={styles.tag}>{theLoaiName}</Text>
              <Text style={[styles.tag, styles.tagAvailable]}>Có sẵn</Text>
            </View>
          </View>
        </View>

        {/* Quick Info */}
        <View style={styles.quickInfoCard}>
          <View style={styles.quickInfoItem}>
            <Text style={styles.quickInfoValue}>
              3/{book.so_luong || "Chưa có"}
            </Text>
            <Text style={styles.quickInfoLabel}>Có sẵn</Text>
          </View>
          <View style={styles.quickInfoItem}>
            <Text style={styles.quickInfoValue}>
              {book.so_trang || "Chưa có"}
            </Text>
            <Text style={styles.quickInfoLabel}>Trang</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtonsRow}>
          <TouchableOpacity
            style={styles.buttonSuccess}
            onPress={handleAddToCart}
          >
            <Text style={styles.buttonSuccessText}>🛒 Thêm vào giỏ</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonSecondary}
            onPress={handleAddToWishlist}
          >
            <Text style={styles.buttonSecondaryText}>❤️</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonSecondary}>
            <Text style={styles.buttonSecondaryText}>🔗</Text>
          </TouchableOpacity>
        </View>

        {/* Book Details List */}
        <View style={styles.detailsList}>
          <View style={styles.detailsListItem}>
            <View style={[styles.iconCircle, styles.iconBlue]}>
              <Text>🏷️</Text>
            </View>
            <View style={styles.detailsText}>
              <Text style={styles.detailsLabel}>ISBN</Text>
              <Text style={styles.detailsValue}>{book.ISBN || "Chưa có"}</Text>
            </View>
          </View>
          <View style={styles.detailsListItem}>
            <View style={[styles.iconCircle, styles.iconGreen]}>
              <Text>🏢</Text>
            </View>
            <View style={styles.detailsText}>
              <Text style={styles.detailsLabel}>Nhà xuất bản</Text>
              <Text style={styles.detailsValue}>{nxbName || "Chưa có"}</Text>
            </View>
          </View>
          <View style={styles.detailsListItem}>
            <View style={[styles.iconCircle, styles.iconOrange]}>
              <Text>📅</Text>
            </View>
            <View style={styles.detailsText}>
              <Text style={styles.detailsLabel}>Năm xuất bản</Text>
              <Text style={styles.detailsValue}>
                {book.nam_xuat_ban || "Chưa có"}
              </Text>
            </View>
          </View>
          <View style={styles.detailsListItem}>
            <View style={[styles.iconCircle, styles.iconPurple]}>
              <Text>📍</Text>
            </View>
            <View style={styles.detailsText}>
              <Text style={styles.detailsLabel}>Vị trí</Text>
              <Text style={styles.detailsValue}>{vitriName || "Chưa có"}</Text>
            </View>
          </View>
          <View style={styles.detailsListItem}>
            <View style={[styles.iconCircle, styles.iconPink]}>
              <Text>🌐</Text>
            </View>
            <View style={styles.detailsText}>
              <Text style={styles.detailsLabel}>Ngôn ngữ</Text>
              <Text style={styles.detailsValue}>
                {ngonNguName || "Chưa có"}
              </Text>
            </View>
          </View>
          <View style={styles.detailsListItem}>
            <View style={[styles.iconCircle, styles.iconRed]}>
              <Text>💰</Text>
            </View>
            <View style={styles.detailsText}>
              <Text style={styles.detailsLabel}>Giá bìa</Text>
              <Text style={styles.detailsValue}>
                {book.gia_tri || "Chưa có"}
              </Text>
            </View>
          </View>
        </View>

        {/* Description */}
        <View style={styles.descriptionSection}>
          <Text style={styles.sectionHeader}>Mô tả</Text>
          <Text style={styles.descriptionText}>{book.mo_ta}</Text>
        </View>

        {/* Tags */}
        <View style={styles.tagsSection}>
          <Text style={styles.sectionHeader}>Từ khóa</Text>
          <View style={styles.tagsContainer}>
            {book.tags?.map((tag: string, index: number) => (
              <View key={index} style={styles.tagItem}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Reviews */}
        <View style={styles.reviewsSection}>
          <Text style={styles.sectionHeader}>Đánh giá</Text>
          {reviews.length > 0 ? (
            reviews.map((rv, idx) => (
              <View key={idx} style={styles.reviewItem}>
                <View style={[styles.reviewAvatar, styles.iconBlue]}>
                  <Text style={styles.reviewAvatarText}>
                    {rv.ho_ten ? rv.ho_ten.charAt(0).toUpperCase() : "?"}
                  </Text>
                </View>
                <View style={styles.reviewContent}>
                  <Text style={styles.reviewAuthor}>{rv.ho_ten}</Text>
                  <Text style={styles.reviewRating}>
                    {"⭐".repeat(rv.diem)}
                  </Text>
                  <Text style={styles.reviewDate}>
                    {new Date(rv.ngay_danh_gia).toLocaleDateString("vi-VN")}
                  </Text>
                  <Text style={styles.reviewText}>{rv.binh_luan}</Text>
                </View>
              </View>
            ))
          ) : (
            <Text>Chưa có đánh giá nào cho sách này</Text>
          )}
        </View>

        {/* Related Books */}
        <View style={styles.relatedBooksSection}>
          <Text style={styles.sectionHeader}>Sách liên quan</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.relatedBookItem}>
              <View style={[styles.relatedBookCover, styles.iconOrange]}>
                <Text style={styles.relatedBookEmoji}>💻</Text>
              </View>
              <Text style={styles.relatedBookTitle}>JavaScript Guide</Text>
              <Text style={styles.relatedBookRating}>⭐ 4.6</Text>
            </View>
            <View style={styles.relatedBookItem}>
              <View style={[styles.relatedBookCover, styles.iconPurple]}>
                <Text style={styles.relatedBookEmoji}>🎨</Text>
              </View>
              <Text style={styles.relatedBookTitle}>UI/UX Design</Text>
              <Text style={styles.relatedBookRating}>⭐ 4.7</Text>
            </View>
            <View style={styles.relatedBookItem}>
              <View style={[styles.relatedBookCover, styles.iconPink]}>
                <Text style={styles.relatedBookEmoji}>🤖</Text>
              </View>
              <Text style={styles.relatedBookTitle}>Machine Learning</Text>
              <Text style={styles.relatedBookRating}>⭐ 4.5</Text>
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BookDetailScreen;
