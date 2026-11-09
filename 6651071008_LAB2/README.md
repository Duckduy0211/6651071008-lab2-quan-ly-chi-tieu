# Ví Mộc — Quản lý chi tiêu cá nhân

Website React cá nhân hóa cho MSSV **6651071008**, nằm trong thư mục `6651071008_LAB2`.

## Biến thể MSSV

- `S = 6+6+5+1+0+7+1+0+0+8 = 34`
- `D = 34 mod 15 = 4`
- `F = 08 mod 10 = 8`
- `C = 6 mod 5 = 1`

Chủ đề: quản lý chi tiêu cá nhân, tự tạo dữ liệu và lưu bằng `localStorage`. Màu chủ đạo: Emerald (`#059669`).

Ba tính năng bắt buộc theo `F = 8`:

1. So sánh nhiều giao dịch cạnh nhau.
2. Lọc giao dịch theo khoảng giá và ngày.
3. Chuyển giao diện VI/EN tức thì, không tải lại trang.

## Chạy dự án

```bash
npm install
npm run dev
```

## Kiểm tra

```bash
npm run test
npm run lint
npm run build
```

## Tính năng

- Chọn tùy ý nhiều giao dịch và so sánh số tiền, danh mục, ngày, loại và phương thức thanh toán cạnh nhau.
- Lọc giao dịch theo ngày bắt đầu/kết thúc và số tiền tối thiểu/tối đa.
- Chuyển VI/EN không tải lại trang; lựa chọn ngôn ngữ được lưu trên thiết bị.
- Biểu mẫu thêm giao dịch có kiểm tra dữ liệu.
- Trang danh sách và trang chi tiết; giao dịch được lưu trong `localStorage`.
- Bố cục đáp ứng desktop, tablet và mobile; hỗ trợ điều hướng bàn phím và giao diện tối.
- Wireframe desktop: [`design/wireframe.svg`](./design/wireframe.svg).

## Giải thích kỹ thuật: so sánh giao dịch

Mỗi giao dịch có một ô chọn. React lưu các ID đã chọn trong state và dựng bảng so sánh ngay trên trang. Mỗi mục trở thành một cột; các hàng so sánh số tiền, danh mục, ngày, phương thức thanh toán và loại thu/chi. Người dùng có thể bỏ một mục hoặc xóa toàn bộ lựa chọn. Bảng cuộn ngang khi cần và không giới hạn số giao dịch. Bộ lọc nhận ngày bắt đầu, ngày kết thúc, số tiền tối thiểu và tối đa; danh sách cập nhật ngay, còn lựa chọn so sánh được giữ nguyên. Ngôn ngữ giao diện nằm trong state VI/EN. Nút chuyển đổi đổi nội dung cùng thuộc tính `lang` của tài liệu mà không tải lại trang, sau đó lưu lựa chọn vào `localStorage`. Danh mục, phương thức thanh toán và ngày được hiển thị theo ngôn ngữ hiện tại. Tên cửa hàng và ghi chú do người dùng nhập vẫn giữ nguyên để tránh dịch sai dữ liệu cá nhân. Tách riêng state bộ lọc, so sánh và ngôn ngữ giúp mỗi tính năng hoạt động độc lập.

## Còn cần hoàn tất trước khi nộp

- Điền họ tên và chụp wireframe theo yêu cầu lớp.
- Chụp kết quả `npm run test`, `npm run lint`, `npm run build` và Lighthouse Mobile.
- Đưa website lên hosting công khai, chuẩn bị link repository/deploy và video demo.
- Tạo lịch sử commit cá nhân theo đúng yêu cầu thời lượng và số lượng commit của đề.
