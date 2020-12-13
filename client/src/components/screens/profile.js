import { useContext, useEffect, useState } from "react"
import React from 'react'
import {usercontext} from "../../App"


const Profile = () => {
    const [mypics, setPics] = useState([])
    const {state, dispatch} = useContext(usercontext)
    const [pic, setImage] = useState("")
    //const [url, setURL] = useState("")

    useEffect(()=>{
        //Makes a fetch to the front end, 
        fetch("/profile", {
            headers: {
                "Authorization":"Bearer " + localStorage.getItem("jwt")
            }
        }).then(res=>res.json()).then(result=> {
            console.log(result.mypost)
            setPics(result.mypost)
        })
    },[])

    useEffect(()=> {
        //If picture really exists
        if(pic) {

            //Formtatting photo to be sent to cloudinary
            const data = new FormData()
            data.append("file",pic)
            data.append("upload_preset","bongumusa")
            data.append("cloud_name","dcjuakpsl")
            console.log("line 48")

            //Sends photo to cloudinary
            fetch("https://api.cloudinary.com/v1_1/dcjuakpsl/image/upload",{
                method:"post",
                body:data
            })
            .then(res=>res.json()) //Returned an src link for the photo, which can be used in our tags
            .then(data=>{

                //Sends photo to back end
                fetch("/updatepic", {
                    method:"PUT",
                    headers:{
                        "Content-Type":"application",
                        "Authorization": "Bearer " + localStorage.getItem("jwt")
                    },
                    body: JSON.stringify({
                        pic:data.url,
                    })
                    //Now, it returns the new user data. We dont really need all of it, just a bit of state and the new picture
                }).then(res=> res.json()).then(result=> {
                    localStorage.setItem("user", JSON.stringify({...state, pic:result.pic})) //Spread is used to lay out all of state, then pic is added
                    
                    //updates the state using the reducer
                    dispatch({type:"UPDATEPIC", payload:result.url})
                })

                //window.location.reload()
            })
            .catch(err=>{
                console.log("Line 58 error", err)
            })
        }
    },[pic])
    const updatePFP = (file) => {
        setImage(file)
    }


    return (

        
        <div style={{maxWidth:"550px", margin:"0px auto"}}>
            <div className="row">
                <div className="col s12 m5">
                

                    <div className="card-panel ">
                        <img src={state?state.pic: "loading Profile Pic"} style={{width:"100px", height:"100px", marginTop:"0px",borderRadius:"80px", display: "block", marginLeft: "auto", marginRight: "auto"}}></img>
                        
                        <h4 style={{textAlign:"center"}}>{state?state.name:"loading"}</h4>
                        <p style={{textAlign:"center"}}> {mypics.length} open posting(s)</p>
                        <form action="#">
                            <div class="file-field input-field">
                                <div class="btn">
                                    <span>Update Logo</span>
                                    <input type="file"/>
                                </div>
                                <div class="file-path-wrapper">
                                <input class="file-path validate" onChange={(e)=>{
                                    setImage(e.target.files[0]) 
                                    window.location.reload()
                                    }}type="text"/>
                                </div>
                            </div>
                        </form>

                    </div>
                </div>
            </div>

        
            <div className="gallery">
                {
                    mypics.map(item=> {
                        return (
                            <div className="card" key={item._id}>
                                <div className="card-image waves-effect waves-block waves-light">
                                    <img className="activator" src={item.photo}/>
                                </div>
                                <div className="card-content">
                                    <span className="card-title activator grey-text text-darken-4">{item.title}  
                                        <i className="material-icons right">more_vert</i>
                                    </span>
                                    <p>{item.author.name}</p>
                                </div>
                                <div className="card-reveal">
                                    <span className="card-title grey-text text-darken-4"style={{marginBottom:"0"}}>{item.title}<i className="material-icons right">close</i></span>
                                    <div className="card-content" style={{padding:"9px"}}>
                                        <img src={state?state.pic: "loading Profile Pic"} style={{width:"80px", height:"80px", marginTop:"0px",borderRadius:"80px", display: "block", marginLeft: "auto", marginRight: "auto"}}></img>
                                        <h5 style={{ textAlign:"center"}}>{item.author.name}</h5>
                                    </div>
                                    <p>{item.description}</p>
                                    <h6>Dietary Information</h6>
                                    <p>{item.dietaryRestrict}</p>
                                    <h6>Location</h6>
                                    <div>
                                        <h6>Insert map in here</h6>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
                
                
                   

            </div>
        </div>
    )
}

export default Profile