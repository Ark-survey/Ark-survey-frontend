import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

import characterReducer from './slice/characterSlice';
import filterReducer from './slice/filterSlice';
import TierListReducer from './slice/TierListSlice';
import userReducer from './slice/userSlice';
import settingReducer from './slice/settingSlice';
import TierListStatisticsReducer from './slice/TierListStatisticsSlice';
import CharBoxReducer from './slice/charBoxSlice';

const reducers = combineReducers({
  characters: characterReducer,
  filters: filterReducer,
  tierList: TierListReducer,
  tierListStatistics: TierListStatisticsReducer,
  charBox: CharBoxReducer,
  user: userReducer,
  setting: settingReducer,
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

export const persistor = persistStore(store);

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
