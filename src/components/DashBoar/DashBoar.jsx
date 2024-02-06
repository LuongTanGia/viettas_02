import Card from '../util/CardTT/Card'
import { useEffect, useRef, useState } from 'react'
import './dashBoard.css'
import DrawerCP from './DrawerChart'
import LoadingPage from '../util/Loading/LoadingPage'
import { DATATONGHOP } from '../../action/Actions'
import API from '../../API/API'
import Date from './Date'
import { useSelector } from 'react-redux'
import { khoanNgaySelect } from '../../redux/selector'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { Progress } from 'antd'
// import CounterComponent from './LoadNumber'
// import { Progress } from 'antd'

function DashBoar() {
  const userTHONGSO = window.localStorage.getItem('UseThongSo')
  // console.log(userTHONGSO)
  const navigate = useNavigate()
  const KhoanNgay = useSelector(khoanNgaySelect)
  const token = localStorage.getItem('TKN')
  const [dataDate, setDataDate] = useState(!JSON.parse(localStorage.getItem('dateLogin')) ? KhoanNgay : JSON.parse(localStorage.getItem('dateLogin')))
  const [dataLoaded, setDataLoaded] = useState(false)
  const [dataTongHop, setDataTongHop] = useState([])
  const [dataTongHop_DF, setDataTongHop_DF] = useState([])

  const [open, setOpen] = useState(false)
  const [loadingCart, setLoadingCart] = useState(false)
  const [progressPercent, setProgressPercent] = useState(0)
  const [titleDr, setTitleDr] = useState('home')
  const location = useLocation()

  // useEffect(() => {
  //   const params = new URLSearchParams(location.search)
  //   const titleParam = params.get('title') || 'home'
  //   if (titleParam) {
  //     console.log('URL contains title:', titleParam)
  //   } else {
  //     console.log('URL does not contain title.', titleParam)
  //   }
  // }, [location.search])

  const showDrawer = (value) => {
    navigate(`?title=${value}`)
    setTitleDr(value || 'Tổng cộng')
    setOpen(true)
  }

  const containerRef = useRef(null)
  let startX = 0

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const titleParam = params.get('title') || 'home'
    setTitleDr(titleParam)
    // console.log(titleParam)
    titleParam !== 'home' ? setOpen(true) : setOpen(false)
    const loadData = async () => {
      setLoadingCart(true)
      setProgressPercent(0)

      try {
        const data = await DATATONGHOP(API.TONGHOP, token, dataDate)
        setDataTongHop(data)
        setDataLoaded(true)
        setProgressPercent(70)

        setTimeout(() => {
          setProgressPercent(100)
        }, 700)
        setTimeout(() => {
          setLoadingCart(false)
        }, 1100)
      } catch (error) {
        console.error('Error loading data:', error)
      }
    }

    setTimeout(() => {
      const loadData_02 = async () => {
        try {
          const data = await DATATONGHOP(API.TONGHOP, token, {
            NgayBatDau: '2024-01-01',
            NgayKetThuc: '2024-01-31',
          })
          setDataTongHop_DF(data)
        } catch (error) {
          console.error('Error loading data:', error)
        }
      }
      loadData_02()
    }, 1300)
    loadData()
  }, [dataDate?.NgayKetThuc, dataDate?.NgayBatDau])

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
        setOpen(true)
      } else if (deltaX_draw1 < -200) {
        setOpen(false)
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
    <div ref={containerRef} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
      <div>
        <DrawerCP showOpen={open} titleDr={titleDr} setOpenShow={setOpen} onDateChange={setDataDate} dataDate={dataDate} />
      </div>
      <section className="section dashboard">
        <div className="row">
          <div className="col-lg-12 sticky ">
            <div className="card  mb-3  ">
              <Date onDateChange={setDataDate} dataDate={dataDate} dateType={'local'} />
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
          <div className="col-lg-12">
            <div className="row" id="gridMain">
              {resultArrays?.map((resultArray, arrayIndex) => (
                <div
                  key={arrayIndex}
                  onClick={() => showDrawer(resultArray[0]?.DataCode.split('_')[0])}
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

              <div style={{ cursor: 'pointer' }} className=" col-xxl-12 col-md-12  card_2-content SOQUY" onClick={() => showDrawer('SOQUY')}>
                <div className="col-xxl-4 col-md-12  SOQUY">
                  <div className="card info-card sales-card">
                    <div className="card-body min-h-[110px]">
                      <h5 className="card-title">{'Sổ quỹ '}</h5>
                      <div className="flex flex-col gap-1">
                        <span className="text-success small  fw-bold">Số tiền: 100000000000</span>
                        <span className="text-success small  fw-bold">Số tiền: 100000000000</span>
                        <span className="text-success small  fw-bold">Số tiền: 100000000000</span>
                        <span className="text-success small  fw-bold">Số tiền: 100000000000</span>
                        {/* <span className="text-success small  fw-bold">Số tiền: 100000000000</span> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="z-[1999]"></div>
    </div>
  )
}

export default DashBoar
