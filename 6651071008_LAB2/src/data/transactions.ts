import type { Transaction } from '../types'

const today = new Date()
const date = (daysAgo: number): string => {
  const value = new Date(today)
  value.setDate(value.getDate() - daysAgo)
  return `${value.getFullYear()}-${String(value.getMonth() + 1).padStart(2, '0')}-${String(value.getDate()).padStart(2, '0')}`
}

export const initialTransactions: Transaction[] = [
  { id: 'tx-01', kind: 'income', amount: 18500000, category: 'Lương', merchant: 'Công ty An Phúc', date: date(0), note: 'Lương tháng 11', paymentMethod: 'Chuyển khoản' },
  { id: 'tx-02', kind: 'expense', amount: 65000, category: 'Ăn uống', merchant: 'Bếp Nhà Mình', date: date(0), note: 'Bữa trưa văn phòng', paymentMethod: 'Ví điện tử' },
  { id: 'tx-03', kind: 'expense', amount: 42000, category: 'Di chuyển', merchant: 'Xanh SM', date: date(1), note: 'Đi làm', paymentMethod: 'Thẻ ngân hàng' },
  { id: 'tx-04', kind: 'expense', amount: 129000, category: 'Mua sắm', merchant: 'Nhà sách Phương Nam', date: date(1), note: 'Sổ tay và bút', paymentMethod: 'Tiền mặt' },
  { id: 'tx-05', kind: 'expense', amount: 320000, category: 'Hóa đơn', merchant: 'Điện lực TP.HCM', date: date(2), note: 'Hóa đơn điện tháng 10', paymentMethod: 'Chuyển khoản' },
  { id: 'tx-06', kind: 'expense', amount: 85000, category: 'Ăn uống', merchant: 'Phở Thìn', date: date(2), note: 'Bữa sáng cùng gia đình', paymentMethod: 'Ví điện tử' },
  { id: 'tx-07', kind: 'income', amount: 850000, category: 'Làm thêm', merchant: 'Thiết kế tự do', date: date(3), note: 'Thiết kế banner', paymentMethod: 'Chuyển khoản' },
  { id: 'tx-08', kind: 'expense', amount: 210000, category: 'Sức khỏe', merchant: 'Nhà thuốc An Khang', date: date(3), note: 'Vitamin và thuốc cảm', paymentMethod: 'Thẻ ngân hàng' },
  { id: 'tx-09', kind: 'expense', amount: 95000, category: 'Giải trí', merchant: 'CGV Vincom', date: date(4), note: 'Vé xem phim cuối tuần', paymentMethod: 'Ví điện tử' },
  { id: 'tx-10', kind: 'expense', amount: 54000, category: 'Di chuyển', merchant: 'GrabBike', date: date(4), note: 'Di chuyển trong thành phố', paymentMethod: 'Ví điện tử' },
  { id: 'tx-11', kind: 'expense', amount: 475000, category: 'Mua sắm', merchant: 'Co.opmart', date: date(5), note: 'Đồ dùng gia đình', paymentMethod: 'Thẻ ngân hàng' },
  { id: 'tx-12', kind: 'expense', amount: 38000, category: 'Ăn uống', merchant: 'Cà phê Sài Gòn', date: date(5), note: 'Cà phê sáng', paymentMethod: 'Tiền mặt' },
  { id: 'tx-13', kind: 'expense', amount: 180000, category: 'Hóa đơn', merchant: 'Nhà mạng Viettel', date: date(6), note: 'Cước internet tháng 11', paymentMethod: 'Chuyển khoản' },
  { id: 'tx-14', kind: 'expense', amount: 220000, category: 'Giáo dục', merchant: 'Udemy', date: date(7), note: 'Khóa học TypeScript', paymentMethod: 'Thẻ ngân hàng' },
  { id: 'tx-15', kind: 'income', amount: 1200000, category: 'Thưởng', merchant: 'Công ty An Phúc', date: date(8), note: 'Thưởng dự án tháng 10', paymentMethod: 'Chuyển khoản' },
  { id: 'tx-16', kind: 'expense', amount: 76000, category: 'Ăn uống', merchant: 'Bún bò Huế O Xuân', date: date(9), note: 'Bữa trưa', paymentMethod: 'Tiền mặt' },
  { id: 'tx-17', kind: 'expense', amount: 32000, category: 'Di chuyển', merchant: 'Xe buýt tháng', date: date(10), note: 'Vé xe buýt', paymentMethod: 'Tiền mặt' },
  { id: 'tx-18', kind: 'expense', amount: 240000, category: 'Gia đình', merchant: 'Chợ Bến Thành', date: date(11), note: 'Hoa quả và thực phẩm', paymentMethod: 'Tiền mặt' },
  { id: 'tx-19', kind: 'expense', amount: 150000, category: 'Giải trí', merchant: 'Spotify Premium', date: date(12), note: 'Gói nghe nhạc tháng', paymentMethod: 'Thẻ ngân hàng' },
  { id: 'tx-20', kind: 'expense', amount: 98000, category: 'Ăn uống', merchant: 'The Coffee House', date: date(13), note: 'Gặp mặt bạn bè', paymentMethod: 'Ví điện tử' },
  { id: 'tx-21', kind: 'expense', amount: 580000, category: 'Mua sắm', merchant: 'Decathlon', date: date(14), note: 'Áo chạy bộ', paymentMethod: 'Thẻ ngân hàng' },
  { id: 'tx-22', kind: 'expense', amount: 110000, category: 'Sức khỏe', merchant: 'Phòng khám Tâm Đức', date: date(16), note: 'Khám sức khỏe định kỳ', paymentMethod: 'Chuyển khoản' },
  { id: 'tx-23', kind: 'income', amount: 500000, category: 'Hoàn tiền', merchant: 'Ngân hàng ABC', date: date(18), note: 'Hoàn tiền chi tiêu tháng 10', paymentMethod: 'Chuyển khoản' },
  { id: 'tx-24', kind: 'expense', amount: 135000, category: 'Gia đình', merchant: 'Cửa hàng cây xanh', date: date(20), note: 'Cây nhỏ trang trí ban công', paymentMethod: 'Tiền mặt' },
]

export const expenseCategories = [
  'Ăn uống',
  'Di chuyển',
  'Mua sắm',
  'Hóa đơn',
  'Sức khỏe',
  'Giải trí',
  'Giáo dục',
  'Gia đình',
  'Khác',
]

export const incomeCategories = [
  'Lương',
  'Làm thêm',
  'Thưởng',
  'Hoàn tiền',
  'Đầu tư',
  'Khác',
]
