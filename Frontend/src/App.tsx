import { Suspense } from "react"
import { Route, Routes } from "react-router-dom"
import ErrorPage from "./pages/errorPage/errorPage"
import { Login } from "./pages/login"
import { Spiner } from "./components/spiner/spiner"
import { Main } from "./pages/main/main"

function App() {
  return (
    <>
      <Suspense fallback={<Spiner />}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Main />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Suspense>
    </>
  )
}

export default App
