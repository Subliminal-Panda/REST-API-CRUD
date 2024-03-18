import axios from 'axios';

// Assuming your API endpoint for fetching tags is '/api/tags'
const FILES_API_URL = '/api/files';

// Function to fetch tags from the API
export const fetchFilesAPI = async () => {
  try {
    const response = await axios.get(FILES_API_URL);
    return response.data; // Assuming the response contains data with an array of files
  } catch (error) {
    throw new Error('Failed to fetch files');
  }
};