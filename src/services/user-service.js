import axios from "axios";
import authHeader from '../common/authHeader';

const API_URL = "http://localhost:8080/api/test/";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

const getUsers = () => {
  return axios.get(API_URL + "users", { headers: authHeader() });
};

const getUser = (userId) => {
  return axios.get(`${API_URL}user/${userId}`, { headers: authHeader() });
};

const UserService = {
  getPublicContent,
  getUserBoard,
  getAdminBoard,
  getUsers,
  getUser
}

export default UserService;