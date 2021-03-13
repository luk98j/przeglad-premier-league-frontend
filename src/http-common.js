import axios from "axios";
import authHeader from "../src/services/auth-header.js"

const http = axios.create({
  baseURL: "http://localhost:7070/rest/api",
  headers: {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Authorization": `Bearer ${authHeader()}`
  }
});

  
export default http;