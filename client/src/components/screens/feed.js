import React, {useState, useEffect, useContext} from 'react'
//import { head } from '../../../../routes/auth'
import { usercontext } from '../../App'




const Home = () => {
    const [data, setData] = useState([])
    const {state, dispatch} = useContext(usercontext)

    useEffect(()=> {
        console.log("a")
        //Get request to the back end
        fetch('/feed', {
            headers: {
                "Authorization":"Bearer " + localStorage.getItem("jwt")
            }
        }).then(res=>res.json()).then(result => {
            // Gets all of the posts needed, they are in array form, so data is an array
            setData(result.posts)
            console.log("b")
        })
    },[])


    const deletepost = (postid)=>{
        console.log("c")
        console.log(postid)
        //Sends delete request to back-end on a specific post. postid is a paramter
        fetch(`/deletepost/${postid}`,{
            method:"delete",
            headers:{
                Authorization:"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log("d")
            console.log(result)
            //New data is filtered out to include everything except the post deleted
            const newData = data.filter(item=>{
                return item._id !== result._id
            })
            console.log("e")
            setData(newData)
        })
    }

    return (
        <div style={{maxWidth:"550px", margin:"0px auto"}}>
            <h1 style={{textAlign:"center", fontFamily:"revert"}}>Todays Postings</h1>
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
                                    <span className="card-title grey-text text-darken-4"style={{marginBottom:"0"}}>{item.title}<i className="material-icons right">close</i></span>
                                    {item.author._id === state._id && <i className="material-icons" style={{float:"right"}} onClick={()=>{deletepost(item._id)}}>delete</i>}
                                    <div className="card-content" style={{padding:"9px"}}>
                                        <img src={item.author.pic} style={{width:"80px", height:"80px", marginTop:"0px",borderRadius:"80px", display: "block", marginLeft: "auto", marginRight: "auto"}}></img>
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



export default Home