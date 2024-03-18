import { File } from "../types/FileType";

// Define action types
enum ActionTypes {
  FETCH_FILES_SUCCESS = 'FETCH_FILES_SUCCESS',
  ADD_FILE_SUCCESS = 'ADD_FILE_SUCCESS',
  UPDATE_FILE_SUCCESS = 'UPDATE_FILE_SUCCESS',
  DELETE_FILE_SUCCESS = 'DELETE_FILE_SUCCESS'
}

// Define action creators
export const fetchFilesSuccess = (files: File[]) => ({
  type: ActionTypes.FETCH_FILES_SUCCESS,
  payload: files
});

export const addFileSuccess = (file: File) => ({
  type: ActionTypes.ADD_FILE_SUCCESS,
  payload: file
});

export const updateFileSuccess = (file: File) => ({
  type: ActionTypes.UPDATE_FILE_SUCCESS,
  payload: file
});

export const deleteFileSuccess = (filePath: string) => ({
  type: ActionTypes.DELETE_FILE_SUCCESS,
  payload: filePath
});

// Define initial state
const initialState: File[] = [];

// Define reducer
const filesReducer = (state: File[] = initialState, action: any) => {
  switch (action.type) {
    case ActionTypes.FETCH_FILES_SUCCESS:
      return action.payload;
    case ActionTypes.ADD_FILE_SUCCESS:
      return [...state, action.payload];
    case ActionTypes.UPDATE_FILE_SUCCESS:
      return state.map(file =>
        file.filePath === action.payload.filePath ? action.payload : file
      );
    case ActionTypes.DELETE_FILE_SUCCESS:
      return state.filter(file => file.filePath !== action.payload);
    default:
      return state;
  }
};

export default filesReducer;