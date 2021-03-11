import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:7070/rest/api",
  headers: {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*"
  }
});