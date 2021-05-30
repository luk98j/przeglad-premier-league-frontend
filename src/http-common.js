import axios from "axios";
import authHeader from "../src/services/auth-header.js"

const http = axios.create({
  baseURL: "http://localhost:7071/rest/api",
  headers: {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Authorization": authHeader().Authorization
  }
});

  
export default http;