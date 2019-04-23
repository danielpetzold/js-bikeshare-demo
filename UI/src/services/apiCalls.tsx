import axios from 'axios';
import { Report } from '../components/CheckInModal/CheckInModal.types';

interface Options {
  baseURL: string | undefined;
  withCredentials: boolean;
}

let options: Options = {
  baseURL: process.env.REACT_APP_API_URL,
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

export const postStationStatus = (finishedReport: Report) => {
  axios
    .post(`/station-status/`, { options, data: finishedReport })
    .then(res => {
      console.log('res: ', res);
    })
    .catch(err => console.log(err));
};
