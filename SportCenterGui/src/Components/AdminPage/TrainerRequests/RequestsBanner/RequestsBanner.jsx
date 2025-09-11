import React from 'react'
import "./RequestsBanner.css"

const RequestsBanner = () =>{
    return(
        <div className="panelBannerBg d-flex justify-content-evenly align-items-center text-black p-3 m-2 rounded-5">
            <p className="col-3 m-0">Name</p>
            <p className="col-3 m-0">LastName</p>
            <p className="col-3 m-0">City / Country</p>
            <div className="col-3 m-0"/>
        </div>
    )
}

export default RequestsBanner


