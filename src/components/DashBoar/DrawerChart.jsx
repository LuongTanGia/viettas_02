/* eslint-disable react/prop-types */

import PieChart from '../util/Chart/PieChart'
import { useEffect, useRef, useState } from 'react'
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
  const [segmented, setSegmented] = useState('')

  const [titleDr_child, setTitleDrChild] = useState('ssss')
  const token = localStorage.getItem('TKN')
  const [data_hanghoa, setDataChart_hanghoa] = useState([])
  const [data_khachhang, setDataChart_khachhang] = useState([])
  const [data_nhomhang, setDataChart_nhomhang] = useState([])
  const [data_TonKho_TongKho, setdata_TonKho_TongKho] = useState([])
  const [TonKho_TongKhoDVTQuyDoi, setTonKho_TongKhoDVTQuyDoi] = useState([])
  const [TonKho_TheoKho, setTonKho_TheoKho] = useState([])
  const [CongNoThu_TopChart, setCongNoThu_TopChart] = useState([])
  const [CongNoThu_DanhSach, setCongNoThu_DanhSach] = useState([])

  const [dataTable, setDataTable] = useState([])
  const [colorTable, setColorTable] = useState()

  const [dataDate, setDataDate] = useState([])
  const [TotalNumber, setTotalNumber] = useState(0)
  const [TotalChart, setTotalChart] = useState(0)

  useEffect(() => {
    const loadData = async () => {
      const KhoanNgay = await KHOANNGAY(API.KHOANNGAY, token)
      setDataDate(KhoanNgay)
      //API Doanh So
      const data_hanghoa = titleDr === 'DOANHSO' ? await APIDATA_CHART(API.DoanhSoHangHoa_TopChart, token, KhoanNgay) : null
      const data_khachhang = titleDr === 'DOANHSO' ? await APIDATA_CHART(API.DoanhSoKhachHang_TopChart, token, KhoanNgay) : null
      const data_nhomhang = titleDr === 'DOANHSO' ? await APIDATA_CHART(API.DoanhSoNhomHang_TopChart, token, KhoanNgay) : null
      //API Ton Kho
      const data_TonKho_TongKho = titleDr === 'TONKHO' ? await APIDATA_CHART(API.TonKho_TongKho, token, KhoanNgay) : null
      const TonKho_TongKhoDVTQuyDoi = titleDr === 'TONKHO' ? await APIDATA_CHART(API.TonKho_TongKhoDVTQuyDoi, token, KhoanNgay) : null
      const TonKho_TheoKho = titleDr === 'TONKHO' ? await APIDATA_CHART(API.TonKho_TheoKho, token, KhoanNgay) : null
      //API Cong No Thu
      const CongNoThu_TopChart = titleDr === 'PHAITHU' ? await APIDATA_CHART(API.CongNoThu_TopChart, token, KhoanNgay) : null
      const CongNoThu_DanhSach = titleDr === 'PHAITHU' ? await APIDATA_CHART(API.CongNoThu_DanhSach, token, KhoanNgay) : null

      //Cong No Thu
      setCongNoThu_TopChart(CongNoThu_TopChart)
      setCongNoThu_DanhSach(CongNoThu_DanhSach)
      //Ton Kho
      setdata_TonKho_TongKho(data_TonKho_TongKho)
      setTonKho_TongKhoDVTQuyDoi(TonKho_TongKhoDVTQuyDoi)
      setTonKho_TheoKho(TonKho_TheoKho)
      //Doanh So
      setDataChart_hanghoa(data_hanghoa ? data_hanghoa : [])
      setDataChart_khachhang(data_khachhang ? data_khachhang : [])
      setDataChart_nhomhang(data_nhomhang ? data_nhomhang : [])
    }
    setSegmented(titleDr === 'DOANHSO' ? 'KHACHHANG' : titleDr === 'TONKHO' ? 'TONGHOP' : titleDr === 'PHAITHU' ? 'BIEUDOTYTRONG' : '')
    loadData()
  }, [titleDr])
  useEffect(() => {
    const dataMapping = {
      HANGHOA: data_hanghoa,
      KHACHHANG: data_khachhang,
      NHOMHANG: data_nhomhang,
      BIEUDOTYTRONG: CongNoThu_TopChart,
      DANHSACHKHACHHANG: CongNoThu_DanhSach,
    }

    const valueList = dataMapping[segmented]?.map((item) => item.DataValue) || []
    const totalPrice = valueList.reduce((sum, price) => sum + price, 0)

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
    const data_ct = await APIDATA_CHART_CT(
      segmented === 'KHACHHANG'
        ? API.DoanhSoKhachHang_CT
        : segmented === 'HANGHOA'
          ? API.DoanhSoHangHoa_CT
          : segmented === 'NHOMHANG'
            ? API.DoanhSoNhomHang_CT
            : titleDr === 'PHAITHU'
              ? API.CongNoThu_CT
              : null,
      token,
      {
        ...dataDate,
        FilterCode: value.DataCode,
        IsCodeRest: value.DataCodeRest,
        IsType: 1,
      },
    )

    setDataTable(data_ct)
    console.log(data_ct)
    setChildrenDrawer(true)
  }
  const onChildrenDrawerClose = () => {
    setChildrenDrawer(false)
  }
  const containerRef = useRef(null)
  let startX_01 = 0

  const handleTouchStart_op = (e) => {
    startX_01 = e.touches[0].clientX
  }

  const handleTouchMove_op = (e) => {
    if (startX_01) {
      const currentX = e.touches[0].clientX
      const deltaX_draw2 = startX_01 - currentX
      console.log(deltaX_draw2, 'dddddddđ222222222222')
      if (deltaX_draw2 > 100) {
        setChildrenDrawer(true)
      } else if (deltaX_draw2 < -150) {
        setChildrenDrawer(false)
      }
    }
  }

  const handleTouchEnd_op = () => {
    startX_01 = 0
  }
  return (
    <div ref={containerRef} onTouchStart={handleTouchStart_op} onTouchMove={handleTouchMove_op} onTouchEnd={handleTouchEnd_op}>
      <div>
        <Drawer
          footer={
            <div>
              {
                <div className="flex items-center justify-center mb-2">
                  <p
                    className="w-[100%] cursor-pointer hover:font-medium flex items-center gap-2 justify-between"
                    style={{ color: '#8BC6EC' }}
                    onClick={() => showChildrenDrawer({ DataCode: null, DataCodeRest: 1 })}
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
          {titleDr === 'DOANHSO' ? (
            <Segmented options={['KHACHHANG', 'HANGHOA', 'NHOMHANG']} block onChange={(value) => setSegmented(value)} value={segmented} />
          ) : titleDr === 'TONKHO' ? (
            <Segmented options={['TONGHOP', 'TONGHOPDVT', 'THEOKHO']} block onChange={(value) => setSegmented(value)} value={segmented} />
          ) : titleDr === 'PHAITHU' ? (
            <Segmented options={['BIEUDOTYTRONG', 'DANHSACHKHACHHANG']} block onChange={(value) => setSegmented(value)} value={segmented} />
          ) : null}
          {segmented === 'KHACHHANG' ? (
            <>
              <PieChart Drawer={true} dataChart={data_khachhang} valueNum={'DataValue'} value={'DataPerc'} name={'DataName'} onClick={showChildrenDrawer} />
            </>
          ) : segmented === 'HANGHOA' ? (
            <>
              <PieChart
                titleDr={titleDr}
                Drawer={true}
                nameChart={segmented}
                dataChart={data_hanghoa}
                valueNum={'DataValue'}
                value={'DataPerc'}
                name={'DataName'}
                onClick={showChildrenDrawer}
              />
            </>
          ) : segmented === 'NHOMHANG' ? (
            <>
              <PieChart Drawer={true} dataChart={data_nhomhang} valueNum={'DataValue'} value={'DataPerc'} name={'DataName'} onClick={showChildrenDrawer} />
            </>
          ) : segmented === 'TONGHOP' ? (
            <>
              <Table
                segmented={segmented}
                titleDr={titleDr}
                param={data_TonKho_TongKho ? data_TonKho_TongKho : []}
                columName={[]}
                height={'setHeight'}
                hiden={[]}
                setTotalNumber={setNumber}
              />{' '}
            </>
          ) : segmented === 'TONGHOPDVT' ? (
            <>
              <Table
                segmented={segmented}
                titleDr={titleDr}
                param={TonKho_TongKhoDVTQuyDoi ? TonKho_TongKhoDVTQuyDoi : []}
                columName={[]}
                height={'setHeight'}
                hiden={[]}
                setTotalNumber={setNumber}
              />{' '}
            </>
          ) : segmented === 'THEOKHO' ? (
            <>
              <Table
                segmented={segmented}
                titleDr={titleDr}
                param={TonKho_TheoKho ? TonKho_TheoKho : []}
                columName={[]}
                height={'setHeight'}
                hiden={[]}
                setTotalNumber={setNumber}
              />{' '}
            </>
          ) : segmented === 'BIEUDOTYTRONG' ? (
            <>
              <PieChart
                titleDr={titleDr}
                Drawer={true}
                nameChart={segmented}
                dataChart={CongNoThu_TopChart ? CongNoThu_TopChart : []}
                valueNum={'DataValue'}
                value={'DataPerc'}
                name={'DataName'}
                onClick={showChildrenDrawer}
              />
            </>
          ) : segmented === 'DANHSACHKHACHHANG' ? (
            <>
              <Table
                segmented={segmented}
                titleDr={titleDr}
                param={CongNoThu_DanhSach ? CongNoThu_DanhSach : []}
                columName={[]}
                height={'setHeight'}
                hiden={[]}
                setTotalNumber={setNumber}
              />{' '}
            </>
          ) : null}

          {titleDr === 'DOANHSO' || titleDr === 'PHAITHU' ? (
            <Drawer
              footer={
                titleDr !== 'PHAITHU' ? (
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
                ) : null
              }
              className="DrawerCT"
              title={`${titleDr_child.DataName || 'Tổng Cộng'}(Chi tiết)`}
              width={720}
              onClose={onChildrenDrawerClose}
              open={childrenDrawer}
            >
              <Table
                segmented={segmented}
                titleDr={titleDr}
                colorTable={colorTable}
                param={dataTable ? dataTable : []}
                columName={[]}
                height={'setHeight'}
                hiden={[]}
                setTotalNumber={setNumber}
              />
            </Drawer>
          ) : null}
        </Drawer>
      </div>
    </div>
  )
}

export default DashBoar
