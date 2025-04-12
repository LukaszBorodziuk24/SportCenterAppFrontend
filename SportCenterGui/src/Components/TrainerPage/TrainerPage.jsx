
import "./TrainerPage.css"
import NavbarComp from "../Navbar/NavbarComp.jsx";
import {useState} from "react";
import {useParams} from "react-router-dom";

import DefaultBg from "@assets/trainerBg.svg";
import GymBg from "@assets/trainerGymBg.jpg";
import CrossfitBg from "@assets/trainerCrossfitBg.jpg";
import KickboxingBg from "@assets/trainerKickboxingBg.jpg";
import TrainerMainContent from "./TrainerMainContent/TrainerMainContent.jsx";
import SportBanner from "./SportBanner/SportBanner.jsx";

const TrainerPage = () => {
    const {sport} = useParams();
    const [filterBy, setFilterBy] = useState("");


    const sportType={
        gym: GymBg,
        crossfit: CrossfitBg,
        kickboxing: KickboxingBg,
        default: DefaultBg
    }

    const sportStyle= {
        backgroundImage: `url(${sportType[sport] || sportType.default})`
    }

    return(
        <div className={"trainerCustom"} style={sportStyle}>
            <NavbarComp/>
            <SportBanner sport={sport} setFilterBy={setFilterBy} filterBy={filterBy}/>
            <TrainerMainContent sport={sport} filterBy={filterBy}/>
        </div>
    )
}

export default TrainerPage