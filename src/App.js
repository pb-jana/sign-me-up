// import logo from './logo.svg';
import './App.css';
import Contactus from './components/contactus/contactus';
import Signin from './components/signin/signin';
import Signup from './components/signup/signup';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';

function App() {


  const [user, setSigninUser] = useState({})




  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        </header> */}

        <Router>
          <Routes>
            <Route exact path="/" element={<Contactus/>}>
              {/* {
                user && user._id ? <Contactus/> : <Signin setSigninUser = {setSigninUser}/>
              } */}
            </Route>
            <Route path="/signin" element={<Signin/>}></Route>
            <Route path="/signup" element={<Signup/>}></Route>
          </Routes>
        </Router>

        {/* <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      
    </div>
  );
}

export default App;
