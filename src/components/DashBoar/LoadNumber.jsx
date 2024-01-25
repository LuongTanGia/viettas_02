/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'

const CounterComponent = ({ targetValue, duration, color }) => {
  const [counter, setCounter] = useState(0)

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
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'decimal',
  })
  return <div style={{ fontSize: '16px', color: color }}>{formatter.format(counter)}</div>
}

export default CounterComponent
