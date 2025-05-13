import axios from 'axios';

const API_URL = 'https://pims-d.onrender.com/inventory';

export const fetchInventory = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

export const deleteInventory = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting data:", error);
        throw error;
    }
};