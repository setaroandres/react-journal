import { Navigate, Route, Routes } from "react-router-dom"
import { LoginPage, RegisterPage } from "../pages"


//Por cada modulo que creamos podemos crear un router, luego lo tenemos que importar en el AppRouter 
export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />

      <Route path="/*" element={<Navigate to='/auth/login'/>} />
    </Routes>
  )
}
