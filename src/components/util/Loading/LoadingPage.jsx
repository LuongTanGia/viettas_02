import { useEffect, useState } from 'react'
import { Spin } from 'antd'
export default function SimpleBackdrop() {
  const [spinning, setSpinning] = useState(false)

  useEffect(() => {
    const showLoader = () => {
      setSpinning(true)
      setTimeout(() => {
        setSpinning(false)
      }, 3000)
    }
    showLoader()
  }, [])

  return (
    <div className="z-[1000]">
      <Spin spinning={spinning} fullscreen />
    </div>
  )
}
