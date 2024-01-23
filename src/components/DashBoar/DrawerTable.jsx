/* eslint-disable no-undef */
/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Table, Typography, Form, Checkbox } from 'antd'
import '../util/Table/table.css'

import { useEffect, useState } from 'react'
import RateBar from '../util/Chart/LoadingChart'
const { Text } = Typography

const columnName = {
  DataName: 'Tên Hàng',
  DataDate: 'Thời Gian',
  DataValue: 'Tỷ Trọng',
  DataDescription: 'Thông Tin',
  DataValueQuantity: 'Số Lượng',
  DataValueAmount: 'Số Tiền',
}

function Tables({ hiden, loadingSearch, param, columName, setTotalNumber, colorTable, titleDr, segmented }) {
  const [data, setData] = useState()
  useEffect(() => {
    setData(param)
    const valueList = param?.map(function (item) {
      return item.DataValue
    })

    const totalPrice = valueList?.reduce(function (sum, price) {
      return sum + price
    }, 0)
    setTotalNumber(totalPrice)
  }, [param])

  const valueList = data?.map(function (item) {
    return item.DataValue
  })

  const totalPrice = valueList?.reduce(function (sum, price) {
    return sum + price
  }, 0)
  const DataColumns = data ? data[0] : []
  const keysOnly = Object.keys(DataColumns || []).filter((key) => key !== 'DataType' && key !== 'DataCode' && key !== 'DataGroup' && key !== 'DataOrder')

  const listColumns = keysOnly?.filter((value) => !hiden?.includes(value))
  const newColumns = listColumns.map((item) => {
    if (item === 'DataName') {
      return {
        title: columnName[item] || item,
        dataIndex: item,
      }
    }
    if (item === 'DataValue') {
      return {
        title: columnName[item] || item,
        width: 200,
        dataIndex: item,
        render: (text) =>
          titleDr === 'DOANHSO' ? (
            <RateBar percentage={((text / totalPrice) * 100).toFixed(2)} color={colorTable} />
          ) : (
            <div className={`${text < 0 ? 'text-red-500 ' : text === 0 ? 'text-transparent' : ''}  text-right text-base`}>
              {text?.toLocaleString('en-US', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
            </div>
          ),
      }
    }
    if (item === 'DataValueAmount') {
      return {
        title: columnName[item] || item,
        width: 200,
        dataIndex: item,
        render: (text) =>
          titleDr === 'DOANHSO' ? (
            <RateBar percentage={((text / totalPrice) * 100).toFixed(2)} color={colorTable} />
          ) : (
            <div className={`${text < 0 ? 'text-red-500 ' : text === 0 ? 'text-transparent' : ''}  text-right text-base`}>
              {text?.toLocaleString('en-US', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
            </div>
          ),
      }
    }
    return {
      title: columnName[item] || item,
      dataIndex: item,
      editable: true,
      align: 'center',
    }
  })
  const columnsThu_Chi = [
    {
      title: 'Đầu Kỳ',
      align: 'center',
      children: [
        {
          title: 'Tên',
          align: 'center',

          dataIndex: 'DataName',
          render: (text) =>
            titleDr === 'DOANHSO' ? (
              <RateBar percentage={((text / totalPrice) * 100).toFixed(2)} color={colorTable} />
            ) : (
              <div className={`${text < 0 ? 'text-red-500 ' : text === 0 ? 'text-transparent' : ''}  text-center`}>{text}</div>
            ),
          sorter: (a, b) => a.age - b.age,
        },
        {
          title: 'Ngày',
          align: 'center',

          dataIndex: 'DataDate',
          render: (text) =>
            titleDr === 'DOANHSO' ? (
              <RateBar percentage={((text / totalPrice) * 100).toFixed(2)} color={colorTable} />
            ) : (
              <div className={`${text < 0 ? 'text-red-500 ' : text === 0 ? 'text-transparent' : ''}  text-center`}>{text}</div>
            ),
          sorter: (a, b) => a.age - b.age,
        },
        {
          title: 'Tăng',
          align: 'center',

          dataIndex: 'DataValuePS',
          render: (text) =>
            titleDr === 'DOANHSO' ? (
              <RateBar percentage={((text / totalPrice) * 100).toFixed(2)} color={colorTable} />
            ) : (
              <div className={`${text < 0 ? 'text-red-500 ' : text === 0 ? 'text-transparent' : ''}  text-right `}>
                {text?.toLocaleString('en-US', {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </div>
            ),
          sorter: (a, b) => a.age - b.age,
        },
        {
          title: 'Giảm',
          align: 'center',

          dataIndex: 'DataValueTT',
          render: (text) =>
            titleDr === 'DOANHSO' ? (
              <RateBar percentage={((text / totalPrice) * 100).toFixed(2)} color={colorTable} />
            ) : (
              <div className={`${text < 0 ? 'text-red-500 ' : text === 0 ? 'text-transparent' : ''}  text-right `}>
                {text?.toLocaleString('en-US', {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </div>
            ),
          sorter: (a, b) => a.age - b.age,
        },
      ],
    },
    {
      title: 'Còn Lại',
      align: 'center',

      dataIndex: 'DataValue',
      render: (text) =>
        titleDr === 'DOANHSO' ? (
          <RateBar percentage={((text / totalPrice) * 100).toFixed(2)} color={colorTable} />
        ) : (
          <div className={`${text < 0 ? 'text-red-500 ' : text === 0 ? 'text-transparent' : ''}  text-right text-base`}>
            {text?.toLocaleString('en-US', {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </div>
        ),
    },
  ]
  const columns = segmented === 'BIEUDOTYTRONG' ? [...columnsThu_Chi] : [...newColumns]

  const [form] = Form.useForm()
  const rowClassName = (record) => {
    if (record.DataType === 0 && segmented === 'BIEUDOTYTRONG') {
      return 'hidden-row'
    } else if (record.DataType === -1 || record.DataType === 1 || record.DataType === 3) {
      return 'highlight-rowChart'
    } else if (record.DataValue < 0) {
      return 'highlight_value'
    } else {
      return ''
    }
  }
  return (
    <>
      <Form form={form} component={false}>
        <Table
          rowClassName={rowClassName}
          loading={param?.length !== 0 ? false : true}
          columns={columns}
          dataSource={data}
          bordered
          scroll={
            segmented === 'BIEUDOTYTRONG'
              ? {
                  x: 620,
                  y: 500,
                }
              : null
          }
          pagination={false}
          size="small"
          className={`color${colorTable?.slice(1)} DrawerTable setHeight`}
          summary={
            segmented === 'BIEUDOTYTRONG'
              ? () => {
                  if (!data || data.length === 0) {
                    return null
                  }
                  return (
                    <Table.Summary fixed>
                      <Table.Summary.Cell className="text-end font-bold bg-[#f1f1f1]">Tổng</Table.Summary.Cell>
                      <Table.Summary.Cell className="text-end font-bold bg-[#f1f1f1]"></Table.Summary.Cell>
                      <Table.Summary.Cell className="text-end font-bold bg-[#f1f1f1]">
                        {Number(data?.reduce((total, item) => total + item.DataValuePS, 0)).toLocaleString('en-US', {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        })}
                      </Table.Summary.Cell>
                      <Table.Summary.Cell className="text-end font-bold bg-[#f1f1f1]">
                        {Number(data?.reduce((total, item) => total + item.DataValueTT, 0)).toLocaleString('en-US', {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        })}
                      </Table.Summary.Cell>
                      <Table.Summary.Cell className="text-end font-bold bg-[#f1f1f1]">
                        {Number(data[data.length - 1]?.DataValue).toLocaleString('en-US', {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        })}
                      </Table.Summary.Cell>
                    </Table.Summary>
                  )
                }
              : null
          }
        />
      </Form>
    </>
  )
}

export default Tables
