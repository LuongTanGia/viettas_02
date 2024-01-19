import { Link } from 'react-router-dom'

import Logo from '../../assets/img/logo.png'
import ChangePass from './ChangePass'
import { useState } from 'react'
import BackGround from '../../assets/login_background.svg'
import DateTimeClock from '../util/testComponents/DateTime'

// eslint-disable-next-line react/prop-types
function Header() {
  const userLogin = window.localStorage.getItem('userName')
  const userInfor = JSON.parse(window.localStorage.getItem('userInfo'))

  const [isShow, setIsShow] = useState(false)
  const user = localStorage.getItem('User')
  const logout = () => {
    window.localStorage.removeItem('firstLogin')
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
  return (
    <>
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
                <img src={userLogin !== null ? Logo : userInfor.picture} alt="Profile" className="rounded-circle" />
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
                      <i className="bi bi-gear"></i>
                      <span>Đổi mật khẩu </span>
                    </Link>
                  </li>
                ) : null}

                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li>
                  <Link className="dropdown-item d-flex align-items-center" href="pages-faq.html">
                    <i className="bi bi-question-circle"></i>
                    <span>Need Help?</span>
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
