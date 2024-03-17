import { Tag } from "../types/Tag";

// Define action types
enum ActionTypes {
  FETCH_TAGS_SUCCESS = 'FETCH_TAGS_SUCCESS',
  ADD_TAG_SUCCESS = 'ADD_TAG_SUCCESS',
  UPDATE_TAG_SUCCESS = 'UPDATE_TAG_SUCCESS',
  DELETE_TAG_SUCCESS = 'DELETE_TAG_SUCCESS'
}

// Define action creators
export const fetchTagsSuccess = (tags: Tag[]) => ({
  type: ActionTypes.FETCH_TAGS_SUCCESS,
  payload: tags
});

export const addTagSuccess = (tag: Tag) => ({
  type: ActionTypes.ADD_TAG_SUCCESS,
  payload: tag
});

export const updateTagSuccess = (tag: Tag) => ({
  type: ActionTypes.UPDATE_TAG_SUCCESS,
  payload: tag
});

export const deleteTagSuccess = (id: number) => ({
  type: ActionTypes.DELETE_TAG_SUCCESS,
  payload: id
});

// Define initial state
const initialState: Tag[] = [];

// Define reducer
const tagsReducer = (state: Tag[] = initialState, action: any) => {
  switch (action.type) {
    case ActionTypes.FETCH_TAGS_SUCCESS:
      return action.payload;
    case ActionTypes.ADD_TAG_SUCCESS:
      return [...state, action.payload];
    case ActionTypes.UPDATE_TAG_SUCCESS:
      return state.map(tag =>
        tag.id === action.payload.id ? action.payload : tag
      );
    case ActionTypes.DELETE_TAG_SUCCESS:
      return state.filter(tag => tag.id !== action.payload);
    default:
      return state;
  }
};

export default tagsReducer;