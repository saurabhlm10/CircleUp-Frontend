import axios from "axios";
const axiosInstanceBackend = axios.create({ baseURL: process.env.NEXT_PUBLIC_SERVER_URL as string });
// console.log(process.env.NEXT_PUBLIC_SERVER_URL)
export default axiosInstanceBackend;
