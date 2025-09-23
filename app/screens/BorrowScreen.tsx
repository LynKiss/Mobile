import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../styles/BorrowScreen.styles";

// Interface for borrowing slip from API
interface BorrowingSlip {
  ma_phieu_muon: number;
  ma_nguoi_dung: number;
  ma_nhan_vien: number;
  ngay_muon: string;
  ngay_hen_tra: string;
  trang_thai: string;
  ghi_chu: string | null;
  sach?: any[]; // Books in this borrowing slip
}

// Interface for pagination
interface TrangThaiPhanTrang {
  trangHienTai: number;
  soPhanTuMoiTrang: number;
  tongSoPhanTu: number;
  tongSoTrang: number;
}

// Interface for section pagination
interface PhanTrangPhanMuc {
  quaHan: TrangThaiPhanTrang;
  sapHetHan: TrangThaiPhanTrang;
  dangMuon: TrangThaiPhanTrang;
}

const BorrowScreen = () => {
  const [borrowingSlips, setBorrowingSlips] = useState<BorrowingSlip[]>([]);
  const [loading, setLoading] = useState(true);

  // Collapse/expand states for each section
  const [isQuaHanExpanded, setIsQuaHanExpanded] = useState(true);
  const [isSapHetHanExpanded, setIsSapHetHanExpanded] = useState(true);
  const [isDangMuonExpanded, setIsDangMuonExpanded] = useState(true);

  // Pagination states for each section
  const [phanTrangQuaHan, setPhanTrangQuaHan] = useState<TrangThaiPhanTrang>({
    trangHienTai: 1,
    soPhanTuMoiTrang: 5,
    tongSoPhanTu: 0,
    tongSoTrang: 0,
  });

  const [phanTrangSapHetHan, setPhanTrangSapHetHan] =
    useState<TrangThaiPhanTrang>({
      trangHienTai: 1,
      soPhanTuMoiTrang: 5,
      tongSoPhanTu: 0,
      tongSoTrang: 0,
    });

  const [phanTrangDangMuon, setPhanTrangDangMuon] =
    useState<TrangThaiPhanTrang>({
      trangHienTai: 1,
      soPhanTuMoiTrang: 5,
      tongSoPhanTu: 0,
      tongSoTrang: 0,
    });

  useEffect(() => {
    fetchBorrowingSlips();
  }, []);

  useEffect(() => {
    // Update pagination when data changes
    capNhatPhanTrang("quaHan", getOverdueSlips().length);
    capNhatPhanTrang("sapHetHan", getDueSoonSlips().length);
    capNhatPhanTrang("dangMuon", getNormalActiveBorrowingSlips().length);
  }, [borrowingSlips]);

  const fetchBorrowingSlips = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("userToken");

      if (!token) {
        Alert.alert("Lỗi", "Vui lòng đăng nhập lại");
        return;
      }

      // Get current user ID from token or user data
      const userData = await AsyncStorage.getItem("userData");
      let currentUserId = null;

      if (userData) {
        try {
          const parsedUserData = JSON.parse(userData);
          // Try multiple possible user ID fields and convert to number
          currentUserId =
            parsedUserData.ma_nguoi_dung ||
            parsedUserData.id ||
            parsedUserData.user_id;
          // Convert to number to ensure proper comparison
          currentUserId = Number(currentUserId);
          console.log("Parsed user ID:", currentUserId, typeof currentUserId);
        } catch (parseError) {
          console.error("Error parsing user data:", parseError);
        }
      }

      const response = await fetch("http://localhost:3000/api/phieu_muon", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Borrowing slips data:", data);
        console.log("Sample slip structure:", data[0]); // Debug first item structure

        // Get user data for debugging
        console.log("Raw userData from AsyncStorage:", userData);
        console.log("Current user ID being used:", currentUserId);

        // Filter data to ensure only current user's borrowing slips are shown
        let filteredData = data;
        if (currentUserId) {
          // Try multiple possible field names for user ID
          const possibleUserIdFields = [
            "ma_nguoi_dung",
            "user_id",
            "id",
            "maNguoiDung",
            "userId",
          ];

          let matchedField = null;
          for (const field of possibleUserIdFields) {
            if (data[0] && data[0].hasOwnProperty(field)) {
              matchedField = field;
              break;
            }
          }

          if (matchedField) {
            console.log(`Found user ID field: ${matchedField}`);
            filteredData = data.filter((slip: BorrowingSlip) => {
              const slipUserId = slip[matchedField as keyof BorrowingSlip];
              console.log(
                `Comparing slip ${slip.ma_phieu_muon}: ${slipUserId} === ${currentUserId}`
              );
              return slipUserId === currentUserId;
            });
          } else {
            console.warn("No matching user ID field found in borrowing slips");
            console.log(
              "Available fields in slip:",
              data[0] ? Object.keys(data[0]) : "No data"
            );
            // If no field matches, show all data but log warning
            filteredData = data;
          }

          console.log(
            `Filtered ${data.length} slips to ${filteredData.length} for user ${currentUserId} using field ${matchedField}`
          );
        } else {
          console.warn(
            "No current user ID found, showing all data (potential security issue)"
          );
          filteredData = data;
        }

        setBorrowingSlips(filteredData);
      } else {
        console.error("Failed to fetch borrowing slips:", response.status);
        Alert.alert("Lỗi", "Không thể tải danh sách phiếu mượn");
      }
    } catch (error) {
      console.error("Error fetching borrowing slips:", error);
      Alert.alert("Lỗi", "Có lỗi xảy ra khi tải dữ liệu");
    } finally {
      setLoading(false);
    }
  };

  const calculateDaysLeft = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN");
  };

  const getStatusInfo = (status: string, daysLeft: number) => {
    if (status === "Đang mượn") {
      return {
        statusType: daysLeft <= 3 ? "due-soon" : "active",
        badgeStyle: daysLeft <= 3 ? styles.badgeDanger : styles.badgeSuccess,
        badgeText: daysLeft <= 3 ? `${daysLeft} ngày` : `${daysLeft} ngày`,
      };
    }
    return {
      statusType: "completed",
      badgeStyle: styles.badgeSecondary,
      badgeText: status,
    };
  };

  const handleRenew = (slipId: number) => {
    console.log("Gia hạn phiếu mượn:", slipId);
    Alert.alert("Thông báo", "Chức năng gia hạn đang được phát triển");
  };

  const handleReturn = (slipId: number) => {
    console.log("Trả sách phiếu mượn:", slipId);
    Alert.alert("Thông báo", "Chức năng trả sách đang được phát triển");
  };

  const getActiveBorrowingSlips = () => {
    return borrowingSlips.filter((slip) => slip.trang_thai === "Đang mượn");
  };

  const getDueSoonSlips = () => {
    return getActiveBorrowingSlips().filter((slip) => {
      const daysLeft = calculateDaysLeft(slip.ngay_hen_tra);
      return daysLeft <= 3 && daysLeft > 0;
    });
  };

  const getOverdueSlips = () => {
    return getActiveBorrowingSlips().filter((slip) => {
      const daysLeft = calculateDaysLeft(slip.ngay_hen_tra);
      return daysLeft < 0;
    });
  };

  const getCompletedSlips = () => {
    return borrowingSlips.filter((slip) => slip.trang_thai !== "Đang mượn");
  };

  // Toggle functions for collapse/expand
  const toggleQuaHan = () => setIsQuaHanExpanded(!isQuaHanExpanded);
  const toggleSapHetHan = () => setIsSapHetHanExpanded(!isSapHetHanExpanded);
  const toggleDangMuon = () => setIsDangMuonExpanded(!isDangMuonExpanded);

  // Get only normal active borrowing slips (not overdue or due soon)
  const getNormalActiveBorrowingSlips = () => {
    return getActiveBorrowingSlips().filter((slip) => {
      const daysLeft = calculateDaysLeft(slip.ngay_hen_tra);
      return daysLeft > 3; // Only show books with more than 3 days left
    });
  };

  // Pagination helper functions
  const capNhatPhanTrang = (phanMuc: string, tongSoPhanTu: number) => {
    switch (phanMuc) {
      case "quaHan":
        setPhanTrangQuaHan((prev) => ({
          ...prev,
          tongSoPhanTu,
          tongSoTrang: Math.ceil(tongSoPhanTu / prev.soPhanTuMoiTrang),
        }));
        break;
      case "sapHetHan":
        setPhanTrangSapHetHan((prev) => ({
          ...prev,
          tongSoPhanTu,
          tongSoTrang: Math.ceil(tongSoPhanTu / prev.soPhanTuMoiTrang),
        }));
        break;
      case "dangMuon":
        setPhanTrangDangMuon((prev) => ({
          ...prev,
          tongSoPhanTu,
          tongSoTrang: Math.ceil(tongSoPhanTu / prev.soPhanTuMoiTrang),
        }));
        break;
    }
  };

  const chuyenTrang = (phanMuc: string, trangMoi: number) => {
    switch (phanMuc) {
      case "quaHan":
        setPhanTrangQuaHan((prev) => ({ ...prev, trangHienTai: trangMoi }));
        break;
      case "sapHetHan":
        setPhanTrangSapHetHan((prev) => ({ ...prev, trangHienTai: trangMoi }));
        break;
      case "dangMuon":
        setPhanTrangDangMuon((prev) => ({ ...prev, trangHienTai: trangMoi }));
        break;
    }
  };

  const layPhanTuPhanTrang = (
    danhSach: BorrowingSlip[],
    phanTrang: TrangThaiPhanTrang
  ) => {
    const batDau = (phanTrang.trangHienTai - 1) * phanTrang.soPhanTuMoiTrang;
    const ketThuc = batDau + phanTrang.soPhanTuMoiTrang;
    return danhSach.slice(batDau, ketThuc);
  };

  // Pagination component
  const PhanTrang = ({
    phanMuc,
    phanTrang,
  }: {
    phanMuc: string;
    phanTrang: TrangThaiPhanTrang;
  }) => {
    if (phanTrang.tongSoTrang <= 1) return null;

    return (
      <View style={styles.paginationContainer}>
        <TouchableOpacity
          style={[
            styles.paginationBtn,
            phanTrang.trangHienTai === 1 && styles.paginationBtnDisabled,
          ]}
          onPress={() =>
            phanTrang.trangHienTai > 1 &&
            chuyenTrang(phanMuc, phanTrang.trangHienTai - 1)
          }
          disabled={phanTrang.trangHienTai === 1}
        >
          <Text
            style={[
              styles.paginationText,
              phanTrang.trangHienTai === 1 && styles.paginationTextDisabled,
            ]}
          >
            ‹ Trước
          </Text>
        </TouchableOpacity>

        <Text style={styles.paginationInfo}>
          {phanTrang.trangHienTai} / {phanTrang.tongSoTrang}
        </Text>

        <TouchableOpacity
          style={[
            styles.paginationBtn,
            phanTrang.trangHienTai === phanTrang.tongSoTrang &&
              styles.paginationBtnDisabled,
          ]}
          onPress={() =>
            phanTrang.trangHienTai < phanTrang.tongSoTrang &&
            chuyenTrang(phanMuc, phanTrang.trangHienTai + 1)
          }
          disabled={phanTrang.trangHienTai === phanTrang.tongSoTrang}
        >
          <Text
            style={[
              styles.paginationText,
              phanTrang.trangHienTai === phanTrang.tongSoTrang &&
                styles.paginationTextDisabled,
            ]}
          >
            Sau ›
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#007aff" />
        <Text style={styles.loadingText}>Đang tải danh sách mượn...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Tổng quan */}
      <View style={styles.overviewCard}>
        <Text style={styles.overviewTitle}>📊 Tổng quan</Text>
        <Text style={styles.overviewText}>
          Đang mượn: {getActiveBorrowingSlips().length} cuốn | Sắp hết hạn:{" "}
          {getDueSoonSlips().length} cuốn | Quá hạn: {getOverdueSlips().length}{" "}
          cuốn
        </Text>
      </View>

      {/* Quá hạn - Ưu tiên hiển thị đầu tiên */}
      {getOverdueSlips().length > 0 && (
        <View>
          <TouchableOpacity onPress={toggleQuaHan} style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              🚨 Quá hạn ({getOverdueSlips().length})
            </Text>
            <Text style={styles.toggleIcon}>
              {isQuaHanExpanded ? "▼" : "▶"}
            </Text>
          </TouchableOpacity>
          {isQuaHanExpanded && (
            <>
              {layPhanTuPhanTrang(getOverdueSlips(), phanTrangQuaHan).map(
                (slip) => {
                  const daysLeft = calculateDaysLeft(slip.ngay_hen_tra);
                  const overdueDays = Math.abs(daysLeft);
                  return (
                    <View
                      key={slip.ma_phieu_muon}
                      style={[styles.bookCard, styles.overdueCard]}
                    >
                      <View style={styles.bookHeader}>
                        <Text style={styles.bookTitle}>
                          Phiếu mượn #{slip.ma_phieu_muon}
                        </Text>
                        <Text style={styles.badgeOverdue}>
                          Quá hạn {overdueDays} ngày
                        </Text>
                      </View>
                      <Text style={styles.bookMeta}>
                        Ngày mượn: {formatDate(slip.ngay_muon)} | Hạn trả:{" "}
                        {formatDate(slip.ngay_hen_tra)}
                      </Text>
                      {slip.ghi_chu && (
                        <Text style={styles.bookNote}>
                          Ghi chú: {slip.ghi_chu}
                        </Text>
                      )}
                      <View style={styles.actionRow}>
                        <TouchableOpacity
                          style={[styles.actionBtn, styles.urgentBtn]}
                          onPress={() => handleReturn(slip.ma_phieu_muon)}
                        >
                          <Text style={styles.actionText}>Trả sách ngay</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                }
              )}
              <PhanTrang phanMuc="quaHan" phanTrang={phanTrangQuaHan} />
            </>
          )}
        </View>
      )}

      {/* Sắp hết hạn */}
      {getDueSoonSlips().length > 0 && (
        <View>
          <TouchableOpacity
            onPress={toggleSapHetHan}
            style={styles.sectionHeader}
          >
            <Text style={styles.sectionTitle}>
              ⚠️ Sắp hết hạn ({getDueSoonSlips().length})
            </Text>
            <Text style={styles.toggleIcon}>
              {isSapHetHanExpanded ? "▼" : "▶"}
            </Text>
          </TouchableOpacity>
          {isSapHetHanExpanded && (
            <>
              {layPhanTuPhanTrang(getDueSoonSlips(), phanTrangSapHetHan).map(
                (slip) => {
                  const daysLeft = calculateDaysLeft(slip.ngay_hen_tra);
                  return (
                    <View
                      key={slip.ma_phieu_muon}
                      style={[styles.bookCard, styles.dueSoonCard]}
                    >
                      <View style={styles.bookHeader}>
                        <Text style={styles.bookTitle}>
                          Phiếu mượn #{slip.ma_phieu_muon}
                        </Text>
                        <Text style={styles.badgeDanger}>{daysLeft} ngày</Text>
                      </View>
                      <Text style={styles.bookMeta}>
                        Ngày mượn: {formatDate(slip.ngay_muon)} | Hạn trả:{" "}
                        {formatDate(slip.ngay_hen_tra)}
                      </Text>
                      <View style={styles.actionRow}>
                        <TouchableOpacity
                          style={[styles.actionBtn, styles.renewBtn]}
                          onPress={() => handleRenew(slip.ma_phieu_muon)}
                        >
                          <Text style={styles.actionText}>Gia hạn</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[styles.actionBtn, styles.returnBtn]}
                          onPress={() => handleReturn(slip.ma_phieu_muon)}
                        >
                          <Text style={styles.actionText}>Trả sách</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                }
              )}
              <PhanTrang phanMuc="sapHetHan" phanTrang={phanTrangSapHetHan} />
            </>
          )}
        </View>
      )}

      {/* Đang mượn */}
      {getNormalActiveBorrowingSlips().length > 0 && (
        <View>
          <TouchableOpacity
            onPress={toggleDangMuon}
            style={styles.sectionHeader}
          >
            <Text style={styles.sectionTitle}>
              📚 Đang mượn ({getNormalActiveBorrowingSlips().length})
            </Text>
            <Text style={styles.toggleIcon}>
              {isDangMuonExpanded ? "▼" : "▶"}
            </Text>
          </TouchableOpacity>
          {isDangMuonExpanded && (
            <>
              {layPhanTuPhanTrang(
                getNormalActiveBorrowingSlips(),
                phanTrangDangMuon
              ).map((slip) => {
                const daysLeft = calculateDaysLeft(slip.ngay_hen_tra);
                const statusInfo = getStatusInfo(slip.trang_thai, daysLeft);

                return (
                  <View key={slip.ma_phieu_muon} style={styles.bookCard}>
                    <View style={styles.bookHeader}>
                      <Text style={styles.bookTitle}>
                        Phiếu mượn #{slip.ma_phieu_muon}
                      </Text>
                      <Text style={statusInfo.badgeStyle}>
                        {statusInfo.badgeText}
                      </Text>
                    </View>
                    <Text style={styles.bookMeta}>
                      Ngày mượn: {formatDate(slip.ngay_muon)} | Hạn trả:{" "}
                      {formatDate(slip.ngay_hen_tra)}
                    </Text>
                    {slip.ghi_chu && (
                      <Text style={styles.bookNote}>
                        Ghi chú: {slip.ghi_chu}
                      </Text>
                    )}
                    <View style={styles.actionRow}>
                      <TouchableOpacity
                        style={[styles.actionBtn, styles.renewBtn]}
                        onPress={() => handleRenew(slip.ma_phieu_muon)}
                      >
                        <Text style={styles.actionText}>Gia hạn</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[styles.actionBtn, styles.returnBtn]}
                        onPress={() => handleReturn(slip.ma_phieu_muon)}
                      >
                        <Text style={styles.actionText}>Trả sách</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              })}
              <PhanTrang phanMuc="dangMuon" phanTrang={phanTrangDangMuon} />
            </>
          )}
        </View>
      )}

      {/* Empty state */}
      {getActiveBorrowingSlips().length === 0 && (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Không có sách đang mượn</Text>
          <Text style={styles.emptySubtext}>Bạn chưa mượn sách nào</Text>
        </View>
      )}
    </ScrollView>
  );
};

export default BorrowScreen;
