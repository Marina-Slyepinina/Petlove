import { Outlet } from "react-router"
import { Suspense } from "react"
import { Header } from "../Header/Header"
import { Loader } from "../Loader/Loader"

export const Layout = () => {
  return (
    <div className="container">
      <Header />

      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </div>
  )
}
