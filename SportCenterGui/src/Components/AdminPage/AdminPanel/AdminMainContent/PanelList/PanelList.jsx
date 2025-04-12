import "./PanelList.css"
import ReactLoading from "react-loading";
import TrainerTile from "../../../../TrainerPage/TrainerTile/TrainerTile.jsx";
import InfiniteScroll from "react-infinite-scroll-component";
import React, {useEffect, useState} from "react";
import useUsersFetch from "../../../../../hooks/useFetchUsers.js";
import PanelListRecord from "./PanelListRecord/PanelListRecord.jsx";


const PanelList = ({filterBy})=>{

    const [componentKey, setComponentKey] = useState(0); // Initialize componentKey state

    const { users, hasMore, showLoading, loadMore } = useUsersFetch(filterBy, 15, componentKey);

    useEffect(() => {
        setComponentKey((prevKey) => prevKey + 1);
    }, [filterBy]);


    return(

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
            <div id="scrollable-container" className={"overflow-y-scroll panelList"}>
                {users.map((user, index) => (
                    <div key={index}>
                        <PanelListRecord user={user}/>
                    </div>
                ))}
            </div>
        </InfiniteScroll>

        // <>
        //     <PanelListRecord/>
        //     <PanelListRecord/>
        //     <PanelListRecord/>
        //     <PanelListRecord/>
        //     <PanelListRecord/>
        //     <PanelListRecord/>
        // </>
    )
}
export default PanelList