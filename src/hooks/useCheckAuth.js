import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FirebaseAuth } from "../firebase/config";
import { login, logout } from "../store/auth";

export const useCheckAuth = () => {

  const {status}  = useSelector(state => state.auth);
  const dispatch = useDispatch();

  //debemos disparar un efecto para pasar el checking
  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, async(user) => {
      
      if(!user) return dispatch(logout());

      const {uid, email, displayName, photoURL} = user
      dispatch(login({uid, email, displayName, photoURL}));

    });//Firebase nos permite saber cuando el estado de usuario cambia
    
  }, []);

  return status

}
