/* eslint-disable react/prop-types */
import { Skeleton } from 'antd'
// eslint-disable-next-line react/prop-types
import { AiOutlineRise } from 'react-icons/ai'
import { AiOutlineFall } from 'react-icons/ai'
function Card({ resultArray, icon, loading, resultArray_DF, useThongke }) {
  // console.log(useThongke)
  var filteredArray = resultArray_DF?.filter(function (item) {
    return item.DataName === 'Số tiền' || item.DataName === 'Số Tiền'
  })
  const data_DF = filteredArray ? filteredArray[0] : []
  const iconMapping = {
    DOANHSO: 'bi bi-bar-chart-line-fill blue',
    TONKHO: 'fa-solid fa-cart-flatbed blue',
    PHAITHU: 'fa-solid fa-hand-holding-dollar blue',
    PHAITRA: 'fa-solid fa-file-invoice blue',
    MUAHANG: 'fa-solid fa-cart-plus blue',
    XUATTRA: 'fa-solid fa-cart-arrow-down red',
    BANHANG: 'fa-solid fa-cart-shopping blue',
    NHAPTRA: 'fa-solid fa-cart-shopping red',
    THU: 'fa-solid fa-dollar-sign blue',
    CHI: 'fa-solid fa-dollar-sign red',
  }

  const nameMapping = {
    DOANHSO: 'Doanh Số',
    TONKHO: 'Tồn Kho',
    PHAITHU: 'Phải Thu',
    PHAITRA: 'Phải Trả',
    MUAHANG: 'Mua Hàng',
    XUATTRA: 'Xuất Trả Nhà Cung Cấp',
    BANHANG: 'Bán Hàng',
    NHAPTRA: 'Hàng Bán Trở Lại',
    THU: 'Thu Tiền',
    CHI: 'Chi Tiền',
  }
  // resultArray_DF.map(())
  const ThongSo = JSON.parse(localStorage.getItem('ThongSo'))
  return (
    <div
      className={`col-xxl-4 col-md-12  ${
        // eslint-disable-next-line react/prop-types
        resultArray[0]?.DataCode.split('_')[0]
      }`}
    >
      <div className="card info-card sales-card">
        <div className="card-body min-h-[110px]">
          <h5 className="card-title">
            {
              // eslint-disable-next-line react/prop-types
              nameMapping[resultArray[0]?.DataCode.split('_')[0]]
            }
            <i className={iconMapping[icon] || 'fa-solid fa-link'}></i>
          </h5>

          <div className="d-flex align-items-center">
            <div className="ps-1">
              {
                // eslint-disable-next-line react/prop-types
                resultArray.map((item, itemIndex) =>
                  !loading ? (
                    <p className="textArray" key={itemIndex}>
                      {item.DataName}:{' '}
                      <span className="text-success small  fw-bold">
                        {item.DataName === 'Số tiền' || item.DataName === 'Số Tiền'
                          ? // eslint-disable-next-line react/prop-types
                            Number(item.DataValue).toLocaleString('en-US', {
                              minimumFractionDigits: ThongSo.SOLESOTIEN,
                              maximumFractionDigits: ThongSo.SOLESOTIEN,
                            })
                          : Number(item.DataValue).toLocaleString('en-US', {
                              minimumFractionDigits: ThongSo.SOLESOLUONG,
                              maximumFractionDigits: ThongSo.SOLESOLUONG,
                            })}
                      </span>
                    </p>
                  ) : (
                    <>
                      <Skeleton.Input active size={'small'} block={true} />
                    </>
                  ),
                )
              }
            </div>
            {useThongke === 'true' ? (
              <div className="ps-1">
                {
                  // eslint-disable-next-line react/prop-types
                  resultArray.map((item, itemIndex) =>
                    !loading ? (
                      <p className="" key={itemIndex}>
                        {useThongke === 'true' && (item.DataName === 'Số tiền' || item.DataName === 'Số Tiền') ? (
                          <>
                            <p
                              className={
                                Number(((item.DataValue - data_DF?.DataValue) / data_DF?.DataValue) * 100).toLocaleString('en-US', {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                }) >= 0
                                  ? 'text-sm text-green-500 flex justify-center items-center fw-bold'
                                  : 'text-sm text-red-500 flex justify-center items-center fw-bold'
                              }
                            >
                              {Number(((item.DataValue - data_DF?.DataValue) / data_DF?.DataValue) * 100).toLocaleString('en-US', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              }) >= 0 ? (
                                <p className="text-sm text-green-500 flex justify-center items-center">
                                  <AiOutlineRise size={20} />
                                </p>
                              ) : (
                                <p className="text-sm text-red-500 flex justify-center items-center rotate-90">
                                  <AiOutlineFall size={20} />
                                </p>
                              )}
                              {item.DataName === 'Số tiền' || (item.DataName === 'Số Tiền' && useThongke === 'true')
                                ? // eslint-disable-next-line react/prop-types
                                  Number(((item.DataValue - data_DF?.DataValue) / data_DF?.DataValue) * 100 || 0).toLocaleString('en-US', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  })
                                : Number(((item.DataValue - data_DF?.DataValue) / data_DF?.DataValue) * 100 || 0).toLocaleString('en-US', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  })}
                              %
                            </p>
                          </>
                        ) : null}
                      </p>
                    ) : (
                      <>
                        <Skeleton.Input active size={'small'} block={true} />
                      </>
                    ),
                  )
                }
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
