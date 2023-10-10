import axios from "axios";

export const MainApi = axios.create({
    baseURL: `http://192.168.18.105:321`,
    responseType: 'json'
})