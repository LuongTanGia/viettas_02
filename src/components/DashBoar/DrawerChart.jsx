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
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { Input } from 'antd'
import dayjs from 'dayjs'
const { Search } = Input
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
function DashBoar({ showOpen, titleDr, setOpenShow, dataDate }) {
  const location = useLocation()
  const navigate = useNavigate()
  const [childrenDrawer, setChildrenDrawer] = useState(false)
  const [segmented, setSegmented] = useState('')
  const [valueSegmented, setValueSegmented] = useState('')
  const [dataSearch, setDataSearch] = useState('')

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
  const [title, setTitle] = useState('')
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    setDataDate(dataDate)
    const params = new URLSearchParams(location.search)
    const titleParam = params.get('title') || 'home'
    titleParam === 'home' ? setChildrenDrawer(false) : null
  }, [showOpen, location.search])

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      //API Doanh So
      const data_hanghoa = titleDr === 'DOANHSO' ? await APIDATA_CHART(API.DoanhSoHangHoa_TopChart, token, dataDate_s) : null
      const data_khachhang = titleDr === 'DOANHSO' ? await APIDATA_CHART(API.DoanhSoKhachHang_TopChart, token, dataDate_s) : null
      const data_nhomhang = titleDr === 'DOANHSO' ? await APIDATA_CHART(API.DoanhSoNhomHang_TopChart, token, dataDate_s) : null
      //API Ton Kho

      const data_TonKho_TongKho = titleDr === 'TONKHO' ? await APIDATA_CHART(API.TonKho_TongKho, token, { ...dataDate_s, FilterText: searchText }) : null
      const TonKho_TongKhoDVTQuyDoi = titleDr === 'TONKHO' ? await APIDATA_CHART(API.TonKho_TongKhoDVTQuyDoi, token, { ...dataDate_s, FilterText: searchText }) : null
      const TonKho_TheoKho = titleDr === 'TONKHO' ? await APIDATA_CHART(API.TonKho_TheoKho, token, { ...dataDate_s, FilterText: searchText }) : null
      //API Cong No Thu - Tra
      const CongNoThu_TopChart =
        titleDr === 'PHAITHU' || titleDr === 'PHAITRA' ? await APIDATA_CHART(titleDr === 'PHAITRA' ? API.CongNoTra_TopChart : API.CongNoThu_TopChart, token, dataDate_s) : null
      const CongNoThu_DanhSach =
        titleDr === 'PHAITHU' || titleDr === 'PHAITRA' ? await APIDATA_CHART(titleDr === 'PHAITRA' ? API.CongNoTra_DanhSach : API.CongNoThu_DanhSach, token, dataDate_s) : null
      //API Mua Hang
      const MuaHang_HangHoa = titleDr === 'MUAHANG' ? await APIDATA_CHART(API.MuaHang_HangHoa, token, { ...dataDate_s, FilterText: searchText }) : null
      const MuaHang_NhaCungCap = titleDr === 'MUAHANG' ? await APIDATA_CHART(API.MuaHang_NhaCungCap, token, { ...dataDate_s, FilterText: searchText }) : null
      //API Xuat Tra - Nhap Tra
      const XuatTra_HangHoa =
        titleDr === 'XUATTRA' || titleDr === 'NHAPTRA'
          ? await APIDATA_CHART(titleDr === 'NHAPTRA' ? API.NhapTra_HangHoa : API.XuatTra_HangHoa, token, { ...dataDate_s, FilterText: searchText })
          : null
      const XuatTra_NhaCungCap =
        titleDr === 'XUATTRA' || titleDr === 'NHAPTRA'
          ? await APIDATA_CHART(titleDr === 'NHAPTRA' ? API.NhapTra_KhachHang : API.XuatTra_NhaCungCap, token, { ...dataDate_s, FilterText: searchText })
          : null
      //API Ban Hang
      const BanHang_HangHoa = titleDr === 'BANHANG' ? await APIDATA_CHART(API.BanHang_HangHoa, token, { ...dataDate_s, FilterText: searchText }) : null
      const BanHang_QuayLe = titleDr === 'BANHANG' ? await APIDATA_CHART(API.BanHang_QuayLe, token, { ...dataDate_s, FilterText: searchText }) : null
      const BanHang_KhachHang = titleDr === 'BANHANG' ? await APIDATA_CHART(API.BanHang_KhachHang, token, { ...dataDate_s, FilterText: searchText }) : null
      // //API Thu - Chi
      const ThuTien = titleDr === 'THU' || titleDr === 'CHI' ? await APIDATA_CHART(API.ThuTien, token, dataDate_s) : null
      const ChiTien = titleDr === 'THU' || titleDr === 'CHI' ? await APIDATA_CHART(API.ChiTien, token, dataDate_s) : null
      const SoQuy = titleDr === 'THU' || titleDr === 'CHI' ? await APIDATA_CHART(API.SoQuy, token, dataDate_s) : null

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
      setDataSearch(CongNoThu_DanhSach)
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
    setValueSegmented(
      titleDr === 'DOANHSO'
        ? 'Khách hàng'
        : titleDr === 'TONKHO'
          ? 'Tổng hợp'
          : titleDr === 'PHAITHU' || titleDr === 'PHAITRA'
            ? 'Biểu đồ tỷ trọng'
            : titleDr === 'MUAHANG' || titleDr === 'XUATTRA' || titleDr === 'NHAPTRA'
              ? 'Theo hàng hóa'
              : titleDr === 'BANHANG'
                ? 'BANHANGHANGHOA'
                : titleDr === 'THU'
                  ? 'THUTIEN'
                  : titleDr === 'CHI'
                    ? 'CHITIEN'
                    : '',
    )
    loadData()
  }, [titleDr, dataDate_s?.NgayBatDau, dataDate_s?.NgayKetThuc, searchText])
  useEffect(() => {
    const dataMapping = {
      HANGHOA: data_hanghoa,
      KHACHHANG: data_khachhang,
      NHOMHANG: data_nhomhang,
      BIEUDOTYTRONG: CongNoThu_TopChart,
      DANHSACHKHACHHANG: CongNoThu_DanhSach,
      DANHSACHNHACUNGCAP: CongNoThu_DanhSach,
      THEOHANGHOA: titleDr === 'NHAPTRA' ? XuatTra_HangHoa : MuaHang_HangHoa,
      THEONHACUNGCAP: titleDr === 'NHAPTRA' ? XuatTra_NhaCungCap : MuaHang_NhaCungCap,
      BANHANGHANGHOA: BanHang_HangHoa,
      BANHANGQUYLE: BanHang_QuayLe,
      BANHANGKHACHHANG: BanHang_KhachHang,
      THUTIEN: ThuTien,
      CHITIEN: ChiTien,
      SOQUY: SoQuy,
    }

    const valueList =
      dataMapping[segmented]?.map((item) =>
        titleDr === 'MUAHANG' || titleDr === 'BANHANG' || titleDr === 'XUATTRA' || titleDr === 'NHAPTRA' ? item.DataValueAmount : item.DataValue,
      ) || []
    const totalPrice = valueList.reduce((sum, price) => sum + price, 0)

    setTotalChart(totalPrice)
  }, [segmented, data_hanghoa, data_khachhang, data_nhomhang])

  const onClose = () => {
    setOpenShow(false)
    navigate(`/`)
  }
  const setNumber = (value) => {
    setTotalNumber(value)
  }
  const showChildrenDrawer = async (value, color) => {
    setTitleDrChild(value)
    setColorTable(color)
    setTitle(value.title)
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
  const isMatch = (value, searchText) => {
    const stringValue = String(value).toLowerCase()
    const searchTextLower = searchText.toLowerCase()

    // Check if the string includes the searchText
    if (stringValue.includes(searchTextLower)) {
      return true
    }
    // Check if it's a valid date and matches (formatted or not)
    const isDateTime = dayjs(stringValue).isValid()
    if (isDateTime) {
      const formattedValue = dayjs(stringValue).format('DD/MM/YYYY').toString()
      const formattedSearchText = searchTextLower
      if (formattedValue.includes(formattedSearchText)) {
        return true
      }
    }
    return false
  }
  const handelSerch = (value) => {
    if (CongNoThu_DanhSach === -1) {
      setDataSearch([])
    } else {
      const newData = CongNoThu_DanhSach?.filter((record) => {
        return Object.keys(record).some((key) => isMatch(record[key], value))
      })

      setDataSearch(newData)
    }
  }

  const onSearch = (value) => setSearchText(value)
  return (
    <div ref={containerRef} onTouchStart={handleTouchStart_op} onTouchMove={handleTouchMove_op} onTouchEnd={handleTouchEnd_op}>
      <div>
        <Drawer
          footer={
            titleDr === 'TONKHO' ? null : (
              <div>
                <div className="flex items-center justify-center mb-2">
                  <p
                    className="w-[100%] cursor-pointer hover:font-medium flex items-center gap-2 justify-between"
                    style={{ color: '#8BC6EC' }}
                    onClick={() => showChildrenDrawer({ DataCode: null, DataCodeRest: 1, title: 'all' })}
                  >
                    Tổng:
                  </p>
                  <div
                    className={`w-[100%] mr-4 ${
                      titleDr === 'MUAHANG' ||
                      titleDr === 'BANHANG' ||
                      titleDr === 'NHAPTRA' ||
                      titleDr === 'XUATTRA' ||
                      segmented === 'DANHSACHKHACHHANG' ||
                      segmented === 'DANHSACHNHACUNGCAP'
                        ? 'text-right'
                        : ''
                    } `}
                  >
                    <CounterComponent targetValue={TotalChart} duration={50000} color={'#8BC6EC'} />
                    {titleDr === 'MUAHANG' ||
                    titleDr === 'BANHANG' ||
                    titleDr === 'NHAPTRA' ||
                    titleDr === 'XUATTRA' ||
                    segmented === 'DANHSACHKHACHHANG' ||
                    segmented === 'DANHSACHNHACUNGCAP' ? null : (
                      <RateBar percentage={100} color={'#8BC6EC'} title={'Tổng hợp'} />
                    )}
                  </div>
                </div>
              </div>
            )
          }
          title={
            <div className="flex items-center justify-between">
              {nameMapping[titleDr]}{' '}
              {titleDr === 'TONKHO' || titleDr === 'MUAHANG' || titleDr === 'BANHANG' || titleDr === 'NHAPTRA' || titleDr === 'XUATTRA' || segmented === 'DANHSACHKHACHHANG' ? (
                <Search
                  onChange={(e) => handelSerch(e.target.value)}
                  onSearch={segmented === 'DANHSACHKHACHHANG' ? null : onSearch}
                  placeholder="Tìm kiếm hàng hóa"
                  loading={loading}
                  className="w-[70%]"
                />
              ) : (
                ''
              )}
            </div>
          }
          closeIcon={<BiLeftArrowAlt />}
          width={1020}
          onClose={onClose}
          open={showOpen}
          className="bg-gray-500"
        >
          <Spin tip="Loading..." spinning={loading}>
            <Date onDateChange={setDataDate} dataDate={dataDate_s} />
            {titleDr === 'DOANHSO' ? (
              <Segmented
                options={['Khách hàng', 'Hàng hóa', 'Nhóm Hàng']}
                block
                onChange={(value) => {
                  setSegmented(value === 'Khách hàng' ? 'KHACHHANG' : value === 'Hàng hóa' ? 'HANGHOA' : 'NHOMHANG'), setValueSegmented(value)
                }}
                value={valueSegmented}
              />
            ) : titleDr === 'TONKHO' ? (
              <Segmented
                options={['Tổng hợp', 'Tổng hợp (đơn vị tính)', 'Theo kho']}
                block
                onChange={(value) => {
                  setSegmented(value === 'Tổng hợp' ? 'TONGHOP' : value === 'Tổng hợp (đơn vị tính)' ? 'TONGHOPDVT' : value === 'Theo kho' ? 'THEOKHO' : null),
                    setValueSegmented(value)
                }}
                value={valueSegmented}
              />
            ) : titleDr === 'PHAITHU' || titleDr === 'PHAITRA' ? (
              <Segmented
                options={titleDr === 'PHAITRA' ? ['Biểu đồ tỷ trọng', 'Danh sách nhà cung cấp'] : ['Biểu đồ tỷ trọng', 'Danh sách khách hàng']}
                block
                onChange={(value) => {
                  setSegmented(
                    value === 'Biểu đồ tỷ trọng'
                      ? 'BIEUDOTYTRONG'
                      : value === 'Danh sách nhà cung cấp'
                        ? 'DANHSACHKHACHHANG'
                        : value === 'Danh sách khách hàng'
                          ? 'DANHSACHKHACHHANG'
                          : null,
                  ),
                    setValueSegmented(value)
                }}
                value={valueSegmented}
              />
            ) : titleDr === 'MUAHANG' ? (
              <Segmented
                options={['Theo hàng hóa', 'Theo nhà cung cấp']}
                block
                onChange={(value) => {
                  setSegmented(value === 'Theo hàng hóa' ? 'THEOHANGHOA' : value === 'Theo nhà cung cấp' ? 'THEONHACUNGCAP' : null), setValueSegmented(value)
                }}
                value={valueSegmented}
              />
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
                  param={CongNoThu_DanhSach ? dataSearch : []}
                  columName={[]}
                  height={'setHeight'}
                  hiden={[]}
                  setTotalNumber={setNumber}
                  onClick={showChildrenDrawer}
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

            {titleDr === 'DOANHSO' || titleDr === 'PHAITHU' || titleDr === 'PHAITRA' || titleDr !== 'MUAHANG' || titleDr !== 'NHAPTRA' || titleDr !== 'XUATTRA' ? (
              <Drawer
                footer={
                  titleDr === 'PHAITRA' || titleDr === 'PHAITHU' || titleDr !== 'MUAHANG' ? null : (
                    <div>
                      {
                        <div className="flex items-center justify-center mb-2">
                          <p className="w-[100%] cursor-pointer hover:font-medium flex items-center gap-2 justify-between" style={{ color: '#8BC6EC' }}>
                            Tổng :
                          </p>
                          <div className="w-[100%] ml-3">
                            <CounterComponent targetValue={TotalNumber} duration={50000} color={'#8BC6EC'} />
                            <RateBar percentage={100} color={'#8BC6EC'} title={'Tổng hợp'} />
                          </div>
                        </div>
                      }
                    </div>
                  )
                }
                className="DrawerCT"
                title={`${titleDr_child.DataName || 'Tổng Cộng'}(Chi tiết)`}
                width={1020}
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
                  typeTable={segmented === 'DANHSACHKHACHHANG' ? 1 : 0}
                  setTotalNumber={setNumber}
                  title={title}
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
