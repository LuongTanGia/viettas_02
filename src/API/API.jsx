const BASE_URL = 'https://isalestaapi.viettassaigon.vn'

const API = {
  MAIN: BASE_URL,
  DANHSACHDULIEU: `${BASE_URL}/api/Auth/DanhSachDuLieu`,
  DANGNHAP: `${BASE_URL}/api/Auth/DangNhap`,
  TONGHOP: `${BASE_URL}/api/Statistics/TongHop`,

  DANHSACHHANGHOA: `${BASE_URL}/api/lists/HangHoa/DanhSach`,
  KHOANNGAY: `${BASE_URL}/api/Settings/KhoanNgay`,
  DOIMATKHAU: `${BASE_URL}/api/NguoiDung/DoiMatKhau`,
  DoanhSoHangHoa_TopChart: `${BASE_URL}/api/Statistics/DoanhSoHangHoa_TopChart`,
  DoanhSoKhachHang_TopChart: `${BASE_URL}/api/Statistics/DoanhSoKhachHang_TopChart`,
  DoanhSoNhomHang_TopChart: `${BASE_URL}/api/Statistics/DoanhSoNhomHang_TopChart`,

  //chi tiet data chart
  DoanhSoHangHoa_CT: `${BASE_URL}/api/Statistics/DoanhSoHangHoa_CT`,
  DoanhSoKhachHang_CT: `${BASE_URL}/api/Statistics/DoanhSoKhachHang_CT`,
  DoanhSoNhomHang_CT: `${BASE_URL}/api/Statistics/DoanhSoNhomHang_CT`,
}

export default API
