/* eslint-disable no-undef */
/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Table, Typography, Form, Checkbox, Spin } from 'antd'
import '../util/Table/table.css'
import Nodata from '../../assets/img/9264828.jpg'
import { useEffect, useState } from 'react'
import RateBar from '../util/Chart/LoadingChart'
const { Text } = Typography

function Tables({ loadingSearch, param, columName, setTotalNumber, colorTable, titleDr, segmented, title, onClick, typeTable, height }) {
  const [data, setData] = useState()
  // console.log(param, 'param')
  const columnName = {
    DataName: titleDr === 'TONKHO' ? 'Hàng hóa' : 'Tên ',
    DataDate: 'Thời gian',
    DataValue: titleDr === 'TONKHO' ? 'Số lượng' : 'Số tiền',
    DataValue_TyTrong: 'Tỷ trọng',
    DataDescription: 'Hàng hóa',
    DataValueQuantity: 'Số lượng',
    DataValueAmount: 'Số tiền',
    // DataValueIn:"Tăng",
    // DataValueOut:"",
    // DataValueBalance:""
  }
  const ThongSo = JSON.parse(localStorage.getItem('ThongSo'))

  useEffect(() => {
    setData(param)
    const valueList = param?.map(function (item) {
      return item.DataValue
    })
    const valueList_all = param?.map(function (item) {
      return item.DataType === 1 ? item.DataValue : null
    })

    const totalPrice = valueList?.reduce(function (sum, price) {
      return sum + price
    }, 0)
    const totalPrice_all = valueList_all?.reduce(function (sum, price) {
      return sum + price
    }, 0)
    setTotalNumber(title === 'all' ? totalPrice_all : totalPrice)
  }, [param])

  const valueList = data?.map(function (item) {
    return item.DataType === 1 ? item.DataValue : item.DataValue
  })
  const valueList_all = data?.map(function (item) {
    return item.DataType === 1 ? item.DataValue : null
  })
  const totalPrice = valueList?.reduce(function (sum, price) {
    return sum + price
  }, 0)
  const totalPrice_all = valueList_all?.reduce(function (sum, price) {
    return sum + price
  }, 0)
  const DataColumns = data ? data[0] : []
  const keysOnly = Object.keys(DataColumns || []).filter((key) => key !== 'DataType' && key !== 'DataCode' && key !== 'DataGroup' && key !== 'DataOrder')
  // const sharedOnCell = (_, index) => {
  //   if (index === 0) {
  //     return {
  //       colSpan: 0,
  //     }
  //   }
  //   return {}
  // }
  let countByDataGroup = {
    'SỐ ÂM': 0,
    'SỐ DƯƠNG': 0,
    'Kho Bà Rịa': 0,
    'Kho Nam Kỳ': 0,
    'Kho Nam Kỳ - (ÂM)': 0,
    'Kho Bà Rịa - (ÂM)': 0,
    'Kho Vũng Tàu': 0,
    'Kho Vũng Tàu - (ÂM)': 0,
  }

  titleDr === 'TONKHO'
    ? param?.forEach((record) => {
        switch (record.DataGroup) {
          case 'SỐ ÂM':
          case 'SỐ DƯƠNG':
          case 'Kho Bà Rịa':
          case 'Kho Bà Rịa - (ÂM)':
          case 'Kho Nam Kỳ - (ÂM)':
          case 'Kho Nam Kỳ':
          case 'Kho Vũng Tàu':
          case 'Kho Vũng Tàu - (ÂM)':
            countByDataGroup[record.DataGroup] += 1
            break
          default:
            break
        }
      })
    : null
  const hiden =
    titleDr === 'TONKHO'
      ? ['DataValue_TyTrong']
      : titleDr === 'MUAHANG' ||
          titleDr === 'BANHANG' ||
          titleDr === 'NHAPTRA' ||
          titleDr === 'XUATTRA' ||
          titleDr === 'PHAITHU' ||
          titleDr === 'PHAITRA' ||
          titleDr === 'THU' ||
          titleDr === 'CHI'
        ? ['DataValue_TyTrong']
        : ['DataName']
  keysOnly.push('DataValue_TyTrong')
  const listColumns = keysOnly?.filter((value) => !hiden?.includes(value))
  const newColumns = listColumns.map((item) => {
    if (item === 'DataDate') {
      return {
        title: columnName[item] || item,
        dataIndex: item,
        // width: 200,

        align: 'center',

        onCell: (record, index) => ({
          colSpan: record.DataType === -1 ? 3 : 1,
        }),
        render: (text, record) => {
          // Change the parameters of render function
          if (record.DataType === 0) {
            return record.DataDate
          } else if (record.DataType === 1) {
            return <>Tổng:</>
          } else if (record.DataType === -1) {
            return <div>{record.DataName}</div>
          }
        },
        showSorterTooltip: false,
        sorter: (a, b) => {
          if (a.DataType === -1 || b.DataType === -1 || a.DataCode !== b.DataCode) {
            return 0
          } else {
            const dateA = new Date(parseInt(a.DataDate.split('/')[2]), parseInt(a.DataDate.split('/')[1]) - 1, parseInt(a.DataDate.split('/')[0]))
            const dateB = new Date(parseInt(b.DataDate.split('/')[2]), parseInt(b.DataDate.split('/')[1]) - 1, parseInt(b.DataDate.split('/')[0]))

            return dateA.getTime() - dateB.getTime()
          }
        },
      }
    }
    if (item === 'DataName') {
      return {
        title: columnName[item] || item,
        dataIndex: item,
        align: 'center',
        render: (text) => {
          return <div className={` ${segmented === 'DANHSACHKHACHHANG' ? ' underline cursor-pointer' : ''} text-left`}>{text}</div>
        },
        showSorterTooltip: false,
        sorter: (a, b) => {
          if (a.DataType === 1 || b.DataType === 1 || a.DataGroup !== b.DataGroup) {
            return 0
          } else {
            const valueA = typeof a[item] === 'string' ? a[item] : ''
            const valueB = typeof b[item] === 'string' ? b[item] : ''
            return valueA.localeCompare(valueB)
          }
        },
      }
    }
    if (item === 'DataDescription') {
      return {
        title: columnName[item] || item,
        dataIndex: item,
        align: 'center',
        render: (text) => {
          return <div className=" text-left">{text}</div>
        },
        showSorterTooltip: false,
        sorter: (a, b) => {
          if (a.DataType === 1 || b.DataType === 1 || a.DataGroup !== b.DataGroup) {
            return 0
          } else {
            const valueA = typeof a[item] === 'string' ? a[item] : ''
            const valueB = typeof b[item] === 'string' ? b[item] : ''
            return valueA.localeCompare(valueB)
          }
        },
      }
    }
    if (item === 'DataValue_TyTrong') {
      return {
        title: columnName[item] || item,
        // width: 200,
        dataIndex: 'DataValue',
        align: 'center',
        onCell: (record, index) => ({
          colSpan: record.DataType === -1 ? 0 : 1,
        }),

        // onCell: sharedOnCell,
        render: (text, record) =>
          titleDr === 'DOANHSO' ? (
            <RateBar percentage={(text / (title === 'all' ? totalPrice_all : totalPrice)) * 100} color={colorTable} />
          ) : (
            <div className={`${text < 0 ? 'text-red-500 ' : text === 0 ? 'text-transparent' : ''}  text-right `}>
              {text?.toLocaleString('en-US', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
            </div>
          ),
      }
    }
    if (item === 'DataValueQuantity') {
      return {
        title: columnName[item] || item,
        // width: 200,
        dataIndex: item,
        align: 'center',
        onCell: (record, index) => ({
          colSpan: record.DataType === -1 ? 0 : 1,
        }),
        showSorterTooltip: false,
        sorter: (a, b) => {
          if (a.DataType === 1 || b.DataType === 1 || a.DataGroup !== b.DataGroup) {
            return 0
          } else {
            return a[item] - b[item]
          }
        },
        // onCell: sharedOnCell,
        render: (text, record) =>
          titleDr === 'DOANHSO' ? (
            <RateBar percentage={(text / (title === 'all' ? totalPrice_all : totalPrice)) * 100} color={colorTable} />
          ) : (
            <div className={`${text < 0 ? 'text-red-500 ' : text === 0 ? 'text-transparent' : ''}  text-right `}>
              {text?.toLocaleString('en-US', {
                minimumFractionDigits: ThongSo.SOLESOLUONG,
                maximumFractionDigits: ThongSo.SOLESOLUONG,
              })}
            </div>
          ),
      }
    }
    if (item === 'DataValue') {
      return {
        title: columnName[item] || item,
        // width: 200,
        dataIndex: item,
        align: 'center',
        onCell: (record, index) => ({
          colSpan: record.DataType === -1 ? 0 : 1,
        }),
        showSorterTooltip: false,
        sorter: (a, b) => {
          if (titleDr === 'DOANHSO') {
            if (a.DataType === -1 || b.DataType === -1 || a.DataType === 1 || b.DataType === 1 || a.DataName !== b.DataName) {
              return 0
            } else {
              return a[item] - b[item]
            }
          } else if (titleDr === 'TONKHO' || titleDr === 'PHAITHU' || titleDr === 'PHAITRA') {
            if (a.DataType === 1 || b.DataType === 1 || a.DataGroup !== b.DataGroup) {
              return 0
            } else {
              return a[item] - b[item]
            }
          }
        },

        // onCell: sharedOnCell,
        render: (text, record) =>
          titleDr === 'DOANHSO' ? (
            <div className={`${text < 0 ? 'text-red-500 ' : text === 0 ? 'text-transparent' : ''}  text-right  `}>
              {text?.toLocaleString('en-US', {
                minimumFractionDigits: ThongSo.SOLESOTIEN,
                maximumFractionDigits: ThongSo.SOLESOTIEN,
              })}
            </div>
          ) : record.DataType === 1 && titleDr === 'TONKHO' ? (
            <div className="text-right">
              {Object.keys(countByDataGroup).map(
                (dataGroup, index) =>
                  // Only render the count if the dataGroup matches the record.DataName
                  record.DataName === dataGroup && <span key={index}>{countByDataGroup[dataGroup]}</span>,
              )}
              (Sản phẩm)
            </div>
          ) : (
            <div className={`${text < 0 ? 'text-red-500 ' : text === 0 ? 'text-transparent' : ''}  text-right `}>
              {text?.toLocaleString('en-US', {
                minimumFractionDigits: ThongSo.SOLESOLUONG,
                maximumFractionDigits: ThongSo.SOLESOLUONG,
              })}
            </div>
          ),
      }
    }
    if (item === 'DataValueAmount') {
      return {
        title: columnName[item] || item,
        showSorterTooltip: false,
        // width: 200,
        dataIndex: item,
        align: 'center',
        onCell: (record, index) => ({
          colSpan: record.DataType === -1 ? 0 : 1,
        }),
        sorter: (a, b) => {
          if (a.DataType === 1 || b.DataType === 1 || a.DataGroup !== b.DataGroup) {
            return 0
          } else {
            return a[item] - b[item]
          }
        },

        // onCell: sharedOnCell,
        render: (text, record) =>
          titleDr === 'DOANHSO' ? (
            <div className={`${text < 0 ? 'text-red-500 ' : text === 0 ? 'text-transparent' : ''}   text-right `}>
              {text?.toLocaleString('en-US', {
                minimumFractionDigits: ThongSo.SOLESOTIEN,
                maximumFractionDigits: ThongSo.SOLESOTIEN,
              })}
            </div>
          ) : record.DataType === 1 && titleDr === 'TONKHO' ? (
            <div className="text-right">
              {Object.keys(countByDataGroup).map(
                (dataGroup, index) =>
                  // Only render the count if the dataGroup matches the record.DataName
                  record.DataName === dataGroup && <span key={index}>{countByDataGroup[dataGroup]}</span>,
              )}
              (Sản phẩm)
            </div>
          ) : (
            <div className={`${text < 0 ? 'text-red-500 ' : text === 0 ? 'text-transparent' : ''}  text-right `}>
              {text?.toLocaleString('en-US', {
                minimumFractionDigits: ThongSo.SOLESOTIEN,
                maximumFractionDigits: ThongSo.SOLESOTIEN,
              })}
            </div>
          ),
      }
    }
    // if (item === 'DataValueAmount') {
    //   return {
    //     title: columnName[item] || item,
    //     // width: 200,
    //     dataIndex: item,
    //     align: 'center',
    //     onCell: (record, index) => ({
    //       colSpan: record.DataType === -1 ? 0 : 1,
    //     }),
    //     render: (text) =>
    //       titleDr === 'DOANHSO' ? (
    //         <div className={`${text < 0 ? 'text-red-500 ' : text === 0 ? 'text-transparent' : ''}  text-right text-base`}>
    //           {text?.toLocaleString('en-US', {
    //             minimumFractionDigits: ThongSo.SOLESOTIEN,
    //             maximumFractionDigits: ThongSo.SOLESOTIEN,
    //           })}
    //         </div>
    //       ) : (
    //         <div className={`${text < 0 ? 'text-red-500 ' : text === 0 ? 'text-transparent' : ''}  text-right text-base`}>
    //           {text?.toLocaleString('en-US', {
    //             minimumFractionDigits: ThongSo.SOLESOTIEN,
    //             maximumFractionDigits: ThongSo.SOLESOTIEN,
    //           })}
    //         </div>
    //       ),
    //   }
    // }
    return {
      title: columnName[item] || item,
      dataIndex: item,
      showSorterTooltip: false,
      align: 'center',
      onCell: (record, index) => ({
        colSpan: record.DataType === -1 ? 0 : 1,
      }),
      render: (text) => {
        return <div className=" text-right">{text}</div>
      },
    }
  })

  const columnsThu_Chi = [
    {
      title: 'Ngày',
      align: 'center',
      onCell: (record, index) => ({
        colSpan: record.DataType === 1 || record.DataType === 3 || record.DataType === 0 ? 3 : 1,
      }),
      showSorterTooltip: false,
      render: (text, record) => {
        // Change the parameters of render function
        if (record.DataType === 0 && record.DataCode !== '-') {
          return record.DataDate
        } else if (record.DataType === 0 && record.DataCode === '-') {
          return 'Đầu kỳ'
        } else if (record.DataType === 1 || record.DataType === 3) {
          return <>{record.DataName}</>
        } else if (record.DataType === 2) {
          return <div>{record.DataDate}</div>
        } else if (record.DataCode === '-') {
          return record.DataNam
        }
      },

      dataIndex: 'DataDate',
      // render: (text) =>
      //   titleDr === 'DOANHSO' ? (
      //     <RateBar percentage={((text / (title === 'all' ? totalPrice_all : totalPrice)) * 100).toFixed(2)} color={colorTable} />
      //   ) : (
      //     <div className={`${text < 0 ? 'text-red-500 ' : text === 0 ? 'text-transparent' : ''}  text-center`}>{text}</div>
      //   ),
      sorter: (a, b) => {
        if (
          a.DataType === 1 ||
          b.DataType === 1 ||
          a.DataCode !== b.DataCode ||
          a.DataType === 0 ||
          b.DataType === 0 ||
          a.DataType === 3 ||
          b.DataType === 3 ||
          a.DataType === 4 ||
          b.DataType === 4
        ) {
          return 0
        } else {
          const dateA = new Date(parseInt(a.DataDate.split('/')[2]), parseInt(a.DataDate.split('/')[1]) - 1, parseInt(a.DataDate.split('/')[0]))
          const dateB = new Date(parseInt(b.DataDate.split('/')[2]), parseInt(b.DataDate.split('/')[1]) - 1, parseInt(b.DataDate.split('/')[0]))

          return dateA.getTime() - dateB.getTime()
        }
      },
    },
    {
      title: 'Tăng',
      align: 'center',
      onCell: (record, index) => ({
        colSpan: record.DataType === 1 || record.DataType === 3 || record.DataType === 0 ? 0 : 1,
      }),
      showSorterTooltip: false,

      dataIndex: 'DataValuePS',
      render: (text) =>
        titleDr === 'DOANHSO' ? (
          <RateBar percentage={((text / (title === 'all' ? totalPrice_all : totalPrice)) * 100).toFixed(2)} color={colorTable} />
        ) : (
          <div className={`${text < 0 ? 'text-red-500 ' : text === 0 ? 'text-transparent' : ''}  text-right `}>
            {text?.toLocaleString('en-US', {
              minimumFractionDigits: ThongSo.SOLESOTIEN,
              maximumFractionDigits: ThongSo.SOLESOTIEN,
            })}
          </div>
        ),
      sorter: (a, b) => {
        if (
          a.DataType === 1 ||
          b.DataType === 1 ||
          a.DataCode !== b.DataCode ||
          a.DataType === 0 ||
          b.DataType === 0 ||
          a.DataType === 3 ||
          b.DataType === 3 ||
          a.DataType === 4 ||
          b.DataType === 4
        ) {
          return 0
        } else {
          return a.DataValuePS - b.DataValuePS
        }
      },
    },
    {
      title: 'Giảm',
      align: 'center',
      dataIndex: 'DataValueTT',
      onCell: (record, index) => ({
        colSpan: record.DataType === 1 || record.DataType === 3 || record.DataType === 0 ? 0 : 1,
      }),
      showSorterTooltip: false,

      render: (text, record) =>
        titleDr === 'DOANHSO' ? (
          <RateBar percentage={((text / (title === 'all' ? totalPrice_all : totalPrice)) * 100).toFixed(2)} color={colorTable} />
        ) : record.DataType === 4 ? null : (
          <div className={`${text < 0 ? 'text-red-500 ' : text === 0 ? 'text-transparent' : ''}  text-right `}>
            {text?.toLocaleString('en-US', {
              minimumFractionDigits: ThongSo.SOLESOTIEN,
              maximumFractionDigits: ThongSo.SOLESOTIEN,
            })}
          </div>
        ),
      sorter: (a, b) => {
        if (
          a.DataType === 1 ||
          b.DataType === 1 ||
          a.DataCode !== b.DataCode ||
          a.DataType === 0 ||
          b.DataType === 0 ||
          a.DataType === 3 ||
          b.DataType === 3 ||
          a.DataType === 4 ||
          b.DataType === 4
        ) {
          return 0
        } else {
          return a.DataValueTT - b.DataValueTT
        }
      },
    },

    {
      title: 'Còn Lại',
      align: 'center',
      showSorterTooltip: false,

      dataIndex: 'DataValue',
      render: (text, record) =>
        titleDr === 'DOANHSO' ? (
          <div className={`${text < 0 ? 'text-red-500 ' : text === 0 ? 'text-transparent' : ''}  text-right `}>
            {text?.toLocaleString('en-US', {
              minimumFractionDigits: ThongSo.SOLESOTIEN,
              maximumFractionDigits: ThongSo.SOLESOTIEN,
            })}
          </div>
        ) : record.DataType === 4 ? (
          <></>
        ) : (
          <div className={`${text < 0 ? 'text-red-500 ' : text === 0 ? 'text-transparent' : ''}  text-right `}>
            {text?.toLocaleString('en-US', {
              minimumFractionDigits: ThongSo.SOLESOTIEN,
              maximumFractionDigits: ThongSo.SOLESOTIEN,
            })}
          </div>
        ),
      sorter: (a, b) => {
        if (
          a.DataType === 1 ||
          b.DataType === 1 ||
          a.DataCode !== b.DataCode ||
          a.DataType === 0 ||
          b.DataType === 0 ||
          a.DataType === 3 ||
          b.DataType === 3 ||
          a.DataType === 4 ||
          b.DataType === 4
        ) {
          return 0
        } else {
          return a.DataValue - b.DataValue
        }
      },
    },
  ]
  const columnsQUYTIENMAT = [
    {
      title: 'Diễn giải',
      align: 'center',
      onCell: (record, index) => ({
        colSpan: record.DataType === 1 ? 3 : 1,
      }),
      showSorterTooltip: false,
      render: (text, record) => {
        // Change the parameters of render function
        if (record.DataType === 4) {
          return null
        } else {
          return text
        }
      },

      dataIndex: 'DataName',
      // render: (text) =>
      //   titleDr === 'DOANHSO' ? (
      //     <RateBar percentage={((text / (title === 'all' ? totalPrice_all : totalPrice)) * 100).toFixed(2)} color={colorTable} />
      //   ) : (
      //     <div className={`${text < 0 ? 'text-red-500 ' : text === 0 ? 'text-transparent' : ''}  text-center`}>{text}</div>
      //   ),
      sorter: (a, b) => {
        if (
          a.DataType === 1 ||
          b.DataType === 1 ||
          a.DataCode !== b.DataCode ||
          a.DataType === 0 ||
          b.DataType === 0 ||
          a.DataType === 3 ||
          b.DataType === 3 ||
          a.DataType === 4 ||
          b.DataType === 4
        ) {
          return 0
        } else {
          const dateA = new Date(parseInt(a.DataDate.split('/')[2]), parseInt(a.DataDate.split('/')[1]) - 1, parseInt(a.DataDate.split('/')[0]))
          const dateB = new Date(parseInt(b.DataDate.split('/')[2]), parseInt(b.DataDate.split('/')[1]) - 1, parseInt(b.DataDate.split('/')[0]))

          return dateA.getTime() - dateB.getTime()
        }
      },
    },
    {
      title: 'Tăng',
      align: 'center',
      onCell: (record, index) => ({
        colSpan: record.DataType === 1 ? 0 : 1,
      }),
      showSorterTooltip: false,

      dataIndex: 'DataValueIn',
      render: (text, record) => {
        if (record.DataType === 4) {
          return null
        } else {
          titleDr === 'DOANHSO' ? (
            <RateBar percentage={((text / (title === 'all' ? totalPrice_all : totalPrice)) * 100).toFixed(2)} color={colorTable} />
          ) : (
            <div className={`${text < 0 ? 'text-red-500 ' : text === 0 ? 'text-transparent' : ''}  text-right `}>
              {text?.toLocaleString('en-US', {
                minimumFractionDigits: ThongSo.SOLESOTIEN,
                maximumFractionDigits: ThongSo.SOLESOTIEN,
              })}
            </div>
          )
        }
      },

      sorter: (a, b) => {
        if (
          a.DataType === 1 ||
          b.DataType === 1 ||
          a.DataCode !== b.DataCode ||
          a.DataType === 0 ||
          b.DataType === 0 ||
          a.DataType === 3 ||
          b.DataType === 3 ||
          a.DataType === 4 ||
          b.DataType === 4
        ) {
          return 0
        } else {
          return a.DataValuePS - b.DataValuePS
        }
      },
    },
    {
      title: 'Giảm',
      align: 'center',
      dataIndex: 'DataValueOut',
      onCell: (record, index) => ({
        colSpan: record.DataType === 1 ? 0 : 1,
      }),
      showSorterTooltip: false,

      render: (text, record) =>
        titleDr === 'DOANHSO' ? (
          <RateBar percentage={((text / (title === 'all' ? totalPrice_all : totalPrice)) * 100).toFixed(2)} color={colorTable} />
        ) : record.DataType === 4 ? null : (
          <div className={`${text < 0 ? 'text-red-500 ' : text === 0 ? 'text-transparent' : ''}  text-right `}>
            {text?.toLocaleString('en-US', {
              minimumFractionDigits: ThongSo.SOLESOTIEN,
              maximumFractionDigits: ThongSo.SOLESOTIEN,
            })}
          </div>
        ),
      sorter: (a, b) => {
        if (
          a.DataType === 1 ||
          b.DataType === 1 ||
          a.DataCode !== b.DataCode ||
          a.DataType === 0 ||
          b.DataType === 0 ||
          a.DataType === 3 ||
          b.DataType === 3 ||
          a.DataType === 4 ||
          b.DataType === 4
        ) {
          return 0
        } else {
          return a.DataValueTT - b.DataValueTT
        }
      },
    },

    {
      title: 'Còn Lại',
      align: 'center',
      showSorterTooltip: false,

      dataIndex: 'DataValueBalance',
      render: (text, record) =>
        titleDr === 'DOANHSO' ? (
          <div className={`${text < 0 ? 'text-red-500 ' : text === 0 ? 'text-transparent' : ''}  text-right `}>
            {text?.toLocaleString('en-US', {
              minimumFractionDigits: ThongSo.SOLESOTIEN,
              maximumFractionDigits: ThongSo.SOLESOTIEN,
            })}
          </div>
        ) : record.DataType === 4 ? (
          <></>
        ) : (
          <div className={`${text < 0 ? 'text-red-500 ' : text === 0 ? 'text-transparent' : ''}  text-right `}>
            {text?.toLocaleString('en-US', {
              minimumFractionDigits: ThongSo.SOLESOTIEN,
              maximumFractionDigits: ThongSo.SOLESOTIEN,
            })}
          </div>
        ),
      sorter: (a, b) => {
        if (
          a.DataType === 1 ||
          b.DataType === 1 ||
          a.DataCode !== b.DataCode ||
          a.DataType === 0 ||
          b.DataType === 0 ||
          a.DataType === 3 ||
          b.DataType === 3 ||
          a.DataType === 4 ||
          b.DataType === 4
        ) {
          return 0
        } else {
          return a.DataValue - b.DataValue
        }
      },
    },
  ]
  const columns = segmented === 'BIEUDOTYTRONG' || typeTable === 1 ? [...columnsThu_Chi] : segmented === 'QUYTIENMAT' ? [...columnsQUYTIENMAT] : [...newColumns]

  const [form] = Form.useForm()
  const rowClassName = (record) => {
    if (record.DataType === 0 && (segmented === 'BIEUDOTYTRONG' || typeTable === 1)) {
      return 'highlight-rowChart stickyTable'
    } else if (segmented === 'QUYTIENMAT' && record.DataType === 1) {
      return 'stickyTable highlight-rowChart'
    } else if (segmented !== 'QUYTIENMAT' ? record.DataType === -1 || record.DataType === 1 || record.DataType === 3 : record.DataType === 1) {
      return 'highlight-rowChart'
    } else if (record.DataValue < 0) {
      return 'highlight_value '
    } else {
      return ''
    }
  }
  return (
    <>
      {data && data?.length !== 0 ? (
        <Form form={form} component={false}>
          <Table
            rowClassName={rowClassName}
            loading={param?.length !== 0 ? false : true}
            // spin={{ tip: 'Custom Loading Text' }}

            columns={columns}
            dataSource={data}
            bordered
            scroll={
              segmented === 'BIEUDOTYTRONG' || typeTable === 1 || segmented === 'QUYTIENMAT'
                ? {
                    x: 120,
                    y: 500,
                  }
                : {
                    x: 0,
                    y: 500,
                  }
            }
            onRow={(record) => ({
              onClick: () => onClick(record),
            })}
            pagination={false}
            size="small"
            className={`color${colorTable?.slice(1)} DrawerTable setHeight ${height}`}
            summary={
              segmented === 'TONKHO' || segmented === 'BIEUDOTYTRONG' || segmented === 'QUYTIENMAT' || typeTable === 1
                ? () => {
                    if (!data || data.length === 0) {
                      return null
                    }
                    return (
                      <Table.Summary fixed>
                        <Table.Summary.Cell className="text-center font-bold bg-[#f1f1f1] ">Tổng</Table.Summary.Cell>
                        {/* {segmented === 'BIEUDOTYTRONG' ? <Table.Summary.Cell className="text-end font-bold bg-[#f1f1f1]"></Table.Summary.Cell> : null} */}
                        <Table.Summary.Cell className="text-end font-bold bg-[#f1f1f1] ">
                          {Number(
                            data?.reduce((total, item) => total + (segmented === 'QUYTIENMAT' ? item.DataValueIn : item.DataValuePS), 0) / (segmented === 'QUYTIENMAT' ? 2 : 1),
                          ).toLocaleString('en-US', {
                            minimumFractionDigits: ThongSo.SOLESOTIEN,
                            maximumFractionDigits: ThongSo.SOLESOTIEN,
                          })}
                        </Table.Summary.Cell>
                        <Table.Summary.Cell className="text-end font-bold bg-[#f1f1f1] ">
                          {Number(
                            data?.reduce((total, item) => total + (segmented === 'QUYTIENMAT' ? item.DataValueOut : item.DataValueTT), 0) / (segmented === 'QUYTIENMAT' ? 2 : 1),
                          ).toLocaleString('en-US', {
                            minimumFractionDigits: ThongSo.SOLESOTIEN,
                            maximumFractionDigits: ThongSo.SOLESOTIEN,
                          })}
                        </Table.Summary.Cell>
                        <Table.Summary.Cell className="text-end font-bold bg-[#f1f1f1] ">
                          {segmented !== 'QUYTIENMAT'
                            ? Number(data[data.length - 1]?.DataValue).toLocaleString('en-US', {
                                minimumFractionDigits: ThongSo.SOLESOTIEN,
                                maximumFractionDigits: ThongSo.SOLESOTIEN,
                              })
                            : Number(data[data.length - 1]?.DataValueBalance).toLocaleString('en-US', {
                                minimumFractionDigits: ThongSo.SOLESOTIEN,
                                maximumFractionDigits: ThongSo.SOLESOTIEN,
                              })}
                        </Table.Summary.Cell>
                      </Table.Summary>
                    )
                  }
                : null
            }
          />
        </Form>
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

export default Tables
