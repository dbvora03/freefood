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
                localStorage.setItem("jwt", data.token)
                localStorage.setItem("user", JSON.stringify(data.user))
                dispatch({type:"USER", payload:data.user})
                M.toast({html:"Logging you in!"})
                history.push('/feed')
            }
        }).catch(err=> {
            console.log("Bro pleaser" ,err)
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