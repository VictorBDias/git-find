import React from 'react';
import api from '../../services/api';
import './styles.css';
import { logoutLe } from "../../persist/auth";
import {useHistory} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Viewer from 'react-viewer';


function Search() {

  const history = useHistory();

  const [input, setInput] = React.useState('');
  const [repos, setRepos] = React.useState([]);
  const [file, setFile] = React.useState(null);

  const notify = () => toast.error("O campo nome não pode ser vazio");
  const notFound = () => toast.dark("Usuário não encontrado, verifique se digitou corretamente.");


  async function fetchRepos() {

    if(input === ""){
      document.querySelector('#userName').style.borderColor = 'rgb(240, 135, 135)' 
      notify();
    }else{
      try
      {  
          document.querySelector('#userName').style.borderColor = 'rgb(160, 160, 160)' 
          await api.get(`http://localhost:3333/gitUser/${input}`).then(response => {
          setRepos(response.data.gitUser.repos);
          setFile(response.data.gitUser.image.url);
        });
      }catch(error){
        notFound();
      }
    }
  }

  function getUser(){
    var usuario = input;
    return 'https://github.com/'+usuario+'/';
};

  return (

    <div className="list">

      <input
        type="text"
        placeholder="Nome usuário"
        id="userName"
        minLength= {1}
        onChange={e => setInput(e.target.value)}
      />

      <button type="button" onClick={fetchRepos}>Buscar</button>

      <button className="quit" type="button" onClick={() => {logoutLe(); history.push('/'); window.location.reload();}}>Sair</button>


      <ul>
        {repos.map(repo => (
          <li key={repo.id}><a id="reposLink" href={getUser()+repo}>{repo}</a></li>
        ))}
      </ul>

      {file && <img src={file} alt="Profile-Pic"/>}

    
    </div>
  );
}

export default Search;