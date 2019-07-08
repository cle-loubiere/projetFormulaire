import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route,Switch} from "react-router-dom";
import SignupPage from './components/SignupPage'
import SigninPage from './components/SigninPage'
import DossierPage from './components/DossierPage'
import DossierListe from './components/DossierListe'
import DossierEdit from './components/DossierEdit'
import NavBar from './components/NavBar'
import requireAuth from './utils/requireAuth'

function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
        <NavBar></NavBar>
        <Switch>
          <Route exact path="/" component={SigninPage} />
          <Route path="/signup" component={SignupPage} />
          <Route exact path="/dossier" component={requireAuth(DossierListe)} />
          <Route exact path="/dossier/new" component={requireAuth(DossierPage)} />
          <Route path="/dossier/:id" component={requireAuth(DossierEdit)} />
          
          <Route path="*" component={SigninPage} />

        </Switch>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
