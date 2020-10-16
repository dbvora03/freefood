import React from 'react'
import {Link } from 'react-router-dom'

const NavBar = ()=> {
    return(
        <nav>
            <div className="nav-wrapper teal">
            <Link to="/" className="brand-logo right">FreeFood</Link>
                <ul id="nav-mobile" className="left">
                    <li><Link to="/signin">Sign in</Link></li>
                    <li><Link to="/search">Search</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                    <li><Link to="/createpost">Make a Posting</Link></li>

                    <li><Link to="collapsible.html">About</Link></li>
                </ul>
            </div>
        </nav>
    )
}

export default NavBar