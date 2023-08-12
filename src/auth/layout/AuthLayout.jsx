//Creamos este layout para poder reutilizar codigo que se repite a traves de la seccion de auth

import { Grid, Typography } from "@mui/material"

export const AuthLayout = ({children, title = ''}) => {
  return (
    /**El Grid lo importamos de material, es como un div pero con muchos mas atributos y propiedades.
     * El atributo sx nos permite tener acceso al theme que definimos en el theme provider, es como usar el style={{}}
     * el pimery.main es el que definimos en purpleTheme.js
    */
    <Grid 
      container
      spacing={0}
      direction='column'
      alignItems='center'
      justifyContent='center'
      sx={{minHeight: '100vh', backgroundColor: 'primary.main', padding: 4}}
    >

      <Grid
        item
        className="box-shadow"
        xs={3} //En pantallas pequeñas va a tener 3 posiciones // md, xl
        sx={{
          width: {sm: 450},
          backgroundColor: 'white', 
          padding: 3, 
          borderRadius: 2
        }}
      >
        <Typography variant="h5" sx={{mb: 1}}>{title}</Typography>

        {/**Aca van a ir los children que no se repiten en todas las screens */}
        {children}

      </Grid>
    </Grid>
  )
}
