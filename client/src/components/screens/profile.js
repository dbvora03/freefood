import { useContext, useEffect, useState } from "react"
import React from 'react'
import {usercontext} from "../../App"


const Profile = () => {
    const [mypics, setPics] = useState([])
    const {state, dispatch} = useContext(usercontext)
    const [pic, setImage] = useState("")
    //const [url, setURL] = useState("")

    useEffect(()=>{
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
        if(pic) {
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
                //setURL(data.url)
                //localStorage.setItem("user", JSON.stringify({...state, pic:data.url}))
                //dispatch({type:"UPDATEPIC", payload:data.url})
                fetch("/updatepic", {
                    method:"PUT",
                    headers:{
                        "Content-Type":"application",
                        "Authorization": "Bearer " + localStorage.getItem("jwt")
                    },
                    body: JSON.stringify({
                        pic:data.url,
                    })
                }).then(res=> res.json()).then(result=> {
                    localStorage.setItem("user", JSON.stringify({...state, pic:result.pic}))
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
            <div style={{display:"flex", justifyContent:"space-around",margin:"00px 0px"}}>
                <div>
                    <img src={state?state.pic:"loading Profile Pic"} style={{width:"160px", height:"160px", marginTop:"20px",borderRadius:"80px"}}></img>
                </div>
                <div>
                    <h4>Bongumusa's Restaurant</h4>
                    <div>
                        <h5>12 postings</h5>
                    </div>
                </div>
                <div className="btn #64b5f6 blue darken-1">
                        <span>Upload Profile Pic</span>
                        <input type="file" onChange={(e)=>{
                            setImage(e.target.files[0])
                            window.location.reload()
                            }} />
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text" />
                    </div>
            </div>
        
            <div className="gallery">
                {
                    mypics.map(item=> {
                        return (
                            <div className="card">
                                <div className="card-image waves-effect waves-block waves-light">
                                    <img className="activator" src={item.photo}/>
                                </div>
                                <div className="card-content">
                                    <span className="card-title activator grey-text text-darken-4">{item.title}<i className="material-icons right">more_vert</i></span>
                                    <p><a href="#">This is a link</a></p>
                                </div>
                                <div className="card-reveal">
                                    <span className="card-title grey-text text-darken-4">Card Title<i className="material-icons right">close</i></span>
                                    <p>Here is some more information about this product that is only revealed once clicked on.</p>
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