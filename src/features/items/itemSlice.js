import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchItems = createAsyncThunk(
  "items/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("http://localhost:8000/api/items");
      return res.data;  // full response with { success, status, message, data }
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Fetch failed" });
    }
  }
);



export const addItem = createAsyncThunk(
  "items/add",
  async (item, { rejectWithValue }) => {
    try {
      const res = await axios.post("http://localhost:8000/api/items", item);
      return res.data; // ✅ Includes { success, message, data }
    } catch (err) {
      // ✅ Pass backend error message to the component
      if (err.response && err.response.data) {
        return rejectWithValue(err.response.data); // <-- important
      }
      return rejectWithValue({
        success: false,
        message: "Something went wrong",
      });
    }
  }
);

export const deleteItem = createAsyncThunk(
  "items/delete",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`http://localhost:8000/api/items/${id}`);
      // return id along with the success info from backend
      return { id, ...res.data };
    } catch (err) {
      if (err.response && err.response.data) {
        return rejectWithValue(err.response.data);
      }
      return rejectWithValue({ success: false, message: "Delete failed" });
    }
  }
);




const itemSlice = createSlice({
  name: "items",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data;  // <--- here
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to load items";
      });
  },
});


export default itemSlice.reducer;
