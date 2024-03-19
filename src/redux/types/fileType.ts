export interface File {
    filename: string;
    directoryPath: string;
    filePath: string;
    contentLength: number;
  }
  
  export enum ActionTypes {
    FETCH_FILES_REQUEST = 'FETCH_FILES_REQUEST',
    FETCH_FILES_SUCCESS = 'FETCH_FILES_SUCCESS',
    FETCH_FILES_FAILURE = 'FETCH_FILES_FAILURE',
  }
  
  interface FetchFilesRequestAction {
    type: ActionTypes.FETCH_FILES_REQUEST;
  }
  
  interface FetchFilesSuccessAction {
    type: ActionTypes.FETCH_FILES_SUCCESS;
    payload: File[]; // Array of fetched tags
  }
  
  interface FetchFilesFailureAction {
    type: ActionTypes.FETCH_FILES_FAILURE;
    error: string; // Error message
  }
  
  export type FileActionTypes =
    | FetchFilesRequestAction
    | FetchFilesSuccessAction
    | FetchFilesFailureAction;