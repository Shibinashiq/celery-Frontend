import axios from "axios";
import dayjs from 'dayjs';
import { jwtDecode } from 'jwt-decode';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://127.0.0.1:8000";

const useAxios = () => {
  const navigate = useNavigate();
  
  const authState = JSON.parse(localStorage.getItem('authState')) || {};

  if (!authState.access || !authState.refresh) {
    navigate('/Login');

    return axios.create({ baseURL: BASE_URL }); 
  }

  const { access, refresh } = authState;

  let access_token = access;
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: { Authorization: `Bearer ${access_token}` }
  });

  axiosInstance.defaults.withCredentials = true;

  axiosInstance.interceptors.request.use(async req => {
    const { access, refresh } = authState; 

    access_token = access;
    const refresh_token = refresh;

    if (access) {
      const user = jwtDecode(access_token);
      const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

      if (isExpired) {
        try {
          const response = await axios.post(`http://127.0.0.1:8000/User/refresh/`, {
            refresh: refresh_token
          });

          localStorage.setItem("access_token", response.data.access);
          localStorage.setItem("refresh_token", response.data.refresh);
          req.headers.Authorization = `Bearer ${response.data.access}`;
          access_token = response.data.access; 
          return req;
        } catch (error) {
          console.error('Refresh token failed:', error);
          localStorage.removeItem('authState'); 
          navigate('/Login'); 
          return Promise.reject(error); 
        }
      }
    }

    return req;
  });

  return axiosInstance;
};

export default useAxios;
