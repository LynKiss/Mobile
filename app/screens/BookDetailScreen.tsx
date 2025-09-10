import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  Image,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useBooks } from "../navigation/BookContext";

const BookDetailScreen = ({ route, navigation }: any) => {
  const { borrowBook, addToWishlist, isBookInWishlist, isBookBorrowed } =
    useBooks();

  // Nhận thông tin sách từ route params
  const initialBookRef = React.useRef(route?.params?.book);
  const [book, setBook] = React.useState(initialBookRef.current || null);
  const [fetched, setFetched] = React.useState(false);

  // State cho thông tin mô tả
  const [khuVuc, setKhuVuc] = React.useState("");
  const [nhaXuatBan, setNhaXuatBan] = React.useState("");
  const [theLoai, setTheLoai] = React.useState("");
  const [isLoadingDescriptive, setIsLoadingDescriptive] = React.useState(false);

  React.useEffect(() => {
    const fetchBookDetail = async () => {
      if (fetched) return; // Đã fetch rồi, không fetch lại
      const initialBook = initialBookRef.current;
      if (initialBook?.id || initialBook?.ma_sach) {
        const bookId = initialBook.id || initialBook.ma_sach;
        try {
          const token = await AsyncStorage.getItem("userToken");
          const response = await fetch(
            `http://160.250.132.142/api/sach/${bookId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
              },
            }
          );
          if (response.ok) {
            const data = await response.json();
            if (data) {
              // Handle if data is array
              const bookData = Array.isArray(data) ? data[0] : data;
              setBook(bookData);
            } else {
              console.error("API returned null data");
            }
            setFetched(true);
          } else {
            console.error("Failed to fetch book detail:", response.status);
            setFetched(true); // Đánh dấu đã thử fetch, dù thất bại
          }
        } catch (error) {
          console.error("Error fetching book detail:", error);
          setFetched(true); // Đánh dấu đã thử fetch, dù thất bại
        }
      } else {
        setFetched(true); // Không có bookId, đánh dấu đã xử lý
      }
    };
    fetchBookDetail();
  }, [fetched]); // Loại bỏ route?.params?.book khỏi dependency

  // Fetch thông tin mô tả sau khi có book
  React.useEffect(() => {
    if (!book) return;

    console.log("Book object:", book); // Debug: log book object

    const fetchDescriptiveInfo = async () => {
      setIsLoadingDescriptive(true);
      const token = await AsyncStorage.getItem("userToken");
      console.log("Token:", token); // Debug: log token

      const fetchPromises = [];

      // Fetch khu vực
      if (book.ma_khu_vuc) {
        fetchPromises.push(
          fetch(`http://160.250.132.142/api/khu_vuc/${book.ma_khu_vuc}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
            .then((response) => {
              console.log("Khu vực response status:", response.status);
              if (response.ok) {
                return response.json();
              } else {
                throw new Error(`Failed to fetch khu vực: ${response.status}`);
              }
            })
            .then((data) => {
              console.log("Khu vực data:", data);
              const khuVucData = Array.isArray(data) ? data[0] : data;
              setKhuVuc(
                khuVucData.ten_khu_vuc ||
                  khuVucData.name ||
                  "Dữ liệu chưa lấy được"
              );
            })
            .catch((error) => {
              console.error("Error fetching khu vực:", error);
              setKhuVuc("Dữ liệu chưa lấy được");
            })
        );
      } else {
        setKhuVuc("Dữ liệu chưa lấy được");
      }

      // Fetch nhà xuất bản
      if (book.ma_nxb) {
        fetchPromises.push(
          fetch(`http://160.250.132.142/api/nha_xuat_ban/${book.ma_nxb}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
            .then((response) => {
              console.log("Nha xuat ban response status:", response.status);
              if (response.ok) {
                return response.json();
              } else {
                throw new Error(
                  `Failed to fetch nha xuat ban: ${response.status}`
                );
              }
            })
            .then((data) => {
              console.log("Nha xuat ban data:", data);
              const nhaXuatBanData = Array.isArray(data) ? data[0] : data;
              setNhaXuatBan(
                nhaXuatBanData.ten_nxb ||
                  nhaXuatBanData.name ||
                  "Dữ liệu chưa lấy được"
              );
            })
            .catch((error) => {
              console.error("Error fetching nhà xuất bản:", error);
              setNhaXuatBan("Dữ liệu chưa lấy được");
            })
        );
      } else {
        setNhaXuatBan("Dữ liệu chưa lấy được");
      }

      // Fetch thể loại
      if (book.ma_the_loai) {
        fetchPromises.push(
          fetch(`http://160.250.132.142/api/the_loai/${book.ma_the_loai}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
            .then((response) => {
              console.log("The loai response status:", response.status);
              if (response.ok) {
                return response.json();
              } else {
                throw new Error(`Failed to fetch the loai: ${response.status}`);
              }
            })
            .then((data) => {
              console.log("The loai data:", data);
              const theLoaiData = Array.isArray(data) ? data[0] : data;
              setTheLoai(
                theLoaiData.ten_the_loai ||
                  theLoaiData.name ||
                  "Dữ liệu chưa lấy được"
              );
            })
            .catch((error) => {
              console.error("Error fetching thể loại:", error);
              setTheLoai("Dữ liệu chưa lấy được");
            })
        );
      } else {
        setTheLoai("Dữ liệu chưa lấy được");
      }

      try {
        await Promise.all(fetchPromises);
      } catch (error) {
        console.error("Error in batch fetch:", error);
      } finally {
        setIsLoadingDescriptive(false);
      }
    };

    fetchDescriptiveInfo();
  }, [book]);

  if (!book) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
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
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>
          Chi Tiết Sách
        </Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Book Image and Basic Info */}
        <View style={styles.bookHeader}>
          <Image
            source={
              book.hinh_bia
                ? { uri: "http://160.250.132.142/uploads/" + book.hinh_bia }
                : require("../../assets/images/adaptive-icon.png")
            }
            style={styles.bookImage}
          />
          <View style={styles.bookBasicInfo}>
            <Text style={styles.title}>{book.tieu_de}</Text>
            <Text style={styles.author}>Tác giả: {book.tac_gia}</Text>
            <Text style={styles.category}>
              Thể loại: {theLoai || "Dữ liệu chưa lấy được"}
            </Text>
            <View style={styles.statusContainer}>
              <Text style={styles.statusLabel}>Trạng thái: </Text>
              <Text
                style={[
                  styles.statusValue,
                  book.so_luong > 0 ? styles.available : styles.unavailable,
                ]}
              >
                {book.so_luong > 0 ? "Có sẵn" : "Không có sẵn"}
              </Text>
            </View>
          </View>
        </View>

        {/* Detailed Information */}
        <View style={styles.detailsContainer}>
          <Text style={styles.sectionTitle}>Thông Tin Chi Tiết</Text>
          {isLoadingDescriptive && (
            <Text style={styles.loadingText}>
              Đang tải thông tin chi tiết...
            </Text>
          )}

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Nhà xuất bản:</Text>
            <Text style={styles.detailValue}>
              {nhaXuatBan || "Dữ liệu chưa lấy được"}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Năm xuất bản:</Text>
            <Text style={styles.detailValue}>{book.nam_xuat_ban}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Số trang:</Text>
            <Text style={styles.detailValue}>{book.so_trang}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>ISBN:</Text>
            <Text style={styles.detailValue}>{book.ISBN}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Vị trí:</Text>
            <Text style={styles.detailValue}>
              {khuVuc || "Dữ liệu chưa lấy được"}
            </Text>
          </View>
        </View>

        {/* Description */}
        <View style={styles.descriptionContainer}>
          <Text style={styles.sectionTitle}>Mô tả sách</Text>
          <Text style={styles.description}>{book.mo_ta}</Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.primaryButton} onPress={handleBorrow}>
            <Text style={styles.primaryButtonText}>Mượn Sách</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={handleAddToWishlist}
          >
            <Text style={styles.secondaryButtonText}>Thêm vào Yêu Thích</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "#fff",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f8f9fa",
    justifyContent: "center",
    alignItems: "center",
  },
  backButtonText: {
    fontSize: 20,
    color: "#007bff",
    fontWeight: "bold",
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginHorizontal: 10,
  },
  headerRight: {
    width: 40,
  },
  scrollContainer: {
    flex: 1,
  },
  bookHeader: {
    flexDirection: "row",
    padding: 20,
    backgroundColor: "#f8f9fa",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  bookImage: {
    width: 120,
    height: 180,
    borderRadius: 8,
    marginRight: 15,
  },
  bookBasicInfo: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  author: {
    fontSize: 16,
    color: "#666",
    marginBottom: 4,
  },
  category: {
    fontSize: 16,
    color: "#666",
    marginBottom: 8,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  statusValue: {
    fontSize: 16,
    fontWeight: "bold",
  },
  available: {
    color: "#28a745",
  },
  unavailable: {
    color: "#dc3545",
  },
  detailsContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  loadingText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  detailLabel: {
    fontSize: 16,
    color: "#666",
    flex: 1,
  },
  detailValue: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
    flex: 1,
    textAlign: "right",
  },
  descriptionContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  description: {
    fontSize: 16,
    color: "#666",
    lineHeight: 24,
  },
  actionsContainer: {
    padding: 20,
  },
  primaryButton: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  secondaryButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  secondaryButtonText: {
    color: "#007bff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default BookDetailScreen;
