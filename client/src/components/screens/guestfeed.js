import React, {useState, useEffect} from 'react'
//import { head } from '../../../../routes/auth'


const GuestFeed = () => {
    const [data, setData] = useState([])
    
    useEffect(()=>{
        console.log("a")
        //Get request to the back end
        fetch('/guestfeed').then(res=>res.json()).then(result => {
            // Gets all of the posts needed, they are in array form, so data is an array
            setData(result.posts)
            console.log("b")
        })
    },[])

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


export default GuestFeed