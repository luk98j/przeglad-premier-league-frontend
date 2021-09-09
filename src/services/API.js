import { HttpSharp } from "@material-ui/icons";
import http from "../http-common.js";

const API = {
    getAllSeasonPeriod: () => http.get('/public/season-list'),
    getDetailsAboutSeason: (period) => http.get('/public/season-table?period='+period),
    getAllSeasonPeriodPrivate: () => http.get('/private/archive/season-list'),
    getDetailsAboutOldSeason: (period) => http.get('/private/archive/season-table?period='+period),
    getLeagueMatches: (period) => http.get('/public/season-matches?period='+period),
    sendPost: (post) => {
        var formData = new FormData();
        return http.post('/public/upload', post,
         {
            headers: {
                "Content-Type": "application/json;charset=UTF-8/form-data",
              },
         })
    .then(response => {return (response)})
    .catch(error => {
        console.error('There was an error!', error);
    })},
    getPosts: () => http.get('/public/posts'),
}

export default API;