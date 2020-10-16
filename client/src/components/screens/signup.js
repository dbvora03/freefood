import React from 'react'


const Signup = () => {
    return (
        <div className="mycard">
            <div className="card auth-card">
                <h2>Signup below!</h2>
                <input type="text" placeholder="Company Name"/>
                <input type="text" placeholder="Email"/>
                <input type="text" placeholder="Password"/>
                <input type="text" placeholder="Address"/>
                <button className="btn waves-effect waves-light" type="submit" name="action">Sign up</button>
                <p>An email will be sent to you on  how to use the application</p>

            </div>
        </div>
    )
}



export default Signup