import "./SportBanner.css"
import {Form, InputGroup} from "react-bootstrap";
import {GiGymBag} from "react-icons/gi";
import {IoFilter} from "react-icons/io5";
import {SlMagnifier} from "react-icons/sl";
import FilterPopup from "../FilterPopup/FilterPopup.jsx";
import {useState} from "react";
import SearchBar from "../../SharedComponents/SearchBar/SearchBar.jsx";


const SportBanner = ({sport, setFilterBy, filterBy}) => {



    return (
        <div className={"row pt-10 h-20 w-100 pb-3 mb-5 align-items-center"}>
            <div className={"col d-flex justify-content-start h-100"}>
                <GiGymBag className={"sportIcon"}/>
            </div>

            <div className={"col d-flex justify-content-xxl-end justify-content-lg-center"}>
                <FilterPopup/>
                <SearchBar setFilterBy={setFilterBy}/>
            </div>

        </div>
    )
}

export default SportBanner