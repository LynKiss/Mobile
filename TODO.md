# TODO: Cập nhật trang chi tiết sách

## Các bước thực hiện:

- [x] Thêm state để lưu thông tin mô tả cho khu vực, nhà xuất bản, thể loại, v.v.
- [x] Sau khi fetch chi tiết sách, kiểm tra nếu thông tin mô tả thiếu, fetch từ API (e.g., /khu_vuc, /nha_xuat_ban, /the_loai)
- [x] Cập nhật UI để hiển thị tên mô tả thay vì ID
- [x] Thêm xử lý loading và lỗi cho các fetch bổ sung
- [x] Test để đảm bảo thông tin mô tả hiển thị đúng

## File cần chỉnh sửa:

- app/screens/BookDetailScreen.tsx
