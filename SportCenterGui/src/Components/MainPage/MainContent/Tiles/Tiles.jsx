import React, { useState } from 'react';
import { useTransition, animated } from '@react-spring/web';
import './Tiles.css';
import BmiTile from "./BmiTile/BmiTile.jsx";
import ExpandedTiles from "./ExpandedTiles/ExpandedTiles.jsx";

const Tiles = () => {
    const [expandedTile, setExpandedTile] = useState(null);

    const transitions = useTransition(expandedTile, {
        from: {
            transform: 'scale(0.1)',
            opacity: 0,
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            transformOrigin: 'bottom right'
        },
        enter: { transform: 'scale(1)', opacity: 1 },
        leave: { transform: 'scale(0.1)', opacity: 0 },
        config: { duration: 300 },
        keys: [expandedTile]
    });

    const handleExpand = (tile) => {
        setExpandedTile(tile);
    };

    const handleClose = () => {
        setExpandedTile(null);
    };

    return (
        <>
            <div className="grid-container col-7">
                <div className={"grid-item item1"} onClick={() => handleExpand('item1')}>
                    <p>Item 1</p>
                </div>
                <div className={"grid-item item2"} onClick={() => handleExpand('item2')}>
                    <p>Item 2</p>
                </div>
                <div className={"grid-item item3"} onClick={() => handleExpand('item3')}>
                    <p>Item 3</p>
                </div>
                <div className="grid-item item4" onClick={() => handleExpand('item4')}>
                    <BmiTile reloadOnClose={handleClose}/>
                </div>

                {transitions((style, item) =>
                    item ? (
                        <animated.div className="expanded-tile" style={style} key={item}>
                            <ExpandedTiles tile={expandedTile} onClose={handleClose} />
                        </animated.div>
                    ) : null
                )}
            </div>
        </>
    );
};

export default Tiles;
