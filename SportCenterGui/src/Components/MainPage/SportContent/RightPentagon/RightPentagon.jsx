import React from 'react';
import './RightPentagon.css';
import {animated, useSpring} from "@react-spring/web";
import {useNavigate} from "react-router-dom";

const RightPentagon = ({isHovered, onMouseEnter, onMouseLeave, onNavigate}) => {

    const props = useSpring({
        backgroundSize: isHovered ? '110%' : '100%',
        config: {tension: 280, friction: 60},
    });

    return (
        <animated.div
            className="right-pentagon"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={onNavigate}
            style={props}

        >
            <p className={"textCustom textSize"}>
                CROSSFIT
            </p>

        </animated.div>
    );
}

export default RightPentagon;
