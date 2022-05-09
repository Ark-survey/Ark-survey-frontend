import { configureStore } from '@reduxjs/toolkit'

import optReducer from './slice/optSlice'
import filterReducer from './slice/filterSlice'
import tiersReducer from './slice/tierSlice'

export const store = configureStore({
  reducer: {
    opts: optReducer,
    filters: filterReducer,
    tiers: tiersReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch