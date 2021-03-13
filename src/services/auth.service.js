import http from "../http-common.js";

// const register = (username, email, password) => {
//   return http.post("/signup", {
//     username,
//     email,
//     password,
//   });
// };

const login = (userName, password) => {
  return http
    .post("/auth/signin", {
      userName,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem('REACT_TOKEN_AUTH', JSON.stringify(response.data));
      }
    });
};

const logout = () => {
  localStorage.removeItem('REACT_TOKEN_AUTH');
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('REACT_TOKEN_AUTH'));
};

export default {
  //register,
  login,
  logout,
  getCurrentUser,
};