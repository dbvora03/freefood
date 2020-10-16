import React from 'react';
import NavBar from './components/topbar'
import "./App.css"
import {BrowserRouter, Route} from 'react-router-dom'
import Home from "./components/screens/feed"
import Profile from "./components/screens/profile"
import Signin from "./components/screens/signin"
import Signup from "./components/screens/signup"
import CreatePost from "./components/screens/createpost"







function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Route exact path="/"><Home /></Route>
      <Route path="/profile"><Profile /></Route>
      <Route path="/signin"><Signin /></Route>
      <Route path="/signup"><Signup /></Route>
      <Route path="/createpost"><CreatePost /></Route>
    </BrowserRouter>

  );
}

export default App;
