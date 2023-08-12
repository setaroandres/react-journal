import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from "../../firebase/providers";
import { checkingCredentials, login, logout } from "./authSlice";

//Los thunks son acciones que podemos despachar, internamente tienen una tarea asyncrona
export const checkingAuthentication = ({email, password}) => {
  return async(dispatch) => {
    //Aca vamos a hacer el dispatch de una accion que nos permite poner la app en estado de loading
    dispatch(checkingCredentials());
  }
}

export const startGoogleSignIn = () => {
  return async(dispatch) => {
    dispatch(checkingCredentials());

    const result = await signInWithGoogle();
    console.log({result});

    if (!result) return dispatch(logout(result.errorMessage));

    dispatch(login(result));
  }
}

export const startCreatingUserEmailPassword = ({email, password, displayName}) => {//desestructuramos del formState que nos manda del jsx
  return async(dispatch) => {
    dispatch(checkingCredentials());

    const {ok, uid, photoURL, errorMessage} = await registerUserWithEmailPassword({email, password, displayName});

    if(!ok) return dispatch(logout({errorMessage}));

    dispatch(login({uid, displayName, email, photoURL}))
   
  }
}

//Hacer el thunk de login//Hay que se dispare una accion y me loguee como esta el de GoogleSign in. Poner el mensaje de error si el registro no valido
export const startLoginWithEmailPassword = ({email, password}) => {//desestructuramos del formState que nos manda del jsx
  return async(dispatch) => {
    dispatch(checkingCredentials());

    const {ok, uid, photoURL, displayName, errorMessage} = await loginWithEmailPassword({email, password});
    // console.log(resp)

    if(!ok) return dispatch(logout({errorMessage}));

    dispatch(login({uid, displayName, email, photoURL}))
  
  }
}

export const startLogout = () => {
  return async(dispatch) => {
    await logoutFirebase();
    dispatch(logout({}));
  }
}