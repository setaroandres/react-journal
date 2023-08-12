import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link as RouterLink } from "react-router-dom"
import { useForm } from "../../hooks"
import { startCreatingUserEmailPassword } from "../../store/auth"
import { AuthLayout } from "../layout/AuthLayout"

const formData = {
  displayName: '',
  email: '',
  password: '',
}

//Creamos la validaciones custmo que querramos, con regla para que sea valido y mensaje de error, esto lo hacemos por cada campo que queramos validar.
const formValidations = {
  email: [(value) => value.includes('@'), 'El email tiene que tener una @'],//Como primer argumento mandamos una funcion para evaluar si es valido el campo
  password: [(value) => value.length >= 6 , 'El password debe de tener mas de 6 letras'],//Como primer argumento mandamos una funcion para evaluar si es valido el campo
  displayName: [(value) => value.length >= 1 , 'El nombre es obligatorio'],//Como primer argumento mandamos una funcion para evaluar si es valido el campo
}

export const RegisterPage = () => {

  const dispatch = useDispatch();
  //Aca creamos la validacion para que no tire error de validacion al cargar por primera vez y los campos estan vacios
  const [formSubmitted, setFormSubmitted] = useState(false);

  const {
    displayName, email, password, onInputChange, formState,
    isFormValid, displayNameValid, emailValid, passwordValid } = useForm(formData, formValidations);

  const {status, errorMessage} = useSelector(state => state.auth);
  const isCheckingAuthentication = useMemo(() => status === 'checking', [status]);

  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    if (!isFormValid) return;

    dispatch(startCreatingUserEmailPassword(formState));
  }
  
  return (
    <AuthLayout title="Crear cuenta">
      <form onSubmit={onSubmit} className="animate__animated animate__fadeIn animate__faster">
        <Grid container>
        <Grid item xs={12} sx={{mt: 2}} >
            <TextField
              label="Nombre completo" 
              type="text" 
              placeholder="Tu nombre" 
              fullWidth
              name="displayName"
              value={displayName}
              onChange={onInputChange}
              error={!!displayNameValid && formSubmitted}
              helperText={displayNameValid}
            />
          </Grid>

          <Grid item xs={12} sx={{mt: 2}} >
            <TextField
              label="Correo" 
              type="email" 
              placeholder="correo@correo.com" 
              fullWidth
              name="email"
              value={email}
              onChange={onInputChange}
              error={!!emailValid && formSubmitted}
              helperText={emailValid}
            />
          </Grid>

          <Grid item xs={12} sx={{mt: 2}} >
            <TextField 
              label="Contraseña" 
              type="password" 
              placeholder="Contraseña" 
              fullWidth
              name="password"
              value={password}
              onChange={onInputChange}
              error={!!passwordValid && formSubmitted}
              helperText={passwordValid}
            />
          </Grid>

          <Grid container spacing={2} sx={{mb: 2, mt: 1}}>
            <Grid item xs={12} display={!!errorMessage ? '' : 'none'}>
              <Alert severity="error">
                {errorMessage}
              </Alert>
            </Grid>

            <Grid item xs={12}>
              <Button 
                disabled={isCheckingAuthentication}
                variant="contained" 
                fullWidth
                type="submit"  
              >
                Crear cuenta
              </Button>
            </Grid>
          </Grid>

          <Grid container direction='row' justifyContent='end'>
            {/* Al tag link de material hay que pasarle con componente de rutas del react-router-dom, sino no va a funcionar */}
            <Typography sx={{mr: 1}}>Ya tienes una cuenta?</Typography>
            <Link component={RouterLink} color='inherit' to='/auth/login'>
              Login
            </Link>
          </Grid>

        </Grid>
      </form>
    </AuthLayout>
  )
}
