import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9fafb", padding: 16 },

  // Welcome
  welcomeCard: { borderRadius: 20, padding: 16, marginBottom: 20 },
  welcomeTop: { flexDirection: "row", alignItems: "center", marginBottom: 16 },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "#fff",
    marginRight: 12, // 👈 thêm khoảng cách với chữ
  },
  onlineDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#22c55e",
    position: "absolute",
    top: 2,
    right: 2,
    borderWidth: 2,
    borderColor: "#fff",
  },
  welcomeTitle: { color: "#fff", fontSize: 20, fontWeight: "700" },
  welcomeName: { color: "#fff", fontSize: 24, fontWeight: "800", marginTop: 2 },
  badgesRow: { flexDirection: "row", marginTop: 6 },
  badge: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  badgeText: { color: "#fff", fontWeight: "600", fontSize: 12 },

  statsRow: { flexDirection: "row", justifyContent: "space-between" },
  statBox: {
    flex: 1,
    borderRadius: 16,
    padding: 12,
    marginHorizontal: 4,
    alignItems: "center",
  },
  statNum: { fontSize: 22, fontWeight: "800" },
  statLabel: { color: "#fff", marginTop: 4, fontWeight: "600" },
  statSub: { color: "#fff", opacity: 0.8, fontSize: 12 },

  // Section
  section: { marginBottom: 24 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  sectionTitle: { fontSize: 18, fontWeight: "800", color: "#111827" },
  sectionLink: { color: "#3b82f6", fontWeight: "600" },

  // Book
  bookCard: {
    flexDirection: "row",
    marginBottom: 16,
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 16,
    shadowOpacity: 0.05,
    elevation: 2,
  },
  bookSpine: {
    width: 80,
    height: 100,
    borderRadius: 12,
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  spineIcon: { fontSize: 22, color: "#fff" },
  bookTitle: { fontSize: 16, fontWeight: "700", color: "#111827" },
  bookAuthor: { color: "#6b7280", marginBottom: 4 },
  bookMeta: { flexDirection: "row", alignItems: "center", marginBottom: 6 },
  bookStatus: {
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
    overflow: "hidden",
  },
  bookRating: { marginLeft: 8, color: "#6b7280" },
  borrowBtn: {
    backgroundColor: "#3b82f6",
    borderRadius: 8,
    paddingHorizontal: 10, // 👈 giảm padding
    paddingVertical: 5,
    marginTop: 4,
    alignSelf: "flex-start", // 👈 co lại theo nội dung
  },
  borrowBtnText: { color: "#fff", fontWeight: "600", fontSize: 13 }, // 👈 chữ nhỏ hơn

  // Notice
  noticeCard: {
    backgroundColor: "#fefce8",
    padding: 12,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 8,
  },
  noticeIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#facc15",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  noticeBtn: {
    marginTop: 8,
    backgroundColor: "#facc15",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  noticeBtnText: { color: "#78350f", fontWeight: "600" },

  // AI
  aiCard: { borderRadius: 20, padding: 16, marginBottom: 24 },
  aiIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  aiBook: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.1)",
    padding: 12,
    borderRadius: 16,
  },
  aiBookSpine: {
    width: 48,
    height: 64,
    borderRadius: 8,
    backgroundColor: "#fbbf24",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  aiBadge: {
    fontSize: 12,
    color: "#fff",
    marginRight: 8,
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 999,
  },
  aiBtn: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: "flex-start",
  },

  // Goals
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  goalCard: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 4,
    alignItems: "center",
    justifyContent: "center", // 👈 giữ nội dung giữa
    minHeight: 140, // 👈 tránh mất phần dưới
  },
  goalTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
    marginVertical: 6,
  },
  // Goals Progress
  progressBar: {
    width: "100%",
    height: 8,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.3)",
    marginTop: 8,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 999,
    backgroundColor: "#facc15", // vàng mặc định, có thể đổi gradient
  },
  goalSub: {
    fontSize: 12,
    color: "rgba(255,255,255,0.8)",
    marginTop: 6,
  },
  rankTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 4,
  },
  rankLevel: {
    fontSize: 14,
    color: "rgba(255,255,255,0.9)",
    marginBottom: 2,
  },
  rankSub: {
    fontSize: 12,
    color: "rgba(255,255,255,0.7)",
  },
  rankDots: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 8,
  },
  rankDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 2,
  },

  // Quick Actions
  quickCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 20,
    marginBottom: 24,
  },
  quickTitle: { fontSize: 16, fontWeight: "700", marginBottom: 12 },
  quickRow: { flexDirection: "row" },
  quickBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    padding: 12,
    marginRight: 8,
  },
  quickIcon: { fontSize: 22, marginRight: 8 },
  quickLabel: { fontWeight: "700", color: "#111827" },
  quickSub: { fontSize: 12, color: "#6b7280" },
});
