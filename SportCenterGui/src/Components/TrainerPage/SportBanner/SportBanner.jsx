import "./SportBanner.css"
import {Form, InputGroup} from "react-bootstrap";
import {GiGymBag} from "react-icons/gi";
import {IoFilter} from "react-icons/io5";
import {SlMagnifier} from "react-icons/sl";
import FilterPopup from "../FilterPopup/FilterPopup.jsx";
import {useState} from "react";


const SportBanner = ({sport, setFilterBy, filterBy}) => {

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            setFilterBy(e.target.value);
        }
    };

    return (
        <div className={"row pt-10 h-20 w-100 pb-3 mb-5 align-items-center"}>
            <div className={"col d-flex justify-content-start h-100"}>
                <GiGymBag className={"sportIcon"}/>
            </div>

            <div className={"col d-flex justify-content-xxl-end justify-content-lg-center"}>
                <FilterPopup/>
                <Form className={"w-50"}>
                    <Form.Group>
                        <InputGroup>
                            <InputGroup.Text className={"rounded-start-3"}>
                                <SlMagnifier/>
                            </InputGroup.Text>

                            <Form.Control
                                type={"text"}
                                placeholder={"Search"}
                                className={"rounded-end-3"}
                                onKeyDown={handleKeyDown}
                            />

                        </InputGroup>

                    </Form.Group>
                </Form>
            </div>

        </div>
    )
}

export default SportBanner