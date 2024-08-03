// utils/auth.js
import {jwtDecode} from 'jwt-decode';

export const getUsernameFromToken = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
        const decoded = jwtDecode(token);
        return decoded.username; // Make sure this matches the key in your JWT payload
    } catch (error) {
        console.error('Failed to decode token:', error);
        return null;
    }
};
