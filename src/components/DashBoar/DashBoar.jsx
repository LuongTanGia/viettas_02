import Card from '../util/CardTT/Card'
import { useEffect, useRef, useState } from 'react'
import './dashBoard.css'
// import DrawerCP from './DrawerChart'
import LoadingPage from '../util/Loading/LoadingPage'
import { DATATONGHOP } from '../../action/Actions'
import API from '../../API/API'
import Date from './Date'
import { useSelector } from 'react-redux'
import { khoanNgaySelect } from '../../redux/selector'
// import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { Progress } from 'antd'
// import { useParams } from 'react-router-dom'
import Header from '../Header/Header'
import AnimatedWaves from '../DashBoar/BgImg'
import { useNavigate } from 'react-router-dom'

function DashBoar() {
  const userTHONGSO = window.localStorage.getItem('UseThongSo')

  const KhoanNgay = useSelector(khoanNgaySelect)
  const token = localStorage.getItem('TKN')
  const [dataDate, setDataDate] = useState(!JSON.parse(localStorage.getItem('dateLogin')) ? KhoanNgay : JSON.parse(localStorage.getItem('dateLogin')))
  const [dataLoaded, setDataLoaded] = useState(false)
  const [dataTongHop, setDataTongHop] = useState([])
  // const [dataBanLe, setDataBanLe] = useState([])
  const navigate = useNavigate()

  const [dataTongHop_DF, setDataTongHop_DF] = useState([])
  const [loadingCart, setLoadingCart] = useState(false)
  const [progressPercent, setProgressPercent] = useState(0)
  const location = useLocation()
  const containerRef = useRef(null)

  let startX = 0
  useEffect(() => {
    localStorage.removeItem('dateLogin2')

    const loadData = async () => {
      setLoadingCart(true)
      setProgressPercent(0)

      try {
        const data = await DATATONGHOP(API.TONGHOP, token, dataDate, true)
        const dataBanLe = await DATATONGHOP(API.TONGHOPBANLE, token, dataDate, false)

        setDataTongHop(data)
        setDataTongHop_DF(dataBanLe)
        setDataLoaded(true)
        setProgressPercent(70)
      } catch (error) {
        console.error('Error loading data:', error)
        // Handle errors
      } finally {
        setProgressPercent(100)
        setLoadingCart(false)
      }
    }

    setTimeout(() => {
      setProgressPercent(50)
    }, 500)
    setTimeout(() => {
      setProgressPercent(90)
    }, 700)

    loadData()
  }, [dataDate?.NgayKetThuc, dataDate?.NgayBatDau, token, location.search])

  const showChildrenDrawer = async (value, name) => {
    // const url = window.location.href
    // console.log(url.split('?')[1])
    // navigate(`?${url.split('?')[1]}` + '_detail')
    navigate(`/BanLe`)
    localStorage.setItem(
      'ThongTinDetail',
      btoa(
        encodeURIComponent(
          JSON.stringify({
            DataValue: value,
            DataName: name,
          }),
        ),
      ),
    )
  }
  const storedSelectedItem = localStorage.getItem('selectedItem')

  useEffect(() => {
    if (storedSelectedItem) {
      const element = document.getElementById(storedSelectedItem.toString())
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }
  }, [progressPercent])
  if (!dataLoaded) {
    return <LoadingPage />
  }
  const handleTouchStart = (e) => {
    startX = e.touches[0].clientX
  }

  const handleTouchMove = (e) => {
    if (startX) {
      const currentX = e.touches[0].clientX
      const deltaX_draw1 = startX - currentX

      if (deltaX_draw1 > 100) {
        // setOpen(true)
      } else if (deltaX_draw1 < -200) {
        // setOpen(false)
      }
    }
  }

  const handleTouchEnd = () => {
    startX = 0
  }
  const data = dataTongHop
  const data_DF = dataTongHop_DF

  // if (data?.DataResults?.length === 0) {
  //   return <p>Dữ liệu trống, vui lòng kiểm tra lại.</p>
  // }
  const groupedData = {}
  const groupedData_DF = {}

  data?.DataResults?.forEach((item) => {
    const key = item['DataCode'].split('_')[0]
    if (!groupedData[key]) {
      groupedData[key] = []
    }
    groupedData[key].push(item)
  })
  data_DF?.DataResults?.forEach((item) => {
    const key = item['DataCode'].split('_')[0]
    if (!groupedData_DF[key]) {
      groupedData_DF[key] = []
    }
    groupedData_DF[key].push(item)
  })
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'decimal',
  })
  const resultArrays = Object.values(groupedData)
  const resultArrays_DF = Object.values(groupedData_DF)
  // console.log(resultArrays_DF, 'resultArrays_DF')

  return (
    <div ref={containerRef} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd} className=" ">
      <div className="MainPage_bg">
        <AnimatedWaves />
      </div>
      <Header />

      <div className="col-lg-12  fixed-top top-[50px] z-10 ">
        <div className="card  mb-2">
          <div className="py-2 w-full bg-white">
            <Date onDateChange={setDataDate} dataDate={dataDate} dateType={'local'} localTitle={'dateLogin'} />
          </div>
          <div className=" absolute w-full top-[-16px] ">
            <Progress
              percent={progressPercent}
              strokeColor={{
                '0%': '#80D0C7',
                '100%': '#0093E9',
              }}
              showInfo={false}
              status="active"
              className={`${!loadingCart ? 'hidden' : ''}`}
            />
          </div>
        </div>
      </div>
      <section className="section dashboard  mt-[60px]">
        <div className="row">
          <div className="col-lg-12 ">
            <div className="row" id="gridMain">
              {resultArrays?.map((resultArray, arrayIndex) => (
                <div
                  id={`${resultArray[0]?.DataCode.split('_')[0]}`}
                  key={arrayIndex}
                  // onClick={() => showDrawer(resultArray[0]?.DataCode.split('_')[0])}
                  style={{ cursor: 'pointer' }}
                  className={`col-xxl-12 col-md-12  card_2-content ${resultArray[0]?.DataCode.split('_')[0]}`}
                >
                  <Card
                    resultArray={resultArray}
                    resultArray_DF={resultArrays_DF[arrayIndex]}
                    formatter={formatter}
                    icon={resultArray[0]?.DataCode.split('_')[0]}
                    loading={loadingCart}
                    useThongke={userTHONGSO}
                  />
                </div>
              ))}
            </div>
            <div className="row">
              {resultArrays_DF?.map((resultArray, arrayIndex) => (
                <div
                  id={`${resultArray[0]?.DataCode.split('_')[0]}`}
                  key={arrayIndex}
                  // onClick={() => showDrawer(resultArray[0]?.DataCode.split('_')[0])}
                  style={{ cursor: 'pointer' }}
                  className={`col-xxl-12 col-md-12  card_2-content ${resultArray[0]?.DataCode.split('_')[0]}`}
                  onClick={() => showChildrenDrawer(resultArray[0]?.DataCode.split('_')[0], resultArray[0]?.DataName)}
                >
                  <Card
                    resultArray={resultArray}
                    // resultArray_DF={resultArrays_DF[arrayIndex]}
                    formatter={formatter}
                    icon={resultArray[0]?.DataCode.split('_')[0]}
                    loading={loadingCart}
                    useThongke={userTHONGSO}
                    titleCard={'BANLE'}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default DashBoar
