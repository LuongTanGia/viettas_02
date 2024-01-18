/* eslint-disable react/prop-types */
import MainPage from '../MainPage/MainPage'
import Header from '../Header/Header'
import { useEffect, useState } from 'react'
import Footer from '../Footer/Footer'
import { DATATONGHOP } from '../../action/Actions'
import API from '../../API/API'
import { useDispatch, useSelector } from 'react-redux'
import { khoanNgaySelect } from '../../redux/selector'
import LoadingPage from '../util/Loading/LoadingPage'

function Home({ handleToggleSidebar, isSidebarVisible }) {
  const dispatch = useDispatch()
  const [dataLoaded, setDataLoaded] = useState(false)
  const token = localStorage.getItem('TKN')

  const KhoanNgay = useSelector(khoanNgaySelect)

  useEffect(() => {
    const loadData = async () => {
      await DATATONGHOP(API.TONGHOP, token, KhoanNgay, dispatch)

      setDataLoaded(true)
    }

    loadData()
  }, [])

  if (!dataLoaded) {
    return <LoadingPage />
  }

  return (
    <div>
      <Header
        handleToggleSidebar={() => {
          handleToggleSidebar()
        }}
      />

      <MainPage isSidebarVisible={isSidebarVisible} />
      <Footer />
    </div>
  )
}

export default Home
