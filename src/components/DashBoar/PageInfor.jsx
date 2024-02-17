/* eslint-disable no-unused-vars */
import { Flex, Typography, Watermark } from 'antd'
import { useState } from 'react'
import { Link } from 'react-router-dom'
const { Paragraph } = Typography
const { Title } = Typography
const App = () => {
  console.log('aaaaaa')
  return (
    <div className="w-full  flex flex-col justify-center  items-center relative mt-[40px]">
      <img
        style={{
          // zIndex: 10,
          width: '80%',
          maxWidth: 400,
          position: 'relative',
          maxHeight: 200,
        }}
        src="https://www.viettassaigon.vn/uploads/bluelogo_viettas.svg"
        alt="img"
      />
      <Title className="text-white  relative mt-2 text-center" level={4}>
        Công ty Cổ phần Giải pháp Thương mại Việt Nam Sài Gòn
      </Title>
      <Paragraph className="text-white  relative">
        <Paragraph copyable className="text-white  relative">
          Địa chỉ: 351/9 Nơ Trang Long, P.13, Q. Bình Thạnh, TP. Hồ Chí Minh
        </Paragraph>
        <Paragraph className="text-white  relative">MST: 0312055283</Paragraph>
        <Paragraph className="text-white  relative m-0 p-0 flex gap-1">
          ĐT:{' '}
          <Paragraph copyable className="text-white  relative m-0 p-0">
            02822412141
          </Paragraph>
          -
          <Paragraph copyable className="text-white  relative m-0 p-0">
            02822412142
          </Paragraph>
        </Paragraph>
      </Paragraph>
      <hr className="h-1 bg-sky-100 rounded mb-3 relative w-full" />
      <div className="flex justify-center">
        <Link to="/" className="flex justify-center">
          <img
            style={{
              // zIndex: 10,
              width: '30%',
              maxWidth: 300,
              position: 'relative',
            }}
            src="https://www.viettassaigon.vn/uploads/freecontent/VTS_ThongKe_iSale_256.png"
            alt="img"
          />
        </Link>
      </div>
      <Title className="text-white  relative mt-2 text-center" level={4}>
        iSale-Demo
      </Title>
      <Paragraph copyable className="text-white  relative">
        Thống kê dữ liệu Hệ thống quản lý bán hàng iSale, bản quyền thuộc về Công Ty Cổ Phần Giải Pháp Thương Mại Việt Nam Sài Gòn
      </Paragraph>
      <Paragraph className="text-white  relative flex">
        Phiên bản ứng dụng :
        <Title className="text-white ml-2" level={5}>
          1.24.01.XXXX
        </Title>
      </Paragraph>
      <Title className="text-white relative p-0 m-0" level={5}>
        Công Ty Cổ Phần Giải Pháp Thương Mại Việt Nam Sài Gòn bảo lưu mọi quyền
      </Title>
    </div>
  )
}
export default App
