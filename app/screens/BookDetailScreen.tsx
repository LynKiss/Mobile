import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  Dimensions,
} from "react-native";
import { useBooks } from "../navigation/BookContext";
import styles from "../styles/BookDetailScreen.styles";

const { width } = Dimensions.get("window");

const BookDetailScreen = ({ route, navigation }: any) => {
  const { borrowBook, addToWishlist, isBookInWishlist, isBookBorrowed } =
    useBooks();

  const book = route?.params?.book;

  if (!book) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Đang tải thông tin sách...</Text>
      </View>
    );
  }

  const handleBorrow = async () => {
    if (isBookBorrowed(book.ma_sach)) {
      Alert.alert("Thông báo", "Bạn đã mượn sách này rồi!");
      return;
    }

    if (book.so_luong <= 0) {
      Alert.alert("Thông báo", "Sách này hiện không có sẵn.");
      return;
    }

    try {
      const success = await borrowBook(book);
      if (success) {
        Alert.alert("Thành công", "Đã mượn sách thành công!", [
          { text: "OK", onPress: () => navigation.goBack() },
        ]);
      } else {
        Alert.alert("Lỗi", "Không thể mượn sách. Vui lòng thử lại.");
      }
    } catch (error) {
      Alert.alert("Lỗi", "Đã xảy ra lỗi khi mượn sách.");
    }
  };

  const handleAddToWishlist = async () => {
    if (isBookInWishlist(book.ma_sach)) {
      Alert.alert("Thông báo", "Sách này đã có trong danh sách yêu thích!");
      return;
    }

    try {
      const success = await addToWishlist(book);
      if (success) {
        Alert.alert("Thành công", "Đã thêm vào danh sách yêu thích!");
      } else {
        Alert.alert("Lỗi", "Không thể thêm vào danh sách yêu thích.");
      }
    } catch (error) {
      Alert.alert("Lỗi", "Đã xảy ra lỗi khi thêm vào danh sách yêu thích.");
    }
  };

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
                  ? { uri: "http://160.250.132.142/uploads/" + book.hinh_bia }
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
              <Text style={styles.tag}>Công nghệ</Text>
              <Text style={[styles.tag, styles.tagAvailable]}>Có sẵn</Text>
            </View>
          </View>
        </View>

        {/* Quick Info */}
        <View style={styles.quickInfoCard}>
          <View style={styles.quickInfoItem}>
            <Text style={styles.quickInfoValue}>3/5</Text>
            <Text style={styles.quickInfoLabel}>Có sẵn</Text>
          </View>
          <View style={styles.quickInfoItem}>
            <Text style={styles.quickInfoValue}>456</Text>
            <Text style={styles.quickInfoLabel}>Trang</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtonsRow}>
          <TouchableOpacity style={styles.buttonSuccess} onPress={handleBorrow}>
            <Text style={styles.buttonSuccessText}>📚 Mượn sách</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonSecondary}>
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
              <Text style={styles.detailsValue}>{book.ISBN}</Text>
            </View>
          </View>
          <View style={styles.detailsListItem}>
            <View style={[styles.iconCircle, styles.iconGreen]}>
              <Text>🏢</Text>
            </View>
            <View style={styles.detailsText}>
              <Text style={styles.detailsLabel}>Nhà xuất bản</Text>
              <Text style={styles.detailsValue}>
                {book.nha_xuat_ban || "Chưa có"}
              </Text>
            </View>
          </View>
          <View style={styles.detailsListItem}>
            <View style={[styles.iconCircle, styles.iconOrange]}>
              <Text>📅</Text>
            </View>
            <View style={styles.detailsText}>
              <Text style={styles.detailsLabel}>Năm xuất bản</Text>
              <Text style={styles.detailsValue}>{book.nam_xuat_ban}</Text>
            </View>
          </View>
          <View style={styles.detailsListItem}>
            <View style={[styles.iconCircle, styles.iconPurple]}>
              <Text>📍</Text>
            </View>
            <View style={styles.detailsText}>
              <Text style={styles.detailsLabel}>Vị trí</Text>
              <Text style={styles.detailsValue}>
                {book.vi_tri || "Chưa có"}
              </Text>
            </View>
          </View>
          <View style={styles.detailsListItem}>
            <View style={[styles.iconCircle, styles.iconPink]}>
              <Text>🌐</Text>
            </View>
            <View style={styles.detailsText}>
              <Text style={styles.detailsLabel}>Ngôn ngữ</Text>
              <Text style={styles.detailsValue}>
                {book.ngon_ngu || "Chưa có"}
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
                {book.gia_bia || "Chưa có"}
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
          <Text style={styles.sectionHeader}>Đánh giá gần đây</Text>
          {/* Mock reviews */}
          <View style={styles.reviewItem}>
            <View style={[styles.reviewAvatar, styles.iconBlue]}>
              <Text style={styles.reviewAvatarText}>TH</Text>
            </View>
            <View style={styles.reviewContent}>
              <Text style={styles.reviewAuthor}>Trần Hải</Text>
              <Text style={styles.reviewRating}>⭐⭐⭐⭐⭐</Text>
              <Text style={styles.reviewDate}>2 ngày trước</Text>
              <Text style={styles.reviewText}>
                Sách rất hay và dễ hiểu. Các ví dụ thực tế giúp mình áp dụng
                ngay vào dự án. Recommend!
              </Text>
            </View>
          </View>
          <View style={styles.reviewItem}>
            <View style={[styles.reviewAvatar, styles.iconGreen]}>
              <Text style={styles.reviewAvatarText}>NL</Text>
            </View>
            <View style={styles.reviewContent}>
              <Text style={styles.reviewAuthor}>Nguyễn Linh</Text>
              <Text style={styles.reviewRating}>⭐⭐⭐⭐⭐</Text>
              <Text style={styles.reviewDate}>1 tuần trước</Text>
              <Text style={styles.reviewText}>
                Nội dung cập nhật, phù hợp cho cả người mới bắt đầu và có kinh
                nghiệm.
              </Text>
            </View>
          </View>
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
