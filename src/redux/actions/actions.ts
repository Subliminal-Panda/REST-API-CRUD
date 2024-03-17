import { ActionTypes, TagActionTypes } from '../types/types';
import { Dispatch } from 'redux';
import { Tag } from '../types/types';
import { fetchTagsAPI } from '../../services/tagService';

export const fetchTagsRequest = (): TagActionTypes => ({
  type: ActionTypes.FETCH_TAGS_REQUEST,
});

export const fetchTagsSuccess = (tags: Tag[]): TagActionTypes => ({
  type: ActionTypes.FETCH_TAGS_SUCCESS,
  payload: tags,
});

export const fetchTagsFailure = (error: string): TagActionTypes => ({
  type: ActionTypes.FETCH_TAGS_FAILURE,
  error,
});

export const fetchTags = () => {
  return async (dispatch: Dispatch<TagActionTypes>) => {
    dispatch(fetchTagsRequest());
    try {
      const response = await fetchTagsAPI(); // Assuming fetchTagsAPI is a function to fetch tags from the API
      const tags = response.data; // Assuming response.data contains an array of tags
      dispatch(fetchTagsSuccess(tags));
    } catch (error: any) {
      dispatch(fetchTagsFailure(error.message));
    }
  };
};