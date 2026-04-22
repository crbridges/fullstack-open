import axios from "axios";
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseUrl)
}

const create = (entry) => {
    return axios.post(baseUrl, entry)
}


export default { getAll, create }