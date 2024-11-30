import "./TrainerMainContent.css"
import TrainerTile from "../TrainerTile/TrainerTile.jsx";
import InfiniteScroll from "react-infinite-scroll-component";
import React, {useCallback, useEffect, useRef, useState} from "react";
import ReactLoading from 'react-loading';
import SportBanner from "../SportBanner/SportBanner.jsx";


const TrainerMainContent = ({sport, filterBy}) => {
    const [users, setUsers] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [componentKey, setComponentKey] = useState(0);
    const loadingRef = useRef(false);
    const [showLoading, setShowLoading] = useState(false);
    const abortControllerRef = useRef(null);
    const pageSize = 8;
    const pageNumberRef = useRef(1);
    const [pageNumberTrigger, setPageNumberTrigger] = useState(false);


    const fetchUsers = async () => {
        if (loadingRef.current) return;
        loadingRef.current = true;
        setShowLoading(true);

        try {
            abortControllerRef.current = new AbortController();
            const signal = abortControllerRef.current.signal;

            const response =
                await fetch(`https://localhost:7221/api/Trainer/getAll?pageNumber=${pageNumberRef.current}&pageSize=${pageSize}&sortBy=""&filterBy=${filterBy}`,{
                    method: 'GET',
                    signal
                });
            const data = await response.json();

            setUsers(prevUsers => [...prevUsers, ...data]);

            if (data.length < pageSize) {
                setHasMore(false);
            }

        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            loadingRef.current = false;
            setShowLoading(false);
        }
    };

    useEffect(() => {
        const loadData = async () => {
            await fetchUsers();
        };
        loadData().catch(error => console.error('Error in useEffect:', error));

    }, [pageNumberTrigger]);

    useEffect(() => {
        if (!abortControllerRef.current && loadingRef.current) {
            abortControllerRef.current.abort();
        }
        if (filterBy) {
            setUsers([]);
            setHasMore(true);
            setShowLoading(false);
            setComponentKey(componentKey + 1);
            pageNumberRef.current = 1;
        }
    }, [filterBy]);

    useEffect(() => {
        if (pageNumberRef.current === 1 || filterBy) {
            const loadData = async () => {
                await fetchUsers();
            };
            loadData().catch(error => console.error('Error in useEffect:', error));
        }
    }, [pageNumberTrigger, filterBy]);

    const loadMore = () => {
        pageNumberRef.current += 1;
        setPageNumberTrigger(prev => !prev);
    };

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