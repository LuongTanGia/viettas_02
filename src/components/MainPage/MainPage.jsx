/* eslint-disable no-unused-vars */
import { Route, Routes } from 'react-router-dom'
import ErrorPage from '../util/Erorr/ErrorPage'
import DashBoar from '../DashBoar/DashBoar'
// import AnimatedWaves from '../DashBoar/BgImg'
import { useEffect, useRef, useState } from 'react'
import { KHOANNGAY, getFirstDayOfMonth, getWeek, getDateNum, THONGSO } from '../../action/Actions'
import API from '../../API/API'
import { useDispatch } from 'react-redux'
import MainSlice from './MainSlice'
import LoadingPage from '../util/Loading/LoadingPage'
import dayjs from 'dayjs'
import InfoApp from '../DashBoar/PageInfor'
// import PhieuMuaHang from "../DULIEU/PhieuMuaHang";
// import Home from "../Home/Home";
import { Detector } from 'react-detect-offline'
import { toast } from 'react-toastify'
import { FiWifi } from 'react-icons/fi'
import { FiWifiOff } from 'react-icons/fi'
import DoanhSo from '../DashBoardPage/DoanhSo'
import DoanhSoDetail from '../DashBoarDetail/DoanhSoDetail'
import TonKho from '../DashBoardPage/TonKho'
import PhaiThu from '../DashBoardPage/PhaiThu'
import PhaiThuDetail from '../DashBoarDetail/PhaiThuDetail'
import PhaiTra from '../DashBoardPage/PhaiTra'
import PhaiTraDetail from '../DashBoarDetail/PhaiTraDetail'
import MuaHang from '../DashBoardPage/MuaHang'
import XuatTra from '../DashBoardPage/XuatTra'
import BanHang from '../DashBoardPage/BanHang'
import NhapTra from '../DashBoardPage/NhapTra'
import Thu from '../DashBoardPage/Thu'
import Chi from '../DashBoardPage/Chi'
import SoQuy from '../DashBoardPage/SoQuy'
import BanLe from '../DashBoardPage/BanLe'
// eslint-disable-next-line react/prop-types
function MainPage({ isSidebarVisible }) {
  const dispatch = useDispatch()
  const [currentDate, setCurrentDate] = useState(new Date())
  const myStateRef = useRef(true)

  const checkDateSetting = localStorage.getItem('dateSetting')
  const token = localStorage.getItem('TKN')

  const [dataLoaded, setDataLoaded] = useState(false)
  useEffect(() => {
    const loadData = async () => {
      const ThongSo = await THONGSO(API.SoLeHeThong, token)
      const KhoanNgay = await KHOANNGAY(API.KHOANNGAY, token)
      dispatch(MainSlice.actions.getKhoanNgay(KhoanNgay))
      localStorage.setItem('ThongSo', JSON.stringify(ThongSo))
      if (checkDateSetting === 'DM') {
        const KhoanNgay = getFirstDayOfMonth(currentDate)

        dispatch(
          MainSlice.actions.getKhoanNgay({
            NgayBatDau: dayjs(KhoanNgay).format('YYYY-MM-DD'),
            NgayKetThuc: dayjs(new Date()).format('YYYY-MM-DD'),
          }),
        )
      } else if (checkDateSetting === 'DW') {
        const KhoanNgay = getWeek(currentDate)

        dispatch(
          MainSlice.actions.getKhoanNgay({
            NgayBatDau: dayjs(KhoanNgay[0].toDateString()).format('YYYY-MM-DD'),
            NgayKetThuc: dayjs(KhoanNgay[6].toDateString()).format('YYYY-MM-DD'),
          }),
        )
      } else if (checkDateSetting === 'DN') {
        const KhoanNgay = getDateNum(currentDate)

        dispatch(
          MainSlice.actions.getKhoanNgay({
            NgayBatDau: dayjs(KhoanNgay).format('YYYY-MM-DD'),
            NgayKetThuc: dayjs(new Date()).format('YYYY-MM-DD'),
          }),
        )
      }
      setDataLoaded(true)
    }

    loadData()
  }, [token, checkDateSetting])

  if (!dataLoaded) {
    return <LoadingPage />
  }
  const errorCheck = () => {
    console.log('errorCheck')
    myStateRef.current = false
    return toast.error(
      <div className="flex gap-1 justify-start items-center  text-red-500 text-base ">
        Lỗi kết nối mạng
        <FiWifiOff size={20} fontSize={20} color="red" />
      </div>,
    )
  }
  const successCheck = () => {
    if (!myStateRef.current) {
      toast.success(
        <div className="flex gap-1 justify-start items-center  text-green-500 text-base ">
          Kết nối thành công
          <FiWifi size={20} fontSize={20} color="green" />
        </div>,
      )
      myStateRef.current = true
    } else {
      return null
    }
  }
  // DOANHSO: 'Doanh số',
  //   TONKHO: 'Tồn kho',
  //   PHAITHU: 'Phải thu',
  //   PHAITRA: 'Phải trả',
  //   MUAHANG: 'Mua hàng',
  //   XUATTRA: 'Xuất trả nhà cung cấp',
  //   BANHANG: 'Bán hàng',
  //   NHAPTRA: 'Hàng bán trả lại',
  //   THU: 'Thu tiền',
  //   CHI: 'Chi tiền',
  //   QUYTIENMAT: 'Sổ quỹ',
  return (
    <main id="main">
      <div className="hidden">
        <Detector render={({ online }) => (online ? successCheck() : errorCheck())} />
      </div>
      <Routes>
        <Route path="/DOANHSO" element={<DoanhSo />} />
        <Route path="/DOANHSO/:id" element={<DoanhSoDetail />} />

        <Route path="/TONKHO" element={<TonKho />} />
        <Route path="/PHAITHU" element={<PhaiThu />} />
        <Route path="/PHAITHU/:id" element={<PhaiThuDetail />} />

        <Route path="/PHAITRA" element={<PhaiTra />} />
        <Route path="/PHAITRA/:id" element={<PhaiTraDetail />} />
        <Route path="/BANLE" element={<BanLe />} />

        <Route path="/MUAHANG" element={<MuaHang />} />
        <Route path="/XUATTRA" element={<XuatTra />} />
        <Route path="/BANHANG" element={<BanHang />} />
        <Route path="/NHAPTRA" element={<NhapTra />} />
        <Route path="/THU" element={<Thu />} />
        <Route path="/CHI" element={<Chi />} />
        <Route path="/QUYTIENMAT" element={<SoQuy />} />
        <Route path="/" element={<DashBoar />} />
        <Route path="/Info" element={<InfoApp />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </main>
  )
}

export default MainPage
