import "./BmiResult.css"
import {GiWeightScale} from "react-icons/gi";
import {Button, Row} from "react-bootstrap";


const BmiResult = ({bmiResult, handleSubmitData})=>{



    return(
        <div className={"d-flex flex-column justify-content-evenly h-100 align-items-center"}>
            <p className={"display-5 bmiResultTitle"}>Your Result</p>
            <div className={"bmiResultWrapper display-1 d-flex justify-content-center"}>
                <GiWeightScale className={"bmiResultIcon display-2"}/>
            </div>

            <p className={"display-4 bmiResultValue"}>{bmiResult.bmiCalcResult}</p>
            <p className={"h3 bmiResultMsg"} >{bmiResult.bmiMsg}</p>

            <Button className={"mainAppButton border-0 mb-5 col-4 bmiButton rounded-5"} onClick={handleSubmitData}>Save data</Button>
        </div>
    )
}
export default BmiResult