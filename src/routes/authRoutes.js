import React from 'react';
import api from '../services/api';
import { Redirect } from 'react-router-dom';
import { logoutLe, loginLe, TOKEN_KEY } from "../persist/auth";

export default function RouteWrapper() {

  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  if (token !== null && token !== undefined) {
        alert(user._admin);
        if(user._admin == 'true')
        return <Redirect to="/registerAdmin" />;
        
    
          return <Redirect to="/home" />;
      }

    else{
      return <Redirect to="/" />;
  }
  
}

