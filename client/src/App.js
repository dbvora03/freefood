import React, {useEffect, createContext, useReducer, useContext} from 'react';
import NavBar from './components/topbar'
import "./App.css"
import {BrowserRouter, Route, Switch, useHistory} from 'react-router-dom'
import Home from "./components/screens/feed"
import Profile from "./components/screens/profile"
import Signin from "./components/screens/signin"
import Signup from "./components/screens/signup"
import GuestFeed from "./components/screens/guestfeed"

import CreatePost from "./components/screens/createpost"
import {reducer, initialState} from './reducers/userReducer'

export const usercontext = createContext()


const Routing = () => {
  const history = useHistory()
  const {state, dispatch} = useContext(usercontext)
  useEffect(()=>{

    //Parse the user info into a json variable
    const user = JSON.parse(localStorage.getItem("user"))


    //If the user exists...
    if(user) {
      //Lets react know you are logged in 
      dispatch({type:"USER", payload:user})
      history.push("/feed")
    } else {
      history.push("/signin")
    }
  },[/* Whenever anything happens, you run useEffect */ ])


  return (
    <Switch>
      <Route exact path="/feed"><Home /></Route>
      <Route path="/profile"><Profile /></Route>
      <Route path="/signin"><Signin /></Route>
      <Route path="/signup"><Signup /></Route>
      <Route path="/createpost"><CreatePost /></Route>
      <Route path="/guestfeed"><GuestFeed /></Route>
    </Switch>
  )
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    // 
    <usercontext.Provider value={{state, dispatch}}>
      <BrowserRouter>
        <NavBar />
        <Routing />
      </BrowserRouter>
    </usercontext.Provider>
  );
}

export default App;
