/* eslint-disable react/prop-types */
import MainPage from '../MainPage/MainPage'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

function Home({ handleToggleSidebar, isSidebarVisible }) {
  return (
    <div>
      <Header
        handleToggleSidebar={() => {
          handleToggleSidebar()
        }}
      />

      <MainPage isSidebarVisible={isSidebarVisible} />
      <Footer />
    </div>
  )
}

export default Home
