import React, {useState, useEffect} from 'react'
import M from 'materialize-css'
import {useHistory} from 'react-router-dom'
const url = require("url")
// Assigned cloud name is dcjuakpsl    save for later !!!!!


const CreatePost = ()=> {
    const history = useHistory()
    const [title, setTitle] = useState("");
    const [description, setBody] = useState("");
    const [photo, setImage] = useState("");
    const [url, setURL] = useState("");
    const [address, setAddress] = useState("")
    const [dietaryRestrict, setDiet] = useState("")

    useEffect(()=>{
        if(url){
         fetch("/createpost",{
             method:"post",
             headers:{
                 "Content-Type":"application/json",
                 "Authorization":"Bearer "+localStorage.getItem("jwt")
             },
             body:JSON.stringify({
                 title,
                 description,
                 photo:url,
                 address,
                 dietaryRestrict
             })
         }).then(res=>res.json())
         .then(data=>{
     
            if(data.error){
               M.toast({html: data.error,classes:"#c62828 red darken-3"})
            }
            else{
                M.toast({html:"Created post Successfully",classes:"#43a047 green darken-1"})
                history.push('/feed')
            }
         }).catch(err=>{
             console.log(err)
         })
     }
     },[url])
 
     const uploadFile = ()=>{
        const data = new FormData()
        data.append("file",photo)
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
    return(
        <div className="card input-filed"
        style={{
            margin:"30px auto",
            maxWidth:"500px",
            padding:"20px",
            textAlign:"center"
        }}>
            <input type="text" placeholder="title" value={title} onChange={(e)=>setTitle(e.target.value)}/>
            <input type="text" placeholder="body" value={description} onChange={(e)=>setBody(e.target.value)}/>
            <input type="text" placeholder="body" value={address} onChange={(e)=>setAddress(e.target.value)}/>
            <input type="text" placeholder="body" value={dietaryRestrict} onChange={(e)=>setDiet(e.target.value)}/>

            <div className="file-field input-field">
                <div className="btn #64b5f6 blue darken-1">
                    <span>Uplaod Image</span>
                    <input type="file" onChange={(e)=>setImage(e.target.files[0])} />
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                </div>
             </div>
             <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
             onClick={()=>uploadFile()}>
                 Submit post
             </button>
 
        </div>
    )

    /*
    return(
        <div>
            <h3 style={{textAlign:"center"}}>Create a posting</h3>
            <div className="card input-file" style={{margin:"10px auto", maxWidth:"500px", padding:"20px"}}>
                <input value={title} onChange={(e)=>setTitle(e.target.value)} type="text" placeholder="title"/>
                <input value={body} onChange={(e)=>setBody(e.target.value)} type="text" placeholder="description"/>

                <div className="file-field input-field">
                    <div className="btn">
                        <span>Upload photo</span>
                        <input onChange={(e)=> setImage(e.target.files[0])} type="file"/>
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text"/>
                    </div>
                </div>
            </div>               
            <button onClick={()=>uploadFile()} style={{margin:"10px auto", justifyContent:"center", alignContent:"center", display:"flex", width:"90px", height:"35px"}}className="btn waves-effect waves-light" type="submit" name="action">Post </button>
        </div>
    )
*/

}

export default CreatePost