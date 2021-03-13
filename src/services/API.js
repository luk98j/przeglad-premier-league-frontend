import http from "../http-common.js";

const API = {
    temp: () => http.get('/private/temp'),
    publicTemp: () => http.get('/public/temp'),
}

export default API;