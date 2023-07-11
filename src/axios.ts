import axios from "axios";
const axiosInstanceBackend = axios.create({ baseURL: process.env.NEXT_PUBLIC_SERVER_URL as string });
export default axiosInstanceBackend;
