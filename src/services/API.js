import http from "../http-common.js";

const API = {
    temp: () => http.get('/private/temp'),
    publicTemp: () => http.get('/public/temp'),
    getAllSeasonPeriod: () => http.get('/public/season-list'),
}

export default API;