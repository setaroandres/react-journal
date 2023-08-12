import { Navigate, Route, Routes } from "react-router-dom"
import { AuthRoutes } from "../auth/routes/AuthRoutes"
import { useCheckAuth } from "../hooks"
import { JournalRoutes } from "../journal/routes/journalRoutes"
import { CheckingOut } from "../ui"

//Aca instanciamos los routes que tenemos y las rutas en las cuales queremos que se muestren
//Luego tenemos que asiganr nuestro AppRouter al route de nuestra app (al jsx de entrada, en este caso JournalApp.jsx)
export const AppRouter = () => {

  //Custom hook para checkear el status del usuario
  //Si no retornas un obj, no hay necesidad de desestructurarlo, en el custom hook devolvemos el status (sin estar en un obj)
  const status = useCheckAuth();
  
  if (status === 'checking') return <CheckingOut />;
  
  return (
    <>
      <Routes>

        {
          status === 'authenticated' //Depende del status unas rutas van a existir y las otras no
          ? <Route path="/*" element={<JournalRoutes />} />
          : <Route path="/auth/*" element={<AuthRoutes />} />
        }

        <Route path="/*" element={<Navigate to='/auth/login' />} />

        {/**Login y Registro */}
        {/* <Route path="/auth/*" element={<AuthRoutes />} /> */}

        {/**Journal App*/}
        {/* <Route path="/*" element={<JournalRoutes />} /> */}
      </Routes>
    </>
  )
}
