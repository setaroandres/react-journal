import { ThemeProvider } from "@emotion/react"
import { CssBaseline } from "@mui/material"
import { purpleTheme } from "./"

//Theme provider es un proveedor de temas de mui
//Tenemos que instanciar nuestro AppTheme para que funcione. Lo hacemos en nuestro punto de entrada. En este caso JournalApp
export const AppTheme = ({children}) => {
  return (
    <ThemeProvider theme={purpleTheme}>
      <CssBaseline/>
      {children}
    </ThemeProvider>
  )
}
