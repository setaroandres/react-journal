import { Google } from "@mui/icons-material";
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { useForm } from "../../hooks";
import { startGoogleSignIn, startLoginWithEmailPassword } from "../../store/auth";
import { AuthLayout } from "../layout/AuthLayout";

export const LoginPage = () => {

  const dispatch = useDispatch();
  //Aca obtenemos lo que nos interesa del state
  const {status, errorMessage} = useSelector(state => state.auth)//Del estate del auth tomamos lo que nos interesa usar

  //Primero hacemos el seteo de como queremos que luzca el form
  //Tomamos lo que necesitamos del hook useForm
  const {email, password, onInputChange, formState} = useForm({
    email: '',
    password: ''
  });

  //Si es checking inhabilitamos los botones hasta que termine. Si cambia la dependencia [status] ahi cambia el valor de la const
  const isAuthenticating = useMemo(() => status === 'checking', [status]); //Usamos el useMemo pasra memorizar esta const y solo cambiarla cuando cambie y no tener que estar siempre verificadndo si cambia o no

  //Esta es la fcn para hacer el submit del form
  const onSubmit = (event) => {
    event.preventDefault();

    //console.log(formState);
    dispatch(startLoginWithEmailPassword(formState))
  }

  const onGoogleSignIn = () => {
    //console.log('Google Signin');
    dispatch(startGoogleSignIn(formState));
  }

  return (

    <AuthLayout title="Login">
      <form onSubmit={onSubmit} className="animate__animated animate__fadeIn animate__faster">
        <Grid container>
          <Grid item xs={12} sx={{mt: 2}} >
            <TextField
              label="Correo" 
              type="email" 
              placeholder="correo@correo.com" 
              fullWidth
              name="email"
              value={email}
              onChange={onInputChange}
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
            />
          </Grid>

          <Grid container spacing={2} sx={{mb: 2, mt: 1}}>
            <Grid item xs={12} display={!!errorMessage ? '' : 'none'}>
              <Alert severity="error">
                {errorMessage}
              </Alert>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Button 
                disabled={isAuthenticating}
                variant="contained" 
                fullWidth
                type="submit"
              >
                Login
              </Button>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Button 
                disabled={isAuthenticating}
                variant="contained" 
                fullWidth
                onClick={onGoogleSignIn}
              >
                <Google />
                  <Typography sx={{ml: 1}}>
                    Google
                  </Typography>
              </Button>
            </Grid>
          </Grid> 

          <Grid container direction='row' justifyContent='end'>
            {/* Al tag link de material hay que pasarle con componente de rutas del react-router-dom, sino no va a funcionar */}
            <Link component={RouterLink} color='inherit' to='/auth/register'>
              Crear una cuenta
            </Link>
          </Grid>

        </Grid>
      </form>
    </AuthLayout>

  )
}
