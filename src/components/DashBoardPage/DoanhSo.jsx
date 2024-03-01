import PieChart from '../util/Chart/PieChart'

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
function DoanhSo() {
  const [segmented, setSegmented] = useState('')
  //   const [loading, setLoading] = useState(false)
  const [valueSegmented, setValueSegmented] = useState('')
  const KhoanNgay = useSelector(khoanNgaySelect)
  const [refToken, setRefToken] = useState(false)
  const token = localStorage.getItem('TKN')
  const [data_hanghoa, setDataChart_hanghoa] = useState([])
  const [data_khachhang, setDataChart_khachhang] = useState([])
  const [data_nhomhang, setDataChart_nhomhang] = useState([])
  const [progressPercent, setProgressPercent] = useState(0)
  const dateLogin2 = JSON.parse(localStorage.getItem('dateLogin2'))
  const dateLogin = JSON.parse(localStorage.getItem('dateLogin'))

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
  const titleApp = window.localStorage.getItem('appName')

  useEffect(() => {
    const loadData = async () => {
      setLoadingCart(true)
      localStorage.removeItem('dateLogin3')
      setProgressPercent(0)

      //   setLoading(true)
      //API Doanh So
      const data_hanghoa = await APIDATA_CHART(API.DoanhSoHangHoa_TopChart, token, dataDate)
      const data_khachhang = await APIDATA_CHART(API.DoanhSoKhachHang_TopChart, token, dataDate)
      const data_nhomhang = await APIDATA_CHART(API.DoanhSoNhomHang_TopChart, token, dataDate)

      if (data_hanghoa === -107 || data_hanghoa === -108) {
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
      //Doanh So
      setDataChart_hanghoa(data_hanghoa !== -107 || data_hanghoa !== -108 ? data_hanghoa : [])
      setDataChart_khachhang(data_khachhang !== -107 || data_khachhang !== -108 ? data_khachhang : [])
      setDataChart_nhomhang(data_nhomhang !== -107 || data_nhomhang !== -108 ? data_nhomhang : [])
    }
    setSegmented('KHACHHANG')
    setValueSegmented('Khách hàng')
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
      HANGHOA: data_hanghoa,
      KHACHHANG: data_khachhang,
      NHOMHANG: data_nhomhang,
    }

    const valueList = Array.isArray(dataMapping[segmented]) ? dataMapping[segmented]?.map((item) => item.DataValue) : []
    const totalPrice = valueList.reduce((sum, price) => sum + price, 0)

    setTotalChart(totalPrice || 0)
  }, [valueSegmented, data_hanghoa, segmented])
  const showChildrenDrawer = async (value, color) => {
    // const url = window.location.href
    // console.log(url.split('?')[1])
    // navigate(`?${url.split('?')[1]}` + '_detail')
    navigate(`/DOANHSO/${value.DataCode}`)
    localStorage.setItem(
      'ThongTinDetail',
      btoa(
        encodeURIComponent(
          JSON.stringify({
            titleDr: 'DOANHSO',
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
  return (
    <div className=" relative w-full">
      <div className=" col-lg-12 card p-0 m-0 sticky top-[0px]">
        <div className="flex gap-2 items-center">
          <BiLeftArrowAlt onClick={() => navigate('/')} size={25} /> <h1 className=" text-xl">{titleApp}</h1>
        </div>
        <p className="text-base ml-8">Doanh Số</p>
      </div>

      <div className="col-lg-12 sticky top-[50px] mt-2">
        <div className="card p-0 m-0">
          <div className=" w-full bg-white">
            <Date onDateChange={setDataDate} dataDate={dataDate} dateType={'local'} localTitle={'dateLogin2'} />
          </div>
          <Segmented
            options={[
              {
                label: (
                  <div style={{ padding: 3 }}>
                    <div className=" text-sm">Khách hàng</div>
                  </div>
                ),
                value: 'Khách hàng',
              },
              {
                label: (
                  <div style={{ padding: 3 }}>
                    <div className=" text-sm">Hàng hóa</div>
                  </div>
                ),
                value: 'Hàng hóa',
              },
              {
                label: (
                  <div style={{ padding: 3 }}>
                    <div className=" text-sm">Nhóm Hàng</div>
                  </div>
                ),
                value: 'Nhóm Hàng',
              },
            ]}
            // options={['Khách hàng', 'Hàng hóa', 'Nhóm Hàng']}
            block
            onChange={(value) => {
              setSegmented(value === 'Khách hàng' ? 'KHACHHANG' : value === 'Hàng hóa' ? 'HANGHOA' : 'NHOMHANG'), setValueSegmented(value)
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

      <div className="card p-0 m-0 ">
        {segmented === 'KHACHHANG' ? (
          <>
            {data_khachhang !== -108 || data_khachhang !== -107 ? (
              <PieChart Drawer={true} dataChart={data_khachhang ? data_khachhang : []} valueNum={'DataValue'} value={'DataPerc'} name={'DataName'} onClick={showChildrenDrawer} />
            ) : null}
          </>
        ) : segmented === 'HANGHOA' ? (
          <>
            {data_hanghoa !== -108 || data_hanghoa !== -107 ? (
              <PieChart
                //   titleDr={titleDr}
                Drawer={true}
                nameChart={segmented}
                dataChart={data_hanghoa ? data_hanghoa : []}
                valueNum={'DataValue'}
                value={'DataPerc'}
                name={'DataName'}
                onClick={showChildrenDrawer}
              />
            ) : null}
          </>
        ) : segmented === 'NHOMHANG' ? (
          <>
            {data_hanghoa !== -108 || data_hanghoa !== -107 ? (
              <PieChart Drawer={true} dataChart={data_nhomhang ? data_nhomhang : []} valueNum={'DataValue'} value={'DataPerc'} name={'DataName'} onClick={showChildrenDrawer} />
            ) : null}
          </>
        ) : null}
      </div>

      <div className="card p-0 m-0 sticky bottom-[50px]">
        <div className="  items-center" style={{ backgroundColor: 'rgb(241,241,241)' }} onClick={() => showChildrenDrawer({ DataCode: null, DataCodeRest: 1, title: 'all' })}>
          <div className="flex cursor-pointer items-center justify-center mb-2">
            <p
              className={`w-full text-center hover:font-medium flex items-center gap-2 justify-between text-base font-medium pl-4
                    `}
            >
              Cộng
            </p>
            <div className={`w-[100%] text-right pr-[16px]`}>
              <CounterComponent targetValue={TotalChart} duration={100000} color={'#8BC6EC'} />
              <RateBar percentage={100} color={'#8BC6EC'} title={'Tổng hợp'} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DoanhSo
