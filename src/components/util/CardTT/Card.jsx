// eslint-disable-next-line react/prop-types
function Card({ resultArray, formatter, icon }) {
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

  return (
    <div
      className={`col-xxl-4 col-md-12 ${
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
                resultArray.map((item, itemIndex) => (
                  <p className="textArray" key={itemIndex}>
                    {item.DataName}:{' '}
                    <span className="text-success small  fw-bold">
                      {item.DataName === 'Số tiền' || item.DataName === 'Số Tiền'
                        ? // eslint-disable-next-line react/prop-types
                          formatter.format(item.DataValue)
                        : item.DataValue}
                    </span>
                  </p>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
