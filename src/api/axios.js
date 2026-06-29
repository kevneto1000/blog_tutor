import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const api = axios.create({
    baseURL: backendUrl + "api"
});

export default api;