import  "./BmiForm.css"
import {useState} from "react";
import {Button, Col, Form, FormGroup, Row} from "react-bootstrap";
import {GiWeightScale} from "react-icons/gi";
import {IoMdFemale, IoMdMale} from "react-icons/io";
import {FaHelicopter} from "react-icons/fa";



const BmiForm = ({handleSubmit,setBmiData,bmiData}) =>{

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBmiData({
            ...bmiData,
            [name]: value
        });
    };

    const handleGenderSelect = (selectedGender) => {
        setBmiData({
            ...bmiData,
            gender: selectedGender
        });
    };

    return(
        <Form onSubmit={handleSubmit} className="d-flex justify-content-center h-100">
            <Row className={"w-60"}>
                <div className={"d-flex flex-column justify-content-between"}>
                    <Row className={"bmiTitle mt-3 text-center"}>
                        <p className={"h2 mt-1"}> <GiWeightScale className={"h1 me-2"}/>BMI calculator</p>
                    </Row>

                    <Row className={"justify-content-start align-items-center"}>
                        <p className={"genderText"}>Enter your gender</p>
                        <Col className={"col-3 d-flex flex-column align-items-center"}>
                            <div
                                className={`mainAppButton d-flex genderIconWrapper justify-content-center align-items-center ${bmiData.gender === 0 ? 'selected' : ''}`}
                                onClick={() => handleGenderSelect(0)}
                            >
                                <IoMdMale className={"genderIcon"}/>
                            </div>
                            <p className={"text-center bmiText"}>Male</p>
                        </Col>

                        <Col className={"col-3 d-flex flex-column align-items-center"}>
                            <div
                                className={`mainAppButton d-flex genderIconWrapper justify-content-center align-items-center ${bmiData.gender === 1 ? 'selected' : ''}`}
                                onClick={() => handleGenderSelect(1)}
                            >
                                <IoMdFemale className={"genderIcon"}/>
                            </div>
                            <p className={"text-center bmiText"}>Female</p>
                        </Col>

                    </Row>
                    <div className={"border-bottom border-2"}/>
                    <FormGroup className={"col-4"}>
                        <p className={"bmiText"}>Enter your age</p>
                        <Form.Control
                            type={"number"}
                            className={"customForm"}
                            placeholder={"18"}
                            name="age"
                            value={bmiData.age}
                            onChange={handleInputChange}
                            required
                            min={"18"}
                        />
                    </FormGroup>
                    <div className={"border-bottom border-2"}/>
                    <Row>
                        <FormGroup className={"col-6"}>
                            <p className={"bmiText"}>Enter your height</p>
                            <Form.Control
                                type={"number"}
                                className={"customForm"}
                                placeholder={"180"}
                                name="height"
                                value={bmiData.height}
                                onChange={handleInputChange}
                                required
                                min={"1"}
                            />
                        </FormGroup>

                        <FormGroup className={"col-6"}>
                            <p className={"bmiText"}>Enter your weight</p>
                            <Form.Control
                                type={"number"}
                                className={"customForm"}
                                placeholder={"80"}
                                name="weight"
                                value={bmiData.weight}
                                onChange={handleInputChange}
                                required
                                min={"1"}
                            />
                        </FormGroup>
                    </Row>
                    <Row className={"d-flex justify-content-center"}>
                        <Button className={"mainAppButton border-0 mb-5 col-4 bmiButton rounded-5"} type={"submit"}>Calculate</Button>
                    </Row>
                </div>
            </Row>
        </Form>
    )
}
export default BmiForm
