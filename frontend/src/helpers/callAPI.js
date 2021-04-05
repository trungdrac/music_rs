import axios from "axios";
export default function callAPI(method, url, data = {}) {
  return axios({
    method: method,
    url: url,
    data: data,
  }).catch((err) => console.error(err));
}
