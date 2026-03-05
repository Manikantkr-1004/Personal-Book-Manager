import axios from "axios"

const BACKEND_API = '/api/auth';

export const signup = async (data) => {
    return await axios.post(`${BACKEND_API}/signup`, data, {
        withCredentials: true
    })
}

export const login = async (data) => {
    return await axios.post(`${BACKEND_API}/login`, data, {
        withCredentials: true
    })
}

export const logout = async () => {
    return await axios.post(`${BACKEND_API}/logout`, {}, {
        withCredentials: true
    })
}

export const getMe = async () => {
    return await axios.get(`${BACKEND_API}`, {
        withCredentials: true
    })
}