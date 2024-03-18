import filesReducer from '../reducers/filesReducer';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

// Root reducer combining all reducers
const rootReducer = combineReducers({
  files: filesReducer,
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