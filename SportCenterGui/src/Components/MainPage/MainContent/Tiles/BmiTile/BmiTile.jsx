import {GiWeightScale} from "react-icons/gi";
import "./BmiTile.css"
import {Container, Row} from "react-bootstrap";
import {useSpring, animated} from "@react-spring/web";
import {useEffect, useState} from "react";
import { useAuth } from "../../../../../contexts/AuthContext.jsx";
import { bmiAPI } from "../../../../../services/api.js";


const BmiTile = ({reloadOnClose}) => {

    const [isHovered, setIsHovered] = useState(false);
    const { isAuthorized } = useAuth();
    const [bmiResult, setBmiResult] = useState({
        BmiCalcResult: '',
        BmiMsg: ''
    })

    const [hasBmi, setHasBmi] = useState(null);

    const props = useSpring({
        backgroundSize: isHovered ? '120%' : '110%',
        config: {tension: 280, friction: 60},
    });

    const handleMouseEnter = () => {
        setIsHovered(true);

    }

    const handleMouseLeave = () => {
        setIsHovered(false);
    }

  const handleGet = async () => {
    try {
      const data = await bmiAPI.get();
      setHasBmi(data.hasBmi);
      setBmiResult({
        BmiCalcResult: data.BmiCalcResult,
        BmiMsg: data.BmiMsg
      });
    } catch (error) {
      console.error("Error fetching BMI data:", error);
    }
  };


    useEffect(() => {
        if (!isAuthorized) {
            setHasBmi(false);
            setBmiResult({ BmiCalcResult: '', BmiMsg: '' });
            return;
        }
        const loadData = async () => {
            await handleGet();
        };
        loadData().catch(error => console.error('Error in useEffect:', error));

    }, [reloadOnClose, isAuthorized]);

    return (
        <>

                <animated.div
                    className={"bmiCustom d-flex flex-column align-items-center"}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    style={props}
                >
                    <Row className={"h-100"}>
                        {hasBmi ? (
                            <div className={"col-12 d-flex flex-column justify-content-between"}>
                                <p className={"h5 bmiTitle mt-2"}>Your BMI</p>
                                <div className={"me-5 ms-5 pt-3 pb-3 align-items-center bmiIconWrapper"}>
                                    <GiWeightScale className={"bmiIcon"}/>
                                </div>
                                <p className={"h2 bmiResult"}>{bmiResult.BmiCalcResult}</p>
                                <p className={"h6 bmiMsg"}>{bmiResult.BmiMsg}</p>
                            </div>
                        ) : (
                            <div className={"col-12 d-flex flex-column justify-content-between align-items-center"}>
                                <p className={"h5 bmiTitle mt-2"}>Calculate your BMI</p>
                                <div className={"me-5 ms-5 pt-3 pb-3 align-items-center bmiIconWrapper"}>
                                    <GiWeightScale className={"bmiIcon"}/>
                                </div>
                            </div>
                        )}
                    </Row>


                </animated.div>
        </>






    )
}

export default BmiTile