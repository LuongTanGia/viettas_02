/* eslint-disable react/prop-types */

import PieChart from '../util/Chart/PieChart'
import { useEffect, useRef, useState } from 'react'
import { Drawer, Segmented, Spin } from 'antd'
import './dashBoard.css'
import { APIDATA_CHART, APIDATA_CHART_CT } from '../../action/Actions'
import API from '../../API/API'
import { BiLeftArrowAlt } from 'react-icons/bi'
import RateBar from '../util/Chart/LoadingChart'
import Table from './DrawerTable'
import CounterComponent from './LoadNumber'
import Date from './Date'
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
function DashBoar({ showOpen, titleDr, setOpenShow, dataDate, onDateChange }) {
  const [childrenDrawer, setChildrenDrawer] = useState(false)
  const [segmented, setSegmented] = useState('')
  const [loading, setLoading] = useState(false)
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
  const [MuaHang_HangHoa, setMuaHang_HangHoa] = useState([])
  const [MuaHang_NhaCungCap, setMuaHang_NhaCungCap] = useState([])
  const [XuatTra_HangHoa, setXuatTra_HangHoa] = useState([])
  const [XuatTra_NhaCungCap, setXuatTra_NhaCungCap] = useState([])
  const [BanHang_HangHoa, setBanHang_HangHoa] = useState([])
  const [BanHang_QuayLe, setBanHang_QuayLe] = useState([])
  const [BanHang_KhachHang, setBanHang_KhachHang] = useState([])
  const [ThuTien, setThuTien] = useState([])
  const [ChiTien, setChiTien] = useState([])
  const [SoQuy, setSoQuy] = useState([])
  const [dataTable, setDataTable] = useState([])
  const [colorTable, setColorTable] = useState()
  const [dataDate_s, setDataDate] = useState(dataDate)
  const [TotalNumber, setTotalNumber] = useState(0)
  const [TotalChart, setTotalChart] = useState(0)
  useEffect(() => {
    setDataDate(dataDate)
  }, [])
  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      //API Doanh So
      const data_hanghoa = titleDr === 'DOANHSO' ? await APIDATA_CHART(API.DoanhSoHangHoa_TopChart, token, dataDate) : null
      const data_khachhang = titleDr === 'DOANHSO' ? await APIDATA_CHART(API.DoanhSoKhachHang_TopChart, token, dataDate) : null
      const data_nhomhang = titleDr === 'DOANHSO' ? await APIDATA_CHART(API.DoanhSoNhomHang_TopChart, token, dataDate) : null
      //API Ton Kho
      const data_TonKho_TongKho = titleDr === 'TONKHO' ? await APIDATA_CHART(API.TonKho_TongKho, token, dataDate) : null
      const TonKho_TongKhoDVTQuyDoi = titleDr === 'TONKHO' ? await APIDATA_CHART(API.TonKho_TongKhoDVTQuyDoi, token, dataDate) : null
      const TonKho_TheoKho = titleDr === 'TONKHO' ? await APIDATA_CHART(API.TonKho_TheoKho, token, dataDate) : null
      //API Cong No Thu - Tra
      const CongNoThu_TopChart =
        titleDr === 'PHAITHU' || titleDr === 'PHAITRA' ? await APIDATA_CHART(titleDr === 'PHAITRA' ? API.CongNoTra_TopChart : API.CongNoThu_TopChart, token, dataDate) : null
      const CongNoThu_DanhSach =
        titleDr === 'PHAITHU' || titleDr === 'PHAITRA' ? await APIDATA_CHART(titleDr === 'PHAITRA' ? API.CongNoTra_DanhSach : API.CongNoThu_DanhSach, token, dataDate) : null
      //API Mua Hang
      const MuaHang_HangHoa = titleDr === 'MUAHANG' ? await APIDATA_CHART(API.MuaHang_HangHoa, token, dataDate) : null
      const MuaHang_NhaCungCap = titleDr === 'MUAHANG' ? await APIDATA_CHART(API.MuaHang_NhaCungCap, token, dataDate) : null
      //API Xuat Tra - Nhap Tra
      const XuatTra_HangHoa =
        titleDr === 'XUATTRA' || titleDr === 'NHAPTRA' ? await APIDATA_CHART(titleDr === 'NHAPTRA' ? API.NhapTra_HangHoa : API.XuatTra_HangHoa, token, dataDate) : null
      const XuatTra_NhaCungCap =
        titleDr === 'XUATTRA' || titleDr === 'NHAPTRA' ? await APIDATA_CHART(titleDr === 'NHAPTRA' ? API.NhapTra_KhachHang : API.XuatTra_NhaCungCap, token, dataDate) : null
      //API Ban Hang
      const BanHang_HangHoa = titleDr === 'BANHANG' ? await APIDATA_CHART(API.BanHang_HangHoa, token, dataDate) : null
      const BanHang_QuayLe = titleDr === 'BANHANG' ? await APIDATA_CHART(API.BanHang_QuayLe, token, dataDate) : null
      const BanHang_KhachHang = titleDr === 'BANHANG' ? await APIDATA_CHART(API.BanHang_KhachHang, token, dataDate) : null
      // //API Thu - Chi
      const ThuTien = titleDr === 'THU' || titleDr === 'CHI' ? await APIDATA_CHART(API.ThuTien, token, dataDate) : null
      const ChiTien = titleDr === 'THU' || titleDr === 'CHI' ? await APIDATA_CHART(API.ChiTien, token, dataDate) : null
      const SoQuy = titleDr === 'THU' || titleDr === 'CHI' ? await APIDATA_CHART(API.SoQuy, token, dataDate) : null

      //Thu - Chi
      setThuTien(ThuTien)
      setChiTien(ChiTien)
      setSoQuy(SoQuy)
      //Ban Hang
      setBanHang_HangHoa(BanHang_HangHoa)
      setBanHang_QuayLe(BanHang_QuayLe)
      setBanHang_KhachHang(BanHang_KhachHang)
      //Xuat Tra - Nhap Tra
      setXuatTra_HangHoa(XuatTra_HangHoa)
      setXuatTra_NhaCungCap(XuatTra_NhaCungCap)
      //Mua Hang
      setMuaHang_HangHoa(MuaHang_HangHoa ? MuaHang_HangHoa : [])
      setMuaHang_NhaCungCap(MuaHang_NhaCungCap ? MuaHang_NhaCungCap : [])
      //Cong No Thu - Tra
      setCongNoThu_TopChart(CongNoThu_TopChart ? CongNoThu_TopChart : [])
      setCongNoThu_DanhSach(CongNoThu_DanhSach ? CongNoThu_DanhSach : [])
      //Ton Kho
      setdata_TonKho_TongKho(data_TonKho_TongKho ? data_TonKho_TongKho : [])
      setTonKho_TongKhoDVTQuyDoi(TonKho_TongKhoDVTQuyDoi ? TonKho_TongKhoDVTQuyDoi : [])
      setTonKho_TheoKho(TonKho_TheoKho ? TonKho_TheoKho : [])
      //Doanh So
      setDataChart_hanghoa(data_hanghoa ? data_hanghoa : [])
      setDataChart_khachhang(data_khachhang ? data_khachhang : [])
      setDataChart_nhomhang(data_nhomhang ? data_nhomhang : [])
      setLoading(false)
    }
    setSegmented(
      titleDr === 'DOANHSO'
        ? 'KHACHHANG'
        : titleDr === 'TONKHO'
          ? 'TONGHOP'
          : titleDr === 'PHAITHU' || titleDr === 'PHAITRA'
            ? 'BIEUDOTYTRONG'
            : titleDr === 'MUAHANG' || titleDr === 'XUATTRA' || titleDr === 'NHAPTRA'
              ? 'THEOHANGHOA'
              : titleDr === 'BANHANG'
                ? 'BANHANGHANGHOA'
                : titleDr === 'THU'
                  ? 'THUTIEN'
                  : titleDr === 'CHI'
                    ? 'CHITIEN'
                    : '',
    )
    loadData()
  }, [titleDr, dataDate?.NgayBatDau, dataDate?.NgayKetThuc])
  useEffect(() => {
    const dataMapping = {
      HANGHOA: data_hanghoa,
      KHACHHANG: data_khachhang,
      NHOMHANG: data_nhomhang,
      BIEUDOTYTRONG: CongNoThu_TopChart,
      DANHSACHKHACHHANG: CongNoThu_DanhSach,
      DANHSACHNHACUNGCAP: CongNoThu_DanhSach,
      THEOHANGHOA: MuaHang_HangHoa,
      THEONHACUNGCAP: MuaHang_NhaCungCap,
      BANHANGHANGHOA: BanHang_HangHoa,
      BANHANGQUYLE: BanHang_QuayLe,
      BANHANGKHACHHANG: BanHang_KhachHang,
      THUTIEN: ThuTien,
      CHITIEN: ChiTien,
      SOQUY: SoQuy,
    }

    const valueList = dataMapping[segmented]?.map((item) => (titleDr === 'MUAHANG' || titleDr === 'BANHANG' ? item.DataValueAmount : item.DataValue)) || []
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
              : titleDr === 'PHAITRA'
                ? API.CongNoTra_CT
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
              {segmented !== 'SOQUY' ? (
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
              ) : null}
            </div>
          }
          title={nameMapping[titleDr]}
          closeIcon={<BiLeftArrowAlt />}
          width={1020}
          onClose={onClose}
          open={showOpen}
          className="bg-gray-500"
        >
          <Spin tip="Loading..." spinning={loading}>
            <Date onDateChange={onDateChange} dataDate={dataDate_s} />
            {titleDr === 'DOANHSO' ? (
              <Segmented options={['KHACHHANG', 'HANGHOA', 'NHOMHANG']} block onChange={(value) => setSegmented(value)} value={segmented} />
            ) : titleDr === 'TONKHO' ? (
              <Segmented options={['TONGHOP', 'TONGHOPDVT', 'THEOKHO']} block onChange={(value) => setSegmented(value)} value={segmented} />
            ) : titleDr === 'PHAITHU' || titleDr === 'PHAITRA' ? (
              <Segmented
                options={titleDr === 'PHAITRA' ? ['BIEUDOTYTRONG', 'DANHSACHNHACUNGCAP'] : ['BIEUDOTYTRONG', 'DANHSACHKHACHHANG']}
                block
                onChange={(value) => setSegmented(value)}
                value={segmented}
              />
            ) : titleDr === 'MUAHANG' ? (
              <Segmented options={['THEOHANGHOA', 'THEONHACUNGCAP']} block onChange={(value) => setSegmented(value)} value={segmented} />
            ) : titleDr === 'XUATTRA' || titleDr === 'NHAPTRA' ? (
              <Segmented options={['THEOHANGHOA', 'THEONHACUNGCAP']} block onChange={(value) => setSegmented(value)} value={segmented} />
            ) : titleDr === 'BANHANG' ? (
              <Segmented options={['BANHANGHANGHOA', 'BANHANGQUYLE', 'BANHANGKHACHHANG']} block onChange={(value) => setSegmented(value)} value={segmented} />
            ) : titleDr === 'THU' || titleDr === 'CHI' ? (
              <Segmented options={['THUTIEN', 'CHITIEN', 'SOQUY']} block onChange={(value) => setSegmented(value)} value={segmented} />
            ) : null}
            {/* segmented */}
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
            ) : segmented === 'DANHSACHKHACHHANG' || segmented === 'DANHSACHNHACUNGCAP' ? (
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
            ) : segmented === 'THEOHANGHOA' ? (
              <>
                <Table
                  segmented={segmented}
                  titleDr={titleDr}
                  param={titleDr === 'MUAHANG' ? MuaHang_HangHoa : XuatTra_HangHoa}
                  columName={[]}
                  height={'setHeight'}
                  hiden={[]}
                  setTotalNumber={setNumber}
                />{' '}
              </>
            ) : segmented === 'THEONHACUNGCAP' ? (
              <>
                <Table
                  segmented={segmented}
                  titleDr={titleDr}
                  param={titleDr === 'MUAHANG' ? MuaHang_NhaCungCap : XuatTra_NhaCungCap}
                  columName={[]}
                  height={'setHeight'}
                  hiden={[]}
                  setTotalNumber={setNumber}
                />{' '}
              </>
            ) : segmented === 'BANHANGHANGHOA' ? (
              <>
                <Table segmented={segmented} titleDr={titleDr} param={BanHang_HangHoa} columName={[]} height={'setHeight'} hiden={[]} setTotalNumber={setNumber} />{' '}
              </>
            ) : segmented === 'BANHANGQUYLE' ? (
              <>
                <Table segmented={segmented} titleDr={titleDr} param={BanHang_QuayLe} columName={[]} height={'setHeight'} hiden={[]} setTotalNumber={setNumber} />{' '}
              </>
            ) : segmented === 'BANHANGKHACHHANG' ? (
              <>
                <Table segmented={segmented} titleDr={titleDr} param={BanHang_KhachHang} columName={[]} height={'setHeight'} hiden={[]} setTotalNumber={setNumber} />{' '}
              </>
            ) : segmented === 'THUTIEN' ? (
              <>
                <Table segmented={segmented} titleDr={titleDr} param={ThuTien} columName={[]} height={'setHeight'} hiden={[]} setTotalNumber={setNumber} />{' '}
              </>
            ) : segmented === 'CHITIEN' ? (
              <>
                <Table segmented={segmented} titleDr={titleDr} param={ChiTien} columName={[]} height={'setHeight'} hiden={[]} setTotalNumber={setNumber} />{' '}
              </>
            ) : segmented === 'SOQUY' ? (
              <>
                <Table segmented={segmented} titleDr={titleDr} param={SoQuy} columName={[]} height={'setHeight'} hiden={[]} setTotalNumber={setNumber} />{' '}
              </>
            ) : null}

            {titleDr === 'DOANHSO' || titleDr === 'PHAITHU' || titleDr === 'PHAITRA' ? (
              <Drawer
                footer={
                  titleDr === 'PHAITHU' || titleDr === 'PHAITRA' ? null : (
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
                  )
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
          </Spin>
        </Drawer>
      </div>
    </div>
  )
}

export default DashBoar
