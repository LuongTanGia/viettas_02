/* eslint-disable react/prop-types */
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import RateBar from './LoadingChart'
import Nodata from '../../../assets/img/9264828.jpg'

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
  const Labels = Array.isArray(dataChart) ? dataChart.map((result) => result[name]) : []

  const dataChart_list = Array.isArray(dataChart) ? dataChart?.map((result) => result[value]) : []
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
      {dataChart.length > 0 ? (
        <div className="pt-1 gap-4 flex justify-between items-center PhoneCss flex-col px-3" style={{ height: 'calc(100vh - 70px - 53.6px - 48px - 52px)', overflow: 'scroll' }}>
          <div className={`${Drawer ? 'w-[60%]' : 'w-[50%]'}  pt-3 cssChart`}>
            <Pie data={data} options={options} />
          </div>
          <div className="w-[100%] flex flex-col flex-1  scroll-smooth ">
            {dataChart?.map((item, index) => (
              <div key={index} className="flex items-center justify-center mb-2 cursor-pointer" onClick={() => onClick(item, backgroundColor_list[index])}>
                <p className="w-[100%] text-xs hover:font-medium" style={{ fontWeight: '450' }}>
                  {item[name]}
                </p>
                <div className="w-[100%]">
                  <RateBar numberShow={true} percentage={item[value]} color={backgroundColor_list[index]} title={item[name]} valueNum={item[valueNum]} />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className="h-[70vh] w-full flex items-center  justify-center">
            <img src={Nodata} alt="NoData" className="max-w-[300px]" />
          </div>
        </>
      )}
    </>
  )
}
export default DoughNut
