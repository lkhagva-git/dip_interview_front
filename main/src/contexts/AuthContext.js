import React, { createContext, useState, useEffect, useContext } from 'react';
import { getRequest } from '../utils';

const AuthContext = createContext();

// Custom Hook to use AuthContext
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        token: localStorage.getItem('token'),
        profile: null,
    });
    console.log("auth", auth)
    useEffect(() => {
        const fetchProfile = async () => {
            if (auth.token) {
                try {
                    const response = await getRequest('/api/profile_data/');
                    console.log("response profile", response)

                    setAuth((prevAuth) => ({ ...prevAuth, profile: response }));
                } catch (error) {
                    console.error('Failed to fetch profile data:', error);
                    logout(); // Clear token if profile fetch fails
                }
            }
        };

        fetchProfile();
    }, [auth.token]);

    const login = (token) => {
        localStorage.setItem('token', token);
        setAuth({ token, profile: null }); 
    };

    const logout = () => {
        localStorage.removeItem('token');
        setAuth({ token: null, profile: null });
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
