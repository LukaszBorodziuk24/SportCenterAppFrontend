import "./GoBackBtn.css"
import {FaArrowLeft} from "react-icons/fa";
import {useNavigate} from "react-router-dom";

const GoBackBtn = ({backLink}) =>{
    const navigate = useNavigate();

    const handleNavigation= (link) =>{
        navigate(link)
    }

    return(
        <button
            className={"transparentButton greyFont"}
            onClick={ ()=> handleNavigation(backLink)}><FaArrowLeft /> Go back</button>
    )
}

export default GoBackBtn