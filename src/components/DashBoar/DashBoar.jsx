import { useSelector } from 'react-redux'
import { dataTONGHOPSelector } from '../../redux/selector'
import Card from '../util/CardTT/Card'
import { useState } from 'react'
import './dashBoard.css'
import DrawerCP from './DrawerChart'

function DashBoar() {
  const [open, setOpen] = useState(false)
  const [titleDr, setTitleDr] = useState('')
  const showDrawer = (value) => {
    setTitleDr(value || 'Tổng cộng')
    setOpen(true)
  }
  const data = useSelector(dataTONGHOPSelector)
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
    <>
      <>
        <DrawerCP showOpen={open} titleDr={titleDr} setOpenShow={setOpen} />
      </>
      <section className="section dashboard">
        <div className="row">
          <div className="col-lg-12">
            <div className="row ">
              {resultArrays?.map((resultArray, arrayIndex) => (
                <div
                  key={arrayIndex}
                  onClick={() => showDrawer(resultArray[0]?.DataCode.split('_')[0])}
                  style={{ cursor: 'pointer' }}
                  className={`col-xxl-4 col-md-6  card_2-content ${resultArray[0]?.DataCode.split('_')[0]}`}
                >
                  <Card resultArray={resultArray} formatter={formatter} icon={resultArray[0]?.DataCode.split('_')[0]} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default DashBoar
