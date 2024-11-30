import React, {useState} from 'react';
import {animated, useSpring} from '@react-spring/web';
import './LeftPentagon.css';
import {useNavigate} from "react-router-dom";

const LeftPentagon = ({isHovered, onMouseEnter, onMouseLeave, onNavigate}) => {


    const props = useSpring({
        backgroundSize: isHovered ? '110%' : '100%',
        config: {tension: 280, friction: 60},
    });


    return (
        <animated.div
            style={props}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={onNavigate}
            className="left-pentagon"

        >
            <p className={"textCustom textSize"}>KICKBOXING</p>
        </animated.div>
    );
}

export default LeftPentagon;
