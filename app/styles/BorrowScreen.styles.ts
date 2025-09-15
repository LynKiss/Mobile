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
  bookHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  bookTitle: { fontWeight: "700", fontSize: 16, color: "#111827" },
  bookMeta: { color: "#6b7280", marginTop: 4, fontSize: 13 },

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
  actionText: { color: "#fff", fontWeight: "700", fontSize: 14 },
});
