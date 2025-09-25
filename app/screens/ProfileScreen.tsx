import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  Switch,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import {
  styles,
  MAU_SAC,
  KIEU_CHU,
  KHOANG_CACH,
  BO_TRON,
  HANG_SO,
  hamTienIch,
} from "../styles/ProfileScreen.styles";

const { width, height } = Dimensions.get("window");

const ProfileScreen = ({ navigation }: any) => {
  const { logout, user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  // ===== STATE QUẢN LÝ =====
  const [manHinhHienTai, setManHinhHienTai] = useState("trangCaNhan");
  const [thongBaoDuocBat, setThongBaoDuocBat] = useState(true);
  const [thongBaoEmail, setThongBaoEmail] = useState(true);

  // ===== DỮ LIỆU MẪU =====
  const thongTinNguoiDung = {
    hoTen: "Nguyễn Văn A",
    email: "nguyenvana@email.com",
    maSinhVien: "SV2024001",
    ngayThamGia: "15/08/2024",
    soSachDaMuon: 24,
    soSachDangMuon: 3,
    hangThanhVien: "VIP",
    diemDanhGia: 4.9,
    chuoiLienTuc: 15,
    hangNguoiDung: "Vàng",
  };

  // ===== XỬ LÝ SỰ KIỆN =====
  const xuLyDangXuat = async () => {
    Alert.alert("Xác nhận đăng xuất", "Bạn có chắc chắn muốn đăng xuất?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Đăng xuất",
        style: "destructive",
        onPress: async () => {
          try {
            await logout();
          } catch (error) {
            Alert.alert("Lỗi", "Có lỗi xảy ra khi đăng xuất");
          }
        },
      },
    ]);
  };

  const xuLyChinhSuaHoSo = () => {
    Alert.alert("Thông báo", "Tính năng chỉnh sửa hồ sơ sẽ được cập nhật sớm!");
  };

  const xuLyDoiMatKhau = () => {
    Alert.alert("Thông báo", "Tính năng đổi mật khẩu sẽ được cập nhật sớm!");
  };

  const xuLyLienHeHoTro = () => {
    Alert.alert(
      "Liên hệ hỗ trợ",
      "📧 Email: support@library.com\n📞 Điện thoại: 1900-xxxx\n💬 Chat: 24/7 trong ứng dụng"
    );
  };

  const xuLyVeUngDung = () => {
    Alert.alert(
      "Về ứng dụng",
      "📚 Thư viện số\n🔖 Phiên bản 1.0.0\n© 2024 Library Management System\n\nỨng dụng quản lý thư viện thông minh với:\n• Mượn trả sách online\n• Đặt chỗ trước\n• Thông báo nhắc nhở\n• Đánh giá sách"
    );
  };

  const xuLyXemThongBao = () => {
    Alert.alert(
      "📬 Danh sách thông báo",
      "🔔 Bạn có 3 thông báo mới:\n\n• 📚 Sách 'Lập trình React Native' sắp hết hạn (2 ngày)\n• ⭐ Đánh giá của bạn cho sách 'JavaScript cơ bản' đã được duyệt\n• 🎉 Chúc mừng! Bạn đã đạt cấp độ VIP\n\n💡 Nhấn vào thông báo để xem chi tiết",
      [
        { text: "Đã hiểu", style: "default" },
        { text: "Xem tất cả", style: "default" },
      ]
    );
  };

  // ===== COMPONENTS TÁI SỬ DỤNG =====
  const ItemThongTinCaNhan = ({ tieuDe, giaTri, coTheNhan }: any) => (
    <TouchableOpacity
      style={[styles.itemThongTin, { backgroundColor: theme.colors.surface }]}
      onPress={coTheNhan ? xuLyChinhSuaHoSo : undefined}
      disabled={!coTheNhan}
    >
      <Text style={[styles.tieuDeItem, { color: theme.colors.text }]}>
        {tieuDe}
      </Text>
      <Text style={[styles.giaTriItem, { color: theme.colors.textSecondary }]}>
        {giaTri}
      </Text>
    </TouchableOpacity>
  );

  const ItemCaiDat = ({ tieuDe, phuDe, giaTri, coCongTac, onPress }: any) => (
    <View
      style={[styles.itemCaiDat, { backgroundColor: theme.colors.surface }]}
    >
      <View style={styles.thongTinCaiDat}>
        <Text style={[styles.tieuDeCaiDat, { color: theme.colors.text }]}>
          {tieuDe}
        </Text>
        {phuDe && (
          <Text
            style={[styles.phuDeCaiDat, { color: theme.colors.textSecondary }]}
          >
            {phuDe}
          </Text>
        )}
      </View>
      {coCongTac ? (
        <Switch
          value={giaTri}
          onValueChange={onPress}
          trackColor={{ false: "#D1D5DB", true: MAU_SAC.xanhDuong }}
          thumbColor={giaTri ? MAU_SAC.trang : "#f4f3f4"}
        />
      ) : (
        <TouchableOpacity onPress={onPress}>
          <Text style={[styles.giaTriCaiDat, { color: theme.colors.primary }]}>
            {giaTri}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const NutChucNang = ({
    tieuDe,
    icon,
    mauSac,
    onPress,
    coThongBao = false,
  }: any) => (
    <TouchableOpacity
      style={[styles.nutChucNang, { backgroundColor: theme.colors.surface }]}
      onPress={onPress}
    >
      <View style={[styles.iconNut, { backgroundColor: mauSac }]}>
        <Ionicons name={icon} size={KIEU_CHU.trungBinh} color={MAU_SAC.trang} />
      </View>
      <View style={styles.thongTinNut}>
        <Text style={[styles.tieuDeNut, { color: theme.colors.text }]}>
          {tieuDe}
        </Text>
        {coThongBao && (
          <View style={styles.thongBaoNut}>
            <View style={styles.dauChamThongBao} />
          </View>
        )}
      </View>
      <Ionicons
        name="chevron-forward"
        size={KIEU_CHU.trungBinh}
        color={theme.colors.textSecondary}
      />
    </TouchableOpacity>
  );

  // ===== MÀN HÌNH CHÍNH =====
  const ManHinhTrangCaNhan = () => (
    <ScrollView style={styles.khungCuon} showsVerticalScrollIndicator={false}>
      <View style={styles.khungHeader}>
        {/* Thông tin người dùng */}
        <View style={styles.thongTinNguoiDung}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.chuCaiAvatar}>
                {thongTinNguoiDung.hoTen.charAt(0)}
              </Text>
            </View>
            <View style={styles.trangThaiOnline} />
          </View>

          <Text style={styles.tenNguoiDung}>{thongTinNguoiDung.hoTen}</Text>
          <Text style={styles.emailNguoiDung}>
            📧 {thongTinNguoiDung.email}
          </Text>

          <View style={styles.hangThanhVien}>
            <Ionicons
              name="star"
              size={KIEU_CHU.nhoHon}
              color={MAU_SAC.trang}
            />
            <Text style={styles.chuHangThanhVien}>
              Độc giả {thongTinNguoiDung.hangThanhVien}
            </Text>
          </View>
        </View>

        {/* Thống kê */}
        <View style={styles.khungThongKe}>
          <View style={styles.theThongKe}>
            <Text style={styles.soThongKe}>
              {thongTinNguoiDung.soSachDaMuon}
            </Text>
            <Text style={styles.nhanThongKe}>📚 Đã mượn</Text>
            <Text style={styles.ghiChuThongKe}>+5 tháng này</Text>
          </View>
          <View style={styles.theThongKe}>
            <Text style={styles.soThongKe}>
              {thongTinNguoiDung.soSachDangMuon}
            </Text>
            <Text style={styles.nhanThongKe}>📖 Đang mượn</Text>
            <Text style={styles.ghiChuThongKe}>Còn 5 ngày</Text>
          </View>
        </View>

        {/* Thành tích */}
        <View style={styles.khungThanhTich}>
          <Text style={styles.tieuDeThanhTich}>🏆 Thành tích</Text>
          <View style={styles.danhSachThanhTich}>
            <View style={styles.thanhTich}>
              <Text style={styles.iconThanhTich}>🏆</Text>
              <Text style={styles.tenThanhTich}>
                Hạng {thongTinNguoiDung.hangNguoiDung}
              </Text>
            </View>
            <View style={styles.thanhTich}>
              <Text style={styles.iconThanhTich}>🔥</Text>
              <Text style={styles.tenThanhTich}>
                Streak {thongTinNguoiDung.chuoiLienTuc} ngày
              </Text>
            </View>
            <View style={styles.thanhTich}>
              <Text style={styles.iconThanhTich}>⭐</Text>
              <Text style={styles.tenThanhTich}>
                {thongTinNguoiDung.diemDanhGia}/5 điểm
              </Text>
            </View>
          </View>
        </View>

        {/* Danh sách chức năng */}
        <View style={styles.danhSachChucNang}>
          <NutChucNang
            tieuDe="Chỉnh sửa thông tin"
            icon="person-outline"
            mauSac={MAU_SAC.xanhDuong}
            onPress={() =>
              Alert.alert("Thông báo", "Tính năng đang phát triển")
            }
          />

          <NutChucNang
            tieuDe="Đổi mật khẩu"
            icon="lock-closed-outline"
            mauSac={MAU_SAC.xanhLa}
            onPress={() =>
              Alert.alert("Thông báo", "Tính năng đang phát triển")
            }
          />

          <NutChucNang
            tieuDe="Cài đặt thông báo"
            icon="notifications-outline"
            mauSac={MAU_SAC.cam}
            onPress={() =>
              Alert.alert("Thông báo", "Tính năng đang phát triển")
            }
            coThongBao={true}
          />

          <NutChucNang
            tieuDe="Lịch sử mượn sách"
            icon="time-outline"
            mauSac={MAU_SAC.tim}
            onPress={() =>
              Alert.alert("Thông báo", "Tính năng đang phát triển")
            }
          />

          <NutChucNang
            tieuDe="Trợ giúp & Hỗ trợ"
            icon="help-circle-outline"
            mauSac={MAU_SAC.xanhNhat}
            onPress={() =>
              Alert.alert("Thông báo", "Tính năng đang phát triển")
            }
          />

          <NutChucNang
            tieuDe="Đăng xuất"
            icon="log-out-outline"
            mauSac={MAU_SAC.do}
            onPress={xuLyDangXuat}
          />
        </View>
      </View>
    </ScrollView>
  );

  // ===== MÀN HÌNH CHỈNH SỬA HỒ SƠ =====
  const ManHinhChinhSuaHoSo = () => (
    <ScrollView style={styles.khungCuon} showsVerticalScrollIndicator={false}>
      <View style={styles.khungHeader}>
        <View style={styles.thongTinNguoiDung}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.chuCaiAvatar}>
                {thongTinNguoiDung.hoTen.charAt(0)}
              </Text>
            </View>
            <TouchableOpacity style={styles.nutThayAvatar}>
              <Text style={styles.chuNutThayAvatar}>Thay đổi ảnh</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.khungNhapLieu}>
            <View style={styles.truongNhap}>
              <Text style={styles.nhanTruong}>Họ và tên</Text>
              <Text style={styles.giaTriTruong}>{thongTinNguoiDung.hoTen}</Text>
            </View>

            <View style={styles.truongNhap}>
              <Text style={styles.nhanTruong}>Email</Text>
              <Text style={styles.giaTriTruong}>{thongTinNguoiDung.email}</Text>
            </View>

            <View style={styles.truongNhap}>
              <Text style={styles.nhanTruong}>Số điện thoại</Text>
              <Text style={styles.giaTriTruong}>0123456789</Text>
            </View>

            <View style={styles.truongNhap}>
              <Text style={styles.nhanTruong}>Địa chỉ</Text>
              <Text style={styles.giaTriTruong}>
                123 Đường ABC, Quận XYZ, TP.HCM
              </Text>
            </View>
          </View>

          <View style={styles.khungNut}>
            <TouchableOpacity
              style={styles.nutHuy}
              onPress={() => setManHinhHienTai("trangCaNhan")}
            >
              <Text style={styles.chuNutHuy}>Hủy</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.nutLuu}
              onPress={() => {
                Alert.alert("Thành công", "Đã lưu thông tin!");
                setManHinhHienTai("trangCaNhan");
              }}
            >
              <Text style={styles.chuNutLuu}>Lưu thay đổi</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );

  // ===== MÀN HÌNH CÀI ĐẶT THÔNG BÁO =====
  const ManHinhCaiDatThongBao = () => (
    <ScrollView style={styles.khungCuon} showsVerticalScrollIndicator={false}>
      <View style={styles.khungHeader}>
        <View style={styles.thongBaoHeader}>
          <Ionicons
            name="information-circle"
            size={KIEU_CHU.trungBinhLon}
            color={MAU_SAC.xanhDuong}
          />
          <View>
            <Text style={styles.tieuDeThongBao}>Thông báo thông minh</Text>
            <Text style={styles.moTaThongBao}>
              Nhận thông báo quan trọng về sách mượn
            </Text>
          </View>
        </View>

        <View style={styles.danhSachCaiDat}>
          <View style={styles.itemCaiDatThongBao}>
            <View style={styles.thongTinCaiDat}>
              <Ionicons
                name="time-outline"
                size={KIEU_CHU.trungBinh}
                color={MAU_SAC.cam}
              />
              <View>
                <Text style={styles.tieuDeCaiDat}>Nhắc nhở hết hạn</Text>
                <Text style={styles.phuDeCaiDat}>Thông báo trước 2 ngày</Text>
              </View>
            </View>
            <Switch
              value={thongBaoDuocBat}
              onValueChange={setThongBaoDuocBat}
              trackColor={{ false: "#D1D5DB", true: MAU_SAC.xanhDuong }}
              thumbColor={thongBaoDuocBat ? MAU_SAC.trang : "#f4f3f4"}
            />
          </View>

          <View style={styles.itemCaiDatThongBao}>
            <View style={styles.thongTinCaiDat}>
              <Ionicons
                name="star-outline"
                size={KIEU_CHU.trungBinh}
                color={MAU_SAC.cam}
              />
              <View>
                <Text style={styles.tieuDeCaiDat}>Sách mới</Text>
                <Text style={styles.phuDeCaiDat}>
                  Thông báo sách mới về thư viện
                </Text>
              </View>
            </View>
            <Switch
              value={thongBaoEmail}
              onValueChange={setThongBaoEmail}
              trackColor={{ false: "#D1D5DB", true: MAU_SAC.xanhDuong }}
              thumbColor={thongBaoEmail ? MAU_SAC.trang : "#f4f3f4"}
            />
          </View>

          <View style={styles.itemCaiDatThongBao}>
            <View style={styles.thongTinCaiDat}>
              <Ionicons
                name="heart-outline"
                size={KIEU_CHU.trungBinh}
                color={MAU_SAC.do}
              />
              <View>
                <Text style={styles.tieuDeCaiDat}>Sách yêu thích có sẵn</Text>
                <Text style={styles.phuDeCaiDat}>
                  Thông báo khi sách trong wishlist có sẵn
                </Text>
              </View>
            </View>
            <Switch
              value={thongBaoDuocBat}
              onValueChange={setThongBaoDuocBat}
              trackColor={{ false: "#D1D5DB", true: MAU_SAC.xanhDuong }}
              thumbColor={thongBaoDuocBat ? MAU_SAC.trang : "#f4f3f4"}
            />
          </View>

          <View style={styles.itemCaiDatThongBao}>
            <View style={styles.thongTinCaiDat}>
              <Ionicons
                name="phone-portrait-outline"
                size={KIEU_CHU.trungBinh}
                color={MAU_SAC.xanhLa}
              />
              <View>
                <Text style={styles.tieuDeCaiDat}>Thông báo đẩy</Text>
                <Text style={styles.phuDeCaiDat}>
                  Nhận thông báo trên điện thoại
                </Text>
              </View>
            </View>
            <Switch
              value={thongBaoDuocBat}
              onValueChange={setThongBaoDuocBat}
              trackColor={{ false: "#D1D5DB", true: MAU_SAC.xanhDuong }}
              thumbColor={thongBaoDuocBat ? MAU_SAC.trang : "#f4f3f4"}
            />
          </View>
        </View>

        <TouchableOpacity
          style={styles.nutLuuCaiDat}
          onPress={() => {
            Alert.alert("Thành công", "Đã lưu cài đặt thông báo!");
            setManHinhHienTai("trangCaNhan");
          }}
        >
          <Ionicons
            name="save"
            size={KIEU_CHU.trungBinh}
            color={MAU_SAC.trang}
          />
          <Text style={styles.chuNutLuuCaiDat}>Lưu cài đặt</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  // ===== RENDER THEO MÀN HÌNH HIỆN TẠI =====
  const renderManHinh = () => {
    switch (manHinhHienTai) {
      case "chinhSuaHoSo":
        return <ManHinhChinhSuaHoSo />;
      case "caiDatThongBao":
        return <ManHinhCaiDatThongBao />;
      default:
        return <ManHinhTrangCaNhan />;
    }
  };

  // ===== RENDER CHÍNH =====
  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View
        style={[styles.headerBar, { backgroundColor: theme.colors.surface }]}
      >
        <Text style={[styles.tieuDeHeader, { color: theme.colors.text }]}>
          {manHinhHienTai === "trangCaNhan" && "Thông tin cá nhân"}
          {manHinhHienTai === "chinhSuaHoSo" && "Chỉnh sửa thông tin"}
          {manHinhHienTai === "caiDatThongBao" && "Cài đặt thông báo"}
        </Text>

        {/* Nút thông báo ở góc phải */}
        <TouchableOpacity style={styles.nutThongBao} onPress={xuLyXemThongBao}>
          <Ionicons
            name="notifications"
            size={KIEU_CHU.trungBinhLon}
            color={theme.colors.primary}
          />
          <View style={styles.dauChamThongBaoHeader} />
        </TouchableOpacity>

        {/* <TouchableOpacity
          style={styles.nutQuayLai}
          onPress={() => setManHinhHienTai("trangCaNhan")}
        >
          <Ionicons
            name="arrow-back"
            size={KIEU_CHU.trungBinhLon}
            color={theme.colors.primary}
          />
        </TouchableOpacity> */}
      </View>

      {renderManHinh()}
    </View>
  );
};

export default ProfileScreen;
