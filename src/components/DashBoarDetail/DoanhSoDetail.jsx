/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { APIDATA_CHART_CT, RETOKEN } from '../../action/Actions'
import API from '../../API/API'
import { toast } from 'react-toastify'
import Table from '../DashBoar/DrawerTable'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { khoanNgaySelect } from '../../redux/selector'
import Date from '../DashBoar/Date'
// import CounterComponent from '../DashBoar/LoadNumber'
// import RateBar from '../util/Chart/LoadingChart'
import { Progress } from 'antd'
import { BiLeftArrowAlt } from 'react-icons/bi'
// import Footer from '../Footer/Footer'
function DoanhSoDetail() {
  const navigate = useNavigate()
  const KhoanNgay = useSelector(khoanNgaySelect)

  const params = useParams()
  const dataDetail = JSON.parse(decodeURIComponent(atob(localStorage.getItem('ThongTinDetail'))))
  console.log(dataDetail)
  const token = localStorage.getItem('TKN')
  const [refToken, setRefToken] = useState(false)
  const [dataTable, setDataTable] = useState([])
  const [TotalNumber, setTotalNumber] = useState(0)
  const [progressPercent, setProgressPercent] = useState(0)
  const [loadingCart, setLoadingCart] = useState(false)
  const dateLogin3 = JSON.parse(localStorage.getItem('dateLogin3'))
  const dateLogin2 = JSON.parse(localStorage.getItem('dateLogin2'))
  const dateLogin = JSON.parse(localStorage.getItem('dateLogin'))
  const titleApp = window.localStorage.getItem('appName')

  let newDataDate

  if (!dateLogin3) {
    newDataDate = dateLogin2 ? dateLogin2 : dateLogin ? dateLogin : KhoanNgay
  } else {
    newDataDate = dateLogin3
  }

  const [dataDate, setDataDate] = useState(newDataDate)
  useEffect(() => {
    console.log(dataDate)
    const loadData = async () => {
      setLoadingCart(true)

      setProgressPercent(0)
      const data_ct = await APIDATA_CHART_CT(
        dataDetail.segmented === 'KHACHHANG'
          ? API.DoanhSoKhachHang_CT
          : dataDetail.segmented === 'HANGHOA'
            ? API.DoanhSoHangHoa_CT
            : dataDetail.segmented === 'NHOMHANG'
              ? API.DoanhSoNhomHang_CT
              : null,
        token,
        { ...dataDetail.data, ...dataDate },
      )
      if (data_ct === -107 || data_ct === -108) {
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
          Navigate('/login')
        }
      }
      setProgressPercent(70)

      setTimeout(() => {
        setProgressPercent(100)
      }, 700)
      setTimeout(() => {
        setLoadingCart(false)
        setDataTable(data_ct)
      }, 1100)
    }
    loadData()
  }, [dataDate?.NgayBatDau, dataDate?.NgayKetThuc])
  const setNumber = (value) => {
    setTotalNumber(value)
  }
  return (
    <div className="  w-full  z-20 p-0 ">
      <div className="card  p-0 m-0 mb-2">
        <div className="flex gap-2 items-center">
          <BiLeftArrowAlt
            size={25}
            onClick={() => {
              navigate('/DOANHSO'), localStorage.removeItem('dateLogin3')
            }}
          />{' '}
          <h1 className=" text-xl ">Doanh số chi tiết</h1>
        </div>
        <p className="text-base  ml-8 mb-2" style={{ color: dataDetail.color }}>
          {dataDetail.name}
        </p>
      </div>
      <div className="col-lg-12  ">
        <div className="card   p-0 m-0">
          <div className="flex gap-2 items-center">
            <p className=" text-sm " style={{ color: dataDetail.color }}></p>
          </div>
          <div className="py-2 w-full bg-white">
            <Date onDateChange={setDataDate} dataDate={dataDate} titleDr={dataDetail.titleDr} dateType={'local'} localTitle={'dateLogin3'} />
          </div>

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
        <Table
          // style={{ height: '100vh' }}
          segmented={dataDetail.segmented}
          titleDr={dataDetail.titleDr}
          colorTable={dataDetail.color === '#8BC6EC' ? undefined : dataDetail.color}
          param={dataTable ? dataTable : []}
          columName={[]}
          height={'setHeight'}
          hiden={[]}
          typeTable={dataDetail.segmented === 'DANHSACHKHACHHANG' ? 1 : 0}
          setTotalNumber={setNumber}
          title={dataDetail.title}
          value={dataDetail.DataValue}
        />
      </div>

      {/* <div className="card ">
        <div className="  items-center" style={{ backgroundColor: 'rgb(241,241,241)' }}>
          <div className="flex cursor-pointer items-center justify-center mb-2">
            <p
              className={`w-full text-center hover:font-medium flex items-center gap-2 justify-between text-base font-medium pl-4
                  `}
            >
              Cộng
            </p>
            <div
              className={`w-[100%] text-right pr-[16px]
                   `}
            >
              <CounterComponent targetValue={TotalNumber} duration={100000} color={'#8BC6EC'} />
              <RateBar percentage={100} color={'#8BC6EC'} title={'Tổng hợp'} />
            </div>
          </div>
        </div>
      </div> */}
      {/* <Footer /> */}
    </div>
  )
}

export default DoanhSoDetail
