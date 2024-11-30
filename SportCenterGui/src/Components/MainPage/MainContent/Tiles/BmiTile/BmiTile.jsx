import {GiWeightScale} from "react-icons/gi";
import "./BmiTile.css"
import {Container, Row} from "react-bootstrap";
import {useSpring, animated} from "@react-spring/web";
import {useEffect, useState} from "react";


const BmiTile = ({reloadOnClose}) => {

    const [isHovered, setIsHovered] = useState(false);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [bmiResult, setBmiResult] = useState({
        BmiCalcResult: '',
        BmiMsg: ''
    })

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

    const handleGet = async ()=>{
        const token = localStorage.getItem('jtw');

        try{
            const response = await fetch('https://localhost:7221/api/bmi/get',{
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            });
            if(response.status !== 200){
                setIsAuthorized(false);
                return
            }


            const data = await response.json();

            setBmiResult({
                BmiCalcResult: data.BmiCalcResult,
                BmiMsg: data.BmiMsg
            })

            setIsAuthorized(true);

        }catch (error){
            console.error("Error fetching data:", error);
        }

    }

    useEffect(() => {
        const loadData = async () => {
            await handleGet();
        };
        loadData().catch(error => console.error('Error in useEffect:', error));

    }, [reloadOnClose]);

    return (
        <>

                <animated.div
                    className={"bmiCustom d-flex flex-column align-items-center"}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    style={props}
                >
                    <Row className={"h-100"}>
                        {isAuthorized ? (
                                <div className={"col-12 d-flex flex-column justify-content-between"}>
                                    <p className={"h5 bmiTitle mt-2"}>Your BMI</p>
                                    <div className={"me-5 ms-5 pt-3 pb-3 align-items-center bmiIconWrapper"}>
                                        <GiWeightScale className={"bmiIcon"}/>
                                    </div>
                                    <p className={"h2 bmiResult"}>{bmiResult.BmiCalcResult}</p>
                                    <p className={"h6 bmiMsg"}>{bmiResult.BmiMsg}</p>
                                </div>
                            ):
                            (<div>hello</div>)}
                    </Row>


                </animated.div>
        </>






    )
}

export default BmiTile