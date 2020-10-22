import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sign from './components/Sign/Sign';
import Navs from './components/Navbar/Navbar';

function App() {
  return (
    <div className="App">
      <Navs/>
      <Sign/>
    </div>
  );
}

export default App;
