import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const generateResponse = createAsyncThunk(
  'openai/generate',
  async (prompt) => {
    const res = await axios.post('http://localhost:8000/api/openai/generate', { prompt });
    return res.data.data.response; // ✅ fixed path
  }
);

const openaiSlice = createSlice({
  name: 'openai',
  initialState: { response: '', loading: false },
  extraReducers: (builder) => {
    builder
      .addCase(generateResponse.pending, (state) => {
        state.loading = true;
        state.response = '';
      })
      .addCase(generateResponse.fulfilled, (state, action) => {
        state.loading = false;
        state.response = action.payload;
      })
      .addCase(generateResponse.rejected, (state) => {
        state.loading = false;
        state.response = 'Error generating response';
      });
  },
});

export default openaiSlice.reducer;
