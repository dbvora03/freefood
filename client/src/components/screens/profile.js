import React from 'react'


const Profile = () => {
    return (
        <div style={{maxWidth:"550px", margin:"0px auto"}}>
            <div style={{display:"flex", justifyContent:"space-around",margin:"00px 0px"}}>
                <div>
                    <img src="https://dazedimg-dazedgroup.netdna-ssl.com/2400/azure/dazed-prod/1270/1/1271026.jpg" style={{width:"160px", height:"160px", marginTop:"20px",borderRadius:"80px"}}></img>
                </div>
                <div>
                    <h4>Bongumusa's Restaurant</h4>
                    <div>
                        <h5>12 postings</h5>
                    </div>
                </div>
            </div>
        
            <div className="gallery">
                
                <div className="card">
                    <div className="card-image waves-effect waves-block waves-light">
                        <img className="activator" src="https://dazedimg-dazedgroup.netdna-ssl.com/2400/azure/dazed-prod/1270/1/1271026.jpg"/>
                    </div>
                    <div className="card-content">
                        <span className="card-title activator grey-text text-darken-4">Card Title<i className="material-icons right">more_vert</i></span>
                        <p><a href="#">This is a link</a></p>
                    </div>
                    <div className="card-reveal">
                    <span className="card-title grey-text text-darken-4">Card Title<i className="material-icons right">close</i></span>
                    <p>Here is some more information about this product that is only revealed once clicked on.</p>
                </div>
            </div>               

            </div>
        </div>
    )
}

export default Profile