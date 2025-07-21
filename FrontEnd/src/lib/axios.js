import axios from "axios";

// in production, there's no localhost so we have to make this dynamic
const Api = axios.create({
    baseURL: "http://localhost:3001/api"
})

export default Api;