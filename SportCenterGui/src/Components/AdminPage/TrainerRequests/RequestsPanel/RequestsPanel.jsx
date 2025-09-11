import React from "react";
import "./RequestsPanel.css";
import AdminPageBanner from "../../AdminPanel/AdminPageBanner/AdminPageBanner.jsx";
import RequestsBanner from "../RequestsBanner/RequestsBanner.jsx";
import RequestsList from "../RequestsList/RequestsList.jsx";

const RequestsPanel = () =>{
    return(
        <div className="adminPanelContainer mt-3">
            <AdminPageBanner title="Requests"/>
            <div className={"blurBg rounded-5 h-100 justify-content-center align-items-center d-flex"}>
                <div className={"whiteBg rounded-5"}>
                    <RequestsBanner/>
                    <RequestsList/>
                </div>
            </div>
        </div>
    )
}

export default RequestsPanel


