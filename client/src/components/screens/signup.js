import React, {useState, useEffect} from 'react'
import {Link, useHistory} from 'react-router-dom'
import M from 'materialize-css'


const Signup = () => {
    const history = useHistory()
    const [name,setName] = useState("")
    const [password,setpassword] = useState("")
    const [email,setemail] = useState("")
    const [address,setaddress] = useState("")
    const [pic, setImage] = useState("")
    const [url, setURL] = useState(undefined)
    useEffect(()=> {
        if(url) {
            uploadFields()
        }
    },[url])



    const uploadFile = ()=>{
        const data = new FormData()
        data.append("file",pic)
        data.append("upload_preset","bongumusa")
        data.append("cloud_name","dcjuakpsl")
        console.log("line 48")

        
        fetch("https://api.cloudinary.com/v1_1/dcjuakpsl/image/upload",{
            method:"post",
            body:data
        })
        .then(res=>res.json())
        .then(data=>{
           setURL(data.url)
        })
        .catch(err=>{
            console.log("Line 58 error", err)
        })
    }

    const uploadFields = () => {
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
                email,
                pic:url
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


    const PostData = ()=> {

        if(pic) {
            uploadFile()
        } else {
            uploadFields()
        }

    }


    return (
        <div className="mycard">
            <div className="card auth-card">
                <h2>Signup below!</h2>
                <input value={name} onChange={(e)=>setName(e.target.value)} type="text" placeholder="Company Name"/>
                <input value={email} onChange={(e)=>setemail(e.target.value)} type="text" placeholder="Email"/>
                <input value={password} onChange={(e)=>setpassword(e.target.value)} type="password" placeholder="Password"/>
                <input value={address} onChange={(e)=>setaddress(e.target.value)} type="text" placeholder="Address"/>

                <div className="file-field input-field">
                    <div className="btn #64b5f6 blue darken-1">
                        <span>Upload Profile Pic</span>
                        <input type="file" onChange={(e)=>setImage(e.target.files[0])} />
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text" />
                    </div>
                </div>




                <button onClick={()=>PostData()} className="btn waves-effect waves-light" type="submit" name="action">Sign up</button>
                <p>An email will be sent to you on  how to use the application</p>

            </div>
        </div>
    )
}



export default Signup