import "./TrainerMainContent.css"
import TrainerTile from "../TrainerTile/TrainerTile.jsx";
import InfiniteScroll from "react-infinite-scroll-component";
import React, {useCallback, useEffect, useRef, useState} from "react";
import ReactLoading from 'react-loading';
import SportBanner from "../SportBanner/SportBanner.jsx";
import useUsersFetch from "../../../hooks/useFetchUsers.js";


const TrainerMainContent = ({sport, filterBy}) => {
    const [componentKey, setComponentKey] = useState(0); // Initialize componentKey state

    const { users, hasMore, showLoading, loadMore } = useUsersFetch(filterBy, 8, componentKey);

    useEffect(() => {
        setComponentKey((prevKey) => prevKey + 1);
    }, [filterBy]);

    return (
        <InfiniteScroll
            key={componentKey}
            next={loadMore}
            hasMore={hasMore}
            loader={showLoading ?
                <div className={"d-flex justify-content-center align-items-start"}>
                    <ReactLoading type={"spin"} color={"#74b3a4"} height={'4%'} width={'4%'}/>
                </div>
                : null
            }
            dataLength={users.length}
            scrollableTarget="scrollable-container"
        >
            <div id="scrollable-container" className="mainContentTrainer row w-100 h-100">
                {users.map((user, index) => (
                    <div
                        key={index}
                        className=
                            "d-flex col-12 col-sm-6 col-md-4 col-xxl-3 justify-content-center align-items-center mb-5">
                        <TrainerTile user={user}/>
                    </div>
                ))}
            </div>
        </InfiniteScroll>
    )
}

export default TrainerMainContent