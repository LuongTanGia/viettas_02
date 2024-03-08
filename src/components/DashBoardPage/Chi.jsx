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
import dayjs from 'dayjs'
import { SearchOutlined } from '@ant-design/icons'

function Chi() {
  const [segmented, setSegmented] = useState('')
  const KhoanNgay = useSelector(khoanNgaySelect)
  const [dataSearch, setDataSearch] = useState([])

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
  const [ThuTien, setThuTien] = useState([])
  const [ChiTien, setChiTien] = useState([])
  const [SoQuy, setSoQuy] = useState([])
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
    const loadData = async () => {
      setLoadingCart(true)
      localStorage.removeItem('dateLogin3')
      setProgressPercent(0)

      //   setLoading(true)
      const ThuTien = await APIDATA_CHART(API.ThuTien, token, dataDate)

      const ChiTien = await APIDATA_CHART(API.ChiTien, token, dataDate)

      const SoQuy = await APIDATA_CHART(API.SoQuy, token, dataDate)

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
      setThuTien(ThuTien)
      setChiTien(ChiTien)
      setSoQuy(SoQuy)
      setDataSearch(ChiTien)
    }
    setSegmented('CHITIEN')
    setValueSegmented('Chi tiền')
    setTimeout(() => {
      setProgressPercent(100)
    }, 700)
    setTimeout(() => {
      setLoadingCart(false)
    }, 1100)
    loadData()
  }, [dataDate?.NgayBatDau, dataDate?.NgayKetThuc])
  useEffect(() => {
    const dataMapping = {
      THUTIEN: ThuTien,
      CHITIEN: ChiTien,
      QUYTIENMAT: SoQuy,
    }

    const valueList = Array.isArray(dataMapping[segmented]) ? dataMapping[segmented]?.map((item) => item.DataValue) : []
    const totalPrice = valueList.reduce((sum, price) => sum + price, 0)

    setTotalChart(totalPrice || 0)
  }, [valueSegmented, ThuTien, segmented])
  // console.log(data_hanghoa)
  const setNumber = (value) => {
    setTotalNumber(value)
  }
  useEffect(() => {
    if (valueSegmented === 'Thu tiền') {
      setDataSearch(ThuTien)
    } else if (valueSegmented === 'Chi tiền') {
      setDataSearch(ChiTien)
    } else {
      setDataSearch([])
    }
  }, [valueSegmented])
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
  const handelSearch = (value) => {
    if (ThuTien === -1 || ChiTien === -1) {
      setDataSearch([])
    } else {
      const newData =
        segmented === 'THUTIEN'
          ? ThuTien?.filter((record) => {
              return Object.keys(record).some((key) => isMatch(record[key], value))
            })
          : segmented === 'CHITIEN'
            ? ChiTien?.filter((record) => {
                return Object.keys(record).some((key) => isMatch(record[key], value))
              })
            : null
      console.log(newData)
      setDataSearch(newData)
    }
  }
  const onSearch = (value) => setSearchText(value)
  return (
    <div className=" w-full  " style={{ minHeight: '80vh' }}>
      <div className="card  p-0 m-0 fixed-top ">
        <div className="flex gap-2 items-center">
          <BiLeftArrowAlt size={25} onClick={() => navigate('/')} /> <h1 className=" text-xl">{titleApp}</h1>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-base ml-8 mb-2">Thu - Chi</p>
          {segmented === 'QUYTIENMAT' ? null : <SearchOutlined className="mr-4  text-xl absolute right-0 bottom-3" onClick={() => setShowSearch(!showSearch)} />}
        </div>
      </div>
      <div className="col-lg-12 pt-2 fixed-top top-[50px]">
        <div className="card   p-0 m-0">
          {segmented === 'QUYTIENMAT' ? null : showSearch ? (
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
                      Thu tiền
                    </div>
                  </div>
                ),
                value: 'Thu tiền',
              },
              {
                label: (
                  <div className="h-[40px] flex items-center justify-center  flex-col " style={{ padding: 2, lineHeight: '0' }}>
                    <div className="" style={{ lineHeight: '1' }}>
                      Chi tiền
                    </div>
                  </div>
                ),
                value: 'Chi tiền',
              },
              {
                label: (
                  <div className="h-[40px] flex items-center justify-center  flex-col " style={{ padding: 2, lineHeight: '0' }}>
                    <div className="" style={{ lineHeight: '1' }}>
                      Sổ quỹ
                    </div>
                  </div>
                ),
                value: 'Sổ quỹ',
              },
            ]}
            // options={['Khách hàng', 'Hàng hóa', 'Nhóm Hàng']}
            block
            onChange={(value) => {
              setSegmented(value === 'Thu tiền' ? 'THUTIEN' : value === 'Chi tiền' ? 'CHITIEN' : 'QUYTIENMAT'), setValueSegmented(value)
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

      <div
        className={`card m-0 ${segmented === 'QUYTIENMAT' ? 'pt-[85px]' : !showSearch ? 'pt-[85px]' : 'pt-[115px]'} ${segmented === 'QUYTIENMAT' ? 'pb-[100px]' : 'pb-[30px]'} `}
      >
        {segmented === 'THUTIEN' ? (
          <>
            <Table segmented={segmented} titleDr={'THU'} param={ThuTien ? dataSearch : []} columName={[]} height={'setHeight'} hiden={[]} setTotalNumber={setNumber} />
          </>
        ) : segmented === 'CHITIEN' ? (
          <>
            <Table segmented={segmented} titleDr={'THU'} param={ChiTien ? dataSearch : []} columName={[]} height={'setHeight'} hiden={[]} setTotalNumber={setNumber} />{' '}
          </>
        ) : segmented === 'QUYTIENMAT' ? (
          <>
            <Table segmented={segmented} titleDr={'THU'} param={SoQuy ? SoQuy : []} columName={[]} height={'setHeight'} hiden={[]} setTotalNumber={setNumber} />{' '}
          </>
        ) : null}
      </div>
      {segmented === 'QUYTIENMAT' ? null : (
        <div className="card p-0 m-0 fixed-bottom bottom-[50px]">
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
      )}
    </div>
  )
}

export default Chi
