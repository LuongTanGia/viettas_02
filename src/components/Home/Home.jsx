/* eslint-disable react/prop-types */
import MainPage from '../MainPage/MainPage'
// import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

function Home({ isSidebarVisible }) {
  const history = useNavigate()
  useEffect(() => {
    const queryString = window.location.search
    if (queryString) {
      history('/')
    }
  }, [history])
  return (
    <>
      {/* <Header /> */}

      <MainPage isSidebarVisible={isSidebarVisible} />
      <Footer />
    </>
  )
}

export default Home
