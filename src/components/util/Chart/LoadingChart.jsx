import CounterComponent from '../../DashBoar/LoadNumber'

// eslint-disable-next-line react/prop-types
const HorizontalProgressBar = ({ percentage, color }) => {
  return (
    <div className="progress-bar">
      <div
        className="progress-bar-fill"
        style={{
          width: `${percentage}%`,
          color: '#fff',
          background: color,
        }}
      >
        {percentage}%
      </div>
    </div>
  )
}

// eslint-disable-next-line react/prop-types
const RateBar = ({ percentage, color, valueNum, numberShow }) => {
  return (
    <div className="">
      {numberShow ? <CounterComponent targetValue={valueNum} duration={50000} color={color} /> : null}

      <HorizontalProgressBar percentage={percentage} color={color || 'red'} />
    </div>
  )
}

export default RateBar
