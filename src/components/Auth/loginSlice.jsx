import { createSlice } from '@reduxjs/toolkit'

// eslint-disable-next-line react-refresh/only-export-components
export default createSlice({
  name: 'AuthData',
  initialState: {
    DSDL: [],
    data: [],
    KhoanNgay: {},
  },
  reducers: {
    getDSDL: (state, action) => {
      state.DSDL = action.payload
    },
    login: (state, action) => {
      state.data = action.payload
    },
    getKhoanNgay: (state, action) => {
      state.KhoanNgay = action.payload
    },
  },
})
