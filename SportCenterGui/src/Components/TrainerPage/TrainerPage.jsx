
import "./TrainerPage.css"
import NavbarComp from "../Navbar/NavbarComp.jsx";
import {useState} from "react";
import {useParams} from "react-router-dom";

import { getTrainerBg } from "../../utils/getTrainerBg";
import TrainerMainContent from "./TrainerMainContent/TrainerMainContent.jsx";
import SportBanner from "./SportBanner/SportBanner.jsx";

const TrainerPage = () => {
    const {sport} = useParams();
    const [filterBy, setFilterBy] = useState("");

    return(
        <div className={"trainerCustom"} style={getTrainerBg(sport)}>
            <NavbarComp/>
            <SportBanner sport={sport} setFilterBy={setFilterBy} filterBy={filterBy}/>
            <TrainerMainContent sport={sport} filterBy={filterBy}/>
        </div>
    )
}

export default TrainerPage