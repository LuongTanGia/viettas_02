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

function DashBoar() {
  const navigate = useNavigate()
  const KhoanNgay = useSelector(khoanNgaySelect)
  const token = localStorage.getItem('TKN')
  const [dataDate, setDataDate] = useState(!JSON.parse(localStorage.getItem('dateLogin')) ? KhoanNgay : JSON.parse(localStorage.getItem('dateLogin')))
  const [dataLoaded, setDataLoaded] = useState(false)
  const [dataTongHop, setDataTongHop] = useState([])
  const [open, setOpen] = useState(false)
  const [loadingCart, setLoadingCart] = useState(false)

  const [titleDr, setTitleDr] = useState('')
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
    navigate(`title=${value}`)
    setTitleDr(value || 'Tổng cộng')
    setOpen(true)
  }

  const containerRef = useRef(null)
  let startX = 0

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const titleParam = params.get('title') || 'home'
    titleParam === 'home' ? setOpen(false) : null
    const loadData = async () => {
      setLoadingCart(true)

      try {
        const data = titleParam === 'home' ? await DATATONGHOP(API.TONGHOP, token, dataDate) : null
        setDataTongHop(data)
        setDataLoaded(true)
        setTimeout(() => {
          setLoadingCart(false)
        }, 700)
      } catch (error) {
        console.error('Error loading data:', error)
      }
    }
    loadData()
  }, [dataDate?.NgayKetThuc, dataDate?.NgayBatDau, location.search])

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
  if (data?.DataResults?.length === 0) {
    return <p>Dữ liệu trống, vui lòng kiểm tra lại.</p>
  }
  const groupedData = {}

  data?.DataResults?.forEach((item) => {
    const key = item['DataCode'].split('_')[0]
    if (!groupedData[key]) {
      groupedData[key] = []
    }
    groupedData[key].push(item)
  })
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'decimal',
  })
  const resultArrays = Object.values(groupedData)

  return (
    <div ref={containerRef} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
      <div>
        <DrawerCP showOpen={open} titleDr={titleDr} setOpenShow={setOpen} onDateChange={setDataDate} dataDate={dataDate} />
      </div>
      <section className="section dashboard">
        <div className="row">
          <div className="col-lg-12 sticky">
            <div className="card  mb-3">
              <Date onDateChange={setDataDate} dataDate={dataDate} />
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
                  <Card resultArray={resultArray} formatter={formatter} icon={resultArray[0]?.DataCode.split('_')[0]} loading={loadingCart} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <div className="z-[1999]"></div>
    </div>
  )
}

export default DashBoar
