import React, {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import M from 'materialize-css'


const Signup = () => {
    const history = useHistory()
    const [name,setName] = useState("")
    const [password,setpassword] = useState("")
    const [email,setemail] = useState("")
    const [address,setaddress] = useState("")

    const PostData = ()=> {
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "invalid email"})
            return
        }
        fetch("/signup", {
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                password,
                email
            })
        }).then(res=>res.json()).then(data=>{
           if(data.error){
                M.toast({html:data.error})
            } else {
                M.toast({html:"You have been signed up! Check your email!"})
                history.push('/signin')
            }
        }).catch(err=> {
            console.log(err)
        })
    }

    return (
        <div className="mycard">
            <div className="card auth-card">
                <h2>Signup below!</h2>
                <input value={name} onChange={(e)=>setName(e.target.value)} type="text" placeholder="Company Name"/>
                <input value={email} onChange={(e)=>setemail(e.target.value)} type="text" placeholder="Email"/>
                <input value={password} onChange={(e)=>setpassword(e.target.value)} type="text" placeholder="Password"/>
                <input value={address} onChange={(e)=>setaddress(e.target.value)} type="text" placeholder="Address"/>
                <button onClick={()=>PostData()} className="btn waves-effect waves-light" type="submit" name="action">Sign up</button>
                <p>An email will be sent to you on  how to use the application</p>

            </div>
        </div>
    )
}



export default Signup