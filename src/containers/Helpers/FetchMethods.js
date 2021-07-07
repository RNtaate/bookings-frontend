import axios from 'axios';
import API_URL from './HelperConstants';

const usingAxios = (endpoint, method, dataObj = null) => {
  switch (method) {
    case 'post':
      return axios.post(`${API_URL}/${endpoint}`, dataObj, { withCredentials: true });
    case 'get':
      return axios.get(`${API_URL}/${endpoint}`, { withCredentials: true });
    case 'delete':
      return axios.delete(`${API_URL}/${endpoint}`, { withCredentials: true });
    default:
      return null;
  }
};

export const logInUser = (user) => {
  const response = usingAxios('sessions', 'post', user);

  return response;
};

export const signUpUser = (user) => {
  const response = usingAxios('registrations', 'post', user);

  return response;
};

export const createAppointment = (appointmentObject) => {
  const response = usingAxios('appointments', 'post', appointmentObject);

  return response;
};

export const createMassage = (massageData) => {
  const response = axios({
    method: 'post',
    url: `${API_URL}/massages`,
    data: massageData,
    headers: { 'Content-Type': 'multipart/form-data' },
    withCredentials: true,
  });

  return response;
};

export const getAppointmentsList = () => usingAxios('appointments', 'get');

export const logOutUser = () => usingAxios('destroy', 'delete');

export const getMassageTypes = () => usingAxios('massages', 'get');

export const getMassageType = (id) => usingAxios(`massages/${id}`, 'get');
