const BASE_URL = 'https://isalewebapi.viettassaigon.vn'

const API = {
  MAIN: BASE_URL,
  DANHSACHDULIEU: `${BASE_URL}/api/Auth/DanhSachDuLieu`,
  DANGNHAP: `${BASE_URL}/api/Auth/DangNhap`,
  TONGHOP: `${BASE_URL}/api/statistics/TongHop`,

  DANHSACHHANGHOA: `${BASE_URL}/api/lists/HangHoa/DanhSach`,
  KHOANNGAY: `${BASE_URL}/api/settings/GiaTriHeThong/KhoanNgay`,
  DOIMATKHAU: `${BASE_URL}/api/NguoiDung/DoiMatKhau`,
  DoanhSoHangHoa_TopChart: `${BASE_URL}/api/statistics/DoanhSoHangHoa_TopChart`,
  DoanhSoKhachHang_TopChart: `${BASE_URL}/api/statistics/DoanhSoKhachHang_TopChart`,
  DoanhSoNhomHang_TopChart: `${BASE_URL}/api/statistics/DoanhSoNhomHang_TopChart`,

  //chi tiet data chart
  DoanhSoHangHoa_CT: `${BASE_URL}/api/statistics/DoanhSoHangHoa_CT`,
}

export default API
