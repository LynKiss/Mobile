import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
  Alert,
  Modal,
} from "react-native";
import { useTheme } from "../contexts/ThemeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useBooks } from "../navigation/BookContext";
import styles from "./SearchScreen.styles";

const getRandomCoverColor = () => {
  const colors = [
    "#007aff",
    "#ff9500",
    "#34c759",
    "#af52de",
    "#ff2d92",
    "#ff3b30",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const getRandomIcon = () => {
  const icons = ["📚", "💻", "🤖", "🎨", "🧠", "🌍", "📈", "💼"];
  return icons[Math.floor(Math.random() * icons.length)];
};

const normalizeBook = (book: any) => ({
  id: book.ma_sach,
  title: book.tieu_de || book.title || "",
  author: book.tac_gia || book.author || "",
  publisher:
    book.ma_nxb?.toString() || book.nha_xuat_ban || book.publisher || "",
  year: book.nam_xuat_ban || book.year || "",
  category:
    book.ma_the_loai?.toString() || book.the_loai || book.category || "",
  image: book.hinh_bia
    ? { uri: "http://localhost:3000/uploads/" + book.hinh_bia }
    : book.image || null,
  coverColor: getRandomCoverColor(),
  icon: getRandomIcon(),
  rating: (Math.random() * 1.5 + 3.5).toFixed(1),
  availableCopies: book.so_luong - Math.floor(Math.random() * 6), // 0-5 copies
  totalCopies: book.so_luong, // 3-6 total copies
  publishYear: book.nam_xuat_ban || new Date().getFullYear(),
  pages: book.so_trang, // 100-500 pages
});

const SearchScreen = ({ navigation, route }: any) => {
  const { theme } = useTheme();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [currentFilter, setCurrentFilter] = useState("all");
  const [currentSort, setCurrentSort] = useState("title-asc");
  const [currentView, setCurrentView] = useState("list");
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);

  // New state for cart count
  const { getCartTotalItems } = useBooks();

  const featuredOnly = route.params?.featuredOnly || false;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedQuery(query);
    }, 400);
    return () => clearTimeout(timeout);
  }, [query]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    fetchAllBooks();
  }, []);

  const fetchAllBooks = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("userToken");
      const response = await fetch("http://localhost:3000/api/sach", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Fetched books data:", data);
        setBooks(data.map(normalizeBook));
      } else {
        console.error("Failed to fetch books:", response.status);
      }
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  const getFilteredBooks = () => {
    let filtered = books.filter((book) => {
      const matchesQuery =
        debouncedQuery.trim() === "" ||
        book.title.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        book.publisher.toLowerCase().includes(debouncedQuery.toLowerCase());

      if (currentFilter === "all") return matchesQuery;
      if (currentFilter === "available")
        return matchesQuery && book.availableCopies > 0;
      return matchesQuery && book.category === currentFilter;
    });

    // Sort books
    filtered.sort((a, b) => {
      switch (currentSort) {
        case "title-asc":
          return a.title.localeCompare(b.title);
        case "title-desc":
          return b.title.localeCompare(a.title);
        case "rating-desc":
          return parseFloat(b.rating) - parseFloat(a.rating);
        case "year-desc":
          return b.publishYear - a.publishYear;
        case "available-desc":
          return b.availableCopies - a.availableCopies;
        default:
          return 0;
      }
    });

    return filtered;
  };

  const filteredBooks = getFilteredBooks();

  const getSortText = () => {
    switch (currentSort) {
      case "title-asc":
        return "Tên A-Z";
      case "title-desc":
        return "Tên Z-A";
      case "rating-desc":
        return "Đánh giá cao";
      case "year-desc":
        return "Mới nhất";
      case "available-desc":
        return "Có sẵn nhiều";
      default:
        return "Tên A-Z";
    }
  };

  const toggleSort = () => {
    const sortOptions = [
      { key: "title-asc", text: "Tên A-Z", icon: "fas fa-arrow-down-a-z" },
      { key: "title-desc", text: "Tên Z-A", icon: "fas fa-arrow-up-z-a" },
      { key: "rating-desc", text: "Đánh giá cao", icon: "fas fa-star" },
      { key: "year-desc", text: "Mới nhất", icon: "fas fa-calendar" },
      {
        key: "available-desc",
        text: "Có sẵn nhiều",
        icon: "fas fa-check-circle",
      },
    ];

    const currentIndex = sortOptions.findIndex(
      (opt) => opt.key === currentSort
    );
    const nextIndex = (currentIndex + 1) % sortOptions.length;
    setCurrentSort(sortOptions[nextIndex].key);
  };

  const renderBookItem = ({ item, index }: any) => {
    const isLastItem = index === filteredBooks.length - 1;

    if (currentView === "list") {
      return (
        <TouchableOpacity
          style={[styles.iosListItem, isLastItem && styles.iosListItemLast]}
          onPress={() =>
            navigation.navigate("BookDetail", { ma_sach: item.id })
          }
        >
          <View
            style={[styles.bookCover, { backgroundColor: item.coverColor }]}
          >
            <Text style={{ fontSize: 24 }}>{item.icon}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.bookTitle} numberOfLines={2}>
              {item.title}
            </Text>
            <Text style={styles.bookAuthor}>{item.author}</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 8,
                marginTop: 4,
              }}
            >
              <View
                style={[
                  styles.iosBadge,
                  item.availableCopies > 0
                    ? styles.iosBadgeSuccess
                    : styles.iosBadgeWarning,
                ]}
              >
                <Text
                  style={{ fontSize: 10, fontWeight: "600", color: "#ffffff" }}
                >
                  {item.availableCopies > 0 ? "Có sẵn" : "Hết sách"}
                </Text>
              </View>
              <Text style={{ fontSize: 12, color: "#3c3c4399" }}>
                ⭐ {item.rating}
              </Text>
              <Text style={{ fontSize: 12, color: "#3c3c4399" }}>
                {item.pages} trang
              </Text>
            </View>
            <Text style={{ fontSize: 12, color: "#3c3c4399", marginTop: 4 }}>
              {item.availableCopies}/{item.totalCopies} cuốn •{" "}
              {item.publishYear}
            </Text>
          </View>
          <Text style={{ color: "#3c3c4399", fontSize: 14 }}>›</Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={styles.gridItem}
          onPress={() =>
            navigation.navigate("BookDetail", { ma_sach: item.id })
          }
        >
          <View
            style={[
              styles.bookCover,
              styles.bookCoverLarge,
              { backgroundColor: item.coverColor },
            ]}
          >
            <Text style={{ fontSize: 32 }}>{item.icon}</Text>
          </View>
          <Text
            style={[styles.bookTitle, { fontSize: 14, marginTop: 12 }]}
            numberOfLines={2}
          >
            {item.title}
          </Text>
          <Text style={[styles.bookAuthor, { fontSize: 12 }]}>
            {item.author}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 4,
              marginTop: 8,
            }}
          >
            <Text style={{ fontSize: 11, color: "#3c3c4399" }}>
              ⭐ {item.rating}
            </Text>
            <View
              style={[
                styles.iosBadge,
                item.availableCopies > 0
                  ? styles.iosBadgeSuccess
                  : styles.iosBadgeWarning,
              ]}
            >
              <Text
                style={{ fontSize: 9, fontWeight: "600", color: "#ffffff" }}
              >
                {item.availableCopies > 0 ? "Có sẵn" : "Hết"}
              </Text>
            </View>
          </View>
          <Text style={{ fontSize: 10, color: "#3c3c4399", marginTop: 8 }}>
            {item.availableCopies}/{item.totalCopies} cuốn
          </Text>
        </TouchableOpacity>
      );
    }
  };

  const renderFilterTabs = () => {
    const filters = [
      { key: "all", label: "Tất cả" },
      { key: "technology", label: "Công nghệ" },
      { key: "science", label: "Khoa học" },
      { key: "design", label: "Thiết kế" },
      { key: "business", label: "Kinh doanh" },
      { key: "available", label: "Có sẵn" },
    ];

    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterTabs}
      >
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter.key}
            style={[
              styles.filterTab,
              currentFilter === filter.key && styles.filterTabActive,
            ]}
            onPress={() => setCurrentFilter(filter.key)}
          >
            <Text
              style={[
                styles.filterTabText,
                currentFilter === filter.key && styles.filterTabTextActive,
              ]}
            >
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  const renderViewToggle = () => (
    <View style={styles.viewToggle}>
      <TouchableOpacity
        style={[
          styles.viewButton,
          currentView === "list" && styles.viewButtonActive,
        ]}
        onPress={() => setCurrentView("list")}
      >
        <Text
          style={[
            styles.viewButtonText,
            currentView === "list" && styles.viewButtonTextActive,
          ]}
        >
          ☰
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.viewButton,
          currentView === "grid" && styles.viewButtonActive,
        ]}
        onPress={() => setCurrentView("grid")}
      >
        <Text
          style={[
            styles.viewButtonText,
            currentView === "grid" && styles.viewButtonTextActive,
          ]}
        >
          □
        </Text>
      </TouchableOpacity>
    </View>
  );

  const toggleSearchInput = () => {
    setShowSearchInput(!showSearchInput);
  };

  return (
    <View style={styles.container}>
      {/* Status Bar */}
      <View style={styles.statusBar}>
        <Text style={styles.statusBarTime}>
          {currentTime.getHours().toString().padStart(2, "0")}:
          {currentTime.getMinutes().toString().padStart(2, "0")}
        </Text>
        <View style={styles.statusBarIcons}>
          <Text>📶</Text>
          <Text>📶</Text>
          <Text>🔋</Text>
        </View>
      </View>

      {/* Navigation Bar */}
      <View style={styles.navigationBar}>
        <Text style={styles.navTitle}>Thư viện sách</Text>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => navigation.navigate("Cart")}
          >
            <Text style={styles.navButtonText}>🛒</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navButton}
            onPress={toggleSearchInput}
          >
            <Text style={styles.navButtonText}>🔍</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Input - toggled */}
      {showSearchInput && (
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm sách, tác giả, NXB..."
            placeholderTextColor="#3c3c4399"
            value={query}
            onChangeText={setQuery}
            autoFocus={true}
          />
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setShowFilterModal(true)}
          >
            <Text style={styles.filterButtonText}>Bộ lọc</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Filter Modal */}
      <Modal
        visible={showFilterModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowFilterModal(false)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
          }}
        >
          <View
            style={{
              width: "100%",
              backgroundColor: "#fff",
              borderRadius: 12,
              padding: 20,
              maxHeight: "80%",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "600",
                marginBottom: 20,
                textAlign: "center",
              }}
            >
              Bộ lọc
            </Text>

            {/* Filter options */}
            <ScrollView>
              {[
                "all",
                "technology",
                "science",
                "design",
                "business",
                "available",
              ].map((filterKey) => (
                <TouchableOpacity
                  key={filterKey}
                  style={[
                    styles.filterChip,
                    currentFilter === filterKey && styles.filterChipSelected,
                    { marginBottom: 12 },
                  ]}
                  onPress={() => setCurrentFilter(filterKey)}
                >
                  <Text
                    style={[
                      styles.filterChipText,
                      currentFilter === filterKey &&
                        styles.filterChipTextSelected,
                    ]}
                  >
                    {
                      {
                        all: "Tất cả",
                        technology: "Công nghệ",
                        science: "Khoa học",
                        design: "Thiết kế",
                        business: "Kinh doanh",
                        available: "Có sẵn",
                      }[filterKey]
                    }
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <TouchableOpacity
              style={{
                marginTop: 20,
                backgroundColor: "#007aff",
                paddingVertical: 12,
                borderRadius: 10,
                alignItems: "center",
              }}
              onPress={() => setShowFilterModal(false)}
            >
              <Text style={{ color: "#fff", fontWeight: "600", fontSize: 16 }}>
                Đóng
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Filter Header */}
      <View style={styles.filterHeader}>
        <View style={styles.filterRow}>{renderFilterTabs()}</View>

        <View style={styles.filterRow}>
          <TouchableOpacity style={styles.sortButton} onPress={toggleSort}>
            <Text style={styles.sortButtonText}>{getSortText()}</Text>
          </TouchableOpacity>

          {renderViewToggle()}
        </View>
      </View>

      {/* Content Area */}
      <View style={styles.contentArea}>
        {/* Stats Bar */}
        <View style={styles.statsBar}>
          <Text style={styles.statsText}>
            Tổng: {filteredBooks.length} cuốn sách
          </Text>
          <Text style={styles.statsText}>
            Có sẵn:{" "}
            {filteredBooks.filter((book) => book.availableCopies > 0).length}{" "}
            cuốn
          </Text>
        </View>

        {/* Book List/Grid */}
        {loading ? (
          <View style={styles.loadingSpinner}>
            <ActivityIndicator size="large" color="#007aff" />
            <Text style={styles.loadingText}>Đang tải...</Text>
          </View>
        ) : currentView === "list" ? (
          <View style={styles.iosList}>
            <FlatList
              data={filteredBooks}
              keyExtractor={(item, index) =>
                item.id ? item.id.toString() : index.toString()
              }
              renderItem={renderBookItem}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>Không tìm thấy sách nào</Text>
                  <Text style={styles.emptySubtext}>
                    Thử thay đổi từ khóa hoặc bộ lọc
                  </Text>
                </View>
              }
            />
          </View>
        ) : (
          <FlatList
            data={filteredBooks}
            keyExtractor={(item, index) =>
              item.id ? item.id.toString() : index.toString()
            }
            renderItem={renderBookItem}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.gridView}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>Không tìm thấy sách nào</Text>
                <Text style={styles.emptySubtext}>
                  Thử thay đổi từ khóa hoặc bộ lọc
                </Text>
              </View>
            }
          />
        )}
      </View>
    </View>
  );
};

export default SearchScreen;
