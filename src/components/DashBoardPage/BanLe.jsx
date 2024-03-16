/* eslint-disable no-unused-vars */
import PieChart from '../util/Chart/PieChart'
import Table from '../DashBoar/DrawerTable'
import Date from '../DashBoar/Date'
import { useEffect, useState } from 'react'
import { APIDATA_CHART, RETOKEN } from '../../action/Actions'
import { toast } from 'react-toastify'
import API from '../../API/API'
import { Progress, Segmented } from 'antd'
import { useSelector } from 'react-redux'
import { khoanNgaySelect } from '../../redux/selector'
import CounterComponent from '../DashBoar/LoadNumber'
import RateBar from '../util/Chart/LoadingChart'
import { useNavigate } from 'react-router-dom'
import { BiLeftArrowAlt } from 'react-icons/bi'
import Search from 'antd/es/input/Search'
import dayjs from 'dayjs'
import { SearchOutlined } from '@ant-design/icons'

function BanLe() {
  const [segmented, setSegmented] = useState('')
  //   const [loading, setLoading] = useState(false)
  const [dataSearch, setDataSearch] = useState([])
  const dataDetail = JSON.parse(decodeURIComponent(atob(localStorage.getItem('ThongTinDetail'))))

  const [valueSegmented, setValueSegmented] = useState('')
  const KhoanNgay = useSelector(khoanNgaySelect)
  const [refToken, setRefToken] = useState(false)
  const token = localStorage.getItem('TKN')
  const [CongNo_TopChart, setCongNo_TopChart] = useState([])
  const [NhapKho_DanhSach, setNhapKho_DanhSach] = useState([])
  const [BanHang_DanhSach, setBanHang_DanhSach] = useState([])
  const [XuatKho_DanhSach, setXuatKho_DanhSach] = useState([])
  const [TonKho_DanhSach, setTonKho_DanhSach] = useState([])

  const [progressPercent, setProgressPercent] = useState(0)
  const dateLogin2 = JSON.parse(localStorage.getItem('dateLogin2'))
  const dateLogin = JSON.parse(localStorage.getItem('dateLogin'))
  const [TotalNumber, setTotalNumber] = useState(0)

  let newDataDate

  if (!dateLogin2) {
    newDataDate = dateLogin ? dateLogin : KhoanNgay
  } else {
    newDataDate = dateLogin2
  }

  const [dataDate, setDataDate] = useState(newDataDate)
  const [showSearch, setShowSearch] = useState(false)

  const [loadingCart, setLoadingCart] = useState(false)
  const [TotalChart, setTotalChart] = useState(0)
  const navigate = useNavigate()
  //   const [dataDate_s, setDataDate] = useState(dataDate)
  // const [dataDate_sS, setDataDateSS] = useState(dataDate_s)
  const titleApp = window.localStorage.getItem('appName')

  useEffect(() => {
    localStorage.setItem('selectedItem', dataDetail.DataValue)

    const loadData = async () => {
      setLoadingCart(true)
      localStorage.removeItem('dateLogin3')
      setProgressPercent(0)
      try {
        //   setLoading(true)
        //API Cong No Thu - Tra

        const NhapKho_DanhSach = await APIDATA_CHART(API.KhoLe_NhapKho, token, { ...dataDate, MaKho: dataDetail.DataValue }, true)
        const BanHang_DanhSach = await APIDATA_CHART(API.KhoLe_BanHang, token, { ...dataDate, MaKho: dataDetail.DataValue }, false)
        const XuatKho_DanhSach = await APIDATA_CHART(API.KhoLe_XuatKho, token, { ...dataDate, MaKho: dataDetail.DataValue }, false)
        const TonKho_DanhSach = await APIDATA_CHART(API.KhoLe_TonKho, token, { ...dataDate, MaKho: dataDetail.DataValue }, false)

        setProgressPercent(70)

        setNhapKho_DanhSach(NhapKho_DanhSach ? NhapKho_DanhSach : [])
        setBanHang_DanhSach(BanHang_DanhSach ? BanHang_DanhSach : [])
        setXuatKho_DanhSach(XuatKho_DanhSach ? XuatKho_DanhSach : [])
        setTonKho_DanhSach(TonKho_DanhSach ? TonKho_DanhSach : [])
        setDataSearch(NhapKho_DanhSach)
      } catch (error) {
        console.error('Error loading data:', error)
        // Handle errors
      } finally {
        setProgressPercent(100)
        setLoadingCart(false)
      }
    }
    setSegmented('NHAPKHO')
    setValueSegmented('Nhập kho')

    setTimeout(() => {
      setProgressPercent(50)
    }, 500)
    setTimeout(() => {
      setProgressPercent(90)
    }, 700)
    loadData()
  }, [dataDate?.NgayBatDau, dataDate?.NgayKetThuc, token])
  useEffect(() => {
    setDataSearch(
      segmented === 'NHAPKHO'
        ? NhapKho_DanhSach
        : segmented === 'BANHANG'
          ? BanHang_DanhSach
          : segmented === 'XUATKHO'
            ? XuatKho_DanhSach
            : segmented === 'TONKHOBANLE'
              ? TonKho_DanhSach
              : [],
    )
    const dataMapping = {
      NHAPKHO: NhapKho_DanhSach,
      BANHANG: BanHang_DanhSach,
      XUATKHO: XuatKho_DanhSach,
      TONKHOBANLE: TonKho_DanhSach,
    }

    const valueList = Array.isArray(dataMapping[segmented]) ? dataMapping[segmented]?.map((item) => item.DataValue2) : []
    const totalPrice = valueList.reduce((sum, price) => sum + price, 0)

    setTotalChart(totalPrice || 0)
  }, [valueSegmented, CongNo_TopChart])
  const showChildrenDrawer = async (value, color) => {
    // const url = window.location.href
    // console.log(url.split('?')[1])
    // navigate(`?${url.split('?')[1]}` + '_detail')
    navigate(`/PHAITHU/${value.DataCode}`)
    localStorage.setItem(
      'ThongTinDetail',
      btoa(
        encodeURIComponent(
          JSON.stringify({
            titleDr: 'PHAITHU',
            name: value.DataName || 'Tất cả',
            DataValue: value.DataValue || TotalChart,
            title: value.title,
            segmented: segmented,
            color: color || '#8BC6EC',
            data: {
              FilterCode: value.DataCode,
              IsCodeRest: value.DataCodeRest,
              IsType: 1,
            },
          }),
        ),
      ),
    )
  }
  const setNumber = (value) => {
    setTotalNumber(value)
  }
  const isMatch = (value, searchText) => {
    const stringValue = String(value).toLowerCase()
    const searchTextLower = searchText.toLowerCase()

    if (stringValue.includes(searchTextLower)) {
      return true
    }

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
  const handelSearch = (value) => {
    if (NhapKho_DanhSach === -1 || XuatKho_DanhSach === -1 || TonKho_DanhSach === -1 || BanHang_DanhSach === -1) {
      setDataSearch([])
    } else {
      segmented === 'NHAPKHO'
        ? setDataSearch(
            NhapKho_DanhSach?.filter((record) => {
              return Object.keys(record).some((key) => isMatch(record[key], value))
            }),
          )
        : segmented === 'BANHANG'
          ? setDataSearch(
              BanHang_DanhSach?.filter((record) => {
                return Object.keys(record).some((key) => isMatch(record[key], value))
              }),
            )
          : segmented === 'XUATKHO'
            ? setDataSearch(
                XuatKho_DanhSach?.filter((record) => {
                  return Object.keys(record).some((key) => isMatch(record[key], value))
                }),
              )
            : segmented === 'TONKHOBANLE'
              ? setDataSearch(
                  TonKho_DanhSach?.filter((record) => {
                    return Object.keys(record).some((key) => isMatch(record[key], value))
                  }),
                )
              : []
    }
  }
  return (
    <div className="">
      <div className="col-lg-12 card p-0 m-0 fixed-top">
        <div className="flex gap-2 items-center">
          <BiLeftArrowAlt size={25} onClick={() => navigate('/')} /> <h1 className=" text-xl">{titleApp}</h1>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-base ml-8 mb-2">{dataDetail.DataName}</p>
          {<SearchOutlined className="mr-4  text-xl absolute right-0 bottom-3" onClick={() => setShowSearch(!showSearch)} />}
        </div>
      </div>
      <div className="col-lg-12 card  p-0  m-0 fixed-top top-[50px]">
        <div className="card   p-0 m-0">
          <div className="flex gap-2 items-center">
            {showSearch ? '' : <Search onChange={(e) => handelSearch(e.target.value)} placeholder="Tìm kiếm hàng hóa" className="w-full" />}
          </div>

          <div className=" w-full bg-white">
            <Date onDateChange={setDataDate} dataDate={dataDate} dateType={'local'} localTitle={'dateLogin2'} titleDr={segmented === 'TONKHOBANLE' ? 'TONKHO' : ''} />
          </div>
          <Segmented
            options={[
              {
                label: (
                  <div className="h-[40px] flex items-center justify-center  flex-col " style={{ padding: 2, lineHeight: '0' }}>
                    <div className="" style={{ lineHeight: '1' }}>
                      Nhập kho
                    </div>
                  </div>
                ),
                value: 'Nhập kho',
              },
              {
                label: (
                  <div className="h-[40px] flex items-center justify-center  flex-col " style={{ padding: 2, lineHeight: '0' }}>
                    <div className="" style={{ lineHeight: '1' }}>
                      Bán hàng
                    </div>
                  </div>
                ),
                value: 'Bán hàng',
              },
              {
                label: (
                  <div className="h-[40px] flex items-center justify-center  flex-col " style={{ padding: 2, lineHeight: '0' }}>
                    <div className="" style={{ lineHeight: '1' }}>
                      Xuất kho
                    </div>
                  </div>
                ),
                value: 'Xuất kho',
              },
              {
                label: (
                  <div className="h-[40px] flex items-center justify-center  flex-col " style={{ padding: 2, lineHeight: '0' }}>
                    <div className="" style={{ lineHeight: '1' }}>
                      Tồn kho
                    </div>
                  </div>
                ),
                value: 'Tồn kho',
              },
            ]}
            // options={['Khách hàng', 'Hàng hóa', 'Nhóm Hàng']}
            block
            onChange={(value) => {
              setSegmented(
                value === 'Nhập kho' ? 'NHAPKHO' : value === 'Bán hàng' ? 'BANHANG' : value === 'Xuất kho' ? 'XUATKHO' : value === 'Tồn kho' ? 'TONKHOBANLE' : 'DANHSACHKHACHHANG',
              ),
                setValueSegmented(value)
            }}
            value={valueSegmented}
            className=" font-medium bg-white"
          />
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

      <section className={`section dashboard ${segmented === 'BANHANG' ? 'mb-[35px]' : 'mb-[0px]'} `}>
        <div className="row">
          <div className="col-lg-12 mt-[71px]" style={{ minHeight: '80vh' }}>
            <div className={`card m-0 ${!showSearch ? 'pt-[42px]' : 'pt-[10px]'} `}>
              {segmented === 'NHAPKHO' ? (
                <Table
                  segmented={'NHAPKHOBANLE'}
                  param={NhapKho_DanhSach ? dataSearch : []}
                  columName={[]}
                  height={'setTableDr1'}
                  hiden={[]}
                  setTotalNumber={setNumber}
                  onClick={showChildrenDrawer}
                  titleDr={'PHAITHU'}
                />
              ) : segmented === 'BANHANG' ? (
                <Table
                  segmented={'BANHANGBANLE'}
                  param={BanHang_DanhSach ? dataSearch : []}
                  columName={[]}
                  height={'setTableDr1'}
                  hiden={[]}
                  setTotalNumber={setNumber}
                  onClick={showChildrenDrawer}
                  titleDr={'PHAITHU'}
                />
              ) : segmented === 'XUATKHO' ? (
                <Table
                  segmented={'XUATKHOBANLE'}
                  param={XuatKho_DanhSach ? dataSearch : []}
                  columName={[]}
                  height={'setTableDr1'}
                  hiden={[]}
                  setTotalNumber={setNumber}
                  onClick={showChildrenDrawer}
                  titleDr={'PHAITHU'}
                />
              ) : segmented === 'TONKHOBANLE' ? (
                <Table
                  segmented={'TONKHOBANLE'}
                  param={TonKho_DanhSach ? dataSearch : []}
                  columName={[]}
                  height={'setTableDr1'}
                  hiden={[]}
                  setTotalNumber={setNumber}
                  onClick={showChildrenDrawer}
                  titleDr={'PHAITHU'}
                />
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {segmented === 'BANHANG' ? (
        <div className="card p-0 m-0 fixed-bottom bottom-[50px] ">
          <div className="  items-center" style={{ backgroundColor: 'rgb(241,241,241)' }} onClick={() => showChildrenDrawer({ DataCode: null, DataCodeRest: 1, title: 'all' })}>
            <div className="flex cursor-pointer items-center justify-center mb-2">
              <p
                className={`w-full text-center hover:font-medium flex items-center gap-2 justify-between text-base font-medium pl-4
                   `}
              >
                Cộng
              </p>
              <div
                className={`w-[100%] text-right ${segmented === 'BIEUDOTYTRONG' ? 'pr-[16px]' : 'pr-[8px]'}
                    `}
              >
                <CounterComponent targetValue={TotalChart} duration={100000} color={'#8BC6EC'} />

                {segmented === 'BIEUDOTYTRONG' ? <RateBar percentage={100} color={'#8BC6EC'} title={'Tổng hợp'} /> : null}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default BanLe