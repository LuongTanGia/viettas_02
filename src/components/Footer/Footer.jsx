import logo from '../../assets/whitelogo_viettas.svg'
import BackGround from '../../assets/login_background.svg'

const Footer = () => {
  return (
    <div
      className="fixed-bottom bg-center bg-cover bg-no-repeat z-[5] px-[20px] footer_main"
      style={{
        backgroundImage: `url(${BackGround})`,
      }}
    >
      <div className="flex justify-start items-center py-1 footer_box">
        <img src={logo} alt="Công Ty Viettas" className="object-fill min-h-[40px] footer_logo" />
        <div className="text-white w-full footer_content">
          <p className="w-full">Viettas SaiGon JSC</p>
          <p className="w-full">ĐC: 351/9 Nơ Trang Long, P.13, Q.BT, Tp.HCM</p>
        </div>
      </div>
    </div>
  )
}

export default Footer
