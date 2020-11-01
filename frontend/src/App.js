import React from 'react';
import './App.css';
import './components/assets/fonts.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import FooterPage from './components/Footer/Footer';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from "@fortawesome/free-solid-svg-icons";
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Temp from './components/Sign/Temp';
import SignUp from './components/Sign/SignUp';
import LoadingPage from './components/Sign/LoadingPage';
import EmailConfirmationSent from './components/Sign/EmailConfirmationSent'
import {BrowserRouter as Router, Route} from 'react-router-dom';
import EmailConfirm from './components/Sign/EmailConfirm';

library.add(fas);

function App() {
  return (
    <Router>
      <div>
        { <Header/> }
        <Route exact path = "/" component={Home} />
        <Route path ="/email/confirmation/sent" component={EmailConfirmationSent} />
        <Route path = "/email/confirmation/:key" component={EmailConfirm} />
        {/*<Route path ="/email/confirmation/sent" component={LoadingPage} />] */}
        {/* <Navs/> */}
        {/*<SignUp/>*/}
        {/* <LoadingPage /> */}
        {/* <FooterPage/> */}
        {/*<Temp/>*/}
      </div>
    </Router>
  );
}

export default App;
