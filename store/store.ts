// store/store.ts
import { configureStore } from '@reduxjs/toolkit';
// Import your reducers here
import fullScreen3DReducer from './slices/fullScreen3DSlice'; 

export const store = configureStore({
  reducer: {
    fullScreen3D: fullScreen3DReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
