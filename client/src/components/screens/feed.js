import React, {useState, useEffect, useContext} from 'react'
//import { head } from '../../../../routes/auth'
import { usercontext } from '../../App'
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker
  } from "react-google-maps";



const Home = () => {
    const [data, setData] = useState([])
    const {state,dispatch} = useContext(usercontext)
    useEffect(()=> {
        fetch('/feed', {
            headers: {
                "Authorization":"Bearer " + localStorage.getItem("jwt")
            }
        }).then(res=>res.json()).then(result => {
            setData(result.posts)
        })
    },[])


    const deletepost = (postid)=>{
        fetch(`/deletepost/${postid}`,{
            method:"delete",
            headers:{
                Authorization:"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            const newData = data.filter(item=>{
                return item._id !== result._id
            })
            setData(newData)
        })
    }

    return (
        <div style={{maxWidth:"550px", margin:"0px auto"}}>
            <h1 style={{alignContent:"center"}}>Todays Postings</h1>
            <div className="gallery">

                {
                    data.map(item=> {

                        
                        return(
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
                                    <span className="card-title grey-text text-darken-4">{item.title}<i className="material-icons right">close</i></span>
                                    <p>{item.description}</p>
                                    <h6>Dietary Information</h6>
                                    <p>{item.dietaryRestrict}</p>
                                    <h6>Location</h6>
                                    <div>
                                    <GoogleMap defaultZoom={8} defaultCenter={{ lat: item.lat, lng: item.lng }}>
                                        <Marker position={{ lat: item.lat, lng: item.lng }}/>
                                    </GoogleMap>

                                        <h6>Insert map in here</h6>
                                    </div>≥
                                    {item.author._id === state._id && <i className="material-icons" style={{float:"right"}} onClick={()=>{deletepost(item._id)}}>delete</i>}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}



export default Home