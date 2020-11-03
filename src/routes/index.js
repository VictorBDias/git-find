import React, {useMemo, useState} from 'react';
import { Switch, Route } from 'react-router-dom';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Search from '../pages/main/index'
import RegisterAdmin from '../pages/mainAdmin'

export default function Routes() {

  const token = localStorage.getItem('token');
  const [isSigned, setSigned] = useState('');

  useMemo(() => {
    if(token !== null && token !== undefined){
      setSigned(true);
    }else{
      setSigned(false);
    }
  }, [token]);
 

  return isSigned?(

    <Switch>
          <Route path="/home" exact component={Search}/>
          <Route path="/registerAdmin" exact component={RegisterAdmin} />
    </Switch>

  ):(

    <Switch>
          <Route path="/" exact component={SignIn} />
          <Route path="/signUp" exact component={SignUp} />
    </Switch>

  ); 

}
