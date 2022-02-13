import axios from "axios";

const api = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? 'https://assembly-votes.herokuapp.com' : 'http://192.168.100.159:8080'
})
  
export default api;