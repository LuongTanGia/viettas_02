/* eslint-disable react/prop-types */
import { DateField } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'

function Date({ dataDate, onDateChange, dateType, titleDr, localTitle }) {
  const [startDate, setStartDate] = useState(dayjs(dataDate?.NgayBatDau))
  const [endDate, setEndDate] = useState(dayjs(dataDate?.NgayKetThuc))
  const [DateChange, setDateChange] = useState(false)

  let timerId
  useEffect(() => {
    setStartDate(dayjs(dataDate?.NgayBatDau))
    setEndDate(dayjs(dataDate?.NgayKetThuc))
  }, [dataDate?.NgayBatDau, dataDate?.NgayKetThuc])

  const handleStartDateChange = (newValue) => {
    setStartDate(newValue)
    setDateChange(false)
  }

  const handleEndDateChange = (newValue) => {
    setEndDate(newValue)
    setDateChange(true)
  }

  const handleDateChange = () => {
    clearTimeout(timerId)
    timerId = setTimeout(() => {
      if (!DateChange && startDate && endDate && startDate.isAfter(endDate)) {
        onDateChange({
          NgayBatDau: dayjs(startDate).format('YYYY-MM-DD'),
          NgayKetThuc: dayjs(startDate).format('YYYY-MM-DD'),
        })
        dateType === 'local'
          ? localStorage.setItem(localTitle, JSON.stringify({ NgayBatDau: dayjs(startDate).format('YYYY-MM-DD'), NgayKetThuc: dayjs(startDate).format('YYYY-MM-DD') }))
          : null
        return
      } else if (DateChange && startDate && endDate && startDate.isAfter(endDate)) {
        onDateChange({
          NgayBatDau: dayjs(endDate).format('YYYY-MM-DD'),
          NgayKetThuc: dayjs(endDate).format('YYYY-MM-DD'),
        })
        dateType === 'local'
          ? localStorage.setItem(
              localTitle,
              JSON.stringify({
                NgayBatDau: dayjs(endDate).format('YYYY-MM-DD'),
                NgayKetThuc: dayjs(endDate).format('YYYY-MM-DD'),
              }),
            )
          : null
      } else {
        onDateChange({
          NgayBatDau: dayjs(startDate).format('YYYY-MM-DD'),
          NgayKetThuc: dayjs(endDate).format('YYYY-MM-DD'),
        })
        dateType === 'local'
          ? localStorage.setItem(
              localTitle,
              JSON.stringify({
                NgayBatDau: dayjs(startDate).format('YYYY-MM-DD'),
                NgayKetThuc: dayjs(endDate).format('YYYY-MM-DD'),
              }),
            )
          : null
      }
    }, 300)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleDateChange()
    }
  }
  return (
    <div className="flex pt-2 pb-1 w-full justify-center items-end gap-2 sticky bg-white top-0  ">
      {titleDr === 'TONKHO' || titleDr === 'PHAITRA' || titleDr === 'PHAITHU' ? (
        <>
          <p className=" text-base">Đến</p>
          <DateField
            onBlur={handleDateChange}
            onKeyDown={handleKeyDown}
            size="small"
            value={endDate}
            onChange={handleEndDateChange}
            className="w-[30%] min-w-[300px]"
            format="DD/MM/YYYY"
          />
        </>
      ) : (
        <>
          <p className=" text-base">Từ</p>
          <DateField
            onBlur={handleDateChange}
            onKeyDown={handleKeyDown}
            size="small"
            format="DD/MM/YYYY"
            value={startDate}
            onChange={handleStartDateChange}
            className="w-[30%]  min-w-[300px]"
          />
          <p className="text-base">Đến</p>

          <DateField
            onBlur={handleDateChange}
            onKeyDown={handleKeyDown}
            size="small"
            value={endDate}
            onChange={handleEndDateChange}
            className="w-[30%] min-w-[300px]"
            format="DD/MM/YYYY"
          />
        </>
      )}
    </div>
  )
}

export default Date
