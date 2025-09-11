import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

let onUnauthorized = null;

// Helper function to convert byte array to data URL
const convertByteArrayToDataUrl = (data, contentType = 'image/jpeg') => {
  if (!data) {
    return null;
  }
  
  // If it's already a base64 string, just add the data URL prefix
  if (typeof data === 'string') {
    return `data:${contentType};base64,${data}`;
  }
  
  // If it's a byte array, convert to base64
  if (Array.isArray(data)) {
    const base64String = btoa(String.fromCharCode(...data));
    return `data:${contentType};base64,${base64String}`;
  }
  
  return null;
};

export const setUnauthorizedHandler = (callback) => {
  onUnauthorized = callback;
};

const apiPublic = axios.create({
  baseURL: API_BASE_URL,
});

const apiAuth = axios.create({
  baseURL: API_BASE_URL,
});

apiAuth.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwt');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

[apiAuth, apiPublic].forEach((instance) =>
  instance.interceptors.response.use(
    (res) => res,
    (err) => {
      if (err.response?.status === 401) {
        if (onUnauthorized) {
          onUnauthorized();
        } else {
          localStorage.removeItem('jwt');
          window.location.href = '/login';
        }
      }
      return Promise.reject(err);
    }
  )
);

export const authAPI = {
  register: async (data) => (await apiPublic.post('/auth/register', data)).data,
  login: async (data) => (await apiPublic.post('/auth/login', data)).data,
  getCurrentUser: async () => (await apiAuth.get('/auth/me')).data,
};

export const bmiAPI = {
  calculate: async (data) => (await apiPublic.post('/bmi/calculate', data)).data,
  save: async (data) => (await apiAuth.post('/bmi/save', data)).data,
  get: async () => {
    try {
      const data = (await apiAuth.get('/bmi/get')).data;
      return { hasBmi: true, ...data };
    } catch (err) {
      if (err?.response?.status === 404) {
        return { hasBmi: false, BmiCalcResult: '', BmiMsg: '' };
      }
      throw err;
    }
  },
};

export const trainerAPI = {
  getAll: async (
    { pageNumber, pageSize, filterBy, sortBy, isAscending, includePhoto },
    { signal } = {}
  ) => {
    const params = {
      PageNumber: pageNumber,
      PageSize: pageSize,
      ...(filterBy !== undefined && filterBy !== null && filterBy !== '' ? { FilterBy: filterBy } : {}),
      ...(sortBy !== undefined && sortBy !== null && sortBy !== '' ? { SortBy: sortBy } : {}),
      ...(typeof isAscending === 'boolean' ? { IsAscending: isAscending } : {}),
      ...(typeof includePhoto === 'boolean' ? { IncludePhoto: includePhoto } : {}),
    };
    return (await apiAuth.get('/Trainer/getAll', { params, signal })).data;
  },
  becomeTrainer: async ({ city, country, userSportType, trainerPhoto, avatarPhoto, coverPhoto }) => {
    const sportTypeMap = {
      gym: 'Gym',
      kickboxing: 'Kickboxing',
      crossfit: 'Crossfit',
    };
    const normalizedSportType = userSportType ? sportTypeMap[userSportType] || userSportType : null;

    const formData = new FormData();

    if (city !== undefined && city !== null && city !== '') formData.append('City', city);
    if (country !== undefined && country !== null && country !== '') formData.append('Country', country);
    if (normalizedSportType) formData.append('UserSportType', normalizedSportType);
    if (coverPhoto) formData.append('CoverPhoto', coverPhoto);
    if (avatarPhoto) formData.append('AvatarPhoto', avatarPhoto);
    if (trainerPhoto) formData.append('TrainerPhoto', trainerPhoto);
    return (
      await apiAuth.post('/trainer/become', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
    ).data;
  },
};

export const adminAPI = {
  getTrainerRequests: async ({ pageNumber, pageSize }, { signal } = {}) => {
    const params = {
      PageNumber: pageNumber,
      PageSize: pageSize,
    };
    return (await apiAuth.get('/admin/trainer-requests', { params, signal })).data;
  },
  getTrainerRequestPhotos: async (requestId, { signal } = {}) => {
    const response = await apiAuth.get(`/admin/trainer-requests/${requestId}/photos`, { signal });
    const photoData = response.data;
    
    console.log('Raw photo data from API:', photoData);
    
    const processedPhotos = {};
    
    if (photoData.coverPhoto) {
      processedPhotos.coverPhotoUrl = convertByteArrayToDataUrl(photoData.coverPhoto, photoData.coverPhotoContentType || 'image/jpeg');
      console.log('Processed cover photo:', processedPhotos.coverPhotoUrl);
    }
    
    if (photoData.avatarPhoto) {
      processedPhotos.avatarPhotoUrl = convertByteArrayToDataUrl(photoData.avatarPhoto, photoData.avatarPhotoContentType || 'image/jpeg');
      console.log('Processed avatar photo:', processedPhotos.avatarPhotoUrl);
    }
    
    if (photoData.trainerPhoto) {
      processedPhotos.trainerPhotoUrl = convertByteArrayToDataUrl(photoData.trainerPhoto, photoData.trainerPhotoContentType || 'image/jpeg');
      console.log('Processed trainer photo:', processedPhotos.trainerPhotoUrl);
    }
    
    console.log('Final processed photos:', processedPhotos);
    return processedPhotos;
  },
  acceptTrainerRequest: async (requestId) => {
    return (await apiAuth.post(`/admin/trainer-requests/${requestId}/accept`)).data;
  },
  rejectTrainerRequest: async (requestId) => {
    return (await apiAuth.post(`/admin/trainer-requests/${requestId}/reject`)).data;
  },
};

export { apiAuth, apiPublic };