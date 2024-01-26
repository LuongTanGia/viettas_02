import { Link } from 'react-router-dom'

import Logo from '../../assets/img/logo.png'
import ChangePass from './ChangePass'
import { useState } from 'react'
import BackGround from '../../assets/login_background.svg'
import DateTimeClock from '../util/testComponents/DateTime'
import { InputNumber, Modal, Switch } from 'antd'

// eslint-disable-next-line react/prop-types
function Header() {
  const userLogin = window.localStorage.getItem('userName')
  const settingDate = window.localStorage.getItem('dateSetting')

  const userInfor = JSON.parse(window.localStorage.getItem('userInfo'))
  const [isModalOpen, setIsModalOpen] = useState(false)
  // const [checkDateWeek, setCheckDateWeek] = useState(settingDate === 'DW' ? true : false)
  const [checkDateMonth, setCheckDateMonth] = useState(settingDate === 'DM' ? true : false)
  // const [checkDateHT, setCheckDateHT] = useState(settingDate === 'DHT' ? true : false)
  const [inputDate, setInputDate] = useState(window.localStorage.getItem('dateNum') || 0)
  const [isShow, setIsShow] = useState(false)
  const user = localStorage.getItem('User')
  const logout = () => {
    window.localStorage.removeItem('firstLogin')
    window.localStorage.removeItem('authLogin')
    window.localStorage.removeItem('TKN')
    window.localStorage.removeItem('tokenDuLieu')
    window.localStorage.removeItem('RTKN')
    window.localStorage.removeItem('userName')
    window.location.href = '/login'
  }
  const handeleChange = () => {
    setIsShow(true)
  }
  const close = () => {
    setIsShow(false)
  }
  const img = userInfor.picture

  const showModal = () => {
    console.log('aa')
    setIsModalOpen(true)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }
  const onChangeDM = (checked) => {
    setCheckDateMonth(checked)
    setInputDate(0)
  }
  // const onChangeDW = (checked) => {
  //   setCheckDateMonth(false)
  //   setCheckDateWeek(checked)
  //   setCheckDateHT(false)
  //   setInputDate(1)
  //   window.localStorage.setItem('dateSetting', 'DW')
  // }
  // const onChangeDHT = (checked) => {
  //   setCheckDateMonth(false)
  //   setCheckDateWeek(false)
  //   setCheckDateHT(checked)
  //   setInputDate(1)
  //   window.localStorage.setItem('dateSetting', 'DHT')
  // }
  const onChangeInput = (value) => {
    setInputDate(value)
  }
  const handleSubmit = () => {
    if (checkDateMonth) {
      window.localStorage.setItem('dateSetting', 'DM')
      window.localStorage.setItem('dateNum', inputDate)
    } else {
      window.localStorage.setItem('dateSetting', 'DN')
      window.localStorage.setItem('dateNum', inputDate)
    }
    setIsModalOpen(false)
    window.location.href = '/'
  }
  return (
    <>
      <Modal
        title="Cài đặt"
        open={isModalOpen}
        onCancel={handleCancel}
        className="z-20"
        footer={
          <div>
            {
              <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                {' '}
                Xác Nhận
              </button>
            }
          </div>
        }
      >
        <div className="flex flex-col w-[50%] gap-2">
          <div className="flex justify-between items-center gap-3">
            <p className=" text-base font-semibold ">Bắt đầu từ đầu tháng : </p>
            <Switch onChange={onChangeDM} className="bg-gray-400" checked={checkDateMonth} />
          </div>
          {/* <div className="flex justify-between items-center gap-3">
            <p className=" text-base font-semibold ">Trong 1 tuần : </p>
            <Switch onChange={onChangeDW} className="bg-gray-400" checked={checkDateWeek} />
          </div>
          <div className="flex justify-between items-center gap-3">
            <p className=" text-base font-semibold ">Ngày hệ thống : </p>
            <Switch defaultChecked onChange={onChangeDHT} className="bg-gray-400" checked={checkDateHT} />
          </div> */}
          <div className="flex justify-start items-center gap-1">
            <p className=" text-base font-semibold ">Hoặc từ </p>
            <InputNumber
              className="w-[50px] text-base font-semibold"
              min={0}
              defaultValue={0}
              value={inputDate}
              onChange={onChangeInput}
              disabled={!checkDateMonth ? false : true}
            />
            <p className=" text-base font-semibold ">Ngày trước </p>
          </div>
        </div>
      </Modal>
      <header
        id="header"
        className="header fixed-top d-flex align-items-center z-10 h-[50px] flex justify-between bg-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url(${BackGround})`,
        }}
      >
        <DateTimeClock />

        <nav className="header-nav ">
          <ul className="d-flex align-items-center p-0">
            <li className="nav-item dropdown pe-3  text-red-500">
              <Link className="nav-link nav-profile d-flex align-items-center pe-0 text-red-500" href="#" data-bs-toggle="dropdown">
                <img src={userLogin !== null ? Logo : img} alt="Profile" className="rounded-circle" />
                <span className=" d-none d-md-block dropdown-toggle ps-2  ">{userLogin !== null ? user : userInfor.given_name}</span>
              </Link>

              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                <li className="dropdown-header">
                  <h6>{userLogin !== null ? user : `${userInfor.family_name} ${userInfor.given_name}`}</h6>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>

                {userLogin !== null ? (
                  <li>
                    <Link className="dropdown-item d-flex align-items-center" href="users-profile.html" onClick={handeleChange}>
                      <i className="bi bi-question-circle"></i>
                      <span>Đổi mật khẩu </span>
                    </Link>
                  </li>
                ) : null}

                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li>
                  <Link className="dropdown-item d-flex align-items-center" href="pages-faq.html" onClick={showModal}>
                    <i className="bi bi-gear"></i>
                    <span>Cài đặt</span>
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li onClick={logout}>
                  <Link className="dropdown-item d-flex align-items-center" href="#">
                    <i className="bi bi-box-arrow-right"></i>
                    <span>Thoát</span>
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
        <ChangePass isShow={isShow} close={close} />
      </header>
    </>
  )
}

export default Header
