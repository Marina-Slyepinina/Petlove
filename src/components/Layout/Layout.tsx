import { Outlet } from "react-router"
import { Suspense } from "react"
import { Container } from "../Container/Container"
import { Loader } from "../Loader/Loader"
import { Header } from "../Header/Header"

export const Layout = () => {
  return (
    <Container>
      <Header />

      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </Container>
  )
}
