/* eslint-disable no-unused-vars */
import { Route, Routes } from 'react-router-dom'
import ErrorPage from '../util/Erorr/ErrorPage'
import DashBoar from '../DashBoar/DashBoar'
import AnimatedWaves from '../DashBoar/BgImg'
import { useEffect, useState } from 'react'
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
// eslint-disable-next-line react/prop-types
function MainPage({ isSidebarVisible }) {
  const dispatch = useDispatch()
  const [currentDate, setCurrentDate] = useState(new Date())
  const checkDateSetting = localStorage.getItem('dateSetting')
  const token = localStorage.getItem('TKN')

  const [dataLoaded, setDataLoaded] = useState(false)
  useEffect(() => {
    const loadData = async () => {
      const ThongSo = await THONGSO(API.SoLeHeThong, token)

      localStorage.setItem('ThongSo', JSON.stringify(ThongSo))
      if (checkDateSetting === 'DHT') {
        const KhoanNgay = await KHOANNGAY(API.KHOANNGAY, token)
        dispatch(MainSlice.actions.getKhoanNgay(KhoanNgay))
      } else if (checkDateSetting === 'DM') {
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
  return (
    <div className="MainPage">
      <div className="hidden">
        <Detector
          render={({ online }) =>
            online
              ? toast.success(
                  <div className="flex gap-2 justify-start items-center text-green-500 text-base ">
                    Đã kết nối
                    <FiWifi size={20} color="green" fontSize={20} />
                  </div>,
                )
              : toast.error(
                  <div className="flex gap-1 justify-start items-center  text-red-500 text-base ">
                    Lỗi kết nối mạng !
                    <FiWifiOff size={20} fontSize={20} color="red" />
                  </div>,
                )
          }
        />
      </div>

      <div className="MainPage_bg">
        <AnimatedWaves />
      </div>
      <main id="main" className={isSidebarVisible ? 'main' : 'main show_main'}>
        <Routes>
          <Route path="/?title=DOANHSO" element={<DashBoar />} />
          <Route path="/" element={<DashBoar />} />

          <Route path="/Info" element={<InfoApp />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default MainPage
