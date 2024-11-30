import "./MainContent.css"
import Tiles from "./Tiles/Tiles.jsx";
import StartInfo from "./StartInfo/StartInfo.jsx";
import {useState} from "react";


const MainContent = () => {



    return(
        <div className="h-90 d-flex mg-10">
            <StartInfo/>
            <Tiles/>
        </div>

    )
}
export default MainContent