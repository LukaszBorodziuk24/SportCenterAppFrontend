import { useCallback } from 'react';
import useFetchData from './useFetchData.js';
import { trainerAPI } from '../services/api.js';

const useUsersFetch = (filterBy, pageSize, componentKey) => {
    const fetchFunction = useCallback(async ({ pageNumber, pageSize, filterBy, signal }) => {
        return await trainerAPI.getAll(
            {
                pageNumber,
                pageSize,
                filterBy,
                sortBy: '',
                isAscending: true,
                includePhoto: false,
            },
            { signal }
        );
    }, []);

    return useFetchData(fetchFunction, { filterBy, pageSize, componentKey });
};

export default useUsersFetch;
