/* eslint-disable react/prop-types */

import PieChart from '../util/Chart/PieChart'
import { useEffect, useState } from 'react'
import { Drawer, Segmented } from 'antd'
import './dashBoard.css'
import { APIDATA_CHART, APIDATA_CHART_CT, KHOANNGAY } from '../../action/Actions'
import API from '../../API/API'
import { BiLeftArrowAlt } from 'react-icons/bi'
import RateBar from '../util/Chart/LoadingChart'
import Table from './DrawerTable'
import CounterComponent from './LoadNumber'
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
function DashBoar({ showOpen, titleDr, setOpenShow }) {
  const [childrenDrawer, setChildrenDrawer] = useState(false)
  const [segmented, setSegmented] = useState('KHACHHANG')

  const [titleDr_child, setTitleDrChild] = useState('ssss')
  const token = localStorage.getItem('TKN')
  const [data_hanghoa, setDataChart_hanghoa] = useState([])
  const [data_khachhang, setDataChart_khachhang] = useState([])
  const [data_nhomhang, setDataChart_nhomhang] = useState([])
  const [dataTable, setDataTable] = useState([])
  const [colorTable, setColorTable] = useState()

  const [dataDate, setDataDate] = useState([])
  const [TotalNumber, setTotalNumber] = useState(0)
  const [TotalChart, setTotalChart] = useState(0)

  useEffect(() => {
    const loadData = async () => {
      const KhoanNgay = await KHOANNGAY(API.KHOANNGAY, token)
      const data_hanghoa = titleDr === 'DOANHSO' ? await APIDATA_CHART(API.DoanhSoHangHoa_TopChart, token, KhoanNgay) : null
      const data_khachhang = titleDr === 'DOANHSO' ? await APIDATA_CHART(API.DoanhSoKhachHang_TopChart, token, KhoanNgay) : null
      const data_nhomhang = titleDr === 'DOANHSO' ? await APIDATA_CHART(API.DoanhSoNhomHang_TopChart, token, KhoanNgay) : null
      setDataDate(KhoanNgay)
      setDataChart_hanghoa(data_hanghoa ? data_hanghoa : [])
      setDataChart_khachhang(data_khachhang ? data_khachhang : [])
      console.log(data_khachhang)
      setDataChart_nhomhang(data_nhomhang ? data_nhomhang : [])
    }

    loadData()
  }, [titleDr])
  useEffect(() => {
    const dataMapping = {
      HANGHOA: data_hanghoa,
      KHACHHANG: data_khachhang,
      NHOMHANG: data_nhomhang,
    }

    const valueList = dataMapping[segmented]?.map((item) => item.DataValue) || []
    const totalPrice = valueList.reduce((sum, price) => sum + price, 0)

    console.log(dataMapping[segmented])
    setTotalChart(totalPrice)
  }, [segmented, data_hanghoa, data_khachhang, data_nhomhang])

  const onClose = () => {
    setOpenShow(false)
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

  return (
    <>
      <>
        <Drawer
          footer={
            <div>
              {
                <div className="flex items-center justify-center mb-2">
                  <p
                    className="w-[100%] cursor-pointer hover:font-medium flex items-center gap-2 justify-between"
                    style={{ color: '#8BC6EC' }}
                    onClick={() => showChildrenDrawer(null)}
                  >
                    Tổng:
                    <CounterComponent targetValue={TotalChart} duration={50000} color={'#8BC6EC'} />
                  </p>
                  <div className="w-[100%]">
                    <RateBar percentage={100} color={'#8BC6EC'} title={'Tổng hợp'} />
                  </div>
                </div>
              }
            </div>
          }
          title={nameMapping[titleDr]}
          closeIcon={<BiLeftArrowAlt />}
          width={1020}
          onClose={onClose}
          open={showOpen}
          className="bg-gray-500"
        >
          <Segmented options={['KHACHHANG', 'HANGHOA', 'NHOMHANG']} block onChange={(value) => setSegmented(value)} />
          {segmented === 'KHACHHANG' ? (
            <>
              <PieChart Drawer={true} dataChart={data_khachhang} valueNum={'DataValue'} value={'DataPerc'} name={'DataName'} onClick={showChildrenDrawer} />
            </>
          ) : segmented === 'HANGHOA' ? (
            <>
              <PieChart Drawer={true} nameChart={segmented} dataChart={data_hanghoa} valueNum={'DataValue'} value={'DataPerc'} name={'DataName'} onClick={showChildrenDrawer} />
            </>
          ) : segmented === 'NHOMHANG' ? (
            <>
              <PieChart Drawer={true} dataChart={data_nhomhang} valueNum={'DataValue'} value={'DataPerc'} name={'DataName'} onClick={showChildrenDrawer} />
            </>
          ) : null}
          <Drawer
            footer={
              <div>
                {
                  <div className="flex items-center justify-center mb-2">
                    <p className="w-[100%] cursor-pointer hover:font-medium flex items-center gap-2 justify-between" style={{ color: colorTable }}>
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
            <Table colorTable={colorTable} param={dataTable ? dataTable : []} columName={[]} height={'setHeight'} hiden={[]} setTotalNumber={setNumber} />
          </Drawer>
        </Drawer>
      </>
    </>
  )
}

export default DashBoar
