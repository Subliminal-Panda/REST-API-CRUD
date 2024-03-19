import { Dispatch } from 'redux';

import { ActionTypes, File, FileActionTypes } from '../types/fileType';
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
      const response = await fetchFilesAPI();
      const files = response.data;
      dispatch(fetchFilesSuccess(files));
    } catch (error: any) {
      dispatch(fetchFilesFailure(error.message));
    }
  };
};