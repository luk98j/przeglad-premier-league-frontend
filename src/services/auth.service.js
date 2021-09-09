import axios from "axios";

const API_URL = "http://localhost:7071/rest/api/auth/";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "signin", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password, name, lastName, country, birthDate) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password,
      name,
      lastName,
      country,
      birthDate
    });
  }

  confirm(confirmationID) {
    return axios.post(API_URL + "confirm",{
      confirmationID
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();