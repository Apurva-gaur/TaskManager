import axios from "axios"

const ClientApi = axios.create({
    baseURL: "http://localhost:3000/api/v1",
    withCredentials: true
})

export default ClientApi