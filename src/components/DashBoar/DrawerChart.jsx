/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import PieChart from '../util/Chart/PieChart'
import { useEffect, useRef, useState } from 'react'
import { Drawer, Segmented, Spin } from 'antd'
import './dashBoard.css'
import { APIDATA_CHART, APIDATA_CHART_CT, RETOKEN } from '../../action/Actions'
import API from '../../API/API'
import { BiLeftArrowAlt } from 'react-icons/bi'
import RateBar from '../util/Chart/LoadingChart'
import Table from './DrawerTable'
import CounterComponent from './LoadNumber'
import Date from './Date'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { Input } from 'antd'
import dayjs from 'dayjs'
import { toast } from 'react-toastify'
const { Search } = Input
const nameMapping = {
  DOANHSO: 'Doanh Số',
  TONKHO: 'Tồn Kho',
  PHAITHU: 'Phải Thu',
  PHAITRA: 'Phải Trả',
  MUAHANG: 'Mua Hàng',
  XUATTRA: 'Xuất Trả Nhà Cung Cấp',
  BANHANG: 'Bán Hàng',
  NHAPTRA: 'Hàng Bán Trở Lại',
  THU: 'Thu Tiền',
  CHI: 'Chi Tiền',
}
function DashBoar({ showOpen, titleDr, setOpenShow, dataDate }) {
  const location = useLocation()
  const navigate = useNavigate()
  const [childrenDrawer, setChildrenDrawer] = useState(false)
  const [segmented, setSegmented] = useState('')
  const [valueSegmented, setValueSegmented] = useState('')
  const [dataSearch, setDataSearch] = useState([])
  const [loading, setLoading] = useState(false)
  const [loading_dr2, setLoading_dr2] = useState(false)

  const [refToken, setRefToken] = useState(false)
  const [titleDr_child, setTitleDrChild] = useState('ssss')
  const token = localStorage.getItem('TKN')
  const [data_hanghoa, setDataChart_hanghoa] = useState([])
  const [data_khachhang, setDataChart_khachhang] = useState([])
  const [data_nhomhang, setDataChart_nhomhang] = useState([])
  const [data_TonKho_TongKho, setdata_TonKho_TongKho] = useState([])
  const [TonKho_TongKhoDVTQuyDoi, setTonKho_TongKhoDVTQuyDoi] = useState([])
  const [TonKho_TheoKho, setTonKho_TheoKho] = useState([])
  const [CongNoThu_TopChart, setCongNoThu_TopChart] = useState([])
  const [CongNoThu_DanhSach, setCongNoThu_DanhSach] = useState([])
  const [MuaHang_HangHoa, setMuaHang_HangHoa] = useState([])
  const [MuaHang_NhaCungCap, setMuaHang_NhaCungCap] = useState([])
  const [XuatTra_HangHoa, setXuatTra_HangHoa] = useState([])
  const [XuatTra_NhaCungCap, setXuatTra_NhaCungCap] = useState([])
  const [BanHang_HangHoa, setBanHang_HangHoa] = useState([])
  const [BanHang_QuayLe, setBanHang_QuayLe] = useState([])
  const [BanHang_KhachHang, setBanHang_KhachHang] = useState([])
  const [ThuTien, setThuTien] = useState([])
  const [ChiTien, setChiTien] = useState([])
  const [SoQuy, setSoQuy] = useState([])
  const [dataTable, setDataTable] = useState([])
  const [colorTable, setColorTable] = useState()
  const [dataDate_s, setDataDate] = useState(dataDate)
  // const [dataDate_sS, setDataDateSS] = useState(dataDate_s)

  const [dataDate_02, setDataDate_02] = useState(dataDate_s)

  const [TotalNumber, setTotalNumber] = useState(0)
  const [TotalChart, setTotalChart] = useState(0)
  const [title, setTitle] = useState('')
  const [searchText, setSearchText] = useState('')
  const [valueCT, setValueCT] = useState([])

  useEffect(() => {
    setDataDate(dataDate)
    const params = new URLSearchParams(location.search)
    const titleParam = params.get('title') || 'home'
    titleParam === 'home' ? setChildrenDrawer(false) : null
  }, [showOpen, location.search])

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      //API Doanh So
      const data_hanghoa = titleDr === 'DOANHSO' ? await APIDATA_CHART(API.DoanhSoHangHoa_TopChart, token, dataDate_s) : null
      const data_khachhang = titleDr === 'DOANHSO' ? await APIDATA_CHART(API.DoanhSoKhachHang_TopChart, token, dataDate_s) : null
      const data_nhomhang = titleDr === 'DOANHSO' ? await APIDATA_CHART(API.DoanhSoNhomHang_TopChart, token, dataDate_s) : null
      //API Ton Kho

      const data_TonKho_TongKho = titleDr === 'TONKHO' ? await APIDATA_CHART(API.TonKho_TongKho, token, { ...dataDate_s, FilterText: searchText }) : null
      const TonKho_TongKhoDVTQuyDoi = titleDr === 'TONKHO' ? await APIDATA_CHART(API.TonKho_TongKhoDVTQuyDoi, token, { ...dataDate_s, FilterText: searchText }) : null
      const TonKho_TheoKho = titleDr === 'TONKHO' ? await APIDATA_CHART(API.TonKho_TheoKho, token, { ...dataDate_s, FilterText: searchText }) : null
      //API Cong No Thu - Tra
      const CongNoThu_TopChart =
        titleDr === 'PHAITHU' || titleDr === 'PHAITRA' ? await APIDATA_CHART(titleDr === 'PHAITRA' ? API.CongNoTra_TopChart : API.CongNoThu_TopChart, token, dataDate_s) : null
      const CongNoThu_DanhSach =
        titleDr === 'PHAITHU' || titleDr === 'PHAITRA' ? await APIDATA_CHART(titleDr === 'PHAITRA' ? API.CongNoTra_DanhSach : API.CongNoThu_DanhSach, token, dataDate_s) : null
      //API Mua Hang
      const MuaHang_HangHoa = titleDr === 'MUAHANG' ? await APIDATA_CHART(API.MuaHang_HangHoa, token, { ...dataDate_s, FilterText: searchText }) : null
      const MuaHang_NhaCungCap = titleDr === 'MUAHANG' ? await APIDATA_CHART(API.MuaHang_NhaCungCap, token, { ...dataDate_s, FilterText: searchText }) : null
      //API Xuat Tra - Nhap Tra
      const XuatTra_HangHoa =
        titleDr === 'XUATTRA' || titleDr === 'NHAPTRA'
          ? await APIDATA_CHART(titleDr === 'NHAPTRA' ? API.NhapTra_HangHoa : API.XuatTra_HangHoa, token, { ...dataDate_s, FilterText: searchText })
          : null
      const XuatTra_NhaCungCap =
        titleDr === 'XUATTRA' || titleDr === 'NHAPTRA'
          ? await APIDATA_CHART(titleDr === 'NHAPTRA' ? API.NhapTra_KhachHang : API.XuatTra_NhaCungCap, token, { ...dataDate_s, FilterText: searchText })
          : null
      //API Ban Hang
      const BanHang_HangHoa = titleDr === 'BANHANG' ? await APIDATA_CHART(API.BanHang_HangHoa, token, { ...dataDate_s, FilterText: searchText }) : null
      const BanHang_QuayLe = titleDr === 'BANHANG' ? await APIDATA_CHART(API.BanHang_QuayLe, token, { ...dataDate_s, FilterText: searchText }) : null
      const BanHang_KhachHang = titleDr === 'BANHANG' ? await APIDATA_CHART(API.BanHang_KhachHang, token, { ...dataDate_s, FilterText: searchText }) : null
      // //API Thu - Chi
      const ThuTien = titleDr === 'THU' || titleDr === 'CHI' ? await APIDATA_CHART(API.ThuTien, token, dataDate_s) : null
      const ChiTien = titleDr === 'THU' || titleDr === 'CHI' ? await APIDATA_CHART(API.ChiTien, token, dataDate_s) : null
      const SoQuy = titleDr === 'THU' || titleDr === 'CHI' ? await APIDATA_CHART(API.SoQuy, token, dataDate_s) : null

      if (
        data_hanghoa === -107 ||
        data_hanghoa === -108 ||
        data_TonKho_TongKho === -107 ||
        data_TonKho_TongKho === -108 ||
        CongNoThu_TopChart === -107 ||
        CongNoThu_TopChart === -108 ||
        MuaHang_HangHoa === -107 ||
        MuaHang_HangHoa === -108 ||
        XuatTra_HangHoa === -107 ||
        XuatTra_HangHoa === -108 ||
        BanHang_HangHoa === -107 ||
        BanHang_HangHoa === -108 ||
        ThuTien === -107 ||
        ThuTien === -108
      ) {
        const newToken = await RETOKEN()

        if (newToken !== '') {
          setRefToken(!refToken)
          setTimeout(() => {
            window.location.href = '/'
          }, 300)
        } else if (newToken === 0) {
          toast.error('Failed to refresh token!')
          window.localStorage.removeItem('firstLogin')
          window.localStorage.removeItem('authLogin')
          window.localStorage.removeItem('TKN')
          window.localStorage.removeItem('tokenDuLieu')
          window.localStorage.removeItem('RTKN')
          window.localStorage.removeItem('userName')
          window.localStorage.removeItem('dateLogin')
          navigate('/login')
        }
      }
      //Thu - Chi
      setThuTien(ThuTien)
      setChiTien(ChiTien)
      setSoQuy(SoQuy)
      //Ban Hang
      setBanHang_HangHoa(BanHang_HangHoa)
      setBanHang_QuayLe(BanHang_QuayLe)
      setBanHang_KhachHang(BanHang_KhachHang)
      //Xuat Tra - Nhap Tra
      setXuatTra_HangHoa(XuatTra_HangHoa)
      setXuatTra_NhaCungCap(XuatTra_NhaCungCap)
      //Mua Hang
      setMuaHang_HangHoa(MuaHang_HangHoa ? MuaHang_HangHoa : [])
      setMuaHang_NhaCungCap(MuaHang_NhaCungCap ? MuaHang_NhaCungCap : [])
      //Cong No Thu - Tra
      setCongNoThu_TopChart(CongNoThu_TopChart ? CongNoThu_TopChart : [])
      setCongNoThu_DanhSach(CongNoThu_DanhSach ? CongNoThu_DanhSach : [])

      //Ton Kho
      setdata_TonKho_TongKho(data_TonKho_TongKho ? data_TonKho_TongKho : [])
      setTonKho_TongKhoDVTQuyDoi(TonKho_TongKhoDVTQuyDoi ? TonKho_TongKhoDVTQuyDoi : [])
      setTonKho_TheoKho(TonKho_TheoKho ? TonKho_TheoKho : [])
      //Doanh So
      setDataChart_hanghoa(data_hanghoa !== -107 || data_hanghoa !== -108 ? data_hanghoa : [])
      setDataChart_khachhang(data_khachhang !== -107 || data_khachhang !== -108 ? data_khachhang : [])
      setDataChart_nhomhang(data_nhomhang !== -107 || data_nhomhang !== -108 ? data_nhomhang : [])

      if (titleDr === 'THU') {
        setDataSearch(ThuTien)
      } else if (titleDr === 'CHI') {
        setDataSearch(ChiTien)
      } else {
        setDataSearch(CongNoThu_DanhSach)
      }
      setLoading(false)
    }
    setSegmented(
      titleDr === 'DOANHSO'
        ? 'KHACHHANG'
        : titleDr === 'TONKHO'
          ? 'TONGHOP'
          : titleDr === 'PHAITHU' || titleDr === 'PHAITRA'
            ? 'BIEUDOTYTRONG'
            : titleDr === 'MUAHANG' || titleDr === 'XUATTRA' || titleDr === 'NHAPTRA'
              ? 'THEOHANGHOA'
              : titleDr === 'BANHANG'
                ? 'BANHANGHANGHOA'
                : titleDr === 'THU'
                  ? 'THUTIEN'
                  : titleDr === 'CHI'
                    ? 'CHITIEN'
                    : '',
    )
    setValueSegmented(
      titleDr === 'DOANHSO'
        ? 'Khách hàng'
        : titleDr === 'TONKHO'
          ? 'Tổng hợp'
          : titleDr === 'PHAITHU' || titleDr === 'PHAITRA'
            ? 'Biểu đồ tỷ trọng'
            : titleDr === 'MUAHANG' || titleDr === 'XUATTRA' || titleDr === 'NHAPTRA'
              ? 'Theo hàng hóa'
              : titleDr === 'BANHANG'
                ? 'Bán sỉ theo hàng hóa'
                : titleDr === 'THU'
                  ? 'Thu tiền'
                  : titleDr === 'CHI'
                    ? 'Chi tiền'
                    : '',
    )
    loadData()
    setDataDate_02(dataDate_s)
  }, [searchText, titleDr])
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const titleParam = params.get('title') || 'home'
    const loadData = async () => {
      setLoading(true)
      //API Doanh So
      const data_hanghoa = titleDr === 'DOANHSO' || titleParam === 'DOANHSO' ? await APIDATA_CHART(API.DoanhSoHangHoa_TopChart, token, dataDate_s) : null
      const data_khachhang = titleDr === 'DOANHSO' || titleParam === 'DOANHSO' ? await APIDATA_CHART(API.DoanhSoKhachHang_TopChart, token, dataDate_s) : null
      const data_nhomhang = titleDr === 'DOANHSO' || titleParam === 'DOANHSO' ? await APIDATA_CHART(API.DoanhSoNhomHang_TopChart, token, dataDate_s) : null
      //API Ton Kho

      const data_TonKho_TongKho = titleDr === 'TONKHO' || titleParam === 'TONKHO' ? await APIDATA_CHART(API.TonKho_TongKho, token, { ...dataDate_s, FilterText: searchText }) : null
      const TonKho_TongKhoDVTQuyDoi =
        titleDr === 'TONKHO' || titleParam === 'TONKHO' ? await APIDATA_CHART(API.TonKho_TongKhoDVTQuyDoi, token, { ...dataDate_s, FilterText: searchText }) : null
      const TonKho_TheoKho = titleDr === 'TONKHO' || titleParam === 'TONKHO' ? await APIDATA_CHART(API.TonKho_TheoKho, token, { ...dataDate_s, FilterText: searchText }) : null
      //API Cong No Thu - Tra
      const CongNoThu_TopChart =
        titleDr === 'PHAITHU' || titleDr === 'PHAITRA' || titleParam === 'PHAITHU' || titleParam === 'PHAITRA'
          ? await APIDATA_CHART(titleDr === 'PHAITRA' ? API.CongNoTra_TopChart : API.CongNoThu_TopChart, token, dataDate_s)
          : null
      const CongNoThu_DanhSach =
        titleDr === 'PHAITHU' || titleDr === 'PHAITRA' || titleParam === 'PHAITHU' || titleParam === 'PHAITRA'
          ? await APIDATA_CHART(titleDr === 'PHAITRA' ? API.CongNoTra_DanhSach : API.CongNoThu_DanhSach, token, dataDate_s)
          : null
      //API Mua Hang
      const MuaHang_HangHoa = titleDr === 'MUAHANG' || titleParam === 'MUAHANG' ? await APIDATA_CHART(API.MuaHang_HangHoa, token, { ...dataDate_s, FilterText: searchText }) : null
      const MuaHang_NhaCungCap =
        titleDr === 'MUAHANG' || titleParam === 'MUAHANG' ? await APIDATA_CHART(API.MuaHang_NhaCungCap, token, { ...dataDate_s, FilterText: searchText }) : null
      //API Xuat Tra - Nhap Tra
      const XuatTra_HangHoa =
        titleDr === 'XUATTRA' || titleDr === 'NHAPTRA' || titleParam === 'XUATTRA' || titleParam === 'NHAPTRA'
          ? await APIDATA_CHART(titleDr === 'NHAPTRA' || titleParam === 'NHAPTRA' ? API.NhapTra_HangHoa : API.XuatTra_HangHoa, token, { ...dataDate_s, FilterText: searchText })
          : null
      const XuatTra_NhaCungCap =
        titleDr === 'XUATTRA' || titleDr === 'NHAPTRA' || titleParam === 'XUATTRA' || titleParam === 'NHAPTRA'
          ? await APIDATA_CHART(titleDr === 'NHAPTRA' || titleParam === 'NHAPTRA' ? API.NhapTra_KhachHang : API.XuatTra_NhaCungCap, token, {
              ...dataDate_s,
              FilterText: searchText,
            })
          : null
      //API Ban Hang
      const BanHang_HangHoa = titleDr === 'BANHANG' || titleParam === 'BANHANG' ? await APIDATA_CHART(API.BanHang_HangHoa, token, { ...dataDate_s, FilterText: searchText }) : null
      const BanHang_QuayLe = titleDr === 'BANHANG' || titleParam === 'BANHANG' ? await APIDATA_CHART(API.BanHang_QuayLe, token, { ...dataDate_s, FilterText: searchText }) : null
      const BanHang_KhachHang =
        titleDr === 'BANHANG' || titleParam === 'BANHANG' ? await APIDATA_CHART(API.BanHang_KhachHang, token, { ...dataDate_s, FilterText: searchText }) : null
      // //API Thu - Chi
      const ThuTien = titleDr === 'THU' || titleDr === 'CHI' || titleParam === 'THU' || titleParam === 'CHI' ? await APIDATA_CHART(API.ThuTien, token, dataDate_s) : null
      const ChiTien = titleDr === 'THU' || titleDr === 'CHI' || titleParam === 'THU' || titleParam === 'CHI' ? await APIDATA_CHART(API.ChiTien, token, dataDate_s) : null
      const SoQuy = titleDr === 'THU' || titleDr === 'CHI' || titleParam === 'THU' || titleParam === 'CHI' ? await APIDATA_CHART(API.SoQuy, token, dataDate_s) : null

      if (
        data_hanghoa === -107 ||
        data_hanghoa === -108 ||
        data_TonKho_TongKho === -107 ||
        data_TonKho_TongKho === -108 ||
        CongNoThu_TopChart === -107 ||
        CongNoThu_TopChart === -108 ||
        MuaHang_HangHoa === -107 ||
        MuaHang_HangHoa === -108 ||
        XuatTra_HangHoa === -107 ||
        XuatTra_HangHoa === -108 ||
        BanHang_HangHoa === -107 ||
        BanHang_HangHoa === -108 ||
        ThuTien === -107 ||
        ThuTien === -108
      ) {
        const newToken = await RETOKEN()

        if (newToken !== '') {
          setRefToken(!refToken)
          setTimeout(() => {
            window.location.href = '/'
          }, 300)
        } else if (newToken === 0) {
          toast.error('Failed to refresh token!')
          window.localStorage.removeItem('firstLogin')
          window.localStorage.removeItem('authLogin')
          window.localStorage.removeItem('TKN')
          window.localStorage.removeItem('tokenDuLieu')
          window.localStorage.removeItem('RTKN')
          window.localStorage.removeItem('userName')
          window.localStorage.removeItem('dateLogin')
          navigate('/login')
        }
      }
      //Thu - Chi
      setThuTien(ThuTien)
      setChiTien(ChiTien)
      setSoQuy(SoQuy)
      //Ban Hang
      setBanHang_HangHoa(BanHang_HangHoa)
      setBanHang_QuayLe(BanHang_QuayLe)
      setBanHang_KhachHang(BanHang_KhachHang)
      //Xuat Tra - Nhap Tra
      setXuatTra_HangHoa(XuatTra_HangHoa)
      setXuatTra_NhaCungCap(XuatTra_NhaCungCap)
      //Mua Hang
      setMuaHang_HangHoa(MuaHang_HangHoa ? MuaHang_HangHoa : [])
      setMuaHang_NhaCungCap(MuaHang_NhaCungCap ? MuaHang_NhaCungCap : [])
      //Cong No Thu - Tra
      setCongNoThu_TopChart(CongNoThu_TopChart ? CongNoThu_TopChart : [])
      setCongNoThu_DanhSach(CongNoThu_DanhSach ? CongNoThu_DanhSach : [])

      //Ton Kho
      setdata_TonKho_TongKho(data_TonKho_TongKho ? data_TonKho_TongKho : [])
      setTonKho_TongKhoDVTQuyDoi(TonKho_TongKhoDVTQuyDoi ? TonKho_TongKhoDVTQuyDoi : [])
      setTonKho_TheoKho(TonKho_TheoKho ? TonKho_TheoKho : [])
      //Doanh So
      setDataChart_hanghoa(data_hanghoa !== -107 || data_hanghoa !== -108 ? data_hanghoa : [])
      setDataChart_khachhang(data_khachhang !== -107 || data_khachhang !== -108 ? data_khachhang : [])
      setDataChart_nhomhang(data_nhomhang !== -107 || data_nhomhang !== -108 ? data_nhomhang : [])

      if (titleDr === 'THU') {
        setDataSearch(ThuTien)
      } else if (titleDr === 'CHI') {
        setDataSearch(ChiTien)
      } else {
        setDataSearch(CongNoThu_DanhSach)
      }
      setLoading(false)
    }
    setSegmented(
      titleDr === 'DOANHSO' || titleParam === 'DOANHSO'
        ? 'KHACHHANG'
        : titleDr === 'TONKHO' || titleParam === 'TONKHO'
          ? 'TONGHOP'
          : titleDr === 'PHAITHU' || titleDr === 'PHAITRA' || titleParam === 'PHAITHU' || titleParam === 'PHAITRA'
            ? 'BIEUDOTYTRONG'
            : titleDr === 'MUAHANG' || titleDr === 'XUATTRA' || titleDr === 'NHAPTRA' || titleParam === 'MUAHANG' || titleParam === 'XUATTRA' || titleParam === 'NHAPTRA'
              ? 'THEOHANGHOA'
              : titleDr === 'BANHANG' || titleParam === 'BANHANG'
                ? 'BANHANGHANGHOA'
                : titleDr === 'THU' || titleParam === 'THU'
                  ? 'THUTIEN'
                  : titleDr === 'CHI' || titleParam === 'CHI'
                    ? 'CHITIEN'
                    : '',
    )
    setValueSegmented(
      titleDr === 'DOANHSO' || titleParam === 'DOANHSO'
        ? 'Khách hàng'
        : titleDr === 'TONKHO' || titleParam === 'TONKHO'
          ? 'Tổng hợp'
          : titleDr === 'PHAITHU' || titleDr === 'PHAITRA' || titleParam === 'PHAITHU' || titleParam === 'PHAITRA'
            ? 'Biểu đồ tỷ trọng'
            : titleDr === 'MUAHANG' || titleDr === 'XUATTRA' || titleDr === 'NHAPTRA' || titleParam === 'MUAHANG' || titleParam === 'XUATTRA' || titleParam === 'NHAPTRA'
              ? 'Theo hàng hóa'
              : titleDr === 'BANHANG' || titleParam === 'BANHANG'
                ? 'Bán sỉ theo hàng hóa'
                : titleDr === 'THU' || titleParam === 'THU'
                  ? 'Thu tiền'
                  : titleDr === 'CHI' || titleParam === 'CHI'
                    ? 'Chi tiền'
                    : '',
    )
    setTimeout(() => {
      loadData()
      setDataDate_02(dataDate_s)
    }, 1300)
  }, [dataDate_s?.NgayBatDau, dataDate_s?.NgayKetThuc])
  useEffect(() => {
    const dataMapping = {
      HANGHOA: data_hanghoa,
      KHACHHANG: data_khachhang,
      NHOMHANG: data_nhomhang,
      BIEUDOTYTRONG: CongNoThu_TopChart,
      DANHSACHKHACHHANG: CongNoThu_DanhSach,
      DANHSACHNHACUNGCAP: CongNoThu_DanhSach,
      THEOHANGHOA: titleDr === 'NHAPTRA' ? XuatTra_HangHoa : MuaHang_HangHoa,
      THEONHACUNGCAP: titleDr === 'NHAPTRA' ? XuatTra_NhaCungCap : MuaHang_NhaCungCap,
      BANHANGHANGHOA: BanHang_HangHoa,
      BANHANGQUYLE: BanHang_QuayLe,
      BANHANGKHACHHANG: BanHang_KhachHang,
      THUTIEN: ThuTien,
      CHITIEN: ChiTien,
      SOQUY: SoQuy,
    }

    const valueList = Array.isArray(dataMapping[segmented])
      ? dataMapping[segmented]?.map((item) =>
          titleDr === 'MUAHANG' || titleDr === 'BANHANG' || titleDr === 'XUATTRA' || titleDr === 'NHAPTRA' ? item.DataValueAmount : item.DataValue,
        )
      : []
    const totalPrice = valueList.reduce((sum, price) => sum + price, 0)

    setTotalChart(totalPrice || 0)
  }, [valueSegmented, CongNoThu_DanhSach, data_hanghoa, BanHang_KhachHang, ChiTien, ThuTien, XuatTra_NhaCungCap, MuaHang_NhaCungCap, segmented, titleDr])

  const onClose = () => {
    setOpenShow(false)
    navigate(`/`)
  }
  const setNumber = (value) => {
    setTotalNumber(value)
  }

  useEffect(() => {
    const showChildrenDrawer = async () => {
      const data_ct = await APIDATA_CHART_CT(
        segmented === 'KHACHHANG'
          ? API.DoanhSoKhachHang_CT
          : segmented === 'HANGHOA'
            ? API.DoanhSoHangHoa_CT
            : segmented === 'NHOMHANG'
              ? API.DoanhSoNhomHang_CT
              : titleDr === 'PHAITHU'
                ? API.CongNoThu_CT
                : titleDr === 'PHAITRA'
                  ? API.CongNoTra_CT
                  : null,
        token,
        {
          ...dataDate_02,
          FilterCode: valueCT.DataCode,
          IsCodeRest: valueCT.DataCodeRest,
          IsType: 1,
        },
      )
      if (data_ct === -107 || data_ct === -108) {
        const newToken = await RETOKEN()

        if (newToken !== '') {
          setRefToken(!refToken)
          setTimeout(() => {
            window.location.href = '/'
          }, 300)
        } else if (newToken === 0) {
          toast.error('Failed to refresh token!')
          window.localStorage.removeItem('firstLogin')
          window.localStorage.removeItem('authLogin')
          window.localStorage.removeItem('TKN')
          window.localStorage.removeItem('tokenDuLieu')
          window.localStorage.removeItem('RTKN')
          window.localStorage.removeItem('userName')
          window.localStorage.removeItem('dateLogin')
          navigate('/login')
        }
      }
      setDataTable(data_ct)
      setLoading_dr2(false)

      // setChildrenDrawer(true)
    }
    if (childrenDrawer) {
      setTimeout(() => {
        setLoading_dr2(true)

        showChildrenDrawer()
      }, 1000)
    }
  }, [dataDate_02?.NgayBatDau, dataDate_02?.NgayKetThuc])
  const showChildrenDrawer = async (value, color) => {
    setLoading_dr2(true)

    setValueCT(value)
    setTitleDrChild(value)
    setColorTable(color)
    setTitle(value.title)
    const data_ct = await APIDATA_CHART_CT(
      segmented === 'KHACHHANG'
        ? API.DoanhSoKhachHang_CT
        : segmented === 'HANGHOA'
          ? API.DoanhSoHangHoa_CT
          : segmented === 'NHOMHANG'
            ? API.DoanhSoNhomHang_CT
            : titleDr === 'PHAITHU'
              ? API.CongNoThu_CT
              : titleDr === 'PHAITRA'
                ? API.CongNoTra_CT
                : null,
      token,
      {
        ...dataDate_s,
        FilterCode: value.DataCode,
        IsCodeRest: value.DataCodeRest,
        IsType: 1,
      },
    )
    if (data_ct === -107 || data_ct === -108) {
      const newToken = await RETOKEN()

      if (newToken !== '') {
        setRefToken(!refToken)
        setTimeout(() => {
          window.location.href = '/'
        }, 300)
      } else if (newToken === 0) {
        toast.error('Failed to refresh token!')
        window.localStorage.removeItem('firstLogin')
        window.localStorage.removeItem('authLogin')
        window.localStorage.removeItem('TKN')
        window.localStorage.removeItem('tokenDuLieu')
        window.localStorage.removeItem('RTKN')
        window.localStorage.removeItem('userName')
        window.localStorage.removeItem('dateLogin')
        navigate('/login')
      }
    }
    setDataTable(data_ct)
    setDataDate_02(dataDate_s)
    setChildrenDrawer(true)
    setLoading_dr2(false)
  }
  const onChildrenDrawerClose = () => {
    setChildrenDrawer(false)
  }
  const containerRef = useRef(null)
  let startX_01 = 0

  const handleTouchStart_op = (e) => {
    startX_01 = e.touches[0].clientX
  }

  const handleTouchMove_op = (e) => {
    if (startX_01) {
      const currentX = e.touches[0].clientX
      const deltaX_draw2 = startX_01 - currentX
      if (deltaX_draw2 > 100) {
        setChildrenDrawer(true)
      } else if (deltaX_draw2 < -150) {
        setChildrenDrawer(false)
      }
    }
  }

  const handleTouchEnd_op = () => {
    startX_01 = 0
  }
  const isMatch = (value, searchText) => {
    const stringValue = String(value).toLowerCase()
    const searchTextLower = searchText.toLowerCase()

    // Check if the string includes the searchText
    if (stringValue.includes(searchTextLower)) {
      return true
    }
    // Check if it's a valid date and matches (formatted or not)
    const isDateTime = dayjs(stringValue).isValid()
    if (isDateTime) {
      const formattedValue = dayjs(stringValue).format('DD/MM/YYYY').toString()
      const formattedSearchText = searchTextLower
      if (formattedValue.includes(formattedSearchText)) {
        return true
      }
    }
    return false
  }
  useEffect(() => {
    if (valueSegmented === 'Thu tiền') {
      setDataSearch(ThuTien)
    } else if (valueSegmented === 'Chi tiền') {
      setDataSearch(ChiTien)
    } else {
      setDataSearch(CongNoThu_DanhSach)
    }
  }, [valueSegmented])

  const handelSerch = (value) => {
    if (CongNoThu_DanhSach === -1 || ThuTien === -1 || ChiTien === -1) {
      setDataSearch([])
    } else {
      const newData =
        segmented === 'THUTIEN'
          ? ThuTien?.filter((record) => {
              return Object.keys(record).some((key) => isMatch(record[key], value))
            })
          : segmented === 'CHITIEN'
            ? ChiTien?.filter((record) => {
                return Object.keys(record).some((key) => isMatch(record[key], value))
              })
            : CongNoThu_DanhSach?.filter((record) => {
                return Object.keys(record).some((key) => isMatch(record[key], value))
              })
      console.log(newData)
      setDataSearch(newData)
    }
  }

  const onSearch = (value) => setSearchText(value)
  return (
    <div ref={containerRef} onTouchStart={handleTouchStart_op} onTouchMove={handleTouchMove_op} onTouchEnd={handleTouchEnd_op}>
      <div>
        <Drawer
          footer={
            titleDr === 'TONKHO' || segmented === 'SOQUY' ? null : (
              <div style={{ backgroundColor: 'rgb(241,241,241)' }}>
                <div className="flex cursor-pointer items-center justify-center mb-2" onClick={() => showChildrenDrawer({ DataCode: null, DataCodeRest: 1, title: 'all' })}>
                  <p className="w-[100%]  hover:font-medium flex items-center gap-2 justify-between text-base">Tổng:</p>
                  <div
                    className={`w-[100%] mr-4 ${
                      titleDr === 'MUAHANG' ||
                      titleDr === 'BANHANG' ||
                      titleDr === 'NHAPTRA' ||
                      titleDr === 'XUATTRA' ||
                      segmented === 'DANHSACHKHACHHANG' ||
                      segmented === 'DANHSACHNHACUNGCAP'
                        ? 'text-right'
                        : 'text-right'
                    } `}
                  >
                    <CounterComponent targetValue={TotalChart} duration={100000} color={'#8BC6EC'} />
                    {titleDr === 'MUAHANG' ||
                    titleDr === 'BANHANG' ||
                    titleDr === 'NHAPTRA' ||
                    titleDr === 'XUATTRA' ||
                    titleDr === 'THU' ||
                    titleDr === 'CHI' ||
                    segmented === 'DANHSACHKHACHHANG' ||
                    segmented === 'DANHSACHNHACUNGCAP' ? null : (
                      <RateBar percentage={100} color={'#8BC6EC'} title={'Tổng hợp'} />
                    )}
                  </div>
                </div>
              </div>
            )
          }
          title={
            <div className="flex items-center justify-between">
              {nameMapping[titleDr]}{' '}
              {titleDr === 'TONKHO' ||
              titleDr === 'MUAHANG' ||
              titleDr === 'BANHANG' ||
              titleDr === 'NHAPTRA' ||
              titleDr === 'XUATTRA' ||
              segmented === 'DANHSACHKHACHHANG' ||
              segmented === 'THUTIEN' ||
              segmented === 'CHITIEN' ? (
                <Search
                  onChange={(e) => handelSerch(e.target.value)}
                  onSearch={segmented === 'DANHSACHKHACHHANG' ? null : onSearch}
                  placeholder="Tìm kiếm hàng hóa"
                  loading={loading}
                  className="w-[70%]"
                />
              ) : (
                ''
              )}
            </div>
          }
          closeIcon={<BiLeftArrowAlt />}
          width={1020}
          onClose={onClose}
          open={showOpen}
          className="bg-gray-500"
        >
          <Spin tip="Loading..." spinning={loading}>
            <Date onDateChange={setDataDate} dataDate={dataDate_s} />
            {titleDr === 'DOANHSO' ? (
              <Segmented
                options={['Khách hàng', 'Hàng hóa', 'Nhóm Hàng']}
                block
                onChange={(value) => {
                  setSegmented(value === 'Khách hàng' ? 'KHACHHANG' : value === 'Hàng hóa' ? 'HANGHOA' : 'NHOMHANG'), setValueSegmented(value)
                }}
                value={valueSegmented}
              />
            ) : titleDr === 'TONKHO' ? (
              <Segmented
                options={['Tổng hợp', 'Tổng hợp (đơn vị tính)', 'Theo kho']}
                block
                onChange={(value) => {
                  setSegmented(value === 'Tổng hợp' ? 'TONGHOP' : value === 'Tổng hợp (đơn vị tính)' ? 'TONGHOPDVT' : value === 'Theo kho' ? 'THEOKHO' : null),
                    setValueSegmented(value)
                }}
                value={valueSegmented}
              />
            ) : titleDr === 'PHAITHU' || titleDr === 'PHAITRA' ? (
              <Segmented
                options={titleDr === 'PHAITRA' ? ['Biểu đồ tỷ trọng', 'Danh sách nhà cung cấp'] : ['Biểu đồ tỷ trọng', 'Danh sách khách hàng']}
                block
                onChange={(value) => {
                  setSegmented(
                    value === 'Biểu đồ tỷ trọng'
                      ? 'BIEUDOTYTRONG'
                      : value === 'Danh sách nhà cung cấp'
                        ? 'DANHSACHKHACHHANG'
                        : value === 'Danh sách khách hàng'
                          ? 'DANHSACHKHACHHANG'
                          : null,
                  ),
                    setValueSegmented(value)
                }}
                value={valueSegmented}
              />
            ) : titleDr === 'MUAHANG' ? (
              <Segmented
                options={['Theo hàng hóa', 'Theo nhà cung cấp']}
                block
                onChange={(value) => {
                  setSegmented(value === 'Theo hàng hóa' ? 'THEOHANGHOA' : value === 'Theo nhà cung cấp' ? 'THEONHACUNGCAP' : null), setValueSegmented(value)
                }}
                value={valueSegmented}
              />
            ) : titleDr === 'XUATTRA' ? (
              <Segmented
                options={['Theo hàng hóa', 'Theo nhà cung cấp']}
                block
                onChange={(value) => {
                  setSegmented(value === 'Theo hàng hóa' ? 'THEOHANGHOA' : value === 'Theo nhà cung cấp' ? 'THEONHACUNGCAP' : null), setValueSegmented(value)
                }}
                value={valueSegmented}
              />
            ) : titleDr === 'NHAPTRA' ? (
              <Segmented
                options={['Theo hàng hóa', 'Theo khách hàng']}
                block
                onChange={(value) => {
                  setSegmented(value === 'Theo hàng hóa' ? 'THEOHANGHOA' : value === 'Theo khách hàng' ? 'THEONHACUNGCAP' : null), setValueSegmented(value)
                }}
                value={valueSegmented}
              />
            ) : titleDr === 'BANHANG' ? (
              <Segmented
                options={['Bán sỉ theo hàng hóa', 'Bán sỉ theo khách hàng', 'Bán lẻ']}
                block
                onChange={(value) => {
                  setSegmented(
                    value === 'Bán sỉ theo hàng hóa' ? 'BANHANGHANGHOA' : value === 'Bán lẻ' ? 'BANHANGQUYLE' : value === 'Bán sỉ theo khách hàng' ? 'BANHANGKHACHHANG' : null,
                  ),
                    setValueSegmented(value)
                }}
                value={valueSegmented}
              />
            ) : titleDr === 'THU' || titleDr === 'CHI' ? (
              <Segmented
                options={['Thu tiền', 'Chi tiền', 'Sổ quỹ']}
                block
                onChange={(value) => {
                  setSegmented(value === 'Thu tiền' ? 'THUTIEN' : value === 'Chi tiền' ? 'CHITIEN' : value === 'Sổ quỹ' ? 'SOQUY' : null), setValueSegmented(value)
                }}
                value={valueSegmented}
              />
            ) : null}
            {/* segmented */}
            {segmented === 'KHACHHANG' ? (
              <>
                {data_khachhang !== -108 || data_khachhang !== -107 ? (
                  <PieChart
                    Drawer={true}
                    dataChart={data_khachhang ? data_khachhang : []}
                    valueNum={'DataValue'}
                    value={'DataPerc'}
                    name={'DataName'}
                    onClick={showChildrenDrawer}
                  />
                ) : null}
              </>
            ) : segmented === 'HANGHOA' ? (
              <>
                {data_hanghoa !== -108 || data_hanghoa !== -107 ? (
                  <PieChart
                    titleDr={titleDr}
                    Drawer={true}
                    nameChart={segmented}
                    dataChart={data_hanghoa ? data_hanghoa : []}
                    valueNum={'DataValue'}
                    value={'DataPerc'}
                    name={'DataName'}
                    onClick={showChildrenDrawer}
                  />
                ) : null}
              </>
            ) : segmented === 'NHOMHANG' ? (
              <>
                {data_hanghoa !== -108 || data_hanghoa !== -107 ? (
                  <PieChart Drawer={true} dataChart={data_nhomhang ? data_nhomhang : []} valueNum={'DataValue'} value={'DataPerc'} name={'DataName'} onClick={showChildrenDrawer} />
                ) : null}
              </>
            ) : segmented === 'TONGHOP' ? (
              <>
                <Table
                  segmented={segmented}
                  titleDr={titleDr}
                  param={data_TonKho_TongKho ? data_TonKho_TongKho : []}
                  columName={[]}
                  height={'setHeight'}
                  hiden={[]}
                  setTotalNumber={setNumber}
                />{' '}
              </>
            ) : segmented === 'TONGHOPDVT' ? (
              <>
                <Table
                  segmented={segmented}
                  titleDr={titleDr}
                  param={TonKho_TongKhoDVTQuyDoi ? TonKho_TongKhoDVTQuyDoi : []}
                  columName={[]}
                  height={'setHeight'}
                  hiden={[]}
                  setTotalNumber={setNumber}
                />{' '}
              </>
            ) : segmented === 'THEOKHO' ? (
              <>
                <Table
                  segmented={segmented}
                  titleDr={titleDr}
                  param={TonKho_TheoKho ? TonKho_TheoKho : []}
                  columName={[]}
                  height={'setHeight'}
                  hiden={[]}
                  setTotalNumber={setNumber}
                />{' '}
              </>
            ) : segmented === 'BIEUDOTYTRONG' ? (
              <>
                <PieChart
                  titleDr={titleDr}
                  Drawer={true}
                  nameChart={segmented}
                  dataChart={CongNoThu_TopChart ? CongNoThu_TopChart : []}
                  valueNum={'DataValue'}
                  value={'DataPerc'}
                  name={'DataName'}
                  onClick={showChildrenDrawer}
                />
              </>
            ) : segmented === 'DANHSACHKHACHHANG' || segmented === 'DANHSACHNHACUNGCAP' ? (
              <>
                <Table
                  segmented={segmented}
                  titleDr={titleDr}
                  param={CongNoThu_DanhSach ? dataSearch : []}
                  columName={[]}
                  height={'setHeight'}
                  hiden={[]}
                  setTotalNumber={setNumber}
                  onClick={showChildrenDrawer}
                />{' '}
              </>
            ) : segmented === 'THEOHANGHOA' ? (
              <>
                <Table
                  segmented={segmented}
                  titleDr={titleDr}
                  param={titleDr === 'MUAHANG' ? MuaHang_HangHoa : XuatTra_HangHoa}
                  columName={[]}
                  height={'setHeight'}
                  hiden={[]}
                  setTotalNumber={setNumber}
                />{' '}
              </>
            ) : segmented === 'THEONHACUNGCAP' ? (
              <>
                <Table
                  segmented={segmented}
                  titleDr={titleDr}
                  param={titleDr === 'MUAHANG' ? MuaHang_NhaCungCap : XuatTra_NhaCungCap}
                  columName={[]}
                  height={'setHeight'}
                  hiden={[]}
                  setTotalNumber={setNumber}
                />{' '}
              </>
            ) : segmented === 'BANHANGHANGHOA' ? (
              <>
                <Table segmented={segmented} titleDr={titleDr} param={BanHang_HangHoa} columName={[]} height={'setHeight'} hiden={[]} setTotalNumber={setNumber} />{' '}
              </>
            ) : segmented === 'BANHANGQUYLE' ? (
              <>
                <Table segmented={segmented} titleDr={titleDr} param={BanHang_QuayLe} columName={[]} height={'setHeight'} hiden={[]} setTotalNumber={setNumber} />{' '}
              </>
            ) : segmented === 'BANHANGKHACHHANG' ? (
              <>
                <Table segmented={segmented} titleDr={titleDr} param={BanHang_KhachHang} columName={[]} height={'setHeight'} hiden={[]} setTotalNumber={setNumber} />{' '}
              </>
            ) : segmented === 'THUTIEN' ? (
              <>
                <Table segmented={segmented} titleDr={titleDr} param={dataSearch ? dataSearch : []} columName={[]} height={'setHeight'} hiden={[]} setTotalNumber={setNumber} />{' '}
              </>
            ) : segmented === 'CHITIEN' ? (
              <>
                <Table segmented={segmented} titleDr={titleDr} param={dataSearch ? dataSearch : []} columName={[]} height={'setHeight'} hiden={[]} setTotalNumber={setNumber} />{' '}
              </>
            ) : segmented === 'SOQUY' ? (
              <>
                <Table segmented={segmented} titleDr={titleDr} param={SoQuy} columName={[]} height={'setHeight'} hiden={[]} setTotalNumber={setNumber} />{' '}
              </>
            ) : null}

            {titleDr === 'DOANHSO' || titleDr === 'PHAITHU' || titleDr === 'PHAITRA' ? (
              <Drawer
                footer={
                  titleDr === 'PHAITRA' || titleDr === 'PHAITHU' ? null : (
                    <div>
                      {
                        <div className="flex items-center justify-center mb-2">
                          <p className="w-[100%] cursor-pointer hover:font-medium text-base flex items-center gap-2 justify-between">Tổng :</p>
                          <div className="w-[100%] ml-3 text-right">
                            <CounterComponent targetValue={TotalNumber} duration={100000} color={'#8BC6EC'} />
                            {<RateBar percentage={100} color={'#8BC6EC'} title={'Tổng hợp'} />}
                          </div>
                        </div>
                      }
                    </div>
                  )
                }
                className="DrawerCT"
                title={`${nameMapping[titleDr]} ${titleDr_child.DataName || 'Tổng Cộng'}(Chi tiết)`}
                width={1020}
                onClose={onChildrenDrawerClose}
                closeIcon={<BiLeftArrowAlt />}
                open={childrenDrawer}
              >
                <Spin tip="Loading..." spinning={loading_dr2}>
                  <Date onDateChange={setDataDate_02} dataDate={dataDate_02} />

                  <Table
                    segmented={segmented}
                    titleDr={titleDr}
                    colorTable={colorTable}
                    param={dataTable ? dataTable : []}
                    columName={[]}
                    height={'setHeight'}
                    hiden={[]}
                    typeTable={segmented === 'DANHSACHKHACHHANG' ? 1 : 0}
                    setTotalNumber={setNumber}
                    title={title}
                  />
                </Spin>
              </Drawer>
            ) : null}
          </Spin>
        </Drawer>
      </div>
    </div>
  )
}

export default DashBoar
