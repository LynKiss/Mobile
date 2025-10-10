import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "transparent" },

  // Tổng quan
  overviewCard: {
    backgroundColor: "#f0ece5",
    padding: 18,
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#e5e5e5",
  },
  overviewTitle: {
    fontWeight: "700",
    color: "#2b3a4a",
    fontSize: 16,
    marginBottom: 6,
  },
  overviewText: { color: "#3b4c5e", fontSize: 14 },

  // Section
  sectionTitle: {
    fontWeight: "700",
    fontSize: 18,
    marginBottom: 14,
    color: "#202124",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 4,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e5e5",
  },
  toggleIcon: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#6b7280",
    paddingHorizontal: 8,
  },

  // Book card
  bookCard: {
    backgroundColor: "#f7f4ee",
    borderRadius: 16,
    padding: 16,
    marginBottom: 18,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#e5e5e5",
  },
  dueSoonCard: {
    backgroundColor: "#f7f4ee",
    borderWidth: 1,
    borderColor: "#d0d0d0",
  },
  overdueCard: {
    backgroundColor: "#FDECEC", // light red tint
    borderWidth: 1,
    borderColor: "#F5BDBB", // soft red border
  },
  bookHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  bookTitle: { fontWeight: "700", fontSize: 16, color: "#202124" },
  bookMeta: { color: "#4b5563", marginTop: 4, fontSize: 13 },
  bookNote: {
    color: "#777e88",
    fontSize: 12,
    marginTop: 4,
    fontStyle: "italic",
  },

  // Badge
  badgeDanger: {
    fontSize: 12,
    backgroundColor: "#ffffff",
    color: "#1f1f1f",
    borderWidth: 1,
    borderColor: "#bdbdbd",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    overflow: "hidden",
    fontWeight: "600",
  },
  badgeSuccess: {
    fontSize: 12,
    backgroundColor: "#ffffff",
    color: "#1f1f1f",
    borderWidth: 1,
    borderColor: "#cfcfcf",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    overflow: "hidden",
    fontWeight: "600",
  },
  badgeSecondary: {
    fontSize: 12,
    backgroundColor: "#ffffff",
    color: "#1f1f1f",
    borderWidth: 1,
    borderColor: "#e5e5e5",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    overflow: "hidden",
    fontWeight: "600",
  },
  badgeOverdue: {
    fontSize: 12,
    backgroundColor: "#FDE1E0", // lighter red badge bg
    color: "#B54D4A", // muted red text
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    overflow: "hidden",
    fontWeight: "600",
  },

  // Actions
  actionRow: { flexDirection: "row", marginTop: 12 },
  actionBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    marginRight: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  renewBtn: { backgroundColor: "#222222" },
  returnBtn: { backgroundColor: "#444444" },
  urgentBtn: { backgroundColor: "#000000" },
  actionText: { color: "#fff", fontWeight: "700", fontSize: 14 },

  // Loading state
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#4b5563",
    textAlign: "center",
  },

  // Empty state
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#202124",
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#777e88",
    textAlign: "center",
  },

  // Pagination
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 16,
    paddingHorizontal: 16,
  },
  paginationBtn: {
    backgroundColor: "#3b4c5e",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    minWidth: 80,
    alignItems: "center",
  },
  paginationBtnDisabled: {
    backgroundColor: "#d1d5db",
  },
  paginationText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  paginationTextDisabled: {
    color: "#9ca3af",
  },
  paginationInfo: {
    fontSize: 14,
    fontWeight: "600",
    color: "#3b4c5e",
    minWidth: 60,
    textAlign: "center",
  },
});
