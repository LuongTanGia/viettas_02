/* eslint-disable no-undef */
/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Table, Typography, Form, Checkbox } from 'antd'
import '../util/Table/table.css'

import { useEffect, useState } from 'react'

function Tables({ hiden, loadingSearch, param, columName, height }) {
  const [data, setData] = useState()
  useEffect(() => {
    setData(param)
  }, [param])
  const DataColumns = data ? data[0] : []
  const keysOnly = Object.keys(DataColumns || []).filter((key) => key !== 'MaSoThue')

  const listColumns = keysOnly?.filter((value) => !hiden?.includes(value))
  const newColumns = listColumns.map((item) => {
    return {
      title: columName[item] || item,
      width: 100,
      dataIndex: item,
      editable: true,
      align: 'center',
      sorter: (a, b) => {
        const keywords = ['Tong', 'Gia', 'Tien', 'TLCK', 'So', 'Thue']
        const includesKeyword = keywords.some((keyword) => item.includes(keyword))
        if (includesKeyword && a[item] !== undefined && b[item] !== undefined) {
          return Number(a[item]) - Number(b[item])
        } else if (includesKeyword && a[item] !== undefined) {
          return -1
        } else if (includesKeyword && b[item] !== undefined) {
          return 1
        } else {
          return a[item]?.toString().localeCompare(b[item]?.toString()) || 0
        }
      },
      showSorterTooltip: false,
      render: (text, record) => {
        if (item === 'TTTienMat' || item === 'LapRap' || item === 'TonKho') {
          return (
            <div style={{ textAlign: 'center', width: '100%' }}>
              <Checkbox checked={text} onChange={(e) => handleCheckboxChange(e.target.checked, record)} />
            </div>
          )
        }

        return <div>{text}</div>
      },
    }
  })

  const columns = [...newColumns]

  const [form] = Form.useForm()

  return (
    <>
      <Form form={form} component={false}>
        <Table
          loading={loadingSearch}
          className={height}
          columns={columns}
          dataSource={data}
          bordered
          scroll={{
            y: 300,
            x: 200,
          }}
          scrollToFirstRowOnChange
          size="small"
        />
      </Form>
    </>
  )
}

export default Tables
