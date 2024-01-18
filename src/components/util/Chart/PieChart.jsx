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

function DoughNut({ dataChart, value, name, onClick, Drawer, valueNum }) {
  const Labels = dataChart?.map((result) => result[name])
  const dataChart_list = dataChart?.map((result) => result[value])
  const backgroundColor_list = ['#DC634E', '#792ABE', '#B58400', '#85CE59', '#8FCCF4', '#EA8441', '#9171B8', '#6A6123', '#22677A', '#2FD7A1']
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
              <p className="w-[100%]  cursor-pointer hover:font-medium" style={{ color: backgroundColor_list[index] }} onClick={() => onClick(item, backgroundColor_list[index])}>
                {item[name]}
              </p>
              <div className="w-[100%]">
                <RateBar numberShow={true} percentage={item[value]} color={backgroundColor_list[index]} title={item[name]} valueNum={item[valueNum]} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
export default DoughNut
