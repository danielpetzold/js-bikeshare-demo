import axios from 'axios';

const baseApiUrl =
  'http://jrs-bikes-elasticl-1k5yhf91vrjuo-1806919984.us-east-2.elb.amazonaws.com/bikeshare-api';

export const getSessionId = (cb: Function) => {
  axios
    .get(`${baseApiUrl}/session`, { withCredentials: true })
    .then(res => {
      cb(res.data.sessionToken);
    })
    .catch(err => console.log(err));
};
