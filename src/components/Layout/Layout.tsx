import { Outlet } from "react-router"
import { Header } from "../Header/Header"

export const Layout = () => {
  return (
    <div className="container">

      <Header />

      <Outlet />
      
    </div>
  )
}
