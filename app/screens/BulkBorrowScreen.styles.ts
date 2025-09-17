import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f7",
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "700",
    color: "#000000",
    marginBottom: 20,
    textAlign: "center",
  },
  bookItem: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedBookItem: {
    backgroundColor: "#e3f2fd",
    borderColor: "#007aff",
    borderWidth: 2,
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 4,
  },
  bookAuthor: {
    fontSize: 16,
    color: "#3c3c4399",
    marginBottom: 4,
  },
  bookQuantity: {
    fontSize: 14,
    color: "#007aff",
    fontWeight: "500",
  },
  borrowButton: {
    backgroundColor: "#007aff",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#007aff",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  borrowButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default styles;
