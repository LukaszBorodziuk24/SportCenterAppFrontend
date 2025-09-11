import { useCallback } from 'react';
import useFetchData from './useFetchData.js';
import { adminAPI } from '../services/api.js';

const useTrainerRequestsFetch = (pageSize, componentKey) => {
    const fetchFunction = useCallback(async ({ pageNumber, pageSize, signal }) => {
        return await adminAPI.getTrainerRequests(
            {
                pageNumber,
                pageSize,
            },
            { signal }
        );
    }, []);

    return useFetchData(fetchFunction, { pageSize, componentKey });
};

export default useTrainerRequestsFetch;
