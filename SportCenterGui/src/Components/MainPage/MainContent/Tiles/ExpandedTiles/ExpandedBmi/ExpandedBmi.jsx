import "./ExpandedBmi.css"
import {Button, Col, Container, Form, FormGroup, Row} from "react-bootstrap";
import {IoMdFemale, IoMdMale} from "react-icons/io";
import {FaArrowLeft} from "react-icons/fa";
import {GiWeightScale} from "react-icons/gi";
import {useState} from "react";
import BmiForm from "./BmiForm/BmiForm.jsx";
import BmiResult from "./BmiResult/BmiResult.jsx";


const ExpandedBmi = ({onClose}) => {

    const [bmiData, setBmiData] = useState({
        gender: 0,
        height: "",
        weight: "",
        age: "",
    });

    const [bmiResult, setBmiResult] = useState({
        bmiCalcResult: "",
        bmiMsg: ""
    })

    const [notSubmitted, setNotSubmitted] = useState(true);

    const handleSubmitCalc = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://localhost:7221/api/bmi/calculate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    weight: bmiData.weight,
                    height: bmiData.height
                })
            });
            const data = await response.json();
            setBmiResult({
                bmiCalcResult: data.bmiCalcResult,
                bmiMsg: data.bmiMsg
            })
            setNotSubmitted(false);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    const handleSubmitSave = async () => {
        const token = localStorage.getItem('jtw');

        try {
            const response = await fetch('https://localhost:7221/api/bmi/save', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    bmiResult: bmiResult.bmiCalcResult,
                    weight: bmiData.weight,
                    height: bmiData.height,
                    age: bmiData.age,
                    declaredGender: bmiData.gender

                })
            });
            
            if (response.ok)
                onClose();
        } catch (error) {
            console.error("Error fetching data:", error);
        }

    }

    return (

        <div className={"expandedBmiBg"}>
            <button onClick={onClose}
                    className={"position-absolute start-0 top-0 m-3 bmiTitle transparentButton bmiBackIcon"}>
                <FaArrowLeft/>
            </button>
            {notSubmitted ?
                (<BmiForm handleSubmit={handleSubmitCalc} setBmiData={setBmiData} bmiData={bmiData}/>) :
                (<BmiResult bmiResult={bmiResult} handleSubmitData={handleSubmitSave} onClose={onClose}/>)}


        </div>


    )
}

export default ExpandedBmi