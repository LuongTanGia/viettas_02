/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'

const CounterComponent = ({ targetValue, duration }) => {
  const [counter, setCounter] = useState(0)
  const ThongSo = JSON.parse(localStorage.getItem('ThongSo'))

  useEffect(() => {
    const increment = targetValue / (duration / 1000)
    let currentValue = 0

    const interval = setInterval(() => {
      if (currentValue < targetValue) {
        currentValue += increment
        setCounter(Math.round(currentValue))
      } else {
        setCounter(targetValue)
        clearInterval(interval)
      }
    }, 1000 / 60)

    return () => clearInterval(interval)
  }, [targetValue, duration])
  // const formatter = new Intl.NumberFormat('en-US', {
  //   style: 'decimal',
  // })
  return (
    <div style={{ fontSize: '16px', color: 'black', fontWeight: '500' }}>
      {Number(counter).toLocaleString('en-US', {
        minimumFractionDigits: ThongSo.SOLESOTIEN,
        maximumFractionDigits: ThongSo.SOLESOTIEN,
      })}
    </div>
  )
}

export default CounterComponent
