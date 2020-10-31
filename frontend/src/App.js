import React from 'react';
import './App.css';
import './components/assets/fonts.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import FooterPage from './components/Footer/Footer';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from "@fortawesome/free-solid-svg-icons";
import Header from './components/Header/Header';
import Home from './components/Home/Home';

library.add(fas);

function App() {
  return (
    <div>
      <Header/>
      {/* <Navs/> */}
      {/* <Sign/> */}
      {/*<Home/>*/}
      {/* <FooterPage/> */}
    </div>
  );
}

export default App;
