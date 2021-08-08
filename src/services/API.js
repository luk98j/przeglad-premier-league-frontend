import http from "../http-common.js";

const API = {
    getAllSeasonPeriod: () => http.get('/public/season-list'),
    getDetailsAboutSeason: (period) => http.get('/public/season-table?period='+period),
    getAllSeasonPeriodPrivate: () => http.get('/private/archive/season-list'),
    getDetailsAboutOldSeason: (period) => http.get('/private/archive/season-table?period='+period),
    getLeagueMatches: (period) => http.get('/public/season-matches?period='+period),
}

export default API;