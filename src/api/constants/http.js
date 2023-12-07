import axios from "axios";
import { BASE_URL } from "../../config";

export const instance = axios.create({ baseURL: BASE_URL, timeout: 80000 });
instance.defaults.baseURL = BASE_URL;
