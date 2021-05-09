  export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('REACT_TOKEN_AUTH'));
    
    if (user && user.token) {
      return  user.token ; // for Spring Boot back-end
    } else {
      return {};
    }
  }