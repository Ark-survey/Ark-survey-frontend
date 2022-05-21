import { combineReducers, configureStore } from '@reduxjs/toolkit';

import characterReducer from './slice/characterSlice';
import filterReducer from './slice/filterSlice';
import tiersReducer from './slice/tierSlice';
import tierListTypeReducer from './slice/tierListTypeSlice';
import userReducer from './slice/userSlice';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

const reducers = combineReducers({
  characters: characterReducer,
  filters: filterReducer,
  userTierList: tiersReducer,
  tierListType: tierListTypeReducer,
  user: userReducer,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
