import React, {useState} from 'react';
import './Hourglass.css';
import {animated,useSpring} from "@react-spring/web";
import {useNavigate} from "react-router-dom";


const Hourglass = ({ isHovered, onMouseEnter, onMouseLeave, onNavigate }) => {



    const props = useSpring({
        backgroundSize: isHovered ? '115%' : '100%',
        config: { tension: 280, friction: 60 },
    });

    return (
        <animated.div
            className="hourglass"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={onNavigate}
            style={props}
        >
            <span className={"textCustom"}>GYM</span>
        </animated.div>
    );
}

export default Hourglass;
