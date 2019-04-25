import axios from 'axios';
import { StationStatus } from '../components/CheckInModal/CheckInModal.types';

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
    .catch(err => console.log(err));
};

export const getStationStatus = (id: number | null, cb: Function) => {
  axios
    .get(`/station-status/${id}`, options)
    .then(res => {
      cb(res.data);
    })
    .catch(err => console.log(err));
};

export const postStationStatus = (stationStatus: StationStatus) => {
  fetch(`${baseURL}/station-status`, {
    method: 'POST',
    body: JSON.stringify(stationStatus),
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  }).catch(err => console.log(err));
};
