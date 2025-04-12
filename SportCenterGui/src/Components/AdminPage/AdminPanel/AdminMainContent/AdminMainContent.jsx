import "./AdminMainContent.css"
import PanelBanner from "./PanelBanner/PanelBanner.jsx";
import {useState} from "react";
import PanelList from "./PanelList/PanelList.jsx";


const AdminMainContent = () =>{
    const [filterBy,setFilterBy] = useState("");
    return(
        <div className={"blurBg rounded-5 h-100 justify-content-center align-items-center d-flex"}>
            <div className={"whiteBg rounded-5"}>
                <PanelBanner setFilterBy={setFilterBy}/>
                <PanelList filterBy={filterBy}/>
            </div>
        </div>
    )
}

export default AdminMainContent