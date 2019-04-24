import axios from 'axios';
import { StationStatus } from '../components/CheckInModal/CheckInModal.types';

interface Options {
  baseURL: string | undefined;
  withCredentials: boolean;
  data: any;
  headers: any;
}

let baseURL = process.env.REACT_APP_API_URL;

let options: Options = {
  baseURL: baseURL,
  withCredentials: true,
  data: {},
  headers: {
    'Content-Type': 'application/json'
  }
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
  options.data = stationStatus;
  console.log('options: ', options);
  axios
    .post(`${baseURL}/station-status`, {
      data: stationStatus,
      withCredentials: true
    })
    .then(res => {
      // options.data = {};
      // figure out if we need to get a response
      console.log('res: ', res);
    })
    .catch(err => console.log(err));
};
