import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  headerGradient: {
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  header: {
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 8,
    textShadowColor: "rgba(0,0,0,0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "rgba(255,255,255,0.9)",
    textAlign: "center",
  },
  searchSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginTop: -20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchInputWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 10,
    color: "rgba(255,255,255,0.8)",
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#fff",
    paddingVertical: 0,
  },
  filterToggle: {
    borderRadius: 20,
    overflow: "hidden",
  },
  filterToggleGradient: {
    padding: 12,
    alignItems: "center",
  },
  filterToggleText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  filtersSection: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  filtersContainer: {
    borderRadius: 15,
    padding: 20,
  },
  filtersTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 15,
    textShadowColor: "rgba(0,0,0,0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 10,
    marginTop: 10,
  },
  filterScroll: {
    marginBottom: 10,
  },
  filterChip: {
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  filterChipActive: {
    backgroundColor: "#667eea",
    borderColor: "#667eea",
  },
  filterChipText: {
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
    fontWeight: "500",
  },
  filterChipTextActive: {
    color: "#fff",
    fontWeight: "bold",
  },
  resultsSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  resultsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  resultsCount: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2d3748",
  },
  clearFilters: {
    backgroundColor: "#e2e8f0",
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  clearFiltersText: {
    fontSize: 12,
    color: "#4a5568",
    fontWeight: "500",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 50,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#667eea",
  },
  booksList: {
    paddingBottom: 20,
  },
  bookCard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: "hidden",
  },
  bookCardGradient: {
    flexDirection: "row",
    padding: 15,
  },
  bookImage: {
    width: 80,
    height: 120,
    borderRadius: 8,
    marginRight: 15,
  },
  bookImagePlaceholder: {
    width: 80,
    height: 120,
    borderRadius: 8,
    backgroundColor: "rgba(102,126,234,0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  placeholderText: {
    fontSize: 24,
    color: "#667eea",
  },
  bookInfo: {
    flex: 1,
    justifyContent: "center",
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2d3748",
    marginBottom: 4,
  },
  bookAuthor: {
    fontSize: 14,
    color: "#718096",
    marginBottom: 6,
  },
  bookMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  bookDetails: {
    fontSize: 12,
    color: "#a0aec0",
    flex: 1,
  },
  categoryBadge: {
    backgroundColor: "#edf2f7",
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  bookCategory: {
    fontSize: 10,
    color: "#4a5568",
    fontWeight: "500",
  },
  bookRating: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 12,
    color: "#ffa500",
    fontWeight: "bold",
  },
  availabilityText: {
    fontSize: 12,
    color: "#48bb78",
    fontWeight: "500",
  },
  emptyContainer: {
    alignItems: "center",
    paddingVertical: 50,
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: 10,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2d3748",
    marginBottom: 5,
  },
  emptySubtitle: {
    fontSize: 14,
    color: "#718096",
    textAlign: "center",
    marginBottom: 20,
  },
  emptyButton: {
    backgroundColor: "#667eea",
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  emptyButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default styles;
