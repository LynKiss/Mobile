import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

// ===== MÀU SẮC CHUNG =====
export const MAU_SAC = {
  trang: "#FFFFFF",
  den: "#000000",
  do: "#EF4444",
  xanhDuong: "#3B82F6",
  xanhLa: "#10B981",
  cam: "#F59E0B",
  tim: "#8B5CF6",
  xanhNhat: "#06B6D4",
  xamNhat: "#F3F4F6",
  xamTrung: "#6B7280",
  xamDam: "#1F2937",
  trongSuot: "rgba(255,255,255,0.9)",
  trongSuotDen: "rgba(0,0,0,0.1)",
  trongSuotXanh: "rgba(59,130,246,0.1)",
} as const;

// ===== KIỂU CHỮ CHUNG =====
export const KIEU_CHU = {
  lonNhat: 32,
  lon: 24,
  trungBinhLon: 20,
  trungBinh: 18,
  nho: 16,
  nhoHon: 14,
  nhoNhat: 12,
} as const;

// ===== KIỂU CHỮ CHUNG =====
export const KHOANG_CACH = {
  nho: 4,
  trungBinh: 8,
  lon: 12,
  lonHon: 16,
  ratLon: 20,
  ratLonHon: 30,
} as const;

// ===== BO TRÒN CHUNG =====
export const BO_TRON = {
  nho: 4,
  trungBinh: 8,
  lon: 12,
  ratLon: 20,
  tronHoanToan: 40,
} as const;

// ===== ĐỘ DÀY VIỀN =====
export const DO_DAY_VIEN = {
  mong: 1,
  trungBinh: 2,
  day: 3,
} as const;

// ===== HIỆU ỨNG BÓNG =====
export const HIEU_UNG_BONG = {
  nhe: {
    shadowColor: MAU_SAC.den,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  trungBinh: {
    shadowColor: MAU_SAC.den,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  manh: {
    shadowColor: MAU_SAC.den,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
} as const;

// ===== STYLES CHÍNH =====
export const styles = StyleSheet.create({
  // ===== CONTAINER CHÍNH =====
  container: {
    flex: 1,
  },

  khungCuon: {
    flex: 1,
  },

  // ===== HEADER BAR =====
  headerBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: KHOANG_CACH.ratLon,
    paddingVertical: KHOANG_CACH.trungBinh,
    borderBottomWidth: DO_DAY_VIEN.mong,
    borderBottomColor: MAU_SAC.trongSuotDen,
  },

  tieuDeHeader: {
    fontSize: KIEU_CHU.trungBinh,
    fontWeight: "bold",
  },

  nutQuayLai: {
    padding: KHOANG_CACH.nho,
  },

  // ===== KHUNG CHÍNH =====
  khungHeader: {
    padding: KHOANG_CACH.ratLon,
  },

  // ===== THÔNG TIN NGƯỜI DÙNG =====
  thongTinNguoiDung: {
    alignItems: "center",
    marginBottom: KHOANG_CACH.ratLonHon,
  },

  avatarContainer: {
    position: "relative",
    marginBottom: KHOANG_CACH.ratLon,
  },

  avatar: {
    width: 80,
    height: 80,
    borderRadius: BO_TRON.tronHoanToan,
    backgroundColor: MAU_SAC.xanhDuong,
    justifyContent: "center",
    alignItems: "center",
    ...HIEU_UNG_BONG.manh,
  },

  chuCaiAvatar: {
    fontSize: KIEU_CHU.lonNhat,
    fontWeight: "bold",
    color: MAU_SAC.trang,
  },

  trangThaiOnline: {
    position: "absolute",
    bottom: KHOANG_CACH.nho,
    right: KHOANG_CACH.nho,
    width: KHOANG_CACH.ratLon,
    height: KHOANG_CACH.ratLon,
    borderRadius: BO_TRON.tronHoanToan / 2,
    backgroundColor: MAU_SAC.xanhLa,
    borderWidth: DO_DAY_VIEN.day,
    borderColor: MAU_SAC.trang,
  },

  tenNguoiDung: {
    fontSize: KIEU_CHU.lon,
    fontWeight: "bold",
    color: MAU_SAC.xamDam,
    marginBottom: KHOANG_CACH.nho,
  },

  emailNguoiDung: {
    fontSize: KIEU_CHU.nho,
    color: MAU_SAC.xamTrung,
    marginBottom: KHOANG_CACH.trungBinh,
  },

  hangThanhVien: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: MAU_SAC.cam,
    paddingHorizontal: KHOANG_CACH.trungBinh,
    paddingVertical: KHOANG_CACH.nho,
    borderRadius: KHOANG_CACH.ratLon,
  },

  chuHangThanhVien: {
    color: MAU_SAC.trang,
    fontSize: KIEU_CHU.nhoHon,
    fontWeight: "600",
    marginLeft: KHOANG_CACH.nho,
  },

  // ===== KHUNG THỐNG KÊ =====
  khungThongKe: {
    flexDirection: "row",
    backgroundColor: MAU_SAC.trongSuot,
    borderRadius: BO_TRON.lon,
    padding: KHOANG_CACH.ratLon,
    marginBottom: KHOANG_CACH.ratLon,
    ...HIEU_UNG_BONG.trungBinh,
  },

  theThongKe: {
    flex: 1,
    alignItems: "center",
  },

  soThongKe: {
    fontSize: 28,
    fontWeight: "bold",
    color: MAU_SAC.xanhDuong,
    marginBottom: KHOANG_CACH.nho,
  },

  nhanThongKe: {
    fontSize: KIEU_CHU.nhoHon,
    color: MAU_SAC.xamTrung,
    marginBottom: KHOANG_CACH.nho,
  },

  ghiChuThongKe: {
    fontSize: KIEU_CHU.nhoNhat,
    color: "#9CA3AF",
  },

  // ===== KHUNG THÀNH TÍCH =====
  khungThanhTich: {
    backgroundColor: MAU_SAC.trongSuot,
    borderRadius: BO_TRON.lon,
    padding: KHOANG_CACH.ratLon,
    marginBottom: KHOANG_CACH.ratLon,
    ...HIEU_UNG_BONG.trungBinh,
  },

  tieuDeThanhTich: {
    fontSize: KIEU_CHU.trungBinh,
    fontWeight: "bold",
    color: MAU_SAC.xamDam,
    marginBottom: BO_TRON.lon,
  },

  danhSachThanhTich: {
    flexDirection: "row",
    justifyContent: "space-around",
  },

  thanhTich: {
    alignItems: "center",
  },

  iconThanhTich: {
    fontSize: KIEU_CHU.trungBinhLon,
    marginBottom: KHOANG_CACH.nho,
  },

  tenThanhTich: {
    fontSize: KIEU_CHU.nhoNhat,
    color: MAU_SAC.xamTrung,
  },

  // ===== DANH SÁCH CHỨC NĂNG =====
  danhSachChucNang: {
    gap: KHOANG_CACH.trungBinh,
  },

  nutChucNang: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: MAU_SAC.trongSuot,
    borderRadius: BO_TRON.lon,
    padding: BO_TRON.lon,
    ...HIEU_UNG_BONG.trungBinh,
  },

  iconNut: {
    width: KHOANG_CACH.ratLon * 2.5,
    height: KHOANG_CACH.ratLon * 2.5,
    borderRadius: KHOANG_CACH.ratLon,
    justifyContent: "center",
    alignItems: "center",
    marginRight: BO_TRON.lon,
  },

  thongTinNut: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  tieuDeNut: {
    fontSize: KIEU_CHU.nho,
    fontWeight: "600",
    color: MAU_SAC.xamDam,
  },

  thongBaoNut: {
    flexDirection: "row",
    alignItems: "center",
  },

  dauChamThongBao: {
    width: KHOANG_CACH.nho,
    height: KHOANG_CACH.nho,
    borderRadius: KHOANG_CACH.nho / 2,
    backgroundColor: MAU_SAC.do,
  },

  // ===== KHUNG NHẬP LIỆU =====
  khungNhapLieu: {
    width: "100%",
    marginBottom: KHOANG_CACH.ratLonHon,
  },

  truongNhap: {
    backgroundColor: MAU_SAC.trongSuot,
    borderRadius: KHOANG_CACH.trungBinh,
    padding: BO_TRON.lon,
    marginBottom: KHOANG_CACH.trungBinh,
    ...HIEU_UNG_BONG.nhe,
  },

  nhanTruong: {
    fontSize: KIEU_CHU.nhoHon,
    fontWeight: "600",
    color: MAU_SAC.xamTrung,
    marginBottom: KHOANG_CACH.nho,
  },

  giaTriTruong: {
    fontSize: KIEU_CHU.nho,
    color: MAU_SAC.xamDam,
  },

  // ===== KHUNG NÚT =====
  khungNut: {
    flexDirection: "row",
    gap: KHOANG_CACH.trungBinh,
  },

  nutHuy: {
    flex: 1,
    backgroundColor: "#E5E7EB",
    paddingVertical: BO_TRON.lon,
    borderRadius: KHOANG_CACH.trungBinh,
    alignItems: "center",
  },

  chuNutHuy: {
    fontSize: KIEU_CHU.nho,
    fontWeight: "600",
    color: MAU_SAC.xamTrung,
  },

  nutLuu: {
    flex: 1,
    backgroundColor: MAU_SAC.xanhDuong,
    paddingVertical: BO_TRON.lon,
    borderRadius: KHOANG_CACH.trungBinh,
    alignItems: "center",
  },

  chuNutLuu: {
    fontSize: KIEU_CHU.nho,
    fontWeight: "600",
    color: MAU_SAC.trang,
  },

  // ===== NÚT THAY AVATAR =====
  nutThayAvatar: {
    marginTop: KHOANG_CACH.trungBinh,
  },

  chuNutThayAvatar: {
    fontSize: KIEU_CHU.nhoHon,
    fontWeight: "600",
    color: MAU_SAC.xanhDuong,
  },

  // ===== HEADER THÔNG BÁO =====
  thongBaoHeader: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: MAU_SAC.trongSuotXanh,
    padding: BO_TRON.lon,
    borderRadius: KHOANG_CACH.trungBinh,
    marginBottom: KHOANG_CACH.ratLon,
  },

  tieuDeThongBao: {
    fontSize: KIEU_CHU.nho,
    fontWeight: "600",
    color: "#1E40AF",
    marginLeft: KHOANG_CACH.trungBinh,
    marginBottom: KHOANG_CACH.nho,
  },

  moTaThongBao: {
    fontSize: KIEU_CHU.nhoHon,
    color: MAU_SAC.xanhDuong,
    marginLeft: KHOANG_CACH.trungBinh,
  },

  // ===== DANH SÁCH CÀI ĐẶT =====
  danhSachCaiDat: {
    gap: KHOANG_CACH.trungBinh,
    marginBottom: KHOANG_CACH.ratLonHon,
  },

  itemCaiDatThongBao: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: MAU_SAC.trongSuot,
    borderRadius: KHOANG_CACH.trungBinh,
    padding: BO_TRON.lon,
    ...HIEU_UNG_BONG.nhe,
  },

  thongTinCaiDat: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  tieuDeCaiDat: {
    fontSize: KIEU_CHU.nho,
    fontWeight: "600",
    color: MAU_SAC.xamDam,
    marginLeft: KHOANG_CACH.trungBinh,
  },

  phuDeCaiDat: {
    fontSize: KIEU_CHU.nhoHon,
    color: MAU_SAC.xamTrung,
    marginLeft: KHOANG_CACH.trungBinh,
    marginTop: KHOANG_CACH.nho,
  },

  // ===== NÚT LƯU CÀI ĐẶT =====
  nutLuuCaiDat: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: MAU_SAC.xanhDuong,
    paddingVertical: BO_TRON.lon,
    borderRadius: KHOANG_CACH.trungBinh,
    gap: KHOANG_CACH.nho,
  },

  chuNutLuuCaiDat: {
    fontSize: KIEU_CHU.nho,
    fontWeight: "600",
    color: MAU_SAC.trang,
  },

  // ===== ITEM THÔNG TIN CÁ NHÂN =====
  itemThongTin: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: KHOANG_CACH.trungBinh,
    paddingHorizontal: KHOANG_CACH.trungBinh,
    borderRadius: KHOANG_CACH.nho,
    marginBottom: KHOANG_CACH.nho,
  },

  tieuDeItem: {
    fontSize: KIEU_CHU.nho,
  },

  giaTriItem: {
    fontSize: KIEU_CHU.nho,
  },

  // ===== ITEM CÀI ĐẶT =====
  itemCaiDat: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: KHOANG_CACH.trungBinh,
    paddingHorizontal: KHOANG_CACH.trungBinh,
    borderRadius: KHOANG_CACH.nho,
    marginBottom: KHOANG_CACH.nho,
  },

  giaTriCaiDat: {
    fontSize: KIEU_CHU.trungBinh,
    fontWeight: "bold",
  },

  // ===== NÚT THÔNG BÁO =====
  nutThongBao: {
    position: "relative",
    padding: KHOANG_CACH.nho,
  },

  dauChamThongBaoHeader: {
    position: "absolute",
    top: KHOANG_CACH.nho,
    right: KHOANG_CACH.nho,
    width: KHOANG_CACH.nho,
    height: KHOANG_CACH.nho,
    borderRadius: KHOANG_CACH.nho / 2,
    backgroundColor: MAU_SAC.do,
  },
});

// ===== CONSTANTS CHUNG =====
export const HANG_SO = {
  RONG_MAN_HINH: width,
  CAO_MAN_HINH: height,
  HANG_THANH_VIEN: ["Thường", "Bạc", "Vàng", "Kim Cương", "VIP"],
  MAU_SAC_HANG: {
    Thường: "#6B7280",
    Bạc: "#C0C0C0",
    Vàng: "#F59E0B",
    "Kim Cương": "#10B981",
    VIP: "#8B5CF6",
  },
} as const;

// ===== UTILITY FUNCTIONS =====
export const hamTienIch = {
  layMauHangThanhVien: (hang: string): string => {
    return (
      HANG_SO.MAU_SAC_HANG[hang as keyof typeof HANG_SO.MAU_SAC_HANG] ||
      HANG_SO.MAU_SAC_HANG.Thường
    );
  },

  taoHieuUngBong: (capDo: "nhe" | "trungBinh" | "manh") => {
    return HIEU_UNG_BONG[capDo];
  },

  tinhKichThuocTuongDoi: (tyLe: number): number => {
    return (width * tyLe) / 100;
  },
} as const;
