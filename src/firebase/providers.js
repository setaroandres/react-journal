import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";

//creamos una instancia de esta funcion
const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async() => {
  try {
    const result = await signInWithPopup(FirebaseAuth, googleProvider);
    //const credentials = GoogleAuthProvider.credentialFromResult(result);
    //console.log({credentials});
    const {displayName, email, photoURL, uid} = result.user;
    return {
      ok: true,
      displayName,
      email,
      photoURL,
      uid
    }

  } catch (error) {
    
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.customData.email;
    const credential = GoogleAuthProvider.credentialFromError(error);

    return {
      ok: false,
      errorMessage
    }
  }
}

export const registerUserWithEmailPassword = async({email, password, displayName}) => {
  //Como es una tarea que puede fallar debemos usar un try catch
  try {

    const resp = await(createUserWithEmailAndPassword(FirebaseAuth, email, password));
    const {uid, photoURL} = resp.user;
    //Actualizamos el displayName en Firebase
    await updateProfile(FirebaseAuth.currentUser, {
      displayName
    });
    //console.log(resp);

    return {
      ok: true,
      displayName,
      email,
      photoURL,
      uid
    }    

  } catch (error) {
    return {
      ok: false,
      errorMessage: error.message//Aca podemos evaluar el codigo de error o lo que sea y hacer un switch para enviar el mensaje que nosotros querramos
    }
  }
}

export const loginWithEmailPassword = async({email, password}) => {
  ///!!llamar a signInWithhEmailAndPassword de Firebase
  try {
    
    const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password);
    // console.log(resp)
    const {displayName, photoURL, uid} = resp.user;

    //este return va a ser utilizado en login en authSlice
    return {
      ok: true,
      displayName,
      email,
      photoURL,
      uid
    }

  } catch (error) {
    return {
      ok: false,
      errorMessage: error.message
    }
  }
}

export const logoutFirebase = async() => {
  return await FirebaseAuth.signOut();
}