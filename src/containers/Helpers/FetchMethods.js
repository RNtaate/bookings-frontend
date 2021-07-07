import axios from 'axios';
import API_URL from './HelperConstants';

let usingAxios = (endpoint, method, dataObj = null) => {
  switch(method){
    case 'post':
      return axios.post(`${API_URL}/${endpoint}`, dataObj, {withCredentials: true});
    case 'get':
      return axios.get(`${API_URL}/${endpoint}`, {withCredentials: true});
    case 'delete':
      return axios.delete(`${API_URL}/${endpoint}`, {withCredentials: true});
    default:
  }
}

export let logInUser = (user) => {
  let response = usingAxios('sessions', 'post', user);

  return response;
}

export let signUpUser = (user) => {
  let response = usingAxios('registrations', 'post', user);

  return response;
}

export let createAppointment = (appointmentObject) => {
  let response = usingAxios('appointments', 'post', appointmentObject);

  return response;
}

export let createMassage = (massageData) => {
  let response =  axios({
    method: 'post',
    url: `${API_URL}/massages`,
    data: massageData,
    headers: { 'Content-Type': 'multipart/form-data' },
    withCredentials: true,
  })

  return response;
}

export let getAppointmentsList = () => {
  return usingAxios('appointments', 'get');
}

export let logOutUser = () => {
  return usingAxios('destroy', 'delete');
}

export let getMassageTypes = () => {
  return usingAxios('massages', 'get');
}

export let getMassageType = (id) => {
  return usingAxios(`massages/${id}`, 'get');
}