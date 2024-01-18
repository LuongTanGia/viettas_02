/* eslint-disable react/prop-types */
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import RateBar from './LoadingChart'

ChartJS.register(ArcElement, Tooltip, Legend)

export const options = {
  plugins: {
    legend: {
      display: false,
      labels: {
        font: {
          size: 4,
          family: 'Arial, sans-serif',
        },
      },
    },
  },
}

function DoughNut({ dataChart, value, name, onClick, Drawer }) {
  const Labels = dataChart?.map((result) => result[name])
  const dataChart_list = dataChart?.map((result) => result[value])
  const backgroundColor_list = ['#FF0000', '#C850C0', '#FC00FF', '#97D9E1', '#85FFBD', '#FBAB7E', '#F7CE68', '#8BC6EC', '#00DBDE']
  const data = {
    labels: Labels,
    datasets: [
      {
        label: 'index',
        data: dataChart_list,
        backgroundColor: backgroundColor_list,
        borderColor: backgroundColor_list,
        // borderWidth: 10,
      },
    ],
  }
  return (
    <>
      <div className="pt-1 gap-4 flex justify-between items-center PhoneCss">
        <div className={`${Drawer ? 'w-[70%]' : 'w-[50%]'}  pt-3`}>
          <Pie data={data} options={options} />
        </div>
        <div className="w-[100%] flex flex-col flex-1  scroll-smooth boxRate">
          {dataChart?.map((item, index) => (
            <div key={index} className="flex items-center justify-center mb-2">
              <p className="w-[100%]  cursor-pointer hover:font-medium" style={{ color: backgroundColor_list[index] }} onClick={() => onClick(item)}>
                {item[name]}
              </p>
              <div className="w-[100%]">
                <RateBar percentage={item[value]} color={backgroundColor_list[index]} title={item[name]} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
export default DoughNut
