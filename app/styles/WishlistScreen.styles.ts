import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#be123c",
  },
  countText: {
    fontSize: 14,
    color: "#6b7280",
  },
  bookCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 14,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  bookCover: {
    width: 64,
    height: 90,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  bookEmoji: {
    fontSize: 26,
    color: "#fff",
    fontWeight: "bold",
  },
  bookInfo: {
    flex: 1,
    justifyContent: "center",
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 2,
  },
  bookAuthor: {
    fontSize: 13,
    color: "#6b7280",
    marginBottom: 4,
  },
  availableText: { color: "#22c55e", fontSize: 13, marginBottom: 6 },
  unavailableText: { color: "#dc2626", fontSize: 13, marginBottom: 6 },
  limitedText: { color: "#f97316", fontSize: 13, marginBottom: 6 },
  actionRow: {
    flexDirection: "row",
    marginTop: 6,
    alignItems: "center",
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 8,
  },
  borrowBtn: { backgroundColor: "#3b82f6" },
  borrowBtnText: { color: "#fff", fontWeight: "600", fontSize: 13 },
  disabledBtn: { backgroundColor: "#d1d5db" },
  disabledBtnText: { color: "#6b7280", fontSize: 13, fontWeight: "600" },
  removeBtn: { backgroundColor: "#fee2e2" },
  removeBtnText: { color: "#dc2626", fontWeight: "700", fontSize: 14 },
  emptyBox: {
    alignItems: "center",
    marginTop: 60,
  },
  emptyText: {
    fontSize: 16,
    color: "#6b7280",
    marginBottom: 12,
  },
});
