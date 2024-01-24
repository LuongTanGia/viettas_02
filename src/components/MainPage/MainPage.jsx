import { Route, Routes } from 'react-router-dom'
import ErrorPage from '../util/Erorr/ErrorPage'
import DashBoar from '../DashBoar/DashBoar'
import AnimatedWaves from '../DashBoar/BgImg'

// import PhieuMuaHang from "../DULIEU/PhieuMuaHang";
// import Home from "../Home/Home";

// eslint-disable-next-line react/prop-types
function MainPage({ isSidebarVisible }) {
  return (
    <div className="MainPage">
      <div className="MainPage_bg">
        <AnimatedWaves />
      </div>
      <main id="main" className={isSidebarVisible ? 'main' : 'main show_main'}>
        <Routes>
          <Route path="/" element={<DashBoar />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default MainPage
