/* eslint-disable no-unused-vars */
import PieChart from '../util/Chart/PieChart'

import Date from '../DashBoar/Date'
import { useEffect, useState } from 'react'
import { APIDATA_CHART, RETOKEN } from '../../action/Actions'
import { toast } from 'react-toastify'
import API from '../../API/API'
import { Flex, Progress, Segmented } from 'antd'
import Table from '../DashBoar/DrawerTable'
import { useNavigate } from 'react-router-dom'
import { BiLeftArrowAlt } from 'react-icons/bi'
import Search from 'antd/es/input/Search'
import { SearchOutlined } from '@ant-design/icons'
function TonKho() {
  const [segmented, setSegmented] = useState('')
  //   const [loading, setLoading] = useState(false)
  const [valueSegmented, setValueSegmented] = useState('')
  const [searchText, setSearchText] = useState('')
  const [data_TonKho_TongKho, setdata_TonKho_TongKho] = useState([])
  const [TonKho_TongKhoDVTQuyDoi, setTonKho_TongKhoDVTQuyDoi] = useState([])
  const [TonKho_TheoKho, setTonKho_TheoKho] = useState([])
  const [refToken, setRefToken] = useState(false)
  const [showSearch, setShowSearch] = useState(false)

  const token = localStorage.getItem('TKN')
  const [TotalNumber, setTotalNumber] = useState(0)

  const [progressPercent, setProgressPercent] = useState(0)
  const [dataDate, setDataDate] = useState(
    !JSON.parse(localStorage.getItem('dateLogin2')) ? JSON.parse(localStorage.getItem('dateLogin')) : JSON.parse(localStorage.getItem('dateLogin2')),
  )
  const [loadingCart, setLoadingCart] = useState(false)
  const navigate = useNavigate()
  //   const [dataDate_s, setDataDate] = useState(dataDate)
  // const [dataDate_sS, setDataDateSS] = useState(dataDate_s)
  const titleApp = window.localStorage.getItem('appName')

  useEffect(() => {
    const loadData = async () => {
      setLoadingCart(true)
      localStorage.removeItem('dateLogin3')
      setProgressPercent(0)

      //   setLoading(true)
      //API Ton Kho

      const data_TonKho_TongKho = await APIDATA_CHART(API.TonKho_TongKho, token, { ...dataDate, FilterText: searchText })
      const TonKho_TongKhoDVTQuyDoi = await APIDATA_CHART(API.TonKho_TongKhoDVTQuyDoi, token, { ...dataDate, FilterText: searchText })
      const TonKho_TheoKho = await APIDATA_CHART(API.TonKho_TheoKho, token, { ...dataDate, FilterText: searchText })

      if (data_TonKho_TongKho === -107 || data_TonKho_TongKho === -108) {
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
      setdata_TonKho_TongKho(data_TonKho_TongKho ? data_TonKho_TongKho : [])
      setTonKho_TongKhoDVTQuyDoi(TonKho_TongKhoDVTQuyDoi ? TonKho_TongKhoDVTQuyDoi : [])
      setTonKho_TheoKho(TonKho_TheoKho ? TonKho_TheoKho : [])
    }
    setSegmented('TONGHOP')
    setValueSegmented('Tổng hợp')
    setTimeout(() => {
      setProgressPercent(100)
    }, 700)
    setTimeout(() => {
      setLoadingCart(false)
    }, 1100)
    loadData()
  }, [dataDate?.NgayBatDau, dataDate?.NgayKetThuc, searchText])
  // console.log(data_hanghoa)
  const setNumber = (value) => {
    setTotalNumber(value)
  }
  const onSearch = (value) => setSearchText(value)
  return (
    <div className="  w-full  relative " style={{ overflow: 'hidden' }}>
      <div className="card  p-0 m-0 fixed-top">
        <div className="flex gap-2 items-center">
          <BiLeftArrowAlt onClick={() => navigate('/')} size={25} /> <h1 className=" text-xl">{titleApp}</h1>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-base ml-8 mb-2">Tồn kho</p>
          <SearchOutlined className="mr-4  text-xl absolute right-0 bottom-3" onClick={() => setShowSearch(!showSearch)} />
        </div>
      </div>
      <div className="col-lg-12 pt-2 sticky top-[ 0px]">
        <div className="card   p-0 m-0 ">
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

          <div className=" w-full ">
            <Date onDateChange={setDataDate} dataDate={dataDate} dateType={'local'} localTitle={'dateLogin2'} titleDr={'TONKHO'} />
          </div>

          <Segmented
            options={[
              {
                label: (
                  <div className="h-[40px] flex items-center justify-center" style={{ padding: 2 }}>
                    Tổng hợp
                  </div>
                ),
                value: 'Tổng hợp',
              },
              {
                label: (
                  <div className="h-[40px] flex items-center justify-center  flex-col " style={{ padding: 2, lineHeight: '0' }}>
                    <div className="" style={{ lineHeight: '1' }}>
                      Tổng hợp (ĐVT quy đổi)
                    </div>
                  </div>
                ),
                value: 'Tổng hợp (ĐVT quy đổi)',
              },
              {
                label: (
                  <div className="h-[40px] flex items-center justify-center" style={{ padding: 2 }}>
                    Theo kho
                  </div>
                ),
                value: 'Theo kho',
              },
            ]}
            // options={['Khách hàng', 'Hàng hóa', 'Nhóm Hàng']}
            block
            onChange={(value) => {
              setSegmented(value === 'Tổng hợp' ? 'TONGHOP' : value === 'Tổng hợp (ĐVT quy đổi)' ? 'TONGHOPDVT' : 'THEOKHO'), setValueSegmented(value)
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
      <div className="card   pb-[50px]" style={{ overflow: 'scroll', height: 'calc(100vh - 250px)' }}>
        {' '}
        {segmented === 'TONGHOP' ? (
          <>
            <Table
              segmented={segmented}
              titleDr={'TONKHO'}
              param={data_TonKho_TongKho ? data_TonKho_TongKho : []}
              columName={[]}
              height={'setHeight'}
              hiden={[]}
              setTotalNumber={setNumber}
            />
          </>
        ) : segmented === 'TONGHOPDVT' ? (
          <>
            <Table
              segmented={segmented}
              titleDr={'TONKHO'}
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
              titleDr={'TONKHO'}
              param={TonKho_TheoKho ? TonKho_TheoKho : []}
              columName={[]}
              height={'setHeight'}
              hiden={[]}
              setTotalNumber={setNumber}
            />{' '}
          </>
        ) : null}
      </div>
    </div>
  )
}

export default TonKho
