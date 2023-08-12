import { Navigate, Route, Routes } from "react-router-dom"
import { JournalPage } from "../pages/JournalPage"

//Por cada modulo que creamos podemos crear un router, luego lo tenemos que importar en el AppRouter 
export const JournalRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<JournalPage />}/>
      <Route path="/*" element={<Navigate to='/' />}/>
    </Routes>
  )
}
