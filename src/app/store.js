import { configureStore } from '@reduxjs/toolkit';
import itemReducer from '../features/items/itemSlice';
import openaiReducer from '../features/openai/openaiSlice';

export const store = configureStore({
  reducer: {
    items: itemReducer,
    openai: openaiReducer,
  },
});
