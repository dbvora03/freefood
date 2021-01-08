import React, {useState, useContext} from 'react'
import {Link, useHistory} from 'react-router-dom'
import M from 'materialize-css'
import {usercontext} from '../../App'

const Signin = () => {
    const {state, dispatch} = useContext(usercontext)
    const history = useHistory()
    const [password,setpassword] = useState("")
    const [email,setemail] = useState("")

    const PostData = ()=> {

        //Sends a post request to the backend
        fetch("/signin", {
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                password,
                email
            })
        }).then(res=>res.json()).then(data=>{
            console.log(data)
           if(data.error){
                M.toast({html:data.error})
            } else {
                //Front end now makes access to the token by acquiring it from back end. 
                localStorage.setItem("jwt", data.token)
                // JSON version of the user data is now in our hands
                localStorage.setItem("user", JSON.stringify(data.user))

                //We need to use a reducer to get rid of data and have just the user part of it. 
                // Then we need to make the state equivalent to the userdata in order to use it in other pages
                dispatch({type:"USER", payload:data.user})
                M.toast({html:"Logging you in!"})

                // after signing in, it takes you to the feed
                history.push('/feed')
            }
        }).catch(err=> {
            console.log("Point 1: " ,err)
        })
    }
    return (
        <div className="mycard">
            <div className="card auth-card">
                <h2>Welcome to FreeFood</h2>
                <input value={email} onChange={(e)=>setemail(e.target.value)} type="text" placeholder="Email"/>
                <input value={password} onChange={(e)=>setpassword(e.target.value)} type="password" placeholder="Password"/>
                <button onClick={()=> {PostData()}} className="btn waves-effect waves-light" style={{margin:"10px"}}type="submit" name="action">Log in</button>
                <h6>Are you a business that doesn't have an account?</h6>
                <h6><Link to="/signup">Sign up here!</Link></h6>
            </div>
        </div>
    )
}



export default Signin