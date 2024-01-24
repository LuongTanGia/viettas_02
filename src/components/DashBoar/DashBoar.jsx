import Card from '../util/CardTT/Card'
import { useEffect, useRef, useState } from 'react'
import './dashBoard.css'
import DrawerCP from './DrawerChart'
import LoadingPage from '../util/Loading/LoadingPage'
import { DATATONGHOP, KHOANNGAY } from '../../action/Actions'
import API from '../../API/API'
import Date from './Date'

function DashBoar() {
  const [dataLoaded, setDataLoaded] = useState(false)
  const [dataTongHop, setDataTongHop] = useState([])
  const [dataDate, setDataDate] = useState()

  const token = localStorage.getItem('TKN')
  const [open, setOpen] = useState(false)
  const [titleDr, setTitleDr] = useState('')
  const showDrawer = (value) => {
    setTitleDr(value || 'Tổng cộng')
    setOpen(true)
  }

  const containerRef = useRef(null)
  let startX = 0
  useEffect(() => {
    const loadData = async () => {
      const KhoanNgay = await KHOANNGAY(API.KHOANNGAY, token)
      setDataDate(KhoanNgay)
      const data = await DATATONGHOP(API.TONGHOP, token, KhoanNgay)
      setDataTongHop(data)
      setDataLoaded(true)
    }
    loadData()
  }, [])
  useEffect(() => {
    const loadData = async () => {
      const data = await DATATONGHOP(API.TONGHOP, token, dataDate)
      setDataTongHop(data)
      setDataLoaded(true)
    }
    loadData()
  }, [dataDate?.NgayBatDau, dataDate?.NgayKetThuc])

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
  const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  })
  const resultArrays = Object.values(groupedData)

  return (
    <div ref={containerRef} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
      <div>
        <DrawerCP showOpen={open} titleDr={titleDr} setOpenShow={setOpen} onDateChange={setDataDate} dataDate={dataDate} />
      </div>
      <section className="section dashboard">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
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
                  <Card resultArray={resultArray} formatter={formatter} icon={resultArray[0]?.DataCode.split('_')[0]} />
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
