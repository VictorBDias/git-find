import React from 'react';
import Header from './components/Header';
import Search from './pages/main'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
//import {store, persistor} from './persist/index'
import './styles.css'
import RouteWrapper from './routes/authRoutes';
import Routes from './routes/index'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() { 
 
  return (
    <Router>
     
    <div className="App">
        <Header />
          <ToastContainer />
          <RouteWrapper />
          <Routes />
    </div>

    </Router>
  );
  }
export default App;
