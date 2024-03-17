import axios from 'axios';

// Assuming your API endpoint for fetching tags is '/api/tags'
const TAGS_API_URL = '/api/tags';

// Function to fetch tags from the API
export const fetchTagsAPI = async () => {
  try {
    const response = await axios.get(TAGS_API_URL);
    return response.data; // Assuming the response contains data with an array of tags
  } catch (error) {
    throw new Error('Failed to fetch tags');
  }
};