import React from 'react';
import api from '../services/api';
import { Redirect } from 'react-router-dom';
import { logoutLe, loginLe, TOKEN_KEY } from "../persist/auth";

export default function RouteWrapper() {

  const token = localStorage.getItem('token');

  if (token !== null && token !== undefined) {
  //  if(admin == 'false'){
    return <Redirect to="/home" />;
  // }else{
  //   if(admin == 'true'){
   //    return <Redirect to="/registerAdmin" />;
  //  }
  //}
  }else{
    return <Redirect to="/" />;
  }
  
}

