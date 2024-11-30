import {Button, Image} from "react-bootstrap";
import "./StartInfo.css"
import {useState} from "react";
import {FaArrowDown} from "react-icons/fa";

const StartInfo = () =>{

    const scrollToBottom = () => {
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth'
        });
    };
    return(
        <div className="col-5">
            <p className="text-left ms-5 textCustom">
                PUSH PAST<br/>
                YOUR <br/>
                LIMITS
            </p>

            <div className={"d-flex position-absolute bottom-0 start-5 m-5"}>
                <Button onClick={scrollToBottom} className="ms-2 mb-1 mainAppButton buttonCustom">
                    <FaArrowDown className={"arrowStyle"}/>
                </Button>
            </div>

        </div>
    )
}



export default StartInfo