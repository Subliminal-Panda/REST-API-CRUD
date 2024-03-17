import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import tagsReducer from '../reducers/tagsReducer'; // Assuming you have a separate file for tagsReducer
import { configureStore } from '@reduxjs/toolkit';

// Root reducer combining all reducers
const rootReducer = combineReducers({
  tags: tagsReducer,
});

// Define RootState type
export type RootState = ReturnType<typeof rootReducer>;

// Create Redux store
const store = configureStore({
  reducer: rootReducer, 
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    thunk: undefined
  })
});

export default store;