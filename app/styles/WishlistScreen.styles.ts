import { StyleSheet } from "react-native";
import theme from "./theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing.lg,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: theme.colors.primary,
  },
  countText: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    fontWeight: "600",
  },
  bookCard: {
    flexDirection: "row",
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    ...theme.shadows.medium,
  },
  bookCover: {
    width: 80,
    height: 110,
    borderRadius: theme.borderRadius.md,
    alignItems: "center",
    justifyContent: "center",
    marginRight: theme.spacing.md,
  },
  bookEmoji: {
    fontSize: 32,
    color: "#fff",
    fontWeight: "bold",
  },
  bookInfo: {
    flex: 1,
    justifyContent: "center",
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  bookAuthor: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.sm,
  },
  availableText: {
    color: theme.colors.success,
    fontSize: 14,
    fontWeight: "600",
    marginBottom: theme.spacing.sm,
  },
  unavailableText: {
    color: theme.colors.danger,
    fontSize: 14,
    fontWeight: "600",
    marginBottom: theme.spacing.sm,
  },
  limitedText: {
    color: theme.colors.warning,
    fontSize: 14,
    fontWeight: "600",
    marginBottom: theme.spacing.sm,
  },
  actionRow: {
    flexDirection: "row",
    marginTop: theme.spacing.sm,
    alignItems: "center",
  },
  button: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    marginRight: theme.spacing.sm,
    alignItems: "center",
    justifyContent: "center",
  },
  borrowBtn: {
    backgroundColor: theme.colors.primary,
    ...theme.shadows.light,
  },
  borrowBtnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },
  disabledBtn: {
    backgroundColor: theme.colors.border,
  },
  disabledBtnText: {
    color: theme.colors.textSecondary,
    fontSize: 14,
    fontWeight: "600",
  },
  removeBtn: {
    backgroundColor: "#fee2e2",
    borderWidth: 1,
    borderColor: theme.colors.danger,
  },
  removeBtnText: {
    color: theme.colors.danger,
    fontWeight: "700",
    fontSize: 16,
  },
  emptyBox: {
    alignItems: "center",
    marginTop: 80,
  },
  emptyText: {
    fontSize: 18,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.md,
    fontWeight: "600",
  },
  bookCoverImage: {
    width: "100%",
    height: "100%",
    borderRadius: theme.borderRadius.md,
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: theme.spacing.md,
    fontSize: 16,
    color: theme.colors.textSecondary,
  },
});
