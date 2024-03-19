import { combineReducers, configureStore } from '@reduxjs/toolkit';

import filesReducer from '../reducers/filesReducer';

const rootReducer = combineReducers({
  files: filesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer, 
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    thunk: undefined
  })
});

export default store;