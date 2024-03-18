import { ActionTypes, File, FileActionTypes } from '../types/FileType';
// import { ActionTypes } from '../types/types';
import { Dispatch } from 'redux';
import { fetchFilesAPI } from '../../services/fileService';

export const fetchFilesRequest = (): FileActionTypes => ({
  type: ActionTypes.FETCH_FILES_REQUEST,
});

export const fetchFilesSuccess = (files: File[]): FileActionTypes => ({
  type: ActionTypes.FETCH_FILES_SUCCESS,
  payload: files,
});

export const fetchFilesFailure = (error: string): FileActionTypes => ({
  type: ActionTypes.FETCH_FILES_FAILURE,
  error,
});

export const fetchFiles = () => {
  return async (dispatch: Dispatch<FileActionTypes>) => {
    dispatch(fetchFilesRequest());
    try {
      const response = await fetchFilesAPI(); // Assuming fetchFilesAPI is a function to fetch files from the API
      const files = response.data; // Assuming response.data contains an array of files
      dispatch(fetchFilesSuccess(files));
    } catch (error: any) {
      dispatch(fetchFilesFailure(error.message));
    }
  };
};