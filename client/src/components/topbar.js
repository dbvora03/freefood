import React from 'react'
import {Link, useHistory} from 'react-router-dom'
import { useContext } from 'react'
import {usercontext} from '../App'
const NavBar = ()=> {
    const {state, dispatch} = useContext(usercontext)
    const history = useHistory()
    function renderList(){
        if (state) {
            return [
                <li style={{marginLeft: "10px"}}>
                    <button onClick={()=>{
                        localStorage.clear()
                        dispatch({type:"CLEAR"})
                        history.push("/signin")
                    }} className="btn waves-effect waves-light" type="submit" name="action">Log out</button>
                </li>,
                <li><Link to="/profile">Profile</Link></li>,
                <li><Link to="/createpost">Make a Posting</Link></li>
            ]
        } else {
            return [
                <li><Link to="/signup">Sign up</Link></li>,
                <li><Link to="/signin">Sign in</Link></li>
            ]
        }
    }





    return(
        <nav>
            <div className="nav-wrapper teal">
            <Link to={state? "/feed": "/signin"} className="brand-logo right">FreeFood</Link>
                <ul id="nav-mobile" className="left">
                    {renderList()}
                    <li><Link to="/search">Search</Link></li>
                    <li><Link to="collapsible.html">About</Link></li>
                </ul>
            </div>
        </nav>
    )
}

export default NavBar