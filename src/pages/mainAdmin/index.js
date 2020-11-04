import React from 'react';
import api from '../../services/api';
import './styles.css';
import { logoutLe } from "../../persist/auth";
import {useHistory} from 'react-router-dom'
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from "react-hook-form";


function RegisterAdmin() {

  const history = useHistory();

  const [userName, setUserName] = React.useState('');
  const [repos, setRepos] = React.useState([]);
  const [image, setImage] = React.useState({});
  const { register, handleSubmit, errors } = useForm();

  const notify2 = () => toast.error("Campo não pode ser vazio");
  const notifyRedu = () => toast.error("Erro ao cadastrar. verifique os inputs");
  const notify = () => toast("Usuário cadastrado com sucesso");
  const notify0 = () => toast("Os campos não podem ser vazios");

 async function sendRegister(e){

    console.log(userName); 
    console.log(repos);
    console.log(image);

    //const info = {user_name: userName , repos: repos, image: image }
    const data = new FormData();
    data.append('user_name', userName); 
    data.append('repos', repos); 
    data.append('image', image);
    e.preventDefault();
  try{
     
      if(userName === "" || repos === [] || image === {}){
        document.querySelector('#userName').style.borderColor = 'rgb(240, 135, 135)' 
        notify0();
      }else{
        await api.post('http://localhost:3333/gitUser', data)
          .then(notify());
          
      }
    }catch (err) {
        console.log(err)
        notifyRedu();
        }
}

  return (

    <div className="adminView">

<form onSubmit={e => handleSubmit(sendRegister(e))}>
        
    <input
        type="text"
        placeholder="Nome do usuário"
        id="userName"
        minLength= {1}
        onChange={e => setUserName(e.target.value)}
    />

     <input
        type="text"
        placeholder="Repositorios"
        id="repoId"
        minLength= {1}
        onChange={e => setRepos([e.target.value])}
      />

        <div> 
            <label htmlFor="image">Foto de perfil</label> 
            <input type="file" id="image" 
              name="image" 
              onChange={e => setImage(e.target.files[0])}
            /> 
            
        </div> 

        <button type="submit">
                  Cadastrar
        </button>

      </form>


      <button className="quit" type="button" onClick={() => {logoutLe(); history.push('/'); window.location.reload();}}>Sair</button>

    </div>
  );
}

export default RegisterAdmin;
