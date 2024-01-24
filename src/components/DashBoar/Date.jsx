/* eslint-disable react/prop-types */
import { DateField } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'

function Date({ dataDate, onDateChange }) {
  const [startDate, setStartDate] = useState(dayjs(dataDate?.NgayBatDau))
  const [endDate, setEndDate] = useState(dayjs(dataDate?.NgayKetThuc))
  let timerId
  useEffect(() => {
    setStartDate(dayjs(dataDate?.NgayBatDau))
    setEndDate(dayjs(dataDate?.NgayKetThuc))
  }, [dataDate?.NgayBatDau, dataDate?.NgayKetThuc])

  const handleStartDateChange = (newValue) => {
    setStartDate(newValue)
    // onDateChange({ ...dataDate, NgayBatDau: newValue.format('DD/MM/YYYY') })
  }

  const handleEndDateChange = (newValue) => {
    setEndDate(newValue)
    // onDateChange({ ...dataDate, NgayKetThuc: newValue.format('DD/MM/YYYY') })
  }

  const handleDateChange = () => {
    clearTimeout(timerId)
    timerId = setTimeout(() => {
      onDateChange({ ...dataDate, NgayBatDau: startDate, NgayKetThuc: endDate })
    }, 300)
  }
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleDateChange()
    }
  }
  return (
    <div className="flex py-3 px-2 w-full justify-center gap-3">
      <DateField
        label="Từ Ngày"
        onBlur={handleDateChange}
        onKeyDown={handleKeyDown}
        size="small"
        format="DD/MM/YYYY"
        value={startDate}
        onChange={handleStartDateChange}
        className="w-[40%]  min-w-[300px]"
        sx={{
          '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': { border: '1px solid #007FFF' },
          '& .MuiButtonBase-root': {
            padding: '4px',
          },
          '& .MuiSvgIcon-root': {
            width: '18px',
            height: '18px',
          },
        }}
      />
      <DateField
        onBlur={handleDateChange}
        onKeyDown={handleKeyDown}
        label="Đến Ngày"
        size="small"
        value={endDate}
        onChange={handleEndDateChange}
        className="w-[40%] min-w-[300px]"
        format="DD/MM/YYYY"
        sx={{
          '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': { border: '1px solid #007FFF' },
          '& .MuiButtonBase-root': {
            padding: '4px',
          },
          '& .MuiSvgIcon-root': {
            width: '18px',
            height: '18px',
          },
        }}
      />
    </div>
  )
}

export default Date
