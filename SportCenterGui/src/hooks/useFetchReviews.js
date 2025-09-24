import { useCallback } from 'react';
import useFetchData from './useFetchData';
import { reviewAPI } from '../services/api';

const useFetchReviews = (trainerId, initialPageSize = 10, componentKey) => {
  const fetchFunction = useCallback(async ({ pageNumber, signal }) => {
    if (!trainerId) {
      throw new Error('TrainerId is required');
    }
    
    // Use consistent page size for all loads
    const response = await reviewAPI.getReviews(trainerId, { pageNumber, pageSize: initialPageSize }, { signal });
    console.log(`Reviews page ${pageNumber} (size: ${initialPageSize}) from API:`, response);
    return response.data || response; // Handle different response structures
  }, [trainerId, initialPageSize]);

  return useFetchData(fetchFunction, { pageSize: initialPageSize, componentKey });
};

export default useFetchReviews;
