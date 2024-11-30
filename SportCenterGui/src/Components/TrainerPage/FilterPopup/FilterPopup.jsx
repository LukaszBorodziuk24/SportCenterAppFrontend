import "./FilterPopup.css"
import Popup from "reactjs-popup";
import {IoFilter} from "react-icons/io5";
import {Button, Form} from "react-bootstrap";
import {TbArrowsSort} from "react-icons/tb";


const FilterPopup = () => {




    return(
        <Popup
            trigger={open => (<button className={"filterButton me-4 pe-3 ps-3"}>
                        <TbArrowsSort className={"filterIcon h-100"}/> Sort
                    </button>)}
            position="left top"
        >
            <div className={"pt-3 pb-3 pe-5 ps-3 rounded-3 popup-style"}>
                <Form className={"custom-radio"}>
                    <Form.Group className={"mb-3"}>
                        <Form.Label>Filter by:</Form.Label>
                        <Form.Check
                            type="radio"
                            id="radio1"
                            name="filterOptions"
                            label="Country"
                        />
                        <Form.Check
                            type="radio"
                            id="radio2"
                            name="filterOptions"
                            label="City"
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Order by:</Form.Label>
                        <Form.Check
                            type="radio"
                            id="radio3"
                            name="OrderOptions"
                            label="Name"
                        />
                        <Form.Check
                            type="radio"
                            id="radio4"
                            name="OrderOptions"
                            label="Rating"
                        />
                    </Form.Group>


                    <Button className={"filterButton pe-3 ps-3 pt-1 pb-1 mt-2"}>
                        Accept
                    </Button>
                </Form>
            </div>

        </Popup>


    )
}

export default FilterPopup