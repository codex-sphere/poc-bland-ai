import axios from 'axios';

const API_KEY = process.env.REACT_APP_API_KEY;
const API_URL = process.env.REACT_APP_API_URL;

const headers = {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json',
}

export const postAPI = async (endpoint, body) => {
    try {
        const response = await axios.post(`${API_URL + endpoint}`, {
            ...body,
        }, {
            headers
        });
        return response.data;
    } catch (error) {
        console.error("API fetch error:", error);
        throw error;
    }
};

export const getAPI = async (endpoint) => {
    try {
        const response = await axios.get(`${API_URL + endpoint}`, {
            headers
        });
        return response.data;
    } catch (error) {
        console.error("API fetch error:", error);
        throw error;
    }
};