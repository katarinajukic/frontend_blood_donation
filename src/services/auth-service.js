import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";


const register = (username, email, password,name,surname,gender,dateOfBirth,phoneNumber,address,bloodType,rhFactor,consent ) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
    name,
    surname,
    gender,
    dateOfBirth,
    phoneNumber,
    address,
    bloodType,
    rhFactor,
    consent 
  });
};


const login = (username, password) => {
  return axios
    .post(API_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};


const logout = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    const config = {
      headers: {
        Authorization: "Bearer " + user.accessToken,
      },
    };

    localStorage.removeItem("user");

    return axios.post(API_URL + "signout", null, config).then((response) => {
      return response.data;
    });
  } else {
    return Promise.resolve();
  }
};


const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};



const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
}

export default AuthService;