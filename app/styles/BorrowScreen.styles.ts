import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f9fafb" },

  // Tổng quan
  overviewCard: {
    backgroundColor: "#e0f2fe",
    padding: 18,
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  overviewTitle: {
    fontWeight: "700",
    color: "#075985",
    fontSize: 16,
    marginBottom: 6,
  },
  overviewText: { color: "#0369a1", fontSize: 14 },

  // Section
  sectionTitle: {
    fontWeight: "700",
    fontSize: 18,
    marginBottom: 14,
    color: "#111827",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 4,
    marginBottom: 14,
  },
  toggleIcon: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#6b7280",
    paddingHorizontal: 8,
  },

  // Book card
  bookCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 18,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  dueSoonCard: {
    backgroundColor: "#fff7ed",
    borderWidth: 1,
    borderColor: "#fdba74",
  },
  overdueCard: {
    backgroundColor: "#fef2f2",
    borderWidth: 2,
    borderColor: "#ef4444",
  },
  bookHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  bookTitle: { fontWeight: "700", fontSize: 16, color: "#111827" },
  bookMeta: { color: "#6b7280", marginTop: 4, fontSize: 13 },
  bookNote: {
    color: "#9ca3af",
    fontSize: 12,
    marginTop: 4,
    fontStyle: "italic",
  },

  // Badge
  badgeDanger: {
    fontSize: 12,
    backgroundColor: "#fed7aa",
    color: "#9a3412",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    overflow: "hidden",
    fontWeight: "600",
  },
  badgeSuccess: {
    fontSize: 12,
    backgroundColor: "#bbf7d0",
    color: "#166534",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    overflow: "hidden",
    fontWeight: "600",
  },
  badgeSecondary: {
    fontSize: 12,
    backgroundColor: "#e5e7eb",
    color: "#374151",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    overflow: "hidden",
    fontWeight: "600",
  },
  badgeOverdue: {
    fontSize: 12,
    backgroundColor: "#fecaca",
    color: "#dc2626",
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
  renewBtn: { backgroundColor: "#3b82f6" },
  returnBtn: { backgroundColor: "#22c55e" },
  urgentBtn: { backgroundColor: "#ef4444" },
  actionText: { color: "#fff", fontWeight: "700", fontSize: 14 },

  // Loading state
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#6b7280",
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
    color: "#374151",
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#9ca3af",
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
    backgroundColor: "#3b82f6",
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
    color: "#374151",
    minWidth: 60,
    textAlign: "center",
  },
});
