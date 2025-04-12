import { useState, useEffect, useRef, useCallback } from 'react';

const useUsersFetch = (filterBy, pageSize, componentKey) => {
    const [users, setUsers] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [showLoading, setShowLoading] = useState(false);
    const loadingRef = useRef(false);
    const abortControllerRef = useRef(null);
    const pageNumberRef = useRef(1);
    const [pageNumberTrigger, setPageNumberTrigger] = useState(false);

    const fetchUsers = useCallback(async () => {
        if (loadingRef.current) return;
        loadingRef.current = true;
        setShowLoading(true);

        try {
            abortControllerRef.current = new AbortController();
            const signal = abortControllerRef.current.signal;

            const response = await fetch(
                `https://localhost:7221/api/Trainer/getAll?pageNumber=${pageNumberRef.current}&pageSize=${pageSize}&sortBy=""&filterBy=${filterBy}`,
                {
                    method: 'GET',
                    signal,
                }
            );

            const data = await response.json();

            setUsers((prevUsers) => [...prevUsers, ...data]);

            if (data.length < pageSize) {
                setHasMore(false);
            }

        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            loadingRef.current = false;
            setShowLoading(false);
        }
    }, [filterBy, pageSize]);

    const loadMore = () => {
        pageNumberRef.current += 1;
        setPageNumberTrigger((prev) => !prev);
    };

    useEffect(() => {
        if (!abortControllerRef.current && loadingRef.current) {
            abortControllerRef.current.abort();
        }
        if (filterBy) {
            setUsers([]);
            setHasMore(true);
            setShowLoading(false);
            pageNumberRef.current = 1;
        }
    }, [filterBy]);

    useEffect(() => {
        fetchUsers().catch((error) => console.error('Error in useEffect:', error));
    }, [pageNumberTrigger, filterBy, fetchUsers]);

    return {
        users,
        hasMore,
        showLoading,
        loadMore,
        componentKey, // Return the componentKey to be used elsewhere
    };
};

export default useUsersFetch;
