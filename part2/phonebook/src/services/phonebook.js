import axios from "axios";
const baseUrl = 'http://localhost:3001/api/persons'

const getAll = () => {
    return axios.get(baseUrl)
}

const create = (entry) => {
    return axios.post(baseUrl, entry)
}

const deleteNumber = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

const updateNumber = (entry) => {
    return axios.put(`${baseUrl}/${entry.id}`, entry)
}

export default { getAll, create, deleteNumber, updateNumber }