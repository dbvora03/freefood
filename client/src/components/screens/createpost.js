import React from 'react'

const CreatePost = ()=> {
    return(
        <div>
            <h3 style={{textAlign:"center"}}>Create a posting</h3>
            <div className="card input-file" style={{margin:"10px auto", maxWidth:"500px", padding:"20px"}}>
                <input type="text" placeholder="title"/>
                <input type="text" placeholder="description"/>
                <input type="text" placeholder="dietary info"/>
                <input type="text" placeholder="pickup date"/>

                <div className="file-field input-field">
                    <div className="btn">
                        <span>Upload photo</span>
                        <input type="file"/>
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text"/>
                    </div>
                </div>
            </div>               
            <button style={{margin:"10px auto", justifyContent:"center", alignContent:"center", display:"flex", width:"90px", height:"35px"}}className="btn waves-effect waves-light" type="submit" name="action">Post </button>

        </div>
    )


}

export default CreatePost