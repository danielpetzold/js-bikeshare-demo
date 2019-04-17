import axios from 'axios';

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
