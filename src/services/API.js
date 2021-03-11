import React from 'react';
import http from "../http-common.js";

export function temp(){
    return http.get("/temp").then((response) => response.data)
}
