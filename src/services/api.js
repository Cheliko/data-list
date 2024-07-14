import axios from 'axios';

const API_URL = '/angular_react_Response.json';

export const fetchData = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const updateItem = async (item) => {
  try {
  //todo: update json file with updated date
  } catch (error) {
    console.error('Error updating item:', error);
    throw error;
  }
};

