import { useSelector } from 'react-redux'
import { dataTONGHOPSelector } from '../../redux/selector'
import Card from '../util/CardTT/Card'
import PieChart from '../util/Chart/PieChart'
import DateTimeClock from '../util/testComponents/DateTime'
import { useEffect, useState } from 'react'
import { Drawer, Segmented } from 'antd'
import './dashBoard.css'
import { APIDATA_CHART, APIDATA_CHART_CT, KHOANNGAY } from '../../action/Actions'
import API from '../../API/API'
import { BiLeftArrowAlt } from 'react-icons/bi'
import RateBar from '../util/Chart/LoadingChart'
import Table from './DrawerTable'
import CounterComponent from './LoadNumber'

import dayjs from 'dayjs'

import { DatePicker } from 'antd'
// import DrawerComponent from './Drawer'
const { RangePicker } = DatePicker
const dateFormat = 'DD/MM/YYYY'
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
function DashBoar() {
  const [open, setOpen] = useState(false)
  const [childrenDrawer, setChildrenDrawer] = useState(false)
  const [segmented, setSegmented] = useState('KHACHHANG')
  const [titleDr, setTitleDr] = useState('ssss')
  const [titleDr_child, setTitleDrChild] = useState('ssss')

  const token = localStorage.getItem('TKN')

  const [data_hanghoa, setDataChart_hanghoa] = useState([])
  const [data_khachhang, setDataChart_khachhang] = useState([])
  const [data_nhomhang, setDataChart_nhomhang] = useState([])
  const [dataTable, setDataTable] = useState([])
  const [colorTable, setColorTable] = useState()

  const [dataDate, setDataDate] = useState([])
  const [TotalNumber, setTotalNumber] = useState(0)

  useEffect(() => {
    const loadData = async () => {
      const KhoanNgay = await KHOANNGAY(API.KHOANNGAY, token)
      const data_hanghoa = await APIDATA_CHART(API.DoanhSoHangHoa_TopChart, token, KhoanNgay)
      const data_khachhang = await APIDATA_CHART(API.DoanhSoKhachHang_TopChart, token, KhoanNgay)
      const data_nhomhang = await APIDATA_CHART(API.DoanhSoNhomHang_TopChart, token, KhoanNgay)
      setDataDate(KhoanNgay)
      setDataChart_hanghoa(data_hanghoa)
      setDataChart_khachhang(data_khachhang)
      setDataChart_nhomhang(data_nhomhang)
    }

    loadData()
  }, [open])

  const showDrawer = (value) => {
    setTitleDr(value)
    setOpen(true)
  }
  const onClose = () => {
    setOpen(false)
  }
  const setNumber = (value) => {
    setTotalNumber(value)
  }
  const showChildrenDrawer = async (value, color) => {
    setTitleDrChild(value)
    setColorTable(color)
    const data_ct = await APIDATA_CHART_CT(API.DoanhSoHangHoa_CT, token, { ...dataDate, FilterCode: value.DataCode, IsCodeRest: value.DataCodeRest, IsType: 1 })
    setDataTable(data_ct)
    console.log(data_ct)
    setChildrenDrawer(true)
  }
  const onChildrenDrawerClose = () => {
    setChildrenDrawer(false)
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
        <Drawer
          footer={
            <div>
              {
                <div className="flex items-center justify-center mb-2">
                  <p className="w-[100%] cursor-pointer hover:font-medium" style={{ color: '#8BC6EC' }} onClick={() => showChildrenDrawer(null)}>
                    Tổng hợp
                  </p>
                  <div className="w-[100%]">
                    <RateBar percentage={100} color={'#8BC6EC'} title={'Tổng hợp'} />
                  </div>
                </div>
              }
            </div>
          }
          title={titleDr}
          closeIcon={<BiLeftArrowAlt />}
          width={1020}
          onClose={onClose}
          open={open}
          className="bg-gray-500"
        >
          <Segmented options={['KHACHHANG', 'HANGHOA', 'NHOMHANG']} block onChange={(value) => setSegmented(value)} />
          {segmented === 'KHACHHANG' ? (
            <>
              <PieChart Drawer={true} dataChart={data_khachhang} value={'DataPerc'} name={'DataName'} onClick={showChildrenDrawer} />
            </>
          ) : segmented === 'HANGHOA' ? (
            <>
              <PieChart Drawer={true} nameChart={segmented} dataChart={data_hanghoa} value={'DataPerc'} name={'DataName'} onClick={showChildrenDrawer} />
            </>
          ) : segmented === 'NHOMHANG' ? (
            <>
              <PieChart Drawer={true} dataChart={data_nhomhang} value={'DataPerc'} name={'DataName'} onClick={showChildrenDrawer} />
            </>
          ) : null}
          <Drawer
            footer={
              <div>
                {
                  <div className="flex items-center justify-center mb-2">
                    <p
                      className="w-[100%] cursor-pointer hover:font-medium flex items-center gap-2 justify-between"
                      style={{ color: colorTable }}
                      onClick={() => showChildrenDrawer(null)}
                    >
                      Tổng :
                      <CounterComponent targetValue={TotalNumber} duration={50000} color={colorTable} />
                    </p>
                    <div className="w-[100%] ml-3">
                      <RateBar percentage={100} color={colorTable} title={'Tổng hợp'} />
                    </div>
                  </div>
                }
              </div>
            }
            className="DrawerCT"
            title={`${titleDr_child.DataName}(Chi tiết)`}
            width={720}
            onClose={onChildrenDrawerClose}
            open={childrenDrawer}
          >
            <Table colorTable={colorTable} param={dataTable} columName={[]} height={'setHeight'} hiden={[]} setTotalNumber={setNumber} />
          </Drawer>
        </Drawer>
      </>
      <section className="section dashboard">
        <div className="row">
          <div className="col-lg-6">
            <div className="">
              <div className="card h-[140px] bgDash bg-transparent">
                <DateTimeClock />
              </div>
              <div className="card">
                <RangePicker defaultValue={[dayjs('08/04/2001', dateFormat), dayjs('08/04/2001', dateFormat)]} format={dateFormat} />
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="row " id="gridMain">
              {resultArrays?.map((resultArray, arrayIndex) => (
                <div
                  key={arrayIndex}
                  onClick={() => showDrawer(nameMapping[resultArray[0]?.DataCode.split('_')[0]])}
                  style={{ cursor: 'pointer' }}
                  className={`  card_2-content ${resultArray[0]?.DataCode.split('_')[0]}`}
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
