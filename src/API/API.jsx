const BASE_URL = 'https://isalestaapi.viettassaigon.vn'

const API = {
  //Login
  MAIN: BASE_URL,
  DANHSACHDULIEU: `${BASE_URL}/api/Auth/DanhSachDuLieu`,
  DANGNHAP: `${BASE_URL}/api/Auth/DangNhap`,
  TONGHOP: `${BASE_URL}/api/Statistics/TongHop`,
  DANHSACHHANGHOA: `${BASE_URL}/api/lists/HangHoa/DanhSach`,
  KHOANNGAY: `${BASE_URL}/api/Settings/KhoanNgay`,
  DOIMATKHAU: `${BASE_URL}/api/NguoiDung/DoiMatKhau`,
  //Chart Doanh So (done)
  DoanhSoHangHoa_TopChart: `${BASE_URL}/api/Statistics/DoanhSoHangHoa_TopChart`,
  DoanhSoKhachHang_TopChart: `${BASE_URL}/api/Statistics/DoanhSoKhachHang_TopChart`,
  DoanhSoNhomHang_TopChart: `${BASE_URL}/api/Statistics/DoanhSoNhomHang_TopChart`,
  //Doanh So (Chi Tiet done)
  DoanhSoHangHoa_CT: `${BASE_URL}/api/Statistics/DoanhSoHangHoa_CT`,
  DoanhSoKhachHang_CT: `${BASE_URL}/api/Statistics/DoanhSoKhachHang_CT`,
  DoanhSoNhomHang_CT: `${BASE_URL}/api/Statistics/DoanhSoNhomHang_CT`,
  // Ton Kho (done)
  TonKho_TongKho: `${BASE_URL}/api/statistics/TonKho_TongKho`,
  TonKho_TongKhoDVTQuyDoi: `${BASE_URL}/api/statistics/TonKho_TongKhoDVTQuyDoi`,
  TonKho_TheoKho: `${BASE_URL}/api/statistics/TonKho_TheoKho`,
  //Cong No Thu
  CongNoThu_TopChart: `${BASE_URL}/api/statistics/CongNoThu_TopChart`,
  CongNoThu_DanhSach: `${BASE_URL}/api/statistics/CongNoThu_DanhSach`,
  //Cong No Thu (Chi Tiet)
  CongNoThu_CT: `${BASE_URL}/api/statistics/CongNoThu_CT`,
  //Cong No Tra
  CongNoTra_TopChart: `${BASE_URL}/api/statistics/CongNoTra_TopChart`,
  CongNoTra_DanhSach: `${BASE_URL}/api/statistics/CongNoTra_DanhSach`,
  //Cong No Tra (Chi Tiet)
  CongNoTra_CT: `${BASE_URL}/api/statistics/CongNoTra_CT`,
  //Mua Hang
  MuaHang_HangHoa: `${BASE_URL}/api/statistics/MuaHang_HangHoa`,
  MuaHang_NhaCungCap: `${BASE_URL}/api/statistics/MuaHang_NhaCungCap`,
  //Xuat Tra
  XuatTra_HangHoa: `${BASE_URL}/api/statistics/XuatTra_HangHoa`,
  XuatTra_NhaCungCap: `${BASE_URL}/api/statistics/XuatTra_NhaCungCap`,
  //Ban Hang
  BanHang_HangHoa: `${BASE_URL}/api/statistics/BanHang_HangHoa`,
  BanHang_QuayLe: `${BASE_URL}/api/statistics/BanHang_QuayLe`,
  BanHang_KhachHang: `${BASE_URL}/api/Statistics/BanHang_KhachHang`,
  //Nhap Tra
  NhapTra_HangHoa: `${BASE_URL}/api/statistics/NhapTra_HangHoa`,
  NhapTra_KhachHang: `${BASE_URL}/api/statistics/NhapTra_KhachHang`,
  //Thu-Chi
  ThuTien: `${BASE_URL}/api/statistics/ThuTien`,
  ChiTien: `${BASE_URL}/api/statistics/ChiTien`,
  SoQuy: `${BASE_URL}/api/statistics/SoQuy`,
}

export default API
