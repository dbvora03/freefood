import React from 'react'
import {Link } from 'react-router-dom'


const Signin = () => {
    return (
        <div className="mycard">
            <div className="card auth-card">
                <h2>Welcome to FreeFood</h2>
                <input type="text" placeholder="email"/>
                <input type="text" placeholder="password"/>
                <button className="btn waves-effect waves-light" style={{margin:"10px"}}type="submit" name="action">Log in</button>
                <h6>Are you a business that doesn't have an account?</h6>
                <h6><Link to="/signup">Sign up here!</Link></h6>
            </div>
        </div>
    )
}



export default Signin