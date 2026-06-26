import React, { useState } from 'react';
import { useTransition, animated } from '@react-spring/web';
import './Tiles.css';
import BmiTile from "./BmiTile/BmiTile.jsx";
import TrainerActionTile from "./TrainerActionTile/TrainerActionTile.jsx";
import ExpandedTiles from "./ExpandedTiles/ExpandedTiles.jsx";
import RankingTile from './RankingTile/RankingTile.jsx';
import SlotsTile from './SlotsTile/SlotsTile.jsx';

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
        config: { duration: 400 },
        keys: [expandedTile]
    });

    const handleExpand = (tile) => {
        // Don't allow expansion for trainer tile as it has its own logic
        if (tile === 'item4') {
            setExpandedTile(tile);
        }
    };

    const handleClose = () => {
        setExpandedTile(null);
    };

    return (
        <>
            <div className="grid-container col-7">
                <div className={"grid-item item1"} onClick={() => handleExpand('item1')}>
                    <RankingTile/>
                </div>
                <div className={"grid-item item2"}>
                    <TrainerActionTile />
                </div>
                <div className={"grid-item item3"} onClick={() => handleExpand('item3')}>
                    <SlotsTile />
                </div>
                <div className="grid-item item4" onClick={() => handleExpand('item4')}>
                    <BmiTile/>
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
