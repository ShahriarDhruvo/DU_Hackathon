import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sign from './components/Sign/Sign';
import Navs from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';
import { BrowserRouter as Router, Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Router>
        <Navs />
        {/* <Route path="/" component={Sign} /> */}
        <Home/>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
