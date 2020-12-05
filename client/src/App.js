import React, {useEffect, createContext, useReducer, useContext} from 'react';
import NavBar from './components/topbar'
import "./App.css"
import {BrowserRouter, Route, Switch, useHistory} from 'react-router-dom'
import Home from "./components/screens/feed"
import Profile from "./components/screens/profile"
import Signin from "./components/screens/signin"
import Signup from "./components/screens/signup"
import CreatePost from "./components/screens/createpost"
import {reducer, initialState} from './reducers/userReducer'

export const usercontext = createContext()


const Routing = () => {
  const history = useHistory()
  const {state, dispatch} = useContext(usercontext)
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))

    if(user) {
      dispatch({type:"USER", payload:user})
      history.push("/")
    } else {
      history.push("/signin")
    }
  },[])


  return (
    <Switch>
      <Route exact path="/"><Home /></Route>
      <Route path="/profile"><Profile /></Route>
      <Route path="/signin"><Signin /></Route>
      <Route path="/signup"><Signup /></Route>
      <Route path="/createpost"><CreatePost /></Route>
    </Switch>
  )
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <usercontext.Provider value={{state, dispatch}}>
      <BrowserRouter>
        <NavBar />
        <Routing />
      </BrowserRouter>
    </usercontext.Provider>
  );
}

export default App;
