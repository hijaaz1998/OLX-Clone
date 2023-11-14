import React,{ useEffect, useContext } from 'react';
import './App.css';
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Create from './Pages/Create';
import View from './Pages/ViewPost';
import Post from './store/PostContext';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { AuthContext, FirebaseContext } from './store/Context';

function App() {

  const {user, setUser} = useContext(AuthContext)
  const {firebase} = useContext(FirebaseContext)
  console.log("app rendered");

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user)
    })
  }, [] )

  return (
    <div className="App">
      <Router>
        <Post>
          <Routes>
            <Route exact path='/' element={ <Home/> } /> 
            <Route path='/signup' element={ <Signup/> } /> 
            <Route path='/login' element={ <Login /> } /> 
            <Route path='/sell' element={ <Create /> } /> 
            <Route path='/view' element={ <View /> } /> 
          </Routes>        
        </Post>
      </Router>
    </div>
  );
}

export default App;
