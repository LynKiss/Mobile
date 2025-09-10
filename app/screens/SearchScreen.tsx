import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";
import { useTheme } from "../contexts/ThemeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
    ? { uri: "http://160.250.132.142/uploads/" + book.hinh_bia }
    : book.image || null,
});

const SearchScreen = ({ navigation, route }: any) => {
  const { theme } = useTheme();
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(query); // debounce
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [selectedYear, setSelectedYear] = useState("Tất cả");
  const [showFilters, setShowFilters] = useState(false);
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const featuredOnly = route.params?.featuredOnly || false;

  // debounce query
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedQuery(query);
    }, 400);
    return () => clearTimeout(timeout);
  }, [query]);

  useEffect(() => {
    // Always fetch all books on mount
    fetchAllBooks();
  }, []);

  const fetchAllBooks = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("userToken");
      const response = await fetch("http://160.250.132.142/api/sach", {
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
  // Danh sách thể loại & năm
  const [categories, setCategories] = useState<string[]>([]);
  const [years, setYears] = useState<string[]>([
    "Tất cả",
    "2023",
    "2022",
    "2021",
    "2020",
  ]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const response = await fetch("http://160.250.132.142/api/the_loai", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        const categoryNames = data.map((cat: any) => cat.ten_the_loai);
        setCategories(["Tất cả", ...categoryNames]);
      } else {
        console.error("Failed to fetch categories:", response.status);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Lọc sách
  const getFilteredBooks = () => {
    return books.filter((book) => {
      const matchesQuery =
        debouncedQuery.trim() === "" ||
        book.title.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        book.publisher.toLowerCase().includes(debouncedQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "Tất cả" || book.category === selectedCategory;

      const matchesYear =
        selectedYear === "Tất cả" || book.year === selectedYear;

      return matchesQuery && matchesCategory && matchesYear;
    });
  };

  const filteredBooks = getFilteredBooks();

  // Render item sách
  const renderBookItem = ({ item }: any) => (
    <TouchableOpacity
      style={[styles.bookCard, { backgroundColor: theme.colors.surface }]}
      onPress={() => navigation.navigate("BookDetail", { book: item })}
    >
      {item.image ? (
        <Image source={item.image} style={styles.bookImage} />
      ) : (
        <View style={styles.bookImagePlaceholder} />
      )}
      <View style={styles.bookInfo}>
        <Text
          style={[styles.bookTitle, { color: theme.colors.text }]}
          numberOfLines={2}
        >
          {item.title}
        </Text>
        <Text
          style={[styles.bookAuthor, { color: theme.colors.textSecondary }]}
        >
          {item.author}
        </Text>
        <Text
          style={[styles.bookDetails, { color: theme.colors.textSecondary }]}
        >
          {item.publisher} • {item.year}
        </Text>
        <Text style={[styles.bookCategory, { color: theme.colors.primary }]}>
          {item.category}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      {/* Thanh tìm kiếm */}
      <View style={styles.searchContainer}>
        <TextInput
          style={[
            styles.searchInput,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
              color: theme.colors.text,
            },
          ]}
          placeholder="Tìm kiếm sách, tác giả, NXB..."
          placeholderTextColor={theme.colors.textSecondary}
          value={query}
          onChangeText={setQuery}
        />
        <TouchableOpacity
          style={[
            styles.filterButton,
            { backgroundColor: theme.colors.primary },
          ]}
          onPress={() => setShowFilters(!showFilters)}
        >
          <Text
            style={[styles.filterButtonText, { color: theme.colors.surface }]}
          >
            🔍 Bộ lọc
          </Text>
        </TouchableOpacity>
      </View>

      {/* Bộ lọc */}
      {showFilters && (
        <View
          style={[
            styles.filtersContainer,
            { backgroundColor: theme.colors.surface },
          ]}
        >
          <Text style={[styles.filterTitle, { color: theme.colors.text }]}>
            Bộ lọc nâng cao
          </Text>

          {/* Thể loại */}
          <Text style={[styles.filterLabel, { color: theme.colors.text }]}>
            Thể loại:
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.filterChip,
                  {
                    backgroundColor:
                      selectedCategory === category
                        ? theme.colors.primary
                        : theme.colors.surface,
                  },
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text
                  style={{
                    color:
                      selectedCategory === category
                        ? theme.colors.surface
                        : theme.colors.text,
                  }}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Năm xuất bản */}
          <Text style={[styles.filterLabel, { color: theme.colors.text }]}>
            Năm xuất bản:
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {years.map((year) => (
              <TouchableOpacity
                key={year}
                style={[
                  styles.filterChip,
                  {
                    backgroundColor:
                      selectedYear === year
                        ? theme.colors.primary
                        : theme.colors.surface,
                  },
                ]}
                onPress={() => setSelectedYear(year)}
              >
                <Text
                  style={{
                    color:
                      selectedYear === year
                        ? theme.colors.surface
                        : theme.colors.text,
                  }}
                >
                  {year}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Kết quả */}
      <View style={styles.resultsContainer}>
        <Text
          style={[styles.resultsCount, { color: theme.colors.textSecondary }]}
        >
          Tìm thấy {filteredBooks.length} kết quả
        </Text>

        {loading ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator size="large" color={theme.colors.primary} />
          </View>
        ) : (
          <FlatList
            data={filteredBooks}
            keyExtractor={(item, index) =>
              item.id ? item.id.toString() : index.toString()
            }
            renderItem={renderBookItem}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={[styles.emptyText, { color: theme.colors.text }]}>
                  Không tìm thấy sách nào
                </Text>
                <Text
                  style={[
                    styles.emptySubtext,
                    { color: theme.colors.textSecondary },
                  ]}
                >
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

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15 },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    marginRight: 10,
  },
  filterButton: { paddingHorizontal: 15, paddingVertical: 12, borderRadius: 8 },
  filterButtonText: { fontSize: 14, fontWeight: "bold" },
  filtersContainer: { padding: 15, borderRadius: 8, marginBottom: 15 },
  filterTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 15 },
  filterLabel: { fontSize: 16, fontWeight: "bold", marginBottom: 8 },
  filterChip: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
  },
  resultsContainer: { flex: 1 },
  resultsCount: { fontSize: 16, marginBottom: 15 },
  bookCard: {
    flexDirection: "row",
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bookImage: { width: 60, height: 80, borderRadius: 4, marginRight: 15 },
  bookImagePlaceholder: {
    width: 60,
    height: 80,
    backgroundColor: "#eee",
    borderRadius: 4,
    marginRight: 15,
  },
  bookInfo: { flex: 1, justifyContent: "center" },
  bookTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 4 },
  bookAuthor: { fontSize: 14, marginBottom: 2 },
  bookDetails: { fontSize: 12, marginBottom: 2 },
  bookCategory: { fontSize: 12, fontWeight: "bold" },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 50,
  },
  emptyText: { fontSize: 18, marginBottom: 8 },
  emptySubtext: { fontSize: 14, textAlign: "center" },
});

export default SearchScreen;
