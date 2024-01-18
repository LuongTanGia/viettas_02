/* eslint-disable no-undef */
/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Table, Typography, Form, Checkbox } from 'antd'
import '../util/Table/table.css'

import { useEffect, useState } from 'react'
import RateBar from '../util/Chart/LoadingChart'

const columnName = {
  DataName: 'Tên Hàng',
  DataDate: 'Thời Gian',
  DataValue: 'Tỷ Trọng',
}

function Tables({ hiden, loadingSearch, param, columName, setTotalNumber, colorTable }) {
  const [data, setData] = useState()
  useEffect(() => {
    console.log(1)
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
  const keysOnly = Object.keys(DataColumns || []).filter((key) => key !== 'DataType' && key !== 'DataCode')

  const listColumns = keysOnly?.filter((value) => !hiden?.includes(value))
  const newColumns = listColumns.map((item) => {
    if (item === 'DataName') {
      return {
        title: columnName[item] || item,

        dataIndex: item,
        // sorter: (a, b) => {
        //   return a[item]?.toString().localeCompare(b[item]?.toString()) || 0
        // },
      }
    }
    if (item === 'DataValue') {
      return {
        title: columnName[item] || item,
        width: 200,
        dataIndex: item,
        render: (text) => <RateBar percentage={((text / totalPrice) * 100).toFixed(2)} color={colorTable} />,
      }
    }
    return {
      title: columnName[item] || item,
      dataIndex: item,
      editable: true,
      align: '',
      // sorter: (a, b) => {
      //   return a[item]?.toString().localeCompare(b[item]?.toString()) || 0
      // },
    }
  })

  const columns = [...newColumns]

  const [form] = Form.useForm()

  return (
    <>
      <Form form={form} component={false}>
        <Table
          loading={loadingSearch}
          columns={columns}
          dataSource={data}
          bordered
          scroll={{
            x: 520,
          }}
          pagination={false}
          size="small"
          className={`color${colorTable.slice(1)} DrawerTable`}
        />
      </Form>
    </>
  )
}

export default Tables
