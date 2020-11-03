import React, { useState, useEffect } from 'react';
import './styles.css';
//import apiReq from '../../services/apiReq';
import axios from 'axios';
import { useHistory, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../services/api';




function SignUp() {

  const history = useHistory();
  const [inputSenha, setSenha] = useState('');
  const [inputEmail, setEmail] = useState('');
  const [inputConfirm, setConfirm] = useState('');
  var admin = 'incognita';
  const { register, handleSubmit, errors } = useForm();
  const notify = () => toast("Cadastro realizado com sucesso!");
  

async function sendRegister(e){

  
    e.preventDefault();
    const info = {email: inputEmail , password: inputSenha, _admin: adminCheck() }
    
    
      if(inputSenha !== inputConfirm){
        document.querySelector('#confirmPass').style.borderColor = 'rgb(240, 135, 135)' 
      }else{
      
        await api.post('http://localhost:3333/auth/register',info)
        .then(response => notify());
        history.push('/home');
        console.log(history);
        window.location.reload();
     }
       
    }

    function adminCheck(){
      let check = document.querySelector("#isAdmin"); 
      console.log(check);
          if (check.checked){ 
            console.log('if');
            admin = 'true';
          }else {
            console.log('else');
            admin = 'false';
          }
          console.log(admin);
          return admin;
      }
  

  return (  
    <div className="divSign">
      
      <form onSubmit={e => handleSubmit(sendRegister(e))}>
        
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
          minLength = {3} 
          placeholder="Senha"
          type="password"
          required
          id="inputPassword"
          name="password"
          ref={register({ 
            required: 'Insira uma senha',
            message: "A senha deve conter no minimo 3 caracteres",
          })}
          onChange={e => setSenha(e.target.value)}
        />

        

        <input
          id="confirmPass"
          type="password"
          required
          placeholder="Confirmar Senha"
          onChange={e => setConfirm(e.target.value)}  
        />

        <div id="img">
          <input
            type="checkbox"
            id="isAdmin"
            name="isAdmin"
            
          />
          <label htmlFor="isAdmin">Cadastrar como administrador</label>
         </div>

        <button type="submit">
                  Cadastrar
        </button>

        <Link to ='/'>Já possui uma conta?</Link>
      </form>
    </div>
  );

}

export default SignUp;
