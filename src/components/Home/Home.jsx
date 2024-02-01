/* eslint-disable react/prop-types */
import MainPage from '../MainPage/MainPage'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

function Home({ isSidebarVisible }) {
  return (
    <div>
      <Header />
      <MainPage isSidebarVisible={isSidebarVisible} />
      <Footer />
    </div>
  )
}

export default Home
