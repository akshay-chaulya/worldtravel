import axios from "axios";
import { apiUrl } from "../config";

export const authApi = axios.create({ baseURL: `${apiUrl}/auth` });

export const userApi = axios.create({ baseURL: `${apiUrl}/user` });

export const citiesApi = axios.create({ baseURL: `${apiUrl}/user/cities` });
