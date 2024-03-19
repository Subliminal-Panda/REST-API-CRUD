import axios from 'axios';

const FILES_API_URL = '/api/files';

export const fetchFilesAPI = async () => {
  try {
    const response = await axios.get(FILES_API_URL);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch files');
  }
};