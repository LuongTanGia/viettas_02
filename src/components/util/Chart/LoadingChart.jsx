import { hexToRGBA } from '../../../action/Actions'
import CounterComponent from '../../DashBoar/LoadNumber'

// eslint-disable-next-line react/prop-types
const HorizontalProgressBar = ({ percentage, color }) => {
  // const ThongSo = JSON.parse(localStorage.getItem('ThongSo'))

  return (
    <div className="progress-bar" style={{ background: hexToRGBA(color, 0.3) }}>
      <div
        className="progress-bar-fill"
        style={{
          width: `${percentage}%`,
          color: '#fff',
          background: color,
          fontSize: 12,
        }}
      >
        {Number(percentage).toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
        %
      </div>
    </div>
  )
}

// eslint-disable-next-line react/prop-types
const RateBar = ({ percentage, color, valueNum, numberShow }) => {
  return (
    <div className="flex flex-col items-end">
      {numberShow ? <CounterComponent targetValue={valueNum} duration={50000} color={''} /> : null}

      <HorizontalProgressBar percentage={percentage > 0 ? percentage : 0} color={color || '#8bc6ec'} />
    </div>
  )
}

export default RateBar
