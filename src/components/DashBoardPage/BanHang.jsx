/* eslint-disable no-unused-vars */
import PieChart from '../util/Chart/PieChart'

import Date from '../DashBoar/Date'
import { useEffect, useState } from 'react'
import { APIDATA_CHART, RETOKEN } from '../../action/Actions'
import { toast } from 'react-toastify'
import API from '../../API/API'
import { Progress, Segmented } from 'antd'
import Table from '../DashBoar/DrawerTable'
import { useNavigate } from 'react-router-dom'
import { BiLeftArrowAlt } from 'react-icons/bi'
import Search from 'antd/es/input/Search'
import CounterComponent from '../DashBoar/LoadNumber'
import { useSelector } from 'react-redux'
import { khoanNgaySelect } from '../../redux/selector'
import { SearchOutlined } from '@ant-design/icons'

function BanHang() {
  const [segmented, setSegmented] = useState('')
  const KhoanNgay = useSelector(khoanNgaySelect)

  //   const [loading, setLoading] = useState(false)
  const [valueSegmented, setValueSegmented] = useState('')
  const [searchText, setSearchText] = useState('')
  const [data_TonKho_TongKho, setdata_TonKho_TongKho] = useState([])
  const [BanHang_HangHoa, setBanHang_HangHoa] = useState([])
  const [BanHang_QuayLe, setBanHang_QuayLe] = useState([])
  const [BanHang_KhachHang, setBanHang_KhachHang] = useState([])
  const [refToken, setRefToken] = useState(false)
  const token = localStorage.getItem('TKN')
  const [TotalNumber, setTotalNumber] = useState(0)
  const [MuaHang_HangHoa, setMuaHang_HangHoa] = useState([])
  const [MuaHang_NhaCungCap, setMuaHang_NhaCungCap] = useState([])
  const [progressPercent, setProgressPercent] = useState(0)
  const dateLogin2 = JSON.parse(localStorage.getItem('dateLogin2'))
  const dateLogin = JSON.parse(localStorage.getItem('dateLogin'))

  let newDataDate

  if (!dateLogin2) {
    newDataDate = dateLogin ? dateLogin : KhoanNgay
  } else {
    newDataDate = dateLogin2
  }
  const titleApp = window.localStorage.getItem('appName')
  const [showSearch, setShowSearch] = useState(false)

  const [dataDate, setDataDate] = useState(newDataDate)
  const [loadingCart, setLoadingCart] = useState(false)
  const navigate = useNavigate()
  //   const [dataDate_s, setDataDate] = useState(dataDate)
  // const [dataDate_sS, setDataDateSS] = useState(dataDate_s)
  const [TotalChart, setTotalChart] = useState(0)

  useEffect(() => {
    localStorage.setItem('selectedItem', 'BANHANG')
    const loadData = async () => {
      setLoadingCart(true)
      localStorage.removeItem('dateLogin3')
      setProgressPercent(0)

      //   setLoading(true)
      //API Ban Hang
      const BanHang_HangHoa = await APIDATA_CHART(API.BanHang_HangHoa, token, { ...dataDate, FilterText: searchText }, true)
      const BanHang_QuayLe = await APIDATA_CHART(API.BanHang_QuayLe, token, { ...dataDate, FilterText: searchText }, false)
      const BanHang_KhachHang = await APIDATA_CHART(API.BanHang_KhachHang, token, { ...dataDate, FilterText: searchText }, false)

      if (BanHang_HangHoa === -107 || BanHang_HangHoa === -108) {
        const newToken = await RETOKEN()

        if (newToken !== '') {
          setRefToken(!refToken)
          setTimeout(() => {
            window.location.href = '/'
          }, 300)
        } else if (newToken === 0) {
          toast.error('Failed to refresh token!')
          window.localStorage.removeItem('firstLogin')
          window.localStorage.removeItem('authLogin')
          window.localStorage.removeItem('TKN')
          window.localStorage.removeItem('tokenDuLieu')
          window.localStorage.removeItem('RTKN')
          window.localStorage.removeItem('userName')
          window.localStorage.removeItem('dateLogin')
        }
      }
      setProgressPercent(70)
      setBanHang_HangHoa(BanHang_HangHoa)
      setBanHang_QuayLe(BanHang_QuayLe)
      setBanHang_KhachHang(BanHang_KhachHang)
    }
    setSegmented('BANHANGHANGHOA')
    setValueSegmented('Bán sỉ theo hàng hóa')
    setTimeout(() => {
      setProgressPercent(100)
    }, 700)
    setTimeout(() => {
      setLoadingCart(false)
    }, 1100)
    loadData()
  }, [dataDate?.NgayBatDau, dataDate?.NgayKetThuc, searchText, token])
  useEffect(() => {
    const dataMapping = {
      BANHANGHANGHOA: BanHang_HangHoa,
      BANHANGQUYLE: BanHang_QuayLe,
      BANHANGKHACHHANG: BanHang_KhachHang,
    }

    const valueList = Array.isArray(dataMapping[segmented]) ? dataMapping[segmented]?.map((item) => item.DataValueAmount) : []
    const totalPrice = valueList.reduce((sum, price) => sum + price, 0)

    setTotalChart(totalPrice || 0)
  }, [valueSegmented, BanHang_HangHoa, segmented])
  // console.log(data_hanghoa)
  const setNumber = (value) => {
    setTotalNumber(value)
  }
  const onSearch = (value) => setSearchText(value)
  return (
    <div className="  w-full  " style={{ minHeight: '80vh' }}>
      <div className="card  p-0 m-0 fixed-top">
        <div className="flex gap-2 items-center">
          <BiLeftArrowAlt size={25} onClick={() => navigate('/')} /> <h1 className=" text-xl">{titleApp}</h1>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-base ml-8 mb-2">Bán hàng</p>
          <SearchOutlined className="mr-4  text-xl absolute right-0 bottom-3" onClick={() => setShowSearch(!showSearch)} />
        </div>
      </div>
      <div className="col-lg-12 pt-2 fixed-top top-[50px]">
        <div className="card   p-0 m-0">
          {showSearch ? (
            <div className="flex gap-2 items-center">
              <Search
                onSearch={onSearch}
                placeholder="Tìm kiếm"
                //   loading={loading}
                className="w-full  "
              />
            </div>
          ) : null}

          <div className=" w-full bg-white">
            <Date onDateChange={setDataDate} dataDate={dataDate} dateType={'local'} localTitle={'dateLogin2'} />
          </div>
          <Segmented
            options={[
              {
                label: (
                  <div className="h-[40px] flex items-center justify-center  flex-col " style={{ padding: 2, lineHeight: '0' }}>
                    <div className="" style={{ lineHeight: '1' }}>
                      Bán sỉ theo hàng hóa
                    </div>
                  </div>
                ),
                value: 'Bán sỉ theo hàng hóa',
              },
              {
                label: (
                  <div className="h-[40px] flex items-center justify-center  flex-col " style={{ padding: 2, lineHeight: '0' }}>
                    <div className="" style={{ lineHeight: '1' }}>
                      Bán sỉ theo khách hàng
                    </div>
                  </div>
                ),
                value: 'Bán sỉ theo khách hàng',
              },
              {
                label: (
                  <div className="h-[40px] flex items-center justify-center  flex-col " style={{ padding: 2, lineHeight: '0' }}>
                    <div className="" style={{ lineHeight: '1' }}>
                      Bán lẻ
                    </div>
                  </div>
                ),
                value: 'Bán lẻ',
              },
            ]}
            // options={['Khách hàng', 'Hàng hóa', 'Nhóm Hàng']}
            block
            onChange={(value) => {
              setSegmented(value === 'Bán sỉ theo hàng hóa' ? 'BANHANGHANGHOA' : value === 'Bán sỉ theo khách hàng' ? 'BANHANGKHACHHANG' : 'BANHANGQUYLE'), setValueSegmented(value)
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
      <div className={`card m-0 ${!showSearch ? 'pt-[85px]' : 'pt-[115px]'} pb-[30px]`}>
        {segmented === 'BANHANGHANGHOA' ? (
          <>
            <Table
              segmented={segmented}
              titleDr={'MUAHANG'}
              param={BanHang_HangHoa ? BanHang_HangHoa : []}
              columName={[]}
              height={'setHeight'}
              hiden={[]}
              setTotalNumber={setNumber}
            />
          </>
        ) : segmented === 'BANHANGKHACHHANG' ? (
          <>
            <Table
              segmented={segmented}
              titleDr={'MUAHANG'}
              param={BanHang_KhachHang ? BanHang_KhachHang : []}
              columName={[]}
              height={'setHeight'}
              hiden={[]}
              setTotalNumber={setNumber}
            />{' '}
          </>
        ) : segmented === 'BANHANGQUYLE' ? (
          <>
            <Table
              segmented={segmented}
              titleDr={'MUAHANG'}
              param={BanHang_QuayLe ? BanHang_QuayLe : []}
              columName={[]}
              height={'setHeight'}
              hiden={[]}
              setTotalNumber={setNumber}
            />{' '}
          </>
        ) : null}
      </div>
      <div className="card fixed-bottom bottom-[20px]">
        <div className="  items-center" style={{ backgroundColor: 'rgb(241,241,241)' }}>
          <div className="flex cursor-pointer items-center justify-center mb-2">
            <p
              className={`w-full text-center hover:font-medium flex items-center gap-2 justify-between text-base font-medium pl-4
                    `}
            >
              Cộng
            </p>
            <div
              className={`w-[100%] text-right pr-[8px]
                     `}
            >
              <CounterComponent targetValue={TotalChart} duration={100000} color={'#8BC6EC'} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BanHang
