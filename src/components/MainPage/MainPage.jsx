/* eslint-disable no-unused-vars */
import { Route, Routes } from 'react-router-dom'
import ErrorPage from '../util/Erorr/ErrorPage'
import DashBoar from '../DashBoar/DashBoar'
import AnimatedWaves from '../DashBoar/BgImg'
import { useEffect, useState } from 'react'
import { KHOANNGAY, getFirstDayOfMonth, getWeek, getDateNum } from '../../action/Actions'
import API from '../../API/API'
import { useDispatch } from 'react-redux'
import MainSlice from './MainSlice'
import LoadingPage from '../util/Loading/LoadingPage'
import dayjs from 'dayjs'
// import PhieuMuaHang from "../DULIEU/PhieuMuaHang";
// import Home from "../Home/Home";

// eslint-disable-next-line react/prop-types
function MainPage({ isSidebarVisible }) {
  const dispatch = useDispatch()
  const [currentDate, setCurrentDate] = useState(new Date())
  const checkDateSetting = localStorage.getItem('dateSetting')
  const token = localStorage.getItem('TKN')
  const [dataLoaded, setDataLoaded] = useState(false)
  useEffect(() => {
    const loadData = async () => {
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
      <div className="MainPage_bg">
        <AnimatedWaves />
      </div>
      <main id="main" className={isSidebarVisible ? 'main' : 'main show_main'}>
        <Routes>
          <Route path="/" element={<DashBoar />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default MainPage
