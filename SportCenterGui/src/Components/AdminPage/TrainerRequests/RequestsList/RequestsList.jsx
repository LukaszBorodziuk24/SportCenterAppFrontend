import React, {useEffect, useState} from "react";
import "./RequestsList.css";
import InfiniteScroll from "react-infinite-scroll-component";
import ReactLoading from "react-loading";
import useTrainerRequestsFetch from "../../../../hooks/useFetchTrainerRequests.js";
import RequestsRecord from "../RequestsRecord/RequestsRecord.jsx";

const RequestsList = () =>{
    const [componentKey, setComponentKey] = useState(0);
    const { data: requests, hasMore, showLoading, loadMore, removeItem } = useTrainerRequestsFetch(15, componentKey);

    useEffect(() => {
        setComponentKey((prevKey) => prevKey + 1);
    }, []);

    const handleRequestUpdate = (requestId, action) => {
        // Remove the request from the list immediately
        removeItem(requestId);
        console.log(`Request ${requestId} was ${action} and removed from list`);
    };

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
            dataLength={requests.length}
            scrollableTarget="scrollable-requests-container"
        >
            <div id="scrollable-requests-container" className={"overflow-y-scroll panelList"}>
                {requests.map((request, index) => (
                    <div key={request.requestId || index}>
                        <RequestsRecord request={request} onRequestUpdate={handleRequestUpdate}/>
                    </div>
                ))}
            </div>
        </InfiniteScroll>
    )
}

export default RequestsList


