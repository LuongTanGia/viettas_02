import axios from 'axios'
import loginSlice from '../components/Auth/loginSlice'

import { toast } from 'react-toastify'
import * as XLSX from 'xlsx'
import dayjs from 'dayjs'

const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
})

const handleAPIError = (response) => {
  if (response.data.DataError !== 0) {
    toast.error(response.data.DataErrorDescription)
  }
}
export const RETOKEN = async () => {
  // console.log('RETOKEN')

  const token = window.localStorage.getItem('RTKN')

  try {
    const response = await axiosInstance.post('https://isalestaapi.viettassaigon.vn/api/Auth/RefreshToken', {
      TokenID: token,
    })

    console.log(response)
    if (response.data.DataError === 0) {
      window.localStorage.setItem('TKN', response.data.TKN)
      return response.data.TKN
    } else if (response.data.DataError === -107 || response.data.DataError === -111) {
      window.location.href = '/login'
      return 0
    }
  } catch (error) {
    console.error('Error adding user:', error)
  }
}
export const DANHSACHDULIEU = async (API, data) => {
  // console.log('DANHSACHDULIEU')
  try {
    const response = await axiosInstance.post(API, data)
    window.localStorage.setItem('tokenDuLieu', response.data.TKN)

    if (response.data.DataError === 0) {
      return response.data
    } else {
      console.log('Error')
    }
    return response.data
  } catch (error) {
    console.error('Error adding user:', error)
  }
}
export const LOGIN = async (API1, API2, TKN, RemoteDB, data, dispatch) => {
  // console.log('LOGIN')
  try {
    const response = await axiosInstance.post(API1, {
      TokenID: TKN,
      RemoteDB: RemoteDB,
    })

    if (response.data.DataError === 0) {
      window.localStorage.setItem('TKN', response.data.TKN)
      window.localStorage.setItem('RTKN', response.data.RTKN)
      window.localStorage.setItem('User', response.data.MappingUser)

      dispatch(loginSlice.actions.login(response.data))

      return 1
    } else {
      dispatch(loginSlice.actions.login([]))
      console.log('Error')
    }

    if (response.data.DataError !== 0) {
      handleAPIError(response)

      await DANHSACHDULIEU(API2, data)
    }
  } catch (error) {
    console.error('Error adding user:', error)
  }
}
export const KHOANNGAY = async (API, token) => {
  // console.log('KHOANNGAY')
  try {
    const response = await axiosInstance.post(
      API,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    return response.data
  } catch (error) {
    console.error('Error adding user:', error)
  }
}
export const DATATONGHOP = async (API, token, KhoanNgay) => {
  // console.log('DATATONGHOP')

  try {
    const response = await axiosInstance.post(API, KhoanNgay, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })

    if (response.data.DataError === -107 || response.data.DataError === -108) {
      const newToken = await RETOKEN()

      if (newToken !== 0) {
        await DATATONGHOP(API, newToken, KhoanNgay)
      } else {
        window.location.href = '/login'
        toast.error('Failed to refresh token!')
      }
    }

    return response.data
  } catch (error) {
    console.error('Error adding user:', error)
  }
}
export const THAYDOIRMATKHAU = async (API, data, token) => {
  try {
    const response = await axiosInstance.post(API, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (response.data.DataError === 0) {
      toast(response.data.DataErrorDescription)
      return 0
    } else {
      toast(response.data.DataErrorDescription)
      return 1
    }
  } catch (error) {
    console.error('Error adding user:', error)
  }
}
export const APIDATA_CHART = async (API, token, data) => {
  // console.log('APIDATA_CHART')
  try {
    const response = await axiosInstance.post(API, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (response.data.DataError === -107 || response.data.DataError === -108) {
      return response.data.DataError
    }

    return response.data.DataResults
  } catch (error) {
    console.error('Error adding user:', error)
  }
}
export const APIDATA_CHART_CT = async (API, token, data) => {
  // console.log('APIDATA_CHART_CT')

  try {
    const response = await axiosInstance.post(API, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    // if (response.data.DataError === -107 || response.data.DataError === -108) {
    //   const newToken = await RETOKEN()

    //   if (newToken !== '') {
    //     await APIDATA_CHART(API, newToken, data)
    //   } else if (newToken === 0) {
    //     toast.error('Failed to refresh token!')
    //     window.localStorage.clear()
    //     window.location.href = '/login'
    //   }
    // }
    if (response.data.DataError === -107 || response.data.DataError === -108) {
      return response.data.DataError
    }
    return response.data.DataResults
  } catch (error) {
    console.error('Error adding user:', error)
  }
}
export const exportToExcel = () => {
  const ws = XLSX.utils.table_to_sheet(document.getElementById('my-table'), { origin: 'A6' })
  const wb = XLSX.utils.book_new()
  const companyInfo = [['Tên Công Ty: Viettas SaiGon JSC'], ['Địa Chỉ: 351/9 Nơ Trang Long P.13 Q.Bình Thạnh TPHCM'], [`Ngày :${dayjs(new Date()).format('YYYY-MM-DD')}`]]
  XLSX.utils.sheet_add_aoa(ws, companyInfo, { origin: 'A2' })
  XLSX.utils.book_append_sheet(wb, ws, 'DanhSach')
  XLSX.writeFile(wb, 'du_lieu.xlsx')
}
export const getFirstDayOfMonth = (date) => {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}
export const getWeek = (date) => {
  const firstDayOfWeek = new Date(date)
  firstDayOfWeek.setDate(date.getDate() - date.getDay())
  const weekDays = []
  for (let i = 0; i < 7; i++) {
    const day = new Date(firstDayOfWeek)
    day.setDate(firstDayOfWeek.getDate() + i)
    weekDays.push(day)
  }
  return weekDays
}
export const getDateNum = (date) => {
  const dayNum = parseInt(localStorage.getItem('dateNum')) || 0

  const firstDayOfWeek = new Date(date)
  firstDayOfWeek.setDate(date.getDate() - dayNum)

  return firstDayOfWeek
}

export const THONGSO = async (API, token) => {
  console.log('THONGSO')
  try {
    const response = await axiosInstance.post(
      API,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    return response.data
  } catch (error) {
    console.error('Error adding user:', error)
  }
}
export function hexToRGBA(hex, alpha) {
  hex = hex.replace('#', '')
  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)
  const a = alpha >= 0 && alpha <= 1 ? alpha : 1
  return `rgba(${r}, ${g}, ${b}, ${a})`
}
