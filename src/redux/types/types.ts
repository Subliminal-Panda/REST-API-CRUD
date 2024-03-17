// Define types for Tag
export interface Tag {
    id: number;
    name: string;
  }
  
  // Define types for actions
  export enum ActionTypes {
    FETCH_TAGS_REQUEST = 'FETCH_TAGS_REQUEST',
    FETCH_TAGS_SUCCESS = 'FETCH_TAGS_SUCCESS',
    FETCH_TAGS_FAILURE = 'FETCH_TAGS_FAILURE',
  }
  
  interface FetchTagsRequestAction {
    type: ActionTypes.FETCH_TAGS_REQUEST;
  }
  
  interface FetchTagsSuccessAction {
    type: ActionTypes.FETCH_TAGS_SUCCESS;
    payload: Tag[]; // Array of fetched tags
  }
  
  interface FetchTagsFailureAction {
    type: ActionTypes.FETCH_TAGS_FAILURE;
    error: string; // Error message
  }
  
  export type TagActionTypes =
    | FetchTagsRequestAction
    | FetchTagsSuccessAction
    | FetchTagsFailureAction;