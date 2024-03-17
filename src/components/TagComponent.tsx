// Import necessary libraries
import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { RootState } from '../redux/store/store';
import styles from '../features/counter/Counter.module.css'

// Define interface for tag object
interface Tag {
  id: number;
  name: string;
}

// Define action types
enum ActionTypes {
  FETCH_TAGS_SUCCESS = 'FETCH_TAGS_SUCCESS',
  ADD_TAG_SUCCESS = 'ADD_TAG_SUCCESS',
  UPDATE_TAG_SUCCESS = 'UPDATE_TAG_SUCCESS',
  DELETE_TAG_SUCCESS = 'DELETE_TAG_SUCCESS'
}

// Define action creators
const fetchTagsSuccess = (tags: Tag[]) => ({
  type: ActionTypes.FETCH_TAGS_SUCCESS,
  payload: tags
});

const addTagSuccess = (tag: Tag) => ({
  type: ActionTypes.ADD_TAG_SUCCESS,
  payload: tag
});

const updateTagSuccess = (tag: Tag) => ({
  type: ActionTypes.UPDATE_TAG_SUCCESS,
  payload: tag
});

const deleteTagSuccess = (id: number) => ({
  type: ActionTypes.DELETE_TAG_SUCCESS,
  payload: id
});

// Define reducer
const tagsReducer = (state: Tag[] = [], action: any) => {
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

// Component
function TagComponent() {
  const [tagName, setTagName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const tags = useSelector((state: RootState) => state.tags);

  useEffect(() => {
    // Fetch tags on component mount
    fetchTags();
  }, []);

  const fetchTags = async () => {
    try {
      const response = await axios.get<Tag[]>('api.optilogic.app/v0/storage/{storageName}/tags');
      dispatch(fetchTagsSuccess(response.data));
    } catch (error) {
      console.error('Error fetching tags:', error);
    }
  };

  const handleAddTag = async () => {
    try {
      const response = await axios.post<Tag>('api.optilogic.app/v0/storage/{storageName}/tags', {
        name: tagName
      });
      dispatch(addTagSuccess(response.data));
      setTagName('');
      handleCloseModal();
    } catch (error) {
      console.error('Error adding tag:', error);
    }
  };

  const handleUpdateTag = async (updatedTag: Tag) => {
    try {
      const response = await axios.patch<Tag>(
        `api.optilogic.app/v0/storage/{storageName}/tags/${updatedTag.id}`,
        updatedTag
      );
      dispatch(updateTagSuccess(response.data));
    } catch (error) {
      console.error('Error updating tag:', error);
    }
  };

  const handleDeleteTag = async (id: number) => {
    try {
      await axios.delete(`api.optilogic.app/v0/storage/{storageName}/tags/${id}`);
      dispatch(deleteTagSuccess(id));
    } catch (error) {
      console.error('Error deleting tag:', error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <Button variant="primary" onClick={() => setShowModal(true)}>Add Tag</Button>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Tag</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            placeholder="Enter tag name"
            value={tagName}
            onChange={e => setTagName(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
          <Button variant="primary" onClick={handleAddTag}>Add</Button>
        </Modal.Footer>
      </Modal>
      <ul>
      {tags ? (
          tags.map((tag: Tag) => (
            <li key={tag.id}>
              {tag.name}
              <Button variant="warning" onClick={() => handleUpdateTag(tag)}>Edit</Button>
              <Button variant="danger" onClick={() => handleDeleteTag(tag.id)}>Delete</Button>
            </li>
          ))
        ) : (
          <li>No tags found</li>
        )}
      </ul>
    </div>
  );
};

export default TagComponent;
