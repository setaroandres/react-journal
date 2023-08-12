import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: 'checking',//el estado inicial es checking, desp vamos a ver si esta non-authenticated o authenticated
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null
  },
  reducers: {
    login: (state, {payload}) => {
      state.status = 'authenticated';
      state.uid = payload.uid;
      state.email = payload.email;
      state.displayName = payload.displayName;
      state.photoURL = payload.photoURL;
      state.errorMessage = null;
    },
    logout: (state, {payload}) => {//podemos desestructurar el payload de la action
      state.status = 'not-authenticated';
      state.uid = null;
      state.email = null;
      state.displayName = null;
      state.photoURL = null;
      state.errorMessage = payload?.errorMessage;
    },
    checkingCredentials: (state) => {
      state.status = 'checking';
    }
  }
});

//Acciones que disparamos que estan asociadas al reducer
export const { login, logout, checkingCredentials } = authSlice.actions;