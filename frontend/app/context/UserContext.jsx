'use client';
import { createContext, useEffect, useState } from "react";
import { getMe } from "../lib/actions/auth";

const initialData = {
    _id: '',
    name: '',
    email:'',
    image: '',
    createdAt: '',
    isLoggedIn: false
}

export const UserContext = createContext();

export default function UserProvider({ children }) {

    const [user, setUser] = useState(initialData);

    useEffect(() => {
        fetchAuth();
    }, []);

    const fetchAuth = async () => {
        try {
            const response = await getMe();
            loginUser(response.data.data);
        } catch (error) {
            logoutUser();
        }
    }

    const loginUser = (data) => {
        setUser((prev)=> ({...prev, ...data, isLoggedIn: true}));
    }

    const logoutUser = () => {
        setUser(initialData);
    }

    return <UserContext.Provider value={{user, loginUser, logoutUser}}>
        {children}
    </UserContext.Provider>
} 