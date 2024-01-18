import { useState } from 'react'
import { Input } from 'antd'
import moment from 'moment'

const CustomDatePicker = () => {
  const [dateValue, setDateValue] = useState('')

  const handleInputChange = (e) => {
    const inputText = e.target.value
    const numericInput = inputText.replace(/\D/g, '')

    let formattedInput = ''

    if (numericInput.length > 0) {
      formattedInput += numericInput.slice(0, 2)
    }

    if (numericInput.length > 2) {
      formattedInput += '/' + numericInput.slice(2, 4)
    }

    if (numericInput.length > 4) {
      formattedInput += '/' + numericInput.slice(4, 8)
    }

    console.log(dateValue.length)

    const isValidFormat = moment(formattedInput, 'DD/MM/YYYY', true).isValid()
    console.log(isValidFormat)

    setTimeout(() => {
      if (isValidFormat) {
        setDateValue(formattedInput)
      } else if (!isValidFormat && dateValue.length === 10) {
        setDateValue(moment().format('DD/MM/YYYY'))
      }
    }, 2000)

    // setDateValue(formattedInput)
  }

  return <Input value={dateValue} onChange={handleInputChange} placeholder="Chọn ngày" />
}

export default CustomDatePicker
