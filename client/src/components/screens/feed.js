import React, {useState, useEffect} from 'react'
import { usercontext } from '../../App'


const Home = () => {
    const [data, setData] = useState([])
    useEffect(()=> {
        fetch('/feed', {
            headers: {
                "Authorization":"Bearer " + localStorage.getItem("jwt")
            }
        }).then(res=>res.json()).then(result => {
            console.log(data)
            setData(data)
        })
    },[])
    return (
        <div style={{maxWidth:"550px", margin:"0px auto"}}>
            <h1 style={{alignContent:"center"}}>Todays Postings</h1>
            <div className="gallery">

                {
                    data.map(item=> {

                        return(
                            <div className="card">
                                <div className="card-image waves-effect waves-block waves-light">
                                    <img className="activator" src="https://dazedimg-dazedgroup.netdna-ssl.com/2400/azure/dazed-prod/1270/1/1271026.jpg"/>
                                </div>
                                <div className="card-content">
                                    <span className="card-title activator grey-text text-darken-4">Muffins  
                                        <i class="material-icons right">more_vert</i>
                                    </span>
                                    <p>Tyler's bakery</p>
                                </div>
                                <div className="card-reveal">
                                    <span className="card-title grey-text text-darken-4">Muffins<i className="material-icons right">close</i></span>
                                    <p>Here is some more information about this product that is only revealed once clicked on.</p>
                                    <h6>Dietary Information</h6>
                                    <p>Nuts, eggs, dairy</p>
                                    <h6>Location</h6>
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