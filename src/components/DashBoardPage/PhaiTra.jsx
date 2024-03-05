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

function PhaiTra() {
  const [segmented, setSegmented] = useState('')
  //   const [loading, setLoading] = useState(false)
  const [dataSearch, setDataSearch] = useState([])

  const [valueSegmented, setValueSegmented] = useState('')
  const KhoanNgay = useSelector(khoanNgaySelect)
  const [refToken, setRefToken] = useState(false)
  const token = localStorage.getItem('TKN')
  const [CongNo_TopChart, setCongNo_TopChart] = useState([])
  const [CongNo_DanhSach, setCongNo_DanhSach] = useState([])
  const [progressPercent, setProgressPercent] = useState(0)
  const dateLogin2 = JSON.parse(localStorage.getItem('dateLogin2'))
  const dateLogin = JSON.parse(localStorage.getItem('dateLogin'))
  const [TotalNumber, setTotalNumber] = useState(0)
  const titleApp = window.localStorage.getItem('appName')

  let newDataDate

  if (!dateLogin2) {
    newDataDate = dateLogin ? dateLogin : KhoanNgay
  } else {
    newDataDate = dateLogin2
  }

  const [dataDate, setDataDate] = useState(newDataDate)

  const [loadingCart, setLoadingCart] = useState(false)
  const [TotalChart, setTotalChart] = useState(0)
  const navigate = useNavigate()
  //   const [dataDate_s, setDataDate] = useState(dataDate)
  // const [dataDate_sS, setDataDateSS] = useState(dataDate_s)

  useEffect(() => {
    const loadData = async () => {
      setLoadingCart(true)
      localStorage.removeItem('dateLogin3')
      setProgressPercent(0)

      //   setLoading(true)
      //API Cong No Thu - Tra
      const CongNo_TopChart = await APIDATA_CHART(API.CongNoTra_TopChart, token, dataDate)
      const CongNo_DanhSach = await APIDATA_CHART(API.CongNoTra_DanhSach, token, dataDate)

      if (CongNo_TopChart === -107 || CongNo_TopChart === -108) {
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
      setCongNo_TopChart(CongNo_TopChart ? CongNo_TopChart : [])
      setCongNo_DanhSach(CongNo_DanhSach ? CongNo_DanhSach : [])
      setDataSearch(CongNo_DanhSach)
    }
    setSegmented('BIEUDOTYTRONG')
    setValueSegmented('Biểu đồ tỷ trọng')
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
      BIEUDOTYTRONG: CongNo_TopChart,
      DANHSACHNHACUNGCAP: CongNo_DanhSach,
    }

    const valueList = Array.isArray(dataMapping[segmented]) ? dataMapping[segmented]?.map((item) => item.DataValue) : []
    const totalPrice = valueList.reduce((sum, price) => sum + price, 0)

    setTotalChart(totalPrice || 0)
  }, [valueSegmented, CongNo_TopChart, segmented])
  const showChildrenDrawer = async (value, color) => {
    // const url = window.location.href
    // console.log(url.split('?')[1])
    // navigate(`?${url.split('?')[1]}` + '_detail')
    navigate(`/PHAITRA/${value.DataCode}`)
    localStorage.setItem(
      'ThongTinDetail',
      btoa(
        encodeURIComponent(
          JSON.stringify({
            titleDr: 'PHAITRA',
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
    if (CongNo_DanhSach === -1) {
      setDataSearch([])
    } else {
      const newData = CongNo_DanhSach?.filter((record) => {
        return Object.keys(record).some((key) => isMatch(record[key], value))
      })
      console.log(newData)
      setDataSearch(newData)
    }
  }
  return (
    <div className="  w-full  z-20 p-0 m-0">
      <div className="card  p-0 m-0 sticky top-[0px]">
        <div className="flex gap-2 items-center">
          <BiLeftArrowAlt size={25} onClick={() => navigate('/')} /> <h1 className=" text-xl">{titleApp}</h1>
        </div>
        <p className="text-base ml-8">Phải trả</p>
      </div>
      <div className="col-lg-12  sticky top-[50px]">
        <div className="card   p-0 m-0">
          <div className="flex gap-2 items-center">
            {segmented === 'BIEUDOTYTRONG' ? '' : <Search onChange={(e) => handelSearch(e.target.value)} placeholder="Tìm kiếm" className="w-full " />}
          </div>

          <div className=" w-full bg-white">
            <Date onDateChange={setDataDate} dataDate={dataDate} dateType={'local'} localTitle={'dateLogin2'} titleDr={'TONKHO'} />
          </div>
          <Segmented
            options={[
              {
                label: (
                  <div className="h-[40px] flex items-center justify-center  flex-col " style={{ padding: 2, lineHeight: '0' }}>
                    <div className="" style={{ lineHeight: '1' }}>
                      Biểu đồ tỷ trọng
                    </div>
                  </div>
                ),
                value: 'Biểu đồ tỷ trọng',
              },
              {
                label: (
                  <div className="h-[40px] flex items-center justify-center  flex-col " style={{ padding: 2, lineHeight: '0' }}>
                    <div className="" style={{ lineHeight: '1' }}>
                      Danh sách nhà cung cấp
                    </div>
                  </div>
                ),
                value: 'Danh sách khách hàng',
              },
            ]}
            // options={['Khách hàng', 'Hàng hóa', 'Nhóm Hàng']}
            block
            onChange={(value) => {
              setSegmented(value === 'Biểu đồ tỷ trọng' ? 'BIEUDOTYTRONG' : 'DANHSACHNHACUNGCAP'), setValueSegmented(value)
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

      <div className="card p-0 m-0">
        {segmented === 'BIEUDOTYTRONG' ? (
          <>
            {CongNo_TopChart !== -108 || CongNo_TopChart !== -107 ? (
              <PieChart Drawer={true} dataChart={CongNo_TopChart ? CongNo_TopChart : []} valueNum={'DataValue'} value={'DataPerc'} name={'DataName'} onClick={showChildrenDrawer} />
            ) : null}
          </>
        ) : segmented === 'DANHSACHNHACUNGCAP' ? (
          <Table
            segmented={segmented}
            param={CongNo_DanhSach ? dataSearch : []}
            columName={[]}
            height={'setTableDr1'}
            hiden={[]}
            setTotalNumber={setNumber}
            onClick={showChildrenDrawer}
            titleDr={'PHAITHU'}
          />
        ) : null}
      </div>

      <div className="card p-0 m-0 fixed-bottom bottom-[50px]">
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
    </div>
  )
}

export default PhaiTra
