import React, {useState, useEffect} from 'react'
import M from 'materialize-css'
import {useHistory} from 'react-router-dom'

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
            console.log("4")
        //Sends all post details to the back-end
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
            console.log("5")
            //Now we know the condition of whether the post was made ot not. 
            if(data.error){
                console.log("6")
               M.toast({html: data.error,classes:"#c62828 red darken-3"})
            }
            else{
                console.log("7")
                M.toast({html:"Created post Successfully",classes:"#43a047 green darken-1"})
                //Takes you to the feed right after
                history.push('/feed')
            }
         }).catch(err=>{
             console.log(err)
         })
     }
     },[url])


     const uploadFile = ()=>{

        // Parses the data needed to send photo to cloudinary
        const data = new FormData()
        data.append("file",photo)
        data.append("upload_preset","bongumusa")
        data.append("cloud_name","dcjuakpsl")
        console.log("1")

        //Sends data to cloudinary
        fetch("https://api.cloudinary.com/v1_1/dcjuakpsl/image/upload",{
            method:"post",
            body:data
        })
        .then(res=>res.json()) 
        .then(data=>{ //gets a URL in return. This URL can be used inside the src html tag
           setURL(data.url)
           console.log("3")
        })
        .catch(err=>{
            console.log("Line 58 error", err)
        })
    }
 
    return(<> 
        <div class="row" style={{maxWidth:"500px",padding:"20px",textAlign:"center"}}>
            <div class="col s12 m5">
                <div class="card-panel">
                    <h3>Create a posting</h3>
                </div>
            </div>
        </div>
        <div className="card input-filed"
        style={{margin:"30px auto",maxWidth:"500px",padding:"20px",textAlign:"center"}}>

            <input type="text" placeholder="title" value={title} onChange={(e)=>setTitle(e.target.value)}/>
            <input type="text" placeholder="description" value={description} onChange={(e)=>setBody(e.target.value)}/>
            <input type="text" placeholder="address" value={address} onChange={(e)=>setAddress(e.target.value)}/>
            <input type="text" placeholder="allergen information" value={dietaryRestrict} onChange={(e)=>setDiet(e.target.value)}/>

            <div className="file-field input-field">
                <div className="btn #64b5f6 teal darken-1">
                    <span>Upload Image</span>
                    <input type="file" onChange={(e)=>setImage(e.target.files[0])} />
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                </div>
             </div>
             <button className="btn waves-effect waves-light #64b5f6 teal darken-1"
             onClick={()=>uploadFile()}>
                 Submit post
             </button>
 
        </div>
        </>
    )



}

export default CreatePost