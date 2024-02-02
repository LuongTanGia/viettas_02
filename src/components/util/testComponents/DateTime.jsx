// import { useState, useEffect } from 'react'

// import { format } from 'date-fns'
// import viLocale from 'date-fns/locale/vi'
import { Link } from 'react-router-dom'
import './test.css'
const DateTimeClock = () => {
  // const [currentDateTime, setCurrentDateTime] = useState(new Date())

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     setCurrentDateTime(new Date())
  //   }, 1000)

  //   return () => clearInterval(intervalId)
  // }, [])

  // const formatDate = (date) => {
  //   return format(date, 'EEEE, dd-MM-yyyy', { locale: viLocale, timeZone: 'Asia/Ho_Chi_Minh' })
  // }

  return (
    <div className="flex gap-2 justify-start items-center infoApp ">
      <Link to="/" className="flex">
        <img className="w-[40px]" src="https://www.viettassaigon.vn/uploads/freecontent/VTS_ThongKe_iSale_256.png" alt="logo" />
      </Link>

      {/* <h2 className=" text-base font-mono   text-white"> {formatDate(currentDateTime)}</h2> */}
      <h1>ISALE - DEMO</h1>

      <div>{/* <h2 className=" text-base font-mono   text-white pt-1">Chia sẻ thành công, kết nối đam mê</h2> */}</div>
    </div>
  )
}

export default DateTimeClock
