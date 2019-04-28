import axios from 'axios';
import { StationStatus } from '../components/CheckInModal/CheckInModal.types';
import { SendToStationPayload } from "../components/SendToStationModal/SendToStationModal.types";

interface Options {
  baseURL: string | undefined;
  withCredentials: boolean;
}

let baseURL = process.env.REACT_APP_API_URL;

let options: Options = {
  baseURL: baseURL,
  withCredentials: true
};

export const getSessionId = (cb: Function) => {
  axios
    .get('/session', options)
    .then(res => {
      cb(res.data.sessionToken);
    })
    .catch(err => console.error(err));
};

export const getStationStatus = (id: number | null, cb: Function) => {
  axios
    .get(`/station-status/${id}`, options)
    .then(res => {
      cb(res.data);
    })
    .catch(err => console.error(err));
};

export const postStationStatus = (stationStatus: StationStatus) => {
  fetch(`${baseURL}/station-status`, {
    method: 'POST',
    body: JSON.stringify(stationStatus),
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  }).catch(err => console.error(err));
};

export const setRouteStop = (sendToStationPayload: SendToStationPayload) => {
  fetch(`${baseURL}/route-stop`, {
    method: 'POST',
    body: JSON.stringify(sendToStationPayload),
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  }).catch(err => console.error(err));
};

export const getDriverNotifications = async () => {
  const response: any = await fetch(`${baseURL}/route-stops/session`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  }).catch(err => console.error(err));
  return await response.json();
};
