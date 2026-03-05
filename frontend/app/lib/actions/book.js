import axios from "axios"

const BACKEND_API = '/api/book';

export const createBook = async (data) => {
    return await axios.post(`${BACKEND_API}`, data, {
        withCredentials: true
    })
}

export const getBooks = async (query) => {
    return await axios.get(`${BACKEND_API}`, {
        withCredentials: true,
        params: query,
    })
}

export const updateBook = async (id, data) => {
    return await axios.put(`${BACKEND_API}/${id}`, data, {
        withCredentials: true
    })
}

export const deleteBook = async (id) => {
    return await axios.delete(`${BACKEND_API}/${id}`, {
        withCredentials: true
    })
}