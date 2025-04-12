import "./PanelListRecord.css"
import {FaTrash} from "react-icons/fa";
import {Button} from "react-bootstrap";
import {RxPencil1} from "react-icons/rx";
import {BsFillPencilFill} from "react-icons/bs";


const PanelListRecord = ({user})=>{

    const handleOnClick = () =>{
        
    }

    return(
        <div className="justify-content-evenly align-items-center row text-black panelRecordBg m-3 rounded-3">
            <p className="col-3 m-0">{user.name}</p>
            <p className="col-3 m-0">{user.lastName}</p>
            <p className="col-3 m-0">{user.city}</p>
            <div className="col-3 d-flex justify-content-evenly m-0">
                <div className="deleteUserBtn p-2 rounded-3 d-flex align-items-center justify-content-center">
                    <FaTrash color="white"/>
                </div>
                <div className="updateUserBtn p-2 rounded-3 d-flex align-items-center justify-content-center">
                    <BsFillPencilFill color="white"/>
                </div>
            </div>
        </div>
    )
}
export default PanelListRecord