import React, { useState, useEffect } from 'react'
import './styles.css';
//import apiReq from '../../services/apiReq';
import axios from 'axios'
import { useHistory } from "react-router-dom"
import { Link } from 'react-router-dom'
import {persistStore, persistReducer} from 'redux-persist'
import Storage from 'redux-persist/lib/storage'
import { loginLe } from "../../persist/auth";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../services/api';


function SignIn() {

  const history = useHistory();
  // const [admin, setAdmin] = useState('');
  const [token, setToken] = useState('')
  const [senha, setSenha] = useState('');
  const [email, setEmail] = useState('');
  const { register, handleSubmit, errors } = useForm();
  const notifyNice = () => toast("Login bem sucedido!");
  const notifyError = () => toast.error("Email ou senha inválido");


  async function routeChoser(){

      var admin;
      await api.get(`http://localhost:3333/auth/${email}`).then(response => {
            admin = response.data.user._admin;
          if(admin == 'false'){
            history.push('/home')
          }else{
            history.push('/registerAdmin')
          }
        });
  }

async function fetch(e){
  try{  
    e.preventDefault();
    const login = {email: email, password: senha }
    await api.post('http://localhost:3333/auth/authenticate',login).then(response => {   
          const {token} = response.data;
          notifyNice();
          loginLe(token);
          api.defaults.headers.Authorization = `Bearer ${token}`;
          routeChoser();
          //window.location.reload();
        }
    ); 
    }catch(err){
      notifyError();
    }
  }

  return (  
    <div className="divSign">
  
      <form onSubmit={e => handleSubmit(fetch(e))}>
        <input
         placeholder="Email"
         type="email"
         name="email"
         required
          ref={register({
            required: "Insira seu email",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "Insira um endereço de email válido",
            },
           })}
          onChange={e => setEmail(e.target.value)}
        />
       {errors.email && <p className="error">{errors.email.message}</p>}

        <input
          type="password"
          placeholder="Senha"
          required
          ref={register({ 
            required: 'Insira uma senha'
          })}
          onChange={e => setSenha(e.target.value)}
        />

        {errors.password && <p className="error">{errors.password.message}</p>}


        <button type="submit" >
                  Entrar
        </button>


        <Link to='/signUp'>Não possui uma conta?</Link>
      </form>
    </div>
  );

}

export default SignIn;



