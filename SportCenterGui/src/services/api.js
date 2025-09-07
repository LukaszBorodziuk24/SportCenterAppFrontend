import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

let onUnauthorized = null;

export const setUnauthorizedHandler = (callback) => {
  onUnauthorized = callback;
};

const apiPublic = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

const apiAuth = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
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
  becomeTrainer: async ({ city, country, sportType, trainerPhoto, trainerAvatar, trainerBackground }) => {
    const form = new FormData();
    form.append('City', city);
    form.append('Country', country);
    if (sportType) form.append('SportType', sportType);
    if (trainerPhoto) form.append('TrainerPhoto', trainerPhoto);
    if (trainerAvatar) form.append('TrainerAvatar', trainerAvatar);
    if (trainerBackground) form.append('TrainerBackground', trainerBackground);
    return (
      await apiAuth.post('/Trainer/become', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
    ).data;
  },
};

export { apiAuth, apiPublic };