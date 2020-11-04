import api from "./api";

async function admRoute(){
    var admin;
    await api.get(`http://localhost:3333/auth/${email}`).then(response => {
          admin = response.data.user._admin;
          return admin;
      });
}

export default admRoute;
