import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const fetchData = async (endpoint) => {
    try {
        const response = await axios.get(`${API_URL}/${endpoint}`);
        return response.data;
    } catch (error) {
        console.error("API fetch error:", error);
        throw error;
    }
};